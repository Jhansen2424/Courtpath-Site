import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllPosts, getPost } from "@/content/blog";
import { SITE_URL, pageMetadata } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.meta.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const { meta } = post;
  const base = pageMetadata({
    title: `${meta.title} | Courtpath`,
    description: meta.description,
    path: `/blog/${meta.slug}`,
  });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article" },
    ...(meta.status === "draft" && { robots: { index: false, follow: false } }),
  };
}

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { meta, Body } = post;
  const url = `${SITE_URL}/blog/${meta.slug}`;
  const related = (meta.related ?? []).map(getPost).filter((p) => p !== undefined);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      url,
      mainEntityOfPage: url,
      ...(meta.publishedAt && { datePublished: meta.publishedAt }),
      dateModified: meta.updatedAt,
      author: { "@type": "Organization", name: meta.author, url: SITE_URL },
      publisher: { "@id": `${SITE_URL}/#organization` },
      image: `${SITE_URL}/opengraph-image`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
        { "@type": "ListItem", position: 3, name: meta.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ];

  return (
    <main>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white/80">{meta.category}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {meta.title}
          </h1>
          <p className="mt-6 text-sm text-white/70">
            By {meta.author}
            {meta.reviewedBy && <> · Reviewed by {meta.reviewedBy}</>} · Last updated{" "}
            <time dateTime={meta.updatedAt}>{formatDate(meta.updatedAt)}</time>
          </p>
        </div>
      </header>

      {meta.status === "draft" && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            Draft for review. This post is not indexed or listed on the blog yet.
          </div>
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="post-body">
          <Body />

          <h2>Frequently asked questions</h2>
          <dl>
            {meta.faqs.map((f) => (
              <div key={f.question}>
                <dt>{f.question}</dt>
                <dd>{f.answer}</dd>
              </div>
            ))}
          </dl>

          <h2>Sources</h2>
          <ul>
            {meta.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {related.length > 0 && (
          <section className="mt-12 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Related</h2>
            <ul className="space-y-2">
              {related.map((r) => (
                <li key={r.meta.slug}>
                  <Link href={`/blog/${r.meta.slug}`} className="text-primary font-medium hover:text-accent">
                    {r.meta.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-xs text-gray-500">
          This article is general information about Utah court procedure, not legal advice. Rules
          and fees change; check the linked sources before relying on them.
        </p>
      </article>

      <Footer />
    </main>
  );
}
