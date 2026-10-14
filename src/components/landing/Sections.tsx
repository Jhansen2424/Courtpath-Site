// Shared sections for the SEO landing pages. Every page follows the same
// template: hero → proof → the page's own content → how it works → plan fit →
// FAQ → closing call. Only the content section is unique to a page.
import Link from "next/link";
import PhoneLink from "@/components/PhoneLink";
import LandingCta from "@/components/landing/LandingCta";
import { CONTACT, UTAH_EFSP_LIST_URL } from "@/lib/site";
import { isFreePeriod, offerLine, primaryCtaLabel } from "@/lib/offer";
import { PLANS, type PlanId } from "@/lib/plans";
import { stats } from "@/data/stats";
import type { LandingStatus } from "@/content/landing/registry";

export function DraftBanner({ status }: { status: LandingStatus }) {
  if (status !== "draft") return null;
  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        Draft for review. This page is not indexed or linked from the site yet.
      </div>
    </div>
  );
}

export function LandingHero({
  page,
  eyebrow,
  title,
  intro,
  ctaHref,
  ctaLabel,
}: {
  page: string;
  eyebrow: string;
  title: string;
  intro: React.ReactNode;
  ctaHref: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/30 to-primary-light/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/20 to-accent-light/10 blur-[100px]" />
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-light mb-4">{eyebrow}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        <div className="mt-6 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">{intro}</div>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <LandingCta href={ctaHref} page={page} position="hero">
            {ctaLabel ?? primaryCtaLabel()}
          </LandingCta>
          <PhoneLink
            href={`tel:${CONTACT.phoneE164}`}
            location={`${page}-hero`}
            adsConversion={false}
            className="inline-block px-8 py-4 text-white font-medium rounded-lg border border-white/25 text-center hover:bg-white/5 transition-all"
          >
            Call {CONTACT.phoneDisplay}
          </PhoneLink>
        </div>
        <p className="mt-4 text-sm text-white/60">{offerLine()}</p>
      </div>
    </section>
  );
}

export function ProofStrip() {
  // Rounded down to the nearest hundred so the claim stays true between updates.
  const accounts = Math.floor(stats.totalUsers / 100) * 100;
  return (
    <section className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid gap-4 sm:grid-cols-3 text-sm text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">Certified</span> by the{" "}
          <a href={UTAH_EFSP_LIST_URL} target="_blank" rel="noopener noreferrer" className="text-primary underline">
            Utah State Courts
          </a>{" "}
          since 2019
        </p>
        <p>
          <span className="font-semibold text-gray-900">{accounts}+ user accounts</span> filing in Utah courts
        </p>
        <p>
          <span className="font-semibold text-gray-900">Built by Utah attorneys</span> in Murray, UT
        </p>
      </div>
    </section>
  );
}

/** The page's own content, set in the same typography as the blog. */
export function ContentSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 post-body">{children}</div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      title: "Create your account",
      body: "Your name, email and Utah Bar number. Firms add their name and attorney count.",
    },
    {
      title: "We set it up",
      body: "Your account is ready within 24 hours, connected to the courts’ e-filing system.",
    },
    {
      title: "File and serve",
      body: "District and justice courts, with electronic service on every plan.",
    },
  ];
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How to get started</h2>
        <ol className="grid sm:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <li key={s.title} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white text-xl font-bold">
                {i + 1}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PlanFit({ page, plan, reason }: { page: string; plan: PlanId; reason: string }) {
  const p = PLANS[plan];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-accent bg-accent/5 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">Recommended plan</p>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">{p.name}</h2>
          <p className="mt-3 text-gray-700">{p.fit}</p>
          <p className="mt-3 text-gray-700">{reason}</p>
          <p className="mt-5 text-lg font-semibold text-gray-900">
            {isFreePeriod() ? `Free until January 1, 2027, then ${p.price2027}` : p.price2027}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <LandingCta href={`/signup/${plan}`} page={page} position="plan-fit">
              {isFreePeriod() ? `Start ${p.name} free` : `Start ${p.name}`}
            </LandingCta>
            <Link href="/pricing" className="text-primary font-medium underline">
              Compare all plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function LandingFaq({ faqs }: { faqs: { q: string; a: React.ReactNode }[] }) {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 post-body">
        <h2>Frequently asked questions</h2>
        <dl>
          {faqs.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function ClosingCta({
  page,
  heading,
  ctaHref,
  ctaLabel,
}: {
  page: string;
  heading: string;
  ctaHref: string;
  ctaLabel?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-white">{heading}</h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <LandingCta href={ctaHref} page={page} position="closing">
            {ctaLabel ?? primaryCtaLabel()}
          </LandingCta>
          <LandingCta href="/contact" page={page} position="closing-contact" variant="ghostDark">
            Talk to a person
          </LandingCta>
        </div>
        <p className="mt-4 text-sm text-white/70">
          {offerLine()} Questions? Call{" "}
          <PhoneLink
            href={`tel:${CONTACT.phoneE164}`}
            location={`${page}-closing`}
            adsConversion={false}
            className="underline text-white"
          >
            {CONTACT.phoneDisplay}
          </PhoneLink>
          , Monday to Friday, 9 to 5 Mountain.
        </p>
      </div>
    </section>
  );
}

/** "Last reviewed" line with the sources the page's facts come from. */
export function SourcesNote({
  checked,
  sources,
}: {
  checked: string;
  sources: { title: string; url: string }[];
}) {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 post-body">
        <h2>Sources</h2>
        <p className="text-sm">Facts on this page were checked on {checked}.</p>
        <ul>
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500">
          General information about Utah court procedure, not legal advice.
        </p>
      </div>
    </section>
  );
}
