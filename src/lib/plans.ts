// Plan facts the landing pages recommend from. Prices are the post-launch
// prices already published on /pricing and in /signup/[plan]; keep in sync.
// Gold's per-attorney price depends on firm size in the signup flow:
// $23 (2–10 attorneys), $22 (11–20), $21 (21+).
export type PlanId = "bronze" | "bronze-plus" | "silver" | "gold" | "platinum";

export const PLANS: Record<PlanId, { name: string; price2027: string; fit: string }> = {
  bronze: {
    name: "Bronze",
    price2027: "$4 per filing",
    fit: "Pay only when you file. No subscription.",
  },
  "bronze-plus": {
    name: "Bronze +",
    price2027: "$9.99 per month",
    fit: "Unlimited appearances of counsel, requests for discovery and entries of plea, plus $3 per filing for everything else.",
  },
  silver: {
    name: "Silver",
    price2027: "$25 per month",
    fit: "Unlimited filing for one attorney, with paralegal and staff use.",
  },
  gold: {
    name: "Gold",
    price2027: "$21–$23 per attorney per month, by firm size",
    fit: "Unlimited monthly filing for firms with two or more attorneys, with paralegal and staff use.",
  },
  platinum: {
    name: "Platinum",
    price2027: "from $240 per year",
    fit: "Unlimited filing billed annually, for firms, with paralegal and staff use.",
  },
};
