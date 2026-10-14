// ─────────────────────────────────────────────────────────────────────────────
//  COURTPATH SIGNUP STATS  —  edit these numbers each week, then commit & push.
//  Vercel will auto-deploy the new figures within a minute or two.
//
//  Only the values below need changing. Leave everything else alone.
// ─────────────────────────────────────────────────────────────────────────────

export const stats = {
  /** New user accounts signed up since May 1. */
  usersSinceMay: 322,

  /** Active filers so far this calendar month. */
  activeThisMonth: 22,

  /** Active filers last calendar month. */
  activeLastMonth: 80,

  /** Date these numbers were last updated. Format: "Month D, YYYY". */
  lastUpdated: "October 14, 2026",
};

export type Stats = typeof stats;
