// Every SEO landing page and whether it's live.
//
// "draft" pages render at their URL (for review on a preview deploy) but are
// noindexed and left out of the sitemap and footer. Flip to "published" after
// attorney review, and set `reviewed` to the review date.
export type LandingStatus = "draft" | "published";

export interface LandingEntry {
  path: string;
  title: string;
  status: LandingStatus;
  reviewed?: string;
}

export const LANDING_PAGES: LandingEntry[] = [
  { path: "/utah-efiling", title: "Utah E-Filing Guide", status: "draft" },
  { path: "/utah-efiling-providers", title: "Utah E-Filing Providers Compared", status: "draft" },
  { path: "/courtpath-vs-eflex", title: "Courtpath vs. eFlex", status: "draft" },
  {
    path: "/utah-debt-collection-efiling",
    title: "Debt Collection & Eviction E-Filing",
    status: "draft",
  },
];

export function landingEntry(path: string): LandingEntry {
  const entry = LANDING_PAGES.find((p) => p.path === path);
  if (!entry) throw new Error(`No landing page registered for ${path}`);
  return entry;
}

export function publishedLandingPages() {
  return LANDING_PAGES.filter((p) => p.status === "published");
}
