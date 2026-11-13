/**
 * The plans the website sells. Each one maps onto a billing plan in lib/billing.ts, which keeps
 * the original names because the Courtpath app and Stripe use them:
 *
 *   basic             -> basic         $10 / month, 3 filings included, then $4 a filing
 *                                      (the app still calls this plan bronze)
 *   criminal-defense  -> bronze-plus   $9.99 / month
 *   unlimited         -> silver        $25 / month, or platinum (one attorney) at $240 / year
 *   firm              -> gold          $21 per attorney a month
 *   california        -> california    $175 per attorney a month, unlimited California filings
 *
 * Every new account is free for its first FREE_DAYS, then its plan starts, California included.
 * Only accounts made before these plans keep the old promise of free until January 1, 2027
 * (lib/billing.ts).
 */

export type PublicPlan = "basic" | "criminal-defense" | "unlimited" | "firm" | "california";
export type BillingKey = "basic" | "bronze" | "bronze-plus" | "silver" | "gold" | "platinum" | "california";

export const FREE_DAYS = 30;
/** Filings a month included in Basic before the $4 per-filing charge applies. */
export const BASIC_FILINGS = 3;
/** The moment a signup made at `now` stops being free. */
export const freeUntil = (now = Date.now()) => new Date(now + FREE_DAYS * 24 * 3600 * 1000);

/**
 * California pricing (Devin's proposal, Nov 2026): one price per attorney a month for unlimited
 * California filings and e-service, no Courtpath fee per filing; court fees and Tyler's e-filing
 * and card fees are charged at cost by the court's payment system.
 */
export const CA_RATE = 175;

/**
 * California sign-up and the /california page are built but switched off on courtpath.com until
 * Courtpath files in California courts for real (Tyler's California production). Preview
 * deployments have them on (next.config.ts). Go-live: create the Stripe price, set
 * STRIPE_PRICE_CALIFORNIA, set NEXT_PUBLIC_CALIFORNIA_SIGNUP=1 and redeploy (fixed at build time).
 */
export const CALIFORNIA_SIGNUP_OPEN = process.env.NEXT_PUBLIC_CALIFORNIA_SIGNUP === "1";

/**
 * A preview copy of the site (next.config.ts): it says so, and sign-up stops before the card
 * (previews can't create accounts anyway: the signup keys exist only in Production).
 */
export const SITE_DEMO = process.env.NEXT_PUBLIC_SITE_DEMO === "1";

/** The states sign-up offers: where the attorney files, which decides the plans and the bar. */
export type BarState = "UT" | "CA";
export const BAR_STATES: Record<BarState, { name: string; bar: string }> = {
  UT: { name: "Utah", bar: "Utah bar number" },
  CA: { name: "California", bar: "State Bar number (SBN)" },
};

export const formatDate = (d: Date, month: "long" | "short" = "long") =>
  d.toLocaleDateString("en-US", { timeZone: "America/Denver", month, day: "numeric", year: "numeric" });

export const PLANS: Record<PublicPlan, { name: string; price: string; unit: string; after: string }> = {
  basic: { name: "Basic", price: "$10", unit: "per month", after: `$10 a month with ${BASIC_FILINGS} filings, $4 each after that` },
  "criminal-defense": { name: "Criminal Defense", price: "$9.99", unit: "per month", after: "$9.99 a month" },
  unlimited: { name: "Unlimited", price: "$25", unit: "per month", after: "$25 a month" },
  firm: { name: "Firm", price: "$21", unit: "per attorney / month", after: "$21 per attorney a month" },
  california: { name: "California Unlimited", price: "$175", unit: "per attorney / month", after: "$175 per attorney a month" },
};

export const isPublicPlan = (v: unknown): v is PublicPlan => typeof v === "string" && v in PLANS;

/** Old plan links (/signup/silver, emails, landing pages) land on the plan that replaced them. */
export const LEGACY_PLANS: Record<string, { plan: PublicPlan; yearly?: boolean }> = {
  bronze: { plan: "basic" },
  "bronze-plus": { plan: "criminal-defense" },
  silver: { plan: "unlimited" },
  gold: { plan: "firm" },
  platinum: { plan: "unlimited", yearly: true },
};

export function billingKeyFor(plan: PublicPlan, yearly = false): BillingKey {
  if (plan === "basic") return "basic";
  if (plan === "criminal-defense") return "bronze-plus";
  if (plan === "firm") return "gold";
  if (plan === "california") return "california";
  return yearly ? "platinum" : "silver";
}

/** The display name for a billing key, e.g. on the success page and in staff emails. */
export const nameForBillingKey = (key: string | null | undefined) =>
  key === "basic" ? "Basic" : key === "bronze" ? "Bronze" : key === "bronze-plus" ? "Criminal Defense" : key === "silver" ? "Unlimited"
    : key === "platinum" ? "Unlimited (yearly)" : key === "gold" ? "Firm" : key === "california" ? "California Unlimited" : "Courtpath";

/** Firm price per attorney a month, the same at every firm size (Stripe's Gold price). */
export const FIRM_RATE = 21;
