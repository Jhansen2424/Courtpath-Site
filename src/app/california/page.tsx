import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Source_Serif_4 } from "next/font/google";
import PhoneLink from "@/components/PhoneLink";
import PrivacyChoicesLink from "@/components/PrivacyChoicesLink";
import CaliforniaSavings from "@/components/CaliforniaSavings";
import FeeSheet from "@/components/california/FeeSheet";
import CaseCostSheet from "@/components/california/CaseCostSheet";
import { CALIFORNIA_SIGNUP_OPEN, CA_RATE, FREE_DAYS } from "@/lib/plans";
import { APP_LOGIN_URL, CONTACT, UTAH_EFSP_LIST_URL, pageMetadata } from "@/lib/site";

// California landing page. Off on courtpath.com until California filing goes live, on in preview
// copies (CALIFORNIA_SIGNUP_OPEN in lib/plans.ts). Pricing per Devin's proposal (Nov 2026): one
// price per attorney, unlimited filings and e-service, no Courtpath fee per filing; court fees,
// Tyler's fees and the card fee passed through at cost. No claims about other providers: the
// savings calculator uses the visitor's own fee. Reviewed in two rounds by a two-model council
// (Claude Opus, GPT Sol).

// Headlines in a serif, the voice of a court document (a deliberate choice for this page; the rest of
// the site, sign-up included, is the system sans).
const serif = Source_Serif_4({ subsets: ["latin"], weight: ["600"], display: "swap" });

const SIGNUP = "/signup/california";

// While California is switched off the page is a 404, so it carries no title or description either.
const base = pageMetadata({
  title: "California E-Filing: $175 per Attorney a Month | Courtpath",
  description:
    "Unlimited e-filing and e-service in California superior courts on Tyler's eFileCA system for $175 per attorney a month, with no Courtpath fee per filing. Court, Tyler and card fees at cost. First 30 days free.",
  path: "/california",
});
// The share card is California's own (california/opengraph-image.tsx), not the site's Utah one.
const shareImage = { url: "/california/opengraph-image", width: 1200, height: 630, alt: "Courtpath: unlimited California e-filing for $175 per attorney a month" };
export const metadata = CALIFORNIA_SIGNUP_OPEN
  ? { ...base, openGraph: { ...base.openGraph, images: [shareImage] }, twitter: { ...base.twitter, images: [shareImage.url] } }
  : { robots: { index: false, follow: false } };

const buttonBase = "inline-block rounded-md bg-accent px-6 py-3 font-semibold text-primary-dark hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const buttonOnNavy = `${buttonBase} focus-visible:ring-white focus-visible:ring-offset-primary-dark`;
const buttonOnWhite = `${buttonBase} focus-visible:ring-primary`;
const terms = `No subscription charge for ${FREE_DAYS} days, then $${CA_RATE} per attorney a month. Card required. Court, Tyler and card fees apply to filings.`;
const link = "font-medium text-primary underline underline-offset-2";

