import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/content/blog";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/pricing", priority: 0.9 },
  { path: "/tutorials", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority,
  }));

  const posts = getPublishedPosts();
  if (posts.length === 0) return pages;

  return [
    ...pages,
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map(({ meta }) => ({
      url: `${SITE_URL}/blog/${meta.slug}`,
      lastModified: meta.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
