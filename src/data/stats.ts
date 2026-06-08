// ─────────────────────────────────────────────────────────────────────────────
//  COURTPATH SIGNUP STATS  —  edit these numbers each week, then commit & push.
//  Vercel will auto-deploy the new figures within a minute or two.
//
//  Only the values below need changing. Leave everything else alone.
// ─────────────────────────────────────────────────────────────────────────────

export const stats = {
  /** Total user accounts ever signed up. */
  totalUsers: 692,

  /** Active filers this month. */
  activeUsers: 70,

  /** New signups this week (from Monday). */
  weeklyUsers: 0,

  /** New signups this calendar month. */
  monthlyUsers: 9,

  /** Date these numbers were last updated. Format: "Month D, YYYY". */
  lastUpdated: "June 8, 2026",
};

export type Stats = typeof stats;