const INCLUDED = [
  "Unlimited filings in California superior courts on eFileCA",
  "Electronic service included where permitted",
  "Paralegals and staff file for you at no extra cost",
  "The monthly Costs by case report",
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "Which courts can I file in?",
    a: (
      <>
        Superior courts that use Tyler&apos;s eFileCA system. Los Angeles civil isn&apos;t covered: it uses a different e-filing system.
        We&apos;re confirming the court list with Tyler ahead of launch; email <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a> to
        ask about your county.
      </>
    ),
  },
  {
    q: "What do I still pay when I file?",
    a: "The court's filing fee, the e-filing and service fees for the envelope, and the card convenience fee. Each is passed through at cost with no markup, shown before you submit, and settled when the clerk accepts the filing. eCheck accounts work too.",
  },
  {
    q: "What if the clerk returns a filing?",
    a: "Fees are settled when the clerk accepts a filing. Tyler places a temporary hold on your card when you submit; if the clerk returns the filing, the hold is released and nothing is charged. Fix it and resubmit from Courtpath.",
  },
  {
    q: "Can I file under a fee waiver?",
    a: "Yes. If the court has granted the party a fee waiver, choose a fee-waiver payment account at checkout; the court still reviews it. Courtpath charges nothing per filing either way, and fee-waiver filings take no share of your subscription in the Costs by case report.",
  },
  {
    q: "Who counts as an attorney?",
    a: "Each attorney whose name and State Bar number go on filings sent through Courtpath. Paralegals and staff who file for them don't count.",
  },
  {
    q: "Can I bill clients for it?",
    a: "The Costs by case report splits your subscription across your cases by filing count, with no markup, and lists each case's court, Tyler and card fees. Fee-waiver filings take no share. Whether you pass any of it to clients is up to your fee agreement and your professional obligations.",
  },
  {
    q: `What happens after the first ${FREE_DAYS} days?`,
    a: (
      <>
        Your card is charged ${CA_RATE} per attorney on day {FREE_DAYS + 1} unless you cancel. Cancel any time by email at{" "}
        <a href={`mailto:${CONTACT.email}`} className={link}>{CONTACT.email}</a> or by phone at{" "}
        <a href={`tel:${CONTACT.phoneE164}`} className={link}>{CONTACT.phoneDisplay}</a>; cancel before day {FREE_DAYS + 1} and you aren&apos;t charged
        for the subscription.
      </>
    ),
  },
  {
    q: "Who is Courtpath?",
    a: (
      <>
        Courtpath Incorporated, {CONTACT.street}, {CONTACT.city}, Utah. We&apos;ve been{" "}
        <a href={UTAH_EFSP_LIST_URL} target="_blank" rel="noopener noreferrer" className={link}>certified by the Utah State Courts</a>{" "}
        for e-filing since 2019, and we&apos;re bringing the same service to California.
      </>
    ),
  },
];

const STEPS: [string, string][] = [
  ["Create your account", "Your name, State Bar number (SBN) and a card. $0 today."],
  ["Link your eFileCA login", "Use the eFileCA login you have, or create one from Courtpath."],
  ["File and serve", "Unlimited filings, with e-service where permitted, from the first day."],
];

