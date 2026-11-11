import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PhoneLink from "@/components/PhoneLink";
import CaliforniaSavings from "@/components/CaliforniaSavings";
import { CALIFORNIA_SIGNUP_OPEN, CA_RATE, FREE_DAYS } from "@/lib/plans";
import { CONTACT, pageMetadata } from "@/lib/site";

// California landing page. Off on courtpath.com until California filing goes live, on in preview
// copies (CALIFORNIA_SIGNUP_OPEN in lib/plans.ts). Pricing per Devin's proposal (Nov 2026): one
// flat price per attorney, unlimited filings, no Courtpath fee per filing, court and Tyler fees at
// cost. No figures about other providers: the savings calculator uses the visitor's own fee.
// While California is switched off the page is a 404, so it carries no title or description either.
export const metadata = CALIFORNIA_SIGNUP_OPEN
  ? pageMetadata({
      title: "California E-Filing: $175 per Attorney, Unlimited Filings | Courtpath",
      description:
        "E-file in California's Tyler (eFileCA) courts for one flat price: $175 per attorney a month, unlimited filings and e-service, no fee per filing. Court and Tyler fees at cost. First month free.",
      path: "/california",
    })
  : { robots: { index: false, follow: false } };

const SIGNUP = "/signup/california";

const VALUE_PROPS = [
  {
    title: "No fee on any filing",
    body: "Per-filing services charge you on every envelope. Courtpath doesn't: one monthly price per attorney, and you file as much as your cases need.",
  },
  {
    title: "Fees at cost, shown before you file",
    body: "The court's fee, Tyler's e-filing fee and the card fee are charged at cost by the court's payment system, and you see the total before you submit.",
  },
  {
    title: "Bill each client their share",
    body: "A monthly cost-by-case report splits your subscription across your cases by filing count and adds each case's court and Tyler fees, ready to export.",
  },
  {
    title: "Your staff files too",
    body: "Paralegals and staff file under your account at no extra cost, and electronic service is included.",
  },
];

const STEPS = [
  { n: "1", title: "Create your account", body: "Your name, California State Bar number and a card. You pay $0 today." },
  { n: "2", title: "Connect your e-filing login", body: "Link your Odyssey eFileCA login, or create one from Courtpath." },
  { n: "3", title: "File and serve", body: `Unlimited filings and e-service. Your first ${FREE_DAYS} days are free.` },
];

const FEES = [
  { item: "Courtpath subscription", cost: `$${CA_RATE} per attorney a month`, note: "Unlimited filings and e-service" },
  { item: "Courtpath fee per filing", cost: "$0", note: "On every filing, every month" },
  { item: "Court filing fees", cost: "At cost", note: "Set by the court; the same with any provider" },
  { item: "Tyler e-filing fee", cost: "At cost", note: "Per envelope, set by Tyler" },
  { item: "Card processing", cost: "At cost", note: "Charged by the court's payment system" },
];

const FAQ = [
  {
    q: "Which courts?",
    a: "California courts that e-file through Tyler Technologies' Odyssey eFileCA. Courts on other e-filing systems aren't covered yet.",
  },
  {
    q: "Is it really unlimited?",
    a: `Yes. Each attorney's $${CA_RATE} a month covers every filing and e-service, however many your cases need.`,
  },
  {
    q: "What about fee waivers?",
    a: "Courtpath charges nothing on a filing, and the court and Tyler waive their fees for a party with a court fee waiver.",
  },
  {
    q: "Can I cancel?",
    a: `Anytime. Your first ${FREE_DAYS} days are free, and nothing is charged before then.`,
  },
];

export default function CaliforniaPage() {
  if (!CALIFORNIA_SIGNUP_OPEN) notFound();

  return (
    <main id="main-content">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-primary/30 to-primary-light/20 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-accent/20 to-accent-light/10 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-sm text-accent-light font-medium">California e-filing, {FREE_DAYS} days free</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              California E-Filing.
              <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                One Flat Price.
              </span>
            </h1>
            <p className="max-w-2xl text-lg sm:text-xl text-white/60 mb-10 leading-relaxed">
              Unlimited filings and e-service in California&apos;s Tyler (eFileCA) courts for ${CA_RATE} per attorney a month.
              No Courtpath fee on any filing. Court and Tyler fees at cost.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={SIGNUP}
                className="px-8 py-4 bg-accent text-primary-dark font-medium rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,164,65,0.3)]"
              >
                Start Your Free Month
              </a>
              <a href="#savings" className="px-8 py-4 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-all text-center">
                See what you&apos;d save
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            {VALUE_PROPS.map((v) => (
              <div key={v.title} className="p-8 rounded-2xl border border-gray-200 bg-gray-50 hover:border-accent/50 hover:shadow-lg transition-all">
                <h2 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h2>
                <p className="text-gray-600 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVINGS */}
      <section id="savings" className="py-20 bg-gray-50 border-y border-gray-200 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">What you&apos;d pay</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Put in your attorneys, your filings and what your current service charges per filing.
          </p>
          <CaliforniaSavings />
        </div>
      </section>

      {/* PRICE AND FEES */}
      <section id="fees" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Every cost, up front</h2>
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-100">
                {FEES.map((f) => (
                  <tr key={f.item}>
                    <th scope="row" className="px-6 py-4 font-semibold text-gray-900 align-top">{f.item}</th>
                    <td className="px-6 py-4 align-top">
                      <span className="font-bold text-gray-900">{f.cost}</span>
                      <span className="block text-sm text-gray-500">{f.note}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12">Getting started</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-dark text-xl font-bold">{s.n}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href={SIGNUP} className="inline-block px-8 py-4 bg-accent hover:bg-accent-light text-primary-dark font-bold rounded-lg transition-all hover:shadow-lg">
              Start Your Free Month
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Questions</h2>
          <dl className="space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-gray-100 pb-6">
                <dt className="font-semibold text-gray-900 mb-2">{f.q}</dt>
                <dd className="text-gray-600 leading-relaxed">{f.a}</dd>
              </div>
            ))}
          </dl>
          <p className="text-gray-600 text-center mt-10">
            Something else? Call{" "}
            <PhoneLink href={`tel:${CONTACT.phoneE164}`} location="lp-california" className="font-semibold text-accent-text hover:underline">
              {CONTACT.phoneDisplay}
            </PhoneLink>{" "}
            or email{" "}
            <a href={`mailto:${CONTACT.email}`} className="font-semibold text-accent-text hover:underline">{CONTACT.email}</a>.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
