import type { Post } from "./types";
import * as newCivilCase from "./posts/how-to-efile-new-civil-case-utah-district-court";
import * as rule5Service from "./posts/utah-rule-5-electronic-service";

const allPosts: Post[] = [newCivilCase, rule5Service].map((p) => ({ meta: p.meta, Body: p.default }));

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.meta.slug === slug);
}

export function getAllPosts(): Post[] {
  return allPosts;
}

/** Published posts, newest first. */
export function getPublishedPosts(): Post[] {
  return allPosts
    .filter((p) => p.meta.status === "published")
    .sort((a, b) => (b.meta.publishedAt ?? "").localeCompare(a.meta.publishedAt ?? ""));
}
