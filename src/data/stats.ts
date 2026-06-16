// ─────────────────────────────────────────────────────────────────────────────
//  COURTPATH SIGNUP STATS  —  edit these numbers each week, then commit & push.
//  Vercel will auto-deploy the new figures within a minute or two.
//
//  Only the values below need changing. Leave everything else alone.
// ─────────────────────────────────────────────────────────────────────────────

export const stats = {
  /** Total user accounts ever signed up. */
  totalUsers: 698,

  /** Active filers in the last 30 days. */
  activeUsers: 75,

  /** New signups this week (from Monday). */
  weeklyUsers: 6,

  /** New signups this calendar month. */
  monthlyUsers: 15,

  /** Date these numbers were last updated. Format: "Month D, YYYY". */
  lastUpdated: "June 16, 2026",
};

export type Stats = typeof stats;
