import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { APP_LOGIN_URL } from "@/lib/site";
import { BASIC_FILINGS, freeUntil } from "@/lib/plans";

/**
 * Website billing: every plan collects a card through Stripe Checkout, and nothing is charged
 * during a new account's first 30 days (FREE_DAYS in lib/plans.ts). The Courtpath account is only created once Checkout completes, with the Stripe customer
 * id on it, so every account has a card behind it.
 *
 * The website sells Basic, Criminal Defense, Unlimited and Firm (lib/plans.ts). Apart from basic,
 * these keys are also the app's plan names; APP_PLAN says which app plan each one creates.
 *
 *   basic        $10 / month     -> subscription, quantity 1; 3 filings a month included, and the
 *                                   app charges $4 a filing after that against the same card.
 *   bronze       pay per filing  -> Checkout "setup" mode: the card is saved on the customer and the
 *                                   app charges $4 per filing. Existing Bronze accounts only (/billing).
 *   bronze-plus  $9.99 / month   -> subscription, quantity 1
 *   silver       $25 / month     -> subscription, quantity 1
 *   gold         $21 / attorney  -> subscription, quantity = attorneys
 *   platinum     per attorney/yr -> subscription, quantity = attorneys (Unlimited yearly: 1)
 *
 * Subscriptions start with a trial that ends when the free period does, so the first invoice is
 * on that date.
 */

export type PlanKey = "basic" | "bronze" | "bronze-plus" | "silver" | "gold" | "platinum";

export const PLAN_BILLING: Record<PlanKey, { name: string; mode: "setup" | "subscription"; priceEnv?: string; perAttorney?: boolean; detail?: string }> = {
  basic: { name: "Basic", mode: "subscription", priceEnv: "STRIPE_PRICE_BASIC", detail: "$10 a month with 3 filings included, then $4 a filing" },
  bronze: { name: "Bronze", mode: "setup" },
  "bronze-plus": { name: "Criminal Defense", mode: "subscription", priceEnv: "STRIPE_PRICE_BRONZE_PLUS" },
  silver: { name: "Unlimited", mode: "subscription", priceEnv: "STRIPE_PRICE_SILVER" },
  gold: { name: "Firm", mode: "subscription", priceEnv: "STRIPE_PRICE_GOLD", perAttorney: true },
  platinum: { name: "Unlimited (yearly)", mode: "subscription", priceEnv: "STRIPE_PRICE_PLATINUM", perAttorney: true },
};

/**
 * The app plan an account gets. The app has no "basic" yet, so Basic accounts are Bronze there,
 * created with includedFilings (BASIC_FILINGS), which legacy Bronze accounts don't have.
 */
export const APP_PLAN: Record<PlanKey, string> = {
  basic: "bronze", bronze: "bronze", "bronze-plus": "bronze-plus", silver: "silver", gold: "gold", platinum: "platinum",
};

export const isPlan = (v: unknown): v is PlanKey => typeof v === "string" && v in PLAN_BILLING;

/** First billing moment: midnight Mountain time on Jan 1, 2027 unless BILLING_START overrides it. */
export function billingStart(): Date {
  const d = new Date(process.env.BILLING_START || "2027-01-01T07:00:00Z");
  return isNaN(d.getTime()) ? new Date("2027-01-01T07:00:00Z") : d;
}

/** When a signup made now starts paying, as a Unix time: the end of its free month. */
export function trialEnd(now = Date.now()): number {
  return Math.floor(freeUntil(now).getTime() / 1000);
}

/**
 * Existing accounts putting a card on file (/billing) were promised free until BILLING_START, not
 * a new free month: trial to then, or undefined once it is under 48h away (Stripe's minimum).
 */
export function launchTrialEnd(now = Date.now()): number | undefined {
  const start = billingStart().getTime();
  return start - now > 48 * 3600 * 1000 ? Math.floor(start / 1000) : undefined;
}

export function priceFor(plan: PlanKey): string | null {
  const env = PLAN_BILLING[plan].priceEnv;
  if (!env) return null;
  const id = process.env[env];
  return id && id.startsWith("price_") ? id : null;
}

