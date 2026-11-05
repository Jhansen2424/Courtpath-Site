import Link from "next/link";
import { getPost } from "@/content/blog";

/**
 * Link to another blog post by slug. Posts in the content plan link ahead to
 * posts that haven't been added yet; until the target exists in the registry,
 * this renders the plain text instead of a link that would 404.
 */
export default function PostLink({ slug, children }: { slug: string; children: React.ReactNode }) {
  if (!getPost(slug)) return <>{children}</>;
  return <Link href={`/blog/${slug}`}>{children}</Link>;
}