function Check({ className = "text-accent" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className={`mt-1 h-4 w-4 shrink-0 ${className}`}>
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function CaliforniaPage() {
  if (!CALIFORNIA_SIGNUP_OPEN) notFound();

  return (
    <>
      {/* A focused header: this page signs up California attorneys, so no Utah plans or menus. */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="relative h-9 w-32 shrink-0" aria-label="Courtpath home">
            <Image src="/images/courtlogo.png" alt="Courtpath" fill className="object-contain object-left" sizes="128px" priority />
          </Link>
          <nav aria-label="Account" className="flex items-center gap-4 sm:gap-6 text-sm">
            <a href={APP_LOGIN_URL} className="text-slate-600 hover:text-primary">Log in</a>
            <a href={SIGNUP} className="rounded-md bg-accent px-3.5 py-2 font-semibold text-primary-dark hover:bg-accent-light">
              <span className="sm:hidden">Start free</span>
              <span className="hidden sm:inline">Start your free month</span>
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="bg-white text-slate-800">
        {/* HERO: the offer beside an example filing's fees, Courtpath's line at $0.00 */}
        <section className="bg-primary-dark text-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:px-8">
            <div>
              <p className="text-sm text-white/70">For California superior courts on Tyler&apos;s eFileCA system</p>
              <h1 className={`${serif.className} mt-4 text-balance text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem]`}>
                Unlimited California <span className="whitespace-nowrap">e-filing,</span> ${CA_RATE} per attorney a month.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                E-service included where permitted. The court&apos;s fee, the e-filing and service fees and the card convenience fee pass
                through at cost, and you see the total before you submit.
              </p>
              <ul className="mt-6 space-y-2 text-white/90">
                <li className="flex gap-3"><Check />$0 Courtpath fee on every filing and e-service</li>
                <li className="flex gap-3"><Check />Paralegals and staff at no extra cost</li>
                <li className="flex gap-3"><Check />A monthly Costs by case report for client billing</li>
              </ul>
              <div className="mt-8">
                <a href={SIGNUP} className={buttonOnNavy}>Start your free month</a>
                <p className="mt-3 max-w-md text-sm text-white/60">{terms}</p>
              </div>
              <p className="mt-8 border-t border-white/15 pt-5 text-sm text-white/70">
                <a href={UTAH_EFSP_LIST_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-2 hover:decoration-white">
                  Certified by the Utah State Courts
                </a>{" "}
                for e-filing since 2019.
              </p>
            </div>
            <FeeSheet serifClass={serif.className} />
          </div>
        </section>

        {/* CALCULATOR */}
        <section id="savings" className="scroll-mt-4 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} max-w-2xl text-balance text-3xl sm:text-4xl text-slate-900`}>What per-filing fees cost you</h2>
            <p className="mt-3 max-w-2xl text-slate-600">Use your own numbers. We don&apos;t guess what your e-filing service charges.</p>
            <div className="mt-10">
              <CaliforniaSavings signupHref={SIGNUP} />
            </div>
          </div>
        </section>

        {/* CLIENT BILLING */}
        <section className="border-b border-slate-200">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-12 lg:px-8">
            <div>
              <h2 className={`${serif.className} text-balance text-3xl sm:text-4xl text-slate-900`}>See what each case cost</h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Each month the Costs by case report splits your subscription across your cases by filing count, with no markup,
                and adds each case&apos;s court, Tyler and card fees. Fee-waiver filings take no share. Download it to support
                client billing, as your fee agreement allows.
              </p>
            </div>
            <CaseCostSheet />
          </div>
        </section>

        {/* THE PLAN */}
        <section id="pricing" className="scroll-mt-4 border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} text-balance text-3xl sm:text-4xl text-slate-900`}>One plan. No Courtpath fee per filing.</h2>
            <div className="mt-10 grid overflow-hidden rounded-lg border border-slate-200 bg-white lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="border-b border-slate-200 p-7 sm:p-8 lg:border-b-0 lg:border-r">
                <p className="font-semibold text-slate-900">California Unlimited</p>
                <p className="mt-3 text-slate-900"><span className="text-4xl font-semibold tabular-nums">${CA_RATE}</span> per attorney a month</p>
                <p className="mt-1 text-sm text-slate-600">First {FREE_DAYS} days free. Card required.</p>
                <a href={SIGNUP} className={`${buttonOnWhite} mt-6`}>Start your free month</a>
              </div>
              <div className="grid gap-8 p-7 sm:grid-cols-2 sm:p-8">
                <div>
                  <p className="font-medium text-slate-900">Included</p>
                  <ul className="mt-3 space-y-2 text-slate-700">
                    {INCLUDED.map((i) => <li key={i} className="flex gap-3"><Check className="text-primary" />{i}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-slate-900">Passed through at cost, shown before you submit</p>
                  <ul className="mt-3 space-y-3 text-slate-700">
                    <li>The court&apos;s filing fee, set by the court</li>
                    <li>E-filing and service fees for each envelope, set by Tyler and the court</li>
                    <li>The card convenience fee, charged by Tyler&apos;s payment processor (eCheck accounts work too)</li>
                  </ul>
                </div>
              </div>
            </div>
            <ol className="mt-10 grid gap-6 sm:grid-cols-3">
              {STEPS.map(([title, body], i) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-dark text-sm font-semibold text-white">{i + 1}</span>
                  <div>
                    <p className="font-medium text-slate-900">{title}</p>
                    <p className="mt-1 text-sm text-slate-600">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* QUESTIONS */}
        <section id="faq" className="scroll-mt-4">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <h2 className={`${serif.className} text-3xl sm:text-4xl text-slate-900`}>Before you start</h2>
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
          </div>
        </section>

        {/* CLOSING */}
        <section className="bg-primary-dark text-white">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-8">
            <div>
              <h2 className={`${serif.className} text-balance text-3xl sm:text-4xl`}>Try a month of unlimited California filing.</h2>
              <p className="mt-3 max-w-xl text-white/70">{terms}</p>
            </div>
            <div className="mt-8 shrink-0 lg:mt-0 lg:text-right">
              <a href={SIGNUP} className={buttonOnNavy}>Start your free month</a>
              <p className="mt-3 text-sm text-white/70">
                Questions?{" "}
                <PhoneLink href={`tel:${CONTACT.phoneE164}`} location="lp-california" className="text-white underline decoration-white/30 underline-offset-2">{CONTACT.phoneDisplay}</PhoneLink>{" "}
                or <a href={`mailto:${CONTACT.email}`} className="text-white underline decoration-white/30 underline-offset-2">{CONTACT.email}</a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* A short footer: who we are and the legal links, without the site's Utah menus */}
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
