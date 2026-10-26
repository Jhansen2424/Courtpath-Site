import Link from "next/link";
import Navbar from "@/components/Navbar";
import PricingPlans from "@/components/PricingPlans";
import PhoneLink from "@/components/PhoneLink";
import Footer from "@/components/Footer";
import { pageMetadata, UTAH_EFSP_LIST_URL, CONTACT } from "@/lib/site";

// Paid-traffic landing page (Google Ads search + display). Offer-first: the
// free-until-2027 launch special leads, certification follows. Excluded from
// search indexing so it never competes with the homepage for organic queries.
export const metadata = {
  ...pageMetadata({
    title: "Free Utah E-Filing Until 2027 | Courtpath",
    description:
      "Every Courtpath plan is free until January 1, 2027. Certified Utah e-filing for district and justice courts. Sign up in minutes and stop paying to file.",
    path: "/free-until-2027",
  }),
  robots: { index: false, follow: false },
};

const VALUE_PROPS = [
  {
    title: "Actually free. Every plan.",
    body: "No per-filing fees and no monthly license until January 1, 2027. A card is required at signup, nothing is charged before then, and pricing starts at just $4 a filing after that.",
  },
  {
    title: "Certified by the Utah State Courts",
    body: "Courtpath has been a certified Electronic Filing Service Provider for Utah district and justice courts since 2019. Verify us on the court's own provider list.",
  },
  {
    title: "Your cases, already there",
    body: "Courtpath connects to the court's system, so your existing cases and filed documents are at your fingertips the moment you log in. Nothing to migrate.",
  },
  {
    title: "Built for the people who file",
    body: "A guided filing wizard, real-time validation, auto-saved drafts, and electronic service — designed for attorneys and the paralegals who do the filing.",
  },
];

const STEPS = [
  { n: "1", title: "Pick a plan", body: "All of them are free until January 1, 2027. Most firms choose Gold." },
  { n: "2", title: "Create your account", body: "A few minutes with your firm and bar details, plus a card for when billing starts January 1, 2027." },
  { n: "3", title: "File today", body: "District and justice courts, with electronic service included." },
];

export default function FreeUntil2027Page() {
  return (
    <main>
      <Navbar />

      {/* HERO — offer first */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/30 to-primary-light/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/20 to-accent-light/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent-light font-medium">
                Launch special — ends January 1, 2027
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Utah E-Filing.
              <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                Free Until 2027.
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-white/60 mb-6 leading-relaxed">
              Stop paying to file. Every Courtpath plan — solo to multi-attorney
              firm — is free until January 1, 2027. A card is required at signup;
              nothing is charged before then. After that, pricing starts at just
              $4 a filing.
            </p>

            <p className="max-w-2xl text-sm sm:text-base text-white/70 mb-10">
              Certified by the{" "}
              <a
                href={UTAH_EFSP_LIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light underline decoration-accent-light/40 hover:decoration-accent-light transition-colors"
              >
                Utah State Courts
              </a>{" "}
              for e-filing in district and justice courts since 2019.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <a
                href="#plans"
                className="px-8 py-4 bg-accent text-white font-medium rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,164,65,0.3)]"
              >
                Claim Your Free Plan
              </a>
              <Link
                href="/tutorials"
                className="px-8 py-4 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-all text-center"
              >
                Watch Demo
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-white/10">
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">500+</p>
                <p className="text-sm text-white/50">Law Firms</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">50K+</p>
                <p className="text-sm text-white/50">Filings</p>
              </div>
              <div className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">99.9%</p>
                <p className="text-sm text-white/50">Uptime</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent opacity-10" />
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {VALUE_PROPS.map((v) => (
              <div
                key={v.title}
                className="p-8 rounded-2xl border border-gray-200 bg-gray-50 hover:border-accent/50 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">
            Filing by this afternoon
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white text-xl font-bold">
                  {s.n}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLANS — the conversion section */}
      <div id="plans">
        <PricingPlans />
      </div>

      {/* QUESTIONS */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Questions before you switch?
          </h2>
          <p className="text-gray-600 mb-6">
            Call us at{" "}
            <PhoneLink href={`tel:${CONTACT.phoneE164}`} location="lp-free-until-2027" className="font-semibold text-accent hover:underline">
              {CONTACT.phoneDisplay}
            </PhoneLink>{" "}
            or email{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold text-accent hover:underline">
              {CONTACT.email}
            </a>
            . A real person answers.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
