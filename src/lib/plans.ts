/**
 * The plans the website sells. Each one maps onto a billing plan in lib/billing.ts, which keeps
 * the original names because the Courtpath app and Stripe use them:
 *
 *   basic             -> basic         $10 / month, 3 filings included, then $4 a filing
 *                                      (the app still calls this plan bronze)
 *   criminal-defense  -> bronze-plus   $9.99 / month
 *   unlimited         -> silver        $25 / month, or platinum (one attorney) at $240 / year
 *   firm              -> gold          $21 per attorney a month
 *
 * Every new account is free for its first FREE_DAYS. Until the launch special ends, signups are
 * free until January 1, 2027 instead, as the site has promised.
 */

export type PublicPlan = "basic" | "criminal-defense" | "unlimited" | "firm";
export type BillingKey = "basic" | "bronze" | "bronze-plus" | "silver" | "gold" | "platinum";

export const FREE_DAYS = 30;
/** Filings a month included in Basic before the $4 per-filing charge applies. */
export const BASIC_FILINGS = 3;
/** Midnight Utah time on January 1, 2027. lib/billing.ts uses the same default. */
export const LAUNCH_SPECIAL_ENDS = Date.parse("2027-01-01T07:00:00Z");

/** The moment a signup made at `now` stops being free. */
export const freeUntil = (now = Date.now(), launchEnds = LAUNCH_SPECIAL_ENDS) =>
  new Date(Math.max(now + FREE_DAYS * 24 * 3600 * 1000, launchEnds));

/** True while signing up still gets the launch special (free until January 1, 2027). */
export const launchSpecialOn = (now = Date.now()) => now + FREE_DAYS * 24 * 3600 * 1000 < LAUNCH_SPECIAL_ENDS;

export const formatDate = (d: Date, month: "long" | "short" = "long") =>
  d.toLocaleDateString("en-US", { timeZone: "America/Denver", month, day: "numeric", year: "numeric" });

export const PLANS: Record<PublicPlan, { name: string; price: string; unit: string; after: string }> = {
  basic: { name: "Basic", price: "$10", unit: "per month", after: `$10 a month with ${BASIC_FILINGS} filings, $4 each after that` },
  "criminal-defense": { name: "Criminal Defense", price: "$9.99", unit: "per month", after: "$9.99 a month" },
  unlimited: { name: "Unlimited", price: "$25", unit: "per month", after: "$25 a month" },
  firm: { name: "Firm", price: "$21", unit: "per attorney / month", after: "$21 per attorney a month" },
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
  return yearly ? "platinum" : "silver";
}

/** The display name for a billing key, e.g. on the success page and in staff emails. */
export const nameForBillingKey = (key: string | null | undefined) =>
  key === "basic" ? "Basic" : key === "bronze" ? "Bronze" : key === "bronze-plus" ? "Criminal Defense" : key === "silver" ? "Unlimited"
    : key === "platinum" ? "Unlimited (yearly)" : key === "gold" ? "Firm" : "Courtpath";

/** Firm price per attorney a month, the same at every firm size (Stripe's Gold price). */
export const FIRM_RATE = 21;
