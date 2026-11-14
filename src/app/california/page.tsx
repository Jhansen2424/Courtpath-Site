import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import PhoneLink from "@/components/PhoneLink";
import PrivacyChoicesLink from "@/components/PrivacyChoicesLink";
import CaliforniaSavings from "@/components/CaliforniaSavings";
import FilingWindow from "@/components/california/FilingWindow";
import { CALIFORNIA_SIGNUP_OPEN, CA_RATE, FREE_DAYS } from "@/lib/plans";
import { APP_LOGIN_URL, CONTACT, UTAH_EFSP_LIST_URL, pageMetadata } from "@/lib/site";

// California ad landing page: where paid traffic lands. It sells the switch (no provider fee on each
// filing, one monthly price, a free month) and shows the product; the detail lives on
// /california/pricing. Off on courtpath.com until California filing goes live, on in preview copies
// (CALIFORNIA_SIGNUP_OPEN in lib/plans.ts). Not indexed: ads only. No testimonials, customer counts,
// competitor names or competitor prices. Reviewed by a two-model council (Claude Opus, GPT Sol).
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
const buttonOnWhite = `${buttonBase} focus-visible:ring-primary`;
const terms = `No subscription charge for ${FREE_DAYS} days, then $${CA_RATE} per attorney a month. Card required; cancel any time by email or phone. Court, Tyler and card fees apply to filings.`;
const link = "font-medium text-primary underline underline-offset-2";
const nowrap = (s: string) => <span className="whitespace-nowrap">{s}</span>;

// What the California product does today (all of it in the app on staging). One sentence each.
const FEATURES: { title: string; body: string }[] = [
  { title: "No Courtpath fee per filing", body: "Unlimited filings in supported eFileCA courts for one monthly price per attorney, with nothing added for e-service." },
  { title: "Fees before you submit", body: "The court, e-filing, service and card fees are itemized for each envelope, so you see the total before it goes." },
  { title: "PDFs checked before the clerk sees them", body: "Each PDF's format, size and page count are checked against the court's limits before you submit." },
  { title: "Serve with the filing", body: "Add opposing counsel and e-serve them with the filing, where permitted." },
  { title: "Status, conformed copies, fixes", body: "Emails when the clerk accepts or returns a filing, conformed copies saved with the case, and fix and resubmit for returned filings." },
  { title: "Costs by case", body: "A monthly report of each case's share of the subscription and its fees, to download for client billing as your fee agreement allows." },
];

