// The launch offer and when it ends. Landing pages read the offer from here,
// so it changes everywhere at once instead of page by page.
//
// Landing pages revalidate hourly (`export const revalidate = 3600`), so the
// copy flips to 2027 pricing within an hour of midnight Mountain time on
// January 1, 2027 without a redeploy.
export const FREE_PERIOD_ENDS = "2027-01-01T07:00:00Z"; // midnight MST

export function isFreePeriod(now: number = Date.now()) {
  return now < Date.parse(FREE_PERIOD_ENDS);
}

/** One line under every landing-page call to action. */
export function offerLine() {
  return isFreePeriod()
    ? "Free until January 1, 2027. No credit card required."
    : "No subscription required: pay $4 per filing.";
}

/** Label for the primary call to action. */
export function primaryCtaLabel() {
  return isFreePeriod() ? "Start filing free" : "Start filing";
}
