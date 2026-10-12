import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { pageMetadata, UTAH_EFSP_LIST_URL, CONTACT } from "@/lib/site";

// Paid-traffic landing page for competitor-brand (conquest) searches. The
// visitor already uses an EFSP, so the page answers the switcher's three
// questions — cost, effort, and risk — rather than pitching e-filing itself.
// Excluded from search indexing; reached only via ads.
export const metadata = {
  ...pageMetadata({
    title: "Switch Your Utah E-Filing Provider | Courtpath",
    description:
      "Switching EFSPs takes minutes, not weeks. Courtpath is certified for Utah district and justice courts, your cases are already connected, and every plan is free until January 1, 2027.",
    path: "/switch",
  }),
  robots: { index: false, follow: false },
};

const SWITCH_FACTS = [
  {
    title: "Nothing to migrate",
    body: "Your cases live in the court's own system, not your provider's. Courtpath connects to them the moment you log in — every case, every filed document, already there.",
  },
  {
    title: "No contracts to break",
    body: "E-filing providers are pay-as-you-go. There is no lock-in on their side and none on ours — you can file through Courtpath today without cancelling anything first.",
  },
  {
    title: "Free while you compare",
    body: "Every Courtpath plan is free until January 1, 2027. Run us side-by-side with your current provider for as long as you like — switching costs you nothing.",
  },
  {
    title: "Same courts, same certification",
    body: "Courtpath has been certified by the Utah State Courts for district and justice court e-filing since 2019, with electronic service included on every plan.",
  },
];

const COMPARISON = [
  { them: "Per-filing or monthly fees, every month", us: "Free until January 1, 2027 — then from $4 a filing" },
  { them: "Interfaces designed years ago", us: "A guided wizard with real-time validation and auto-saved drafts" },
  { them: "One more login your staff tolerates", us: "Attorney + paralegal access designed around how firms actually file" },
  { them: "Support tickets", us: `A real person at ${"(801) 797-3119"}` },
];

export default function SwitchPage() {
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-accent/25 to-accent-light/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-primary/30 to-primary-light/15 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-white/70">
                Certified Utah EFSP since 2019 · Trusted by 500+ law firms
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Still paying to
              <span className="block bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                e-file in Utah?
              </span>
            </h1>

            <p className="max-w-2xl text-lg sm:text-xl text-white/60 mb-6 leading-relaxed">
              Switching e-filing providers takes minutes, not weeks. Your cases
              are already connected, there&apos;s nothing to migrate, and every
              Courtpath plan is free until January 1, 2027.
            </p>

            <p className="max-w-2xl text-sm sm:text-base text-white/70 mb-10">
              Verify our certification on the{" "}
              <a
                href={UTAH_EFSP_LIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-light underline decoration-accent-light/40 hover:decoration-accent-light transition-colors"
              >
                Utah State Courts provider list
              </a>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing"
                className="px-8 py-4 bg-accent text-white font-medium rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,164,65,0.3)]"
              >
                See Free Plans
              </Link>
              <Link
                href="/tutorials"
                className="px-8 py-4 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-all text-center"
              >
                Watch a 2-Minute Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE SWITCHER'S QUESTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            What switching actually involves
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Short version: almost nothing. E-filing runs through the court&apos;s
            system — your provider is just the door you walk through.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            {SWITCH_FACTS.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-2xl border border-gray-200 bg-gray-50 hover:border-accent/50 hover:shadow-lg transition-all"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
            Your current setup vs. Courtpath
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid sm:grid-cols-2 ${i > 0 ? "border-t border-gray-200" : ""}`}
              >
                <div className="p-6 text-gray-500 text-sm sm:text-base bg-gray-50/60">
                  {row.them}
                </div>
                <div className="p-6 text-gray-900 font-medium text-sm sm:text-base">
                  {row.us}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            Launch pricing: all plans free through January 1, 2027. Standard pricing published on our pricing page.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Try it on your next filing
          </h2>
          <p className="text-white/60 mb-8 text-lg">
            Keep your current provider as long as you like. File one document
            through Courtpath — free — and see which one your staff asks for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-accent text-white font-medium rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(212,164,65,0.3)]"
            >
              Start Free — No Card Required
            </Link>
            <a
              href={`tel:${CONTACT.phoneE164}`}
              className="px-8 py-4 text-white font-medium rounded-lg border border-white/20 hover:bg-white/5 transition-all"
            >
              Talk to Us: {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
