import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import PhoneLink from "@/components/PhoneLink";
import PrivacyChoicesLink from "@/components/PrivacyChoicesLink";
import CaliforniaSavings from "@/components/CaliforniaSavings";
import { CALIFORNIA_SIGNUP_OPEN, CA_RATE, FREE_DAYS } from "@/lib/plans";
import { APP_LOGIN_URL, CONTACT, UTAH_EFSP_LIST_URL, pageMetadata } from "@/lib/site";

// California ad landing page: where paid traffic lands. It sells the switch (no provider fee on each
// filing, one monthly price, a free month) with real screens from the app; the detail lives on
// /california/pricing. Off on courtpath.com until California filing goes live, on in preview copies
// (CALIFORNIA_SIGNUP_OPEN in lib/plans.ts). Not indexed: ads only. No testimonials, customer counts,
// competitor names or competitor prices.
// Screenshots (public/images/california): the app's California screens on staging, run locally with
// sample data and Tyler's test-system fee amounts. Retake them if those screens change.
// At go-live: change "launching in California" to "now filing in California" and link it to the
// court or Tyler list of approved providers, the way the Utah list is linked.

const serif = Source_Serif_4({ subsets: ["latin"], weight: ["600"], display: "swap" });

const SIGNUP = "/signup/california";
const PRICING = "/california/pricing";

const base = pageMetadata({
  title: "California E-Filing | $175 per Attorney a Month | Courtpath",
  description:
    "Unlimited e-filing in California superior courts on eFileCA, with e-service where permitted, for $175 per attorney a month. No Courtpath fee per filing. First 30 days free.",
  path: "/california",
});
const shareImage = { url: "/california/opengraph-image", width: 1200, height: 630, alt: "Courtpath: unlimited California e-filing for $175 per attorney a month" };
export const metadata = CALIFORNIA_SIGNUP_OPEN
  ? { ...base, openGraph: { ...base.openGraph, images: [shareImage] }, twitter: { ...base.twitter, images: [shareImage.url] }, robots: { index: false, follow: false } }
  : { robots: { index: false, follow: false } };

const buttonBase = "inline-block rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-primary-dark hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const buttonOnNavy = `${buttonBase} focus-visible:ring-white focus-visible:ring-offset-primary-dark`;
const link = "font-medium text-primary underline underline-offset-2";
const nowrap = (s: string) => <span className="whitespace-nowrap">{s}</span>;
const frame = "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10";

// Real screens, sample cases. One short line each.
const SCREENS: { src: string; width: number; height: number; alt: string; title: string; body: string; maxWidth?: string }[] = [
  {
    src: "/images/california/app-find-case.webp", width: 1264, height: 1050,
    alt: "Courtpath's Court & Case step: a search of Santa Cruz civil cases by business name lists three cases, each with a Use this case button",
    title: "Find your case and file into it",
    maxWidth: "lg:max-w-[600px]",
    body: "Search the court by party or business name.",
  },
  {
    src: "/images/california/app-filings.webp", width: 1600, height: 952,
    alt: "Courtpath's list of California filings, with accepted, served, submitted and rejected statuses, and a Fix & resubmit button on the rejected one",
    title: "Every filing’s status in one list",
    body: "A returned filing shows the clerk’s reason and a Fix & resubmit button.",
  },
  {
    src: "/images/california/app-costs.webp", width: 1600, height: 773,
    alt: "Courtpath's Costs by case report for November 2026: each case's filings, share of the $175 subscription, court, e-filing and card fees, and total to bill",
    title: "Costs by case for client billing",
    body: "Each case’s share of the subscription plus its fees, to bill as your fee agreement allows.",
  },
];

