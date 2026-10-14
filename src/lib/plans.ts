// Plan facts the landing pages recommend from. Prices are the post-launch
// prices already published on /pricing and /signup/[plan]; keep them in sync.
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
    fit: "Unlimited filing for one attorney, with paralegals and staff filing under that attorney.",
  },
  gold: {
    name: "Gold",
    price2027: "from $21 per attorney per month",
    fit: "Unlimited filing for firms with two or more attorneys, with paralegal and staff access.",
  },
  platinum: {
    name: "Platinum",
    price2027: "from $240 per year",
    fit: "Annual unlimited filing for single- and multi-attorney firms, with paralegal and staff access.",
  },
};