export const quantityFor = (plan: PlanKey, attorneyCount: unknown) =>
  PLAN_BILLING[plan].perAttorney ? Math.min(500, Math.max(1, Math.floor(Number(attorneyCount) || 1))) : 1;

/* ---- the chosen password rides on the Stripe customer until the account exists (AES-256-GCM) ---- */

function key(): Buffer {
  const hex = process.env.SIGNUP_ENCRYPTION_KEY || "";
  if (!/^[0-9a-f]{64}$/i.test(hex)) throw new Error("SIGNUP_ENCRYPTION_KEY must be 64 hex characters (openssl rand -hex 32)");
  return Buffer.from(hex, "hex");
}

export function sealPassword(password: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const data = Buffer.concat([c.update(password, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), data].map((b) => b.toString("base64url")).join(".");
}

export function openPassword(sealed: string): string {
  const [iv, tag, data] = sealed.split(".").map((p) => Buffer.from(p, "base64url"));
  const d = createDecipheriv("aes-256-gcm", key(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString("utf8");
}

/* ---- the Courtpath app (server to server, shared key) ---- */

const appUrl = () => (process.env.COURTPATH_API_URL || APP_LOGIN_URL).replace(/\/$/, "");

async function callApp(path: string, body: Record<string, unknown>, timeoutMs = 15000): Promise<{ status: number; data: any }> {
  const signupKey = process.env.COURTPATH_SIGNUP_KEY;
  if (!signupKey) return { status: 0, data: { error: "COURTPATH_SIGNUP_KEY is not set on the website" } };
  try {
    const res = await fetch(`${appUrl()}/pub/signup${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-courtpath-signup-key": signupKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(timeoutMs),
    });
    return { status: res.status, data: await res.json().catch(() => ({})) };
  } catch (err) {
    return { status: 0, data: { error: err instanceof Error ? err.message : String(err) } };
  }
}

/** Does this email already have an app account? null when the app could not be asked. */
export async function accountExists(email: string): Promise<boolean | null> {
  const r = await callApp("/check", { email });
  return r.status === 200 && typeof r.data.exists === "boolean" ? r.data.exists : null;
}

/* ---- finishing a completed Checkout (success page and webhook both land here) ---- */

export type FinishResult = {
  ok: boolean;
  kind: "signup" | "card";
  plan: PlanKey | null;
  /** ready = account created; exists = email already had one (card linked to it); linked = card added to an existing account; pending = needs a hand. */
  account: "ready" | "exists" | "linked" | "pending";
  error?: string;
};

const STATUS_KEY = "courtpath_account";

/**
 * Verify a Checkout Session really completed with a usable card, make that card the customer's
 * default, then create (signup) or link (card for an existing account) the Courtpath account.
 * Safe to run twice: the outcome is recorded on the Stripe customer and reused.
 */
export async function finishCheckout(sessionId: string, notify: (r: FinishResult, c: Stripe.Customer, detail?: string) => Promise<void>): Promise<FinishResult> {
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["setup_intent", "subscription", "customer"] });
  const customer = session.customer as Stripe.Customer | null;
  const kind = session.metadata?.courtpath === "card" ? "card" : "signup";
  const plan = isPlan(session.metadata?.plan) ? (session.metadata!.plan as PlanKey) : null;
  // What the app is told: Basic accounts are created as the app's Bronze plan.
  const appPlan = plan ? APP_PLAN[plan] : null;
  const base = { kind, plan } as const;
  if (!customer || typeof customer === "string" || customer.deleted || !session.metadata?.courtpath) {
    return { ...base, ok: false, account: "pending", error: "This is not a Courtpath checkout." };
  }
  if (session.status !== "complete") return { ...base, ok: false, account: "pending", error: "Checkout was not completed." };

  // The card that Checkout collected.
  let paymentMethod: string | null = null;
  if (session.mode === "setup") {
    const si = session.setup_intent as Stripe.SetupIntent | null;
    if (!si || si.status !== "succeeded") return { ...base, ok: false, account: "pending", error: "The card was not confirmed." };
    paymentMethod = typeof si.payment_method === "string" ? si.payment_method : si.payment_method?.id ?? null;
  } else {
    const sub = session.subscription as Stripe.Subscription | null;
    if (!sub || !["trialing", "active"].includes(sub.status)) return { ...base, ok: false, account: "pending", error: "The subscription did not start." };
    paymentMethod = typeof sub.default_payment_method === "string" ? sub.default_payment_method : sub.default_payment_method?.id ?? null;
  }
  // Per-filing charges and future invoices use the customer's default card.
  if (paymentMethod && customer.invoice_settings?.default_payment_method !== paymentMethod) {
    await stripe.customers.update(customer.id, { invoice_settings: { default_payment_method: paymentMethod } });
  }

  const done = customer.metadata?.[STATUS_KEY];
  if (done === "ready" || done === "exists" || done === "linked") return { ...base, ok: true, account: done };

  const m = customer.metadata || {};
  let result: FinishResult;
  let detail: string | undefined;
  if (kind === "card") {
    const r = await callApp("/stripe", { email: customer.email, stripeId: customer.id, plan: appPlan });
    if (r.status === 200) result = { ...base, ok: true, account: "linked" };
    else { result = { ...base, ok: true, account: "pending" }; detail = `${r.status} ${r.data?.error ?? ""}`.trim(); }
  } else {
    let password = "";
    try { password = m.pw ? openPassword(m.pw) : ""; } catch { password = ""; }
    let r = password
      ? await callApp("", {
          plan: appPlan, email: customer.email, password, stripeId: customer.id,
          firstName: m.firstName, middleName: m.middleName, lastName: m.lastName, bar: m.bar, phone: m.phone,
          address1: m.address1, address2: m.address2, city: m.city, state: m.state, zip: m.zip,
          teamName: m.teamName, attorneyCount: m.attorneyCount,
          // The app's $4 per filing waits for the end of this account's free period, and Basic's
          // first BASIC_FILINGS filings each month are included.
          freeUntil: m.freeUntil || undefined, includedFilings: plan === "basic" ? BASIC_FILINGS : undefined,
        }, 40000) // hashing the password takes the app several seconds; the whole step must fit in 60s
      : { status: 0, data: { error: "the chosen password could not be read" } };
    // No answer in time (or a 5xx): the app may still have finished. An account carrying this very
    // customer means it did; ask a few times before calling it a failure.
    if (password && (r.status === 0 || r.status >= 500)) {
      for (let i = 0; i < 4; i++) {
        await new Promise((ok) => setTimeout(ok, 3000));
        const check = await callApp("/stripe", { email: customer.email, stripeId: customer.id, plan: appPlan });
        if (check.status === 200 && check.data?.same) { r = { status: 200, data: { user: "created" } }; break; }
        if (check.status === 200 || check.status === 409) { r = { status: 409, data: {} }; break; }
      }
    }
    if (r.status === 200 && r.data.user === "created") result = { ...base, ok: true, account: "ready" };
    else if (r.status === 409) {
      // Someone else (the webhook or the success page) may have just created it: trust what is recorded.
      const again = (await stripe.customers.retrieve(customer.id)) as Stripe.Customer;
      if (again.metadata?.[STATUS_KEY] === "ready") return { ...base, ok: true, account: "ready" };
      // The email already had an account: put this card on it.
      const link = await callApp("/stripe", { email: customer.email, stripeId: customer.id, plan: appPlan });
      if (link.status === 200 && link.data?.same) {
        // Already carrying this very customer: we created it. Another run still finishing it records it;
        // an earlier run that timed out and said "by hand" is corrected here (and the email says so).
        if (done !== "pending") return { ...base, ok: true, account: "ready" };
        result = { ...base, ok: true, account: "ready" };
      } else {
        result = { ...base, ok: true, account: link.status === 200 ? "exists" : "pending" };
      }
      if (link.status !== 200) detail = `account exists; linking the card failed: ${link.status} ${link.data?.error ?? ""}`.trim();
    } else { result = { ...base, ok: true, account: "pending" }; detail = `${r.status} ${r.data?.error ?? ""}`.trim(); }
  }

  // Record the outcome and drop the sealed password once nobody needs it.
  await stripe.customers.update(customer.id, {
    metadata: { [STATUS_KEY]: result.account, ...(result.account !== "pending" ? { pw: "" } : {}) },
  });
  await notify(result, customer, detail).catch((err) => console.error("Billing notification failed:", err));
  return result;
}
