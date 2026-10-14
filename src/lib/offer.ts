// The launch offer and when it ends. Landing pages read the offer from here,
// so it changes everywhere at once instead of page by page.
//
// Landing pages revalidate hourly (`export const revalidate = 3600`). Vercel
// serves the cached page and regenerates it in the background, so after
// midnight Mountain time on January 1, 2027 the first visitor may still see
// the free-period copy; the regenerated page follows on the next request.
// Call these helpers during render, never at module scope, or the value is
// frozen for the life of the server process.
export const FREE_PERIOD_ENDS = "2027-01-01T07:00:00Z"; // midnight MST

export function isFreePeriod(now: number = Date.now()) {
  return now < Date.parse(FREE_PERIOD_ENDS);
}

/** One line under a signup call to action. */
export function offerLine() {
  return isFreePeriod()
    ? "Free until January 1, 2027. No card needed to sign up."
    : "No subscription required: $4 per filing on Bronze.";
}

/** Label for a call to action that goes to the plans grid. */
export function pricingCtaLabel() {
  return isFreePeriod() ? "Choose a free plan" : "Choose a plan";
}

/** Label for a call to action that starts signup for one plan. */
export function planCtaLabel(planName: string) {
  return isFreePeriod() ? `Start ${planName} free` : `Start ${planName}`;
}
