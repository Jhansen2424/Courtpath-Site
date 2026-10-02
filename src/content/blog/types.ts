import type { ComponentType } from "react";

export type PostStatus = "draft" | "published";

export interface PostMeta {
  slug: string;
  title: string;
  /** Meta description and blog-index summary. */
  description: string;
  /** Topic cluster from the content plan. */
  category: "How-to filing" | "Rules and fees" | "Case types" | "Other courts";
  /**
   * Drafts render at their URL (for review on a preview deploy) but are
   * noindexed and left out of the blog index and sitemap.
   */
  status: PostStatus;
  /** ISO date the post went live. Set when status flips to "published". */
  publishedAt?: string;
  /** ISO date the facts in the post were last checked against the sources. */
  updatedAt: string;
  author: string;
  /** Attorney who reviewed the post. Required before publishing. */
  reviewedBy?: string;
  faqs: { question: string; answer: string }[];
  sources: { title: string; url: string }[];
  /** Slugs of related posts to link at the end. */
  related?: string[];
}

export interface Post {
  meta: PostMeta;
  Body: ComponentType;
}