const WHY: { title: string; body: React.ReactNode }[] = [
  { title: "Built by attorneys", body: "Designed by practicing lawyers, for lawyers and paralegals." },
  {
    title: "Utah-certified since 2019",
    body: (
      <>
        <a href={UTAH_EFSP_LIST_URL} target="_blank" rel="noopener noreferrer" className={link}>Certified by the Utah State Courts</a>, and
        launching in California on eFileCA.
      </>
    ),
  },
  { title: "One price per attorney", body: "No fee per filing, however many you file." },
  { title: "Nothing to move", body: "Your cases are already in the court’s system. Keep your current service while you try it." },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which courts?",
    a: (
      <>
        California superior courts on eFileCA. Los Angeles civil uses a different system and isn&apos;t covered. Ask about your county at{" "}
        <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>.
      </>
    ),
  },
  {
    q: "What do I still pay when I file?",
    a: "The court's filing fee, the e-filing fees and the card fee, at cost and shown before you submit. Courtpath adds nothing per filing.",
  },
  {
    q: "Can I cancel?",
    a: (
      <>
        Any time, by email or at <a href={`tel:${CONTACT.phoneE164}`} className={link}>{CONTACT.phoneDisplay}</a>. Cancel in the first {FREE_DAYS} days
        and you pay no subscription.
      </>
    ),
  },
];

