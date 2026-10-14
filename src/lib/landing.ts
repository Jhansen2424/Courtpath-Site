import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import { landingEntry } from "@/content/landing/registry";

/** Metadata for an SEO landing page; drafts are kept out of search. */
export function landingMetadata(args: { title: string; description: string; path: string }): Metadata {
  const entry = landingEntry(args.path);
  return {
    ...pageMetadata(args),
    ...(entry.status === "draft" && { robots: { index: false, follow: false } }),
  };
}