const STEPS: [string, string][] = [
  ["Create your account", `Name, State Bar number (SBN) and a card. No subscription charge for your first ${FREE_DAYS} days.`],
  ["Link your eFileCA login", "Use the login you already have, or create one from Courtpath."],
  ["File into your cases", "Find an existing case by party name and file into it, or open a new one."],
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which courts?",
    a: (
      <>
        California superior courts on eFileCA, Tyler Technologies&apos; e-filing system. Los Angeles civil uses a different system and isn&apos;t covered.
        Ask about your county at <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a>.
      </>
    ),
  },
  {
    q: "What do I still pay when I file?",
    a: "The court's filing fee, the e-filing fees and the card convenience fee, passed through at cost with no markup and shown before you submit. Courtpath's own fee per filing is $0.",
  },
  {
    q: "Can I cancel?",
    a: (
      <>
        Any time, by email at <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a> or by phone at{" "}
        <a href={`tel:${CONTACT.phoneE164}`} className={link}>{CONTACT.phoneDisplay}</a>. Cancel within the first {FREE_DAYS} days and you&apos;re
        not charged for the subscription.
      </>
    ),
  },
  {
    q: "Who is Courtpath?",
    a: (
      <>
        An e-filing service provider based in {CONTACT.city}, Utah,{" "}
        <a href={UTAH_EFSP_LIST_URL} target="_blank" rel="noopener noreferrer" className={link}>certified by the Utah State Courts</a> since 2019 and
        launching in California on eFileCA.
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
        {/* HERO: what it is, the price and the free month in three lines, beside the product */}
        <section className="bg-primary-dark text-white">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 pb-16 pt-6 sm:px-6 sm:pt-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14 lg:px-8 lg:pb-20">
            <div>
              <p className="text-sm font-medium text-white/75">California {nowrap("e-filing")} for superior courts on eFileCA</p>
              <h1 className={`${serif.className} mt-4 text-balance text-[2.125rem] leading-[1.1] sm:text-[3.1rem] lg:text-[2.75rem]`}>
                Stop paying a provider fee on every California filing.
              </h1>
              <p className="mt-5 text-xl font-semibold text-accent-light">${CA_RATE} per attorney a month. {nowrap(`First ${FREE_DAYS} days free.`)}</p>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
                Unlimited {nowrap("e-filing")}, with {nowrap("e-service")} where permitted, and your staff file at no extra cost. Court, Tyler and card
                fees pass through at cost; Courtpath adds nothing per filing.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={SIGNUP} className={buttonOnNavy}>Start your free month</a>
                <a href={PRICING} className="text-sm font-medium text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  See pricing and fees
                </a>
              </div>
              <p className="mt-3 max-w-md text-sm text-white/60">{terms}</p>
              <p className="mt-2 max-w-md text-sm text-white/60">
                Los Angeles civil isn&apos;t covered.{" "}
                <a href={`${PRICING}#courts`} className="underline decoration-white/30 underline-offset-2 hover:decoration-white">Court coverage</a>
              </p>
              <p className="mt-8 border-t border-white/15 pt-5 text-sm text-white/70">
                <a href={UTAH_EFSP_LIST_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  Certified by the Utah State Courts
                </a>{" "}
                for {nowrap("e-filing")} since 2019, and launching in California on eFileCA, Tyler Technologies&apos; {nowrap("e-filing")} system.
              </p>
            </div>
            <FilingWindow />
          </div>
        </section>

        {/* SWITCHING: answer "can I use this for my current cases?" right away */}
        <section className="border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <h2 className={`${serif.className} max-w-2xl text-balance text-3xl sm:text-4xl text-slate-900`}>Switching takes three steps</h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Your cases already live in the court&apos;s system, so you can find them in Courtpath and file into them. Keep your current service while you try it.
            </p>
            <ol className="mt-10 grid gap-8 sm:grid-cols-3">
              {STEPS.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{title}</p>
                    <p className="mt-1 text-slate-600">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} max-w-2xl text-balance text-3xl sm:text-4xl text-slate-900`}>What ${CA_RATE} per attorney a month covers</h2>
            <dl className="mt-8 grid gap-x-12 gap-y-6 sm:mt-12 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="border-t-2 border-primary-dark pt-4">
                  <dt className="font-semibold text-slate-900">{f.title}</dt>
                  <dd className="mt-2 leading-relaxed text-slate-600">{f.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* SAVINGS */}
        <section id="savings" className="scroll-mt-20 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} max-w-2xl text-balance text-3xl sm:text-4xl text-slate-900`}>What do per-filing fees cost you?</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Compare using your current service&apos;s fee and your monthly filings.</p>
            <div className="mt-10">
              <CaliforniaSavings signupHref={SIGNUP} />
            </div>
          </div>
        </section>

        {/* PRICE */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:px-8">
            <div>
              <p className="text-slate-900">
                <span className={`${serif.className} text-5xl`}>${CA_RATE}</span>
                <span className="ml-2 text-lg">per attorney a month</span>
              </p>
              <p className="mt-3 max-w-xl text-slate-600">
                Unlimited filings, {nowrap("e-service")} where permitted, and paralegals and staff at no extra cost. First {FREE_DAYS} days free.
              </p>
            </div>
            <div className="lg:text-right">
              <a href={SIGNUP} className={buttonOnWhite}>Start your free month</a>
              <p className="mt-3 text-sm">
                <a href={PRICING} className={link}>Full pricing, fees and answers</a>
              </p>
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
              More on fees, fee waivers, client billing and the free month: <a href={PRICING} className={link}>California pricing and FAQ</a>.
            </p>
          </div>
        </section>

        {/* CLOSING */}
        <section className="bg-primary-dark text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-8">
            <div>
              <h2 className={`${serif.className} text-balance text-3xl sm:text-4xl`}>Try unlimited California {nowrap("e-filing")} free for {FREE_DAYS} days.</h2>
              <p className="mt-3 max-w-xl text-white/70">{terms}</p>
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