export default function CaliforniaLandingPage() {
  if (!CALIFORNIA_SIGNUP_OPEN) notFound();

  return (
    <>
      {/* Stays on screen, so the button is always one tap away on a long phone page. */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/california" className="relative h-9 w-32 shrink-0" aria-label="Courtpath California">
            <Image src="/images/courtlogo.png" alt="Courtpath" fill className="object-contain object-left" sizes="128px" priority />
          </Link>
          <nav aria-label="Account" className="flex items-center gap-4 sm:gap-6 text-sm">
            <PhoneLink href={`tel:${CONTACT.phoneE164}`} location="lp-california-header" className="hidden md:inline text-slate-600 hover:text-primary">
              {CONTACT.phoneDisplay}
            </PhoneLink>
            <a href={APP_LOGIN_URL} className="text-slate-600 hover:text-primary">Log in</a>
            <a href={SIGNUP} className="rounded-md bg-accent px-3.5 py-2 font-semibold text-primary-dark hover:bg-accent-light">
              <span className="sm:hidden">Start free</span>
              <span className="hidden sm:inline">Start your free month</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="bg-white text-slate-800">
        {/* HERO: the offer, beside the app's own Review & Submit step */}
        <section className="bg-primary-dark text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-20">
            <div>
              <p className="text-sm font-medium text-white/75">California {nowrap("e-filing")} on eFileCA</p>
              <h1 className={`${serif.className} mt-4 text-balance text-[2.125rem] leading-[1.1] sm:text-[3.1rem] lg:text-[2.75rem]`}>
                Stop paying a provider fee on every California filing.
              </h1>
              <p className="mt-5 text-xl font-semibold text-accent-light">${CA_RATE} per attorney a month. {nowrap(`First ${FREE_DAYS} days free.`)}</p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Unlimited filings, {nowrap("e-service")} where permitted, and staff at no extra cost. Court, Tyler and card fees at cost.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={SIGNUP} className={buttonOnNavy}>Start your free month</a>
                <a href={PRICING} className="text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  See pricing and fees
                </a>
              </div>
              <p className="mt-3 text-sm text-white/60">
                Card required. Cancel any time. Los Angeles civil isn&apos;t covered.{" "}
                <a href={`${PRICING}#courts`} className="underline decoration-white/30 underline-offset-2 hover:decoration-white">Courts</a>
              </p>
            </div>
            <figure>
              <a href="/images/california/app-review.webp" target="_blank" rel="noopener noreferrer" className="relative block cursor-zoom-in overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <Image
                  src="/images/california/app-review.webp"
                  width={1600}
                  height={1344}
                  priority
                  sizes="(min-width: 1152px) 620px, (min-width: 1024px) 55vw, 100vw"
                  className="block h-auto w-full"
                  alt="Courtpath's Review & Submit step for a new Santa Cruz civil case: case initiation fee $435.00, court service fees $2.05, service fees $4.95, convenience fee $12.16, Courtpath fee $0.00, total $454.16"
                />
                {/* the Courtpath fee row */}
                <span aria-hidden="true" className="pointer-events-none absolute left-[31.4%] top-[49.7%] h-[7%] w-[61.4%] rounded-md ring-[3px] ring-accent shadow-[0_0_0_6px_rgba(212,164,65,0.25)]" />
                <span className="sr-only"> (opens the full-size screenshot)</span>
              </a>
              <figcaption className="mt-3 text-sm text-white/60">Courtpath fee: $0.00. Sample case; other fees vary by court.</figcaption>
            </figure>
          </div>
        </section>

        {/* THE APP: real screens, sample cases */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} text-balance text-3xl sm:text-4xl text-slate-900`}>See it in the app</h2>
            <p className="mt-2 text-slate-600">Real screens, sample cases.</p>
            <div className="mt-12 space-y-14 sm:space-y-20">
              {SCREENS.map((s, i) => (
                <div
                  key={s.src}
                  className={`grid grid-cols-1 items-center gap-6 lg:gap-14 ${i % 2 ? "lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"}`}
                >
                  <div className={i % 2 ? "lg:order-last" : ""}>
                    <h3 className="text-xl font-semibold text-slate-900">{s.title}</h3>
                    <p className="mt-2 max-w-md leading-relaxed text-slate-600">{s.body}</p>
                  </div>
                  {/* opens the full-size screen, for phones */}
                  <a href={s.src} target="_blank" rel="noopener noreferrer" className={`${frame} ${s.maxWidth || ""} block cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}>
                    <Image src={s.src} width={s.width} height={s.height} alt={s.alt} sizes="(min-width: 1152px) 730px, (min-width: 1024px) 64vw, 100vw" className="block h-auto w-full" />
                    <span className="sr-only"> (opens the full-size screenshot)</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY COURTPATH */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} text-3xl sm:text-4xl text-slate-900`}>Why Courtpath</h2>
            <dl className="mt-8 grid gap-x-10 gap-y-8 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
              {WHY.map((w) => (
                <div key={w.title} className="border-t-2 border-primary-dark pt-4">
                  <dt className="font-semibold text-slate-900">{w.title}</dt>
                  <dd className="mt-2 leading-relaxed text-slate-600">{w.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SAVINGS */}
        <section id="savings" className="scroll-mt-20 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} max-w-2xl text-balance text-3xl sm:text-4xl text-slate-900`}>What do per-filing fees cost you?</h2>
            <div className="mt-10">
              <CaliforniaSavings signupHref={SIGNUP} />
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} text-3xl sm:text-4xl text-slate-900`}>Questions</h2>
            <div className="mt-8 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
              {FAQ.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded font-medium text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-xl leading-none text-slate-400 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-slate-600">
              Fee waivers, client billing and more: <a href={PRICING} className={link}>California pricing and FAQ</a>.
            </p>
          </div>
        </section>

        {/* CLOSING */}
        <section className="bg-primary-dark text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-8">
            <div>
              <h2 className={`${serif.className} text-balance text-3xl sm:text-4xl`}>Try it free for {FREE_DAYS} days.</h2>
              <p className="mt-3 max-w-xl text-white/70">Then ${CA_RATE} per attorney a month. Card required; cancel any time.</p>
            </div>
            <div className="mt-8 shrink-0 lg:mt-0 lg:text-right">
              <a href={SIGNUP} className={buttonOnNavy}>Start your free month</a>
              <p className="mt-3 text-sm text-white/70">
                Questions?{" "}
                <PhoneLink href={`tel:${CONTACT.phoneE164}`} location="lp-california" className="text-white underline decoration-white/30 underline-offset-2">{CONTACT.phoneDisplay}</PhoneLink>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white text-sm text-slate-500">
        <div className="mx-auto max-w-6xl space-y-3 px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © {new Date().getFullYear()} Courtpath Incorporated, {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
            </p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/terms" className="hover:text-primary hover:underline underline-offset-2">Terms of Service</Link>
              <Link href="/privacy" className="hover:text-primary hover:underline underline-offset-2">Privacy Policy</Link>
              <Link href="/accessibility" className="hover:text-primary hover:underline underline-offset-2">Accessibility</Link>
              <PrivacyChoicesLink className="hover:text-primary hover:underline underline-offset-2" />
            </nav>
          </div>
          <p className="text-xs text-slate-500">
            Tyler Technologies, Odyssey and eFileCA are trademarks of Tyler Technologies, Inc. Courtpath is an independent e-filing service provider.
          </p>
        </div>
      </footer>
    </>
  );
}
