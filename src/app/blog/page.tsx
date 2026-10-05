import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/content/blog";
import { pageMetadata } from "@/lib/site";

const posts = getPublishedPosts();

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Utah E-Filing Blog: Rules, Fees and How-Tos | Courtpath",
    description:
      "Practical guides for Utah attorneys and paralegals on e-filing, e-service, court rules and filing fees.",
    path: "/blog",
  }),
  // Keep the index out of search until it has published posts.
  ...(posts.length === 0 && { robots: { index: false, follow: true } }),
};

export default function BlogIndexPage() {
  return (
    <main>
      <Navbar />
      <header className="bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-40 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">Utah E-Filing Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Practical guides to Utah e-filing, e-service, court rules and fees, for attorneys and
            the staff who file for them.
          </p>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {posts.length === 0 ? (
          <p className="text-gray-600">New guides are on the way.</p>
        ) : (
          <ul className="grid gap-8 md:grid-cols-2">
            {posts.map(({ meta }) => (
              <li
                key={meta.slug}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{meta.category}</p>
                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  <Link href={`/blog/${meta.slug}`} className="hover:text-primary">
                    {meta.title}
                  </Link>
                </h2>
                <p className="mt-3 text-gray-600">{meta.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </main>
  );
}
