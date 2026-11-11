"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PhoneLink from "@/components/PhoneLink";
import { APP_LOGIN_URL, CONTACT } from "@/lib/site";
import { track } from "@/lib/analytics";
import {
  BAR_STATES, BASIC_FILINGS, CALIFORNIA_SIGNUP_OPEN, CA_RATE, FIRM_RATE, LEGACY_PLANS, PLANS, SITE_DEMO, billingKeyFor, formatDate,
  freeUntil, isPublicPlan, type BarState, type PublicPlan,
} from "@/lib/plans";

// What each plan's summary card lists under the price.
const PLAN_POINTS: Record<PublicPlan, { description: string; points: string[] }> = {
  basic: {
    description: `For occasional filers. ${BASIC_FILINGS} filings a month are included; extra filings are $4 each.`,
    points: [`${BASIC_FILINGS} filings a month`, "$4 for each extra filing", "E-filing in every Utah district and justice court", "Electronic service", "One user"],
  },
  "criminal-defense": {
    description: "For criminal defense attorneys. Your most common filings are included; everything else is $4 a filing.",
    points: [
      "Unlimited Appearances of Counsel and Notices of Limited Appearance",
      "Unlimited Requests for Discovery",
      "Unlimited Entries of Plea",
      "$4 per filing for everything else",
    ],
  },
  unlimited: {
    description: "Unlimited filings for one attorney, and your staff can file for you.",
    points: ["Unlimited filings, no per-filing fee", "Paralegals and staff file under your account", "Electronic service", "Case history and documents"],
  },
  firm: {
    description: "One account for the whole office, priced per attorney.",
    points: ["Unlimited filings for every attorney", "Admin controls to add and remove users", "The firm's filings and court notices in one place"],
  },
  california: {
    description: "Unlimited California e-filing for each attorney, with no Courtpath fee on any filing.",
    points: [
      "Unlimited filings in California's Tyler (eFileCA) courts",
      "Electronic service included",
      "No Courtpath fee per filing",
      "Court and Tyler fees at cost, shown before you file",
      "A monthly cost-by-case report to bill your clients",
      "Paralegals and staff file under your account",
    ],
  },
};

const STEPS = ["Your account", "Bar number", "Card"];

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bar: string;
  teamName: string;
  attorneyCount: string;
}

// Sign-up is a focused page: logo, help and log in only, no site menu, so nothing pulls people away.
function SignupHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="relative w-36 h-10 shrink-0" aria-label="Courtpath home">
          <Image src="/images/courtlogo.png" alt="Courtpath" fill className="object-contain object-left" sizes="144px" priority />
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <PhoneLink href={`tel:${CONTACT.phoneE164}`} location="signup" className="hidden sm:inline text-gray-500 hover:text-accent-text">
            Questions? {CONTACT.phoneDisplay}
          </PhoneLink>
          <a href={APP_LOGIN_URL} className="text-gray-600 whitespace-nowrap">
            Have an account? <span className="font-semibold text-accent-text hover:underline">Log in</span>
          </a>
        </div>
      </div>
    </header>
  );
}

export default function SignupPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: planParam } = use(params);
  const router = useRouter();
  const key = planParam.toLowerCase();
  const legacy = LEGACY_PLANS[key];
  const plan: PublicPlan | null = isPublicPlan(key) ? key : null;

  const [step, setStep] = useState(0);
  const [yearly, setYearly] = useState(false);
  // Where the attorney files. California has its own plan; Utah keeps the plan they came in on.
  const [barState, setBarState] = useState<BarState>(plan === "california" && CALIFORNIA_SIGNUP_OPEN ? "CA" : "UT");
  const [caAttorneyCount, setCaAttorneyCount] = useState("1");
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", password: "", bar: "", teamName: "", attorneyCount: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  // Preview copies stop before the card: this explains what the live site does next.
  const [demoNote, setDemoNote] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fire signup_start once, on the first field the visitor touches.
  const started = useRef(false);

  // Old plan links (/signup/silver) move to the plan that replaced them.
  useEffect(() => {
    if (legacy) router.replace(`/signup/${legacy.plan}${legacy.yearly ? "?billing=yearly" : ""}`);
  }, [legacy, router]);

  useEffect(() => {
    const q = new URL(window.location.href).searchParams;
    if (q.get("billing") === "yearly") setYearly(true);
    // Back from Stripe without finishing: say so (nothing was charged and no account was made).
    if (q.get("canceled")) setError("Checkout was cancelled, so no account was created. Fill this in again and add a card to finish signing up.");
  }, []);

  // A new step, or an error, shows from the top of the form, not wherever the last button was.
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const top = cardRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 120) window.scrollTo({ top: window.scrollY + top - 120, behavior: "smooth" });
  }, [step, error]);

  if (legacy) return <main id="main-content" className="min-h-screen" />;

  if (!plan) {
    return (
      <main id="main-content">
        <SignupHeader />
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan not found</h1>
            <a href="/pricing" className="text-accent-text underline">See the plans</a>
          </div>
        </section>
      </main>
    );
  }

  // California's link before California sign-up is switched on: say when it opens instead of the form.
  if (plan === "california" && !CALIFORNIA_SIGNUP_OPEN) {
    return (
      <main id="main-content">
        <SignupHeader />
        <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
          <div className="max-w-lg text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">California is coming</h1>
            <p className="text-gray-600 mb-6">
              Courtpath is getting ready to file in California&apos;s Tyler (eFileCA) courts. California sign-up opens when we start filing there:
              ${CA_RATE} per attorney a month, unlimited filings, first month free.
            </p>
            <p className="text-gray-600 mb-8">
              Questions? Call <a href={`tel:${CONTACT.phoneE164}`} className="text-accent-text underline">{CONTACT.phoneDisplay}</a> or email{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-accent-text underline">{CONTACT.email}</a>.
            </p>
            <a href="/pricing" className="text-sm text-gray-500 hover:text-accent-text underline">Filing in Utah? See the Utah plans</a>
          </div>
        </section>
      </main>
    );
  }

  // The Utah plan this visit started on (Basic when it started on California), and the plan in force.
  const utahPlan: PublicPlan = plan === "california" ? "basic" : plan;
  const active: PublicPlan = barState === "CA" ? "california" : utahPlan;
  const ca = active === "california";
  const info = PLANS[active];
  const billingKey = billingKeyFor(active, yearly);
  const attorneys = Math.max(2, Math.floor(Number(form.attorneyCount) || 2));
  const caAttorneys = Math.min(500, Math.max(1, Math.floor(Number(caAttorneyCount) || 1)));
  const priceAfter =
    active === "firm" ? `$${FIRM_RATE} per attorney a month ($${FIRM_RATE * attorneys} a month for ${attorneys})`
    : ca ? `$${CA_RATE} per attorney a month${caAttorneys > 1 ? ` ($${CA_RATE * caAttorneys} a month for ${caAttorneys})` : ""}`
    : active === "unlimited" && yearly ? "$240 a year"
    : info.after;
  const until = freeUntil();
  const untilLong = formatDate(until);
  const untilShort = formatDate(until, "short");

  // Switching state keeps what was typed; the address changes so a reload or a shared link keeps the choice.
  const chooseState = (s: BarState) => {
    if (s === barState) return;
    setBarState(s);
    track("signup_state", { state: s });
    window.history.replaceState(window.history.state, "", `/signup/${s === "CA" ? "california" : utahPlan}${window.location.search}`);
  };

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // Steps 1 and 2 only move on when the browser's own checks pass (required, email, 8+ characters).
  const next = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    track("signup_step", { plan: billingKey, step: STEPS[Math.min(step + 1, 2)] });
    setStep((s) => Math.min(s + 1, 2));
  };

  const submit = async () => {
    setError(null);
    if (SITE_DEMO) {
      setDemoNote(true);
      return;
    }
    setSubmitting(true);
    track("begin_checkout", { plan: billingKey });
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, attorneyCount: active === "firm" ? String(attorneys) : ca ? String(caAttorneys) : "1", plan: billingKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const primaryButton =
    "flex-1 py-4 bg-accent hover:bg-accent-light text-primary-dark font-bold rounded-lg transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed";
  const backButton = "px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors";

  return (
    <main id="main-content">
      <SignupHeader />

      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href={ca ? "/california" : "/pricing"} className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent-text mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {ca ? "California pricing" : "Compare plans"}
          </a>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Plan summary (after the form on phones, so the form is on the first screen) */}
            <div className="lg:col-span-2 order-2 lg:order-none">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:sticky lg:top-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent-text text-xs font-semibold rounded-full uppercase tracking-wide">
                    {info.name} plan
                  </div>
                  {!ca && <a href="/pricing" className="text-sm text-gray-500 hover:text-accent-text underline">Change plan</a>}
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500 text-sm ml-2">today</span>
                </div>
                <p className="text-accent-text font-semibold text-sm mb-1">Free until {untilLong}</p>
                <p className="text-gray-600 text-sm mb-5">Then {priceAfter}</p>

                {active === "unlimited" && (
                  <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg mb-5 text-sm" role="group" aria-label="Billing">
                    {[{ label: "$25 a month", value: false }, { label: "$240 a year", value: true }].map((o) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setYearly(o.value)}
                        aria-pressed={yearly === o.value}
                        className={`py-2 rounded-md font-medium transition-colors ${yearly === o.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                )}

                <p className="text-gray-600 text-sm mb-5">{PLAN_POINTS[active].description}</p>
                <ul className="space-y-3">
                  {PLAN_POINTS[active].points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-accent-text mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-6">
                  {ca
                    ? "Court fees, Tyler's e-filing fee and the card fee are charged at cost by the court's payment system when the clerk accepts a filing."
                    : "Court filing fees are separate on every plan. You can switch plans anytime."}
                </p>
              </div>
            </div>

            {/* Sign-up steps */}
            <div className="lg:col-span-3 order-1 lg:order-none">
              <div ref={cardRef} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <ol className="flex items-center gap-2 mb-8" aria-label="Sign-up steps">
                  {STEPS.map((label, i) => (
                    <li key={label} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          i < step ? "bg-accent/15 text-accent-text" : i === step ? "bg-accent text-primary-dark" : "bg-gray-100 text-gray-400"
                        }`}
                        aria-current={i === step ? "step" : undefined}
                      >
                        {i < step ? "✓" : i + 1}
                      </span>
                      {/* Phones show only the current step's name, so the row fits. */}
                      <span className={`text-sm whitespace-nowrap ${i === step ? "font-semibold text-gray-900" : "hidden sm:inline text-gray-500"}`}>{label}</span>
                      {i < STEPS.length - 1 && <span className="flex-1 h-px bg-gray-200 min-w-4" />}
                    </li>
                  ))}
                </ol>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">{error}</div>
                )}

                {step === 0 && (
                  <form
                    onSubmit={next}
                    onFocus={() => {
                      if (started.current) return;
                      started.current = true;
                      track("signup_start", { plan: billingKey });
                    }}
                    className="space-y-5"
                  >
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Start your free month</h1>
                      <p className="text-gray-500 text-sm">Create your account. You&apos;ll add a card at the end, and nothing is charged today.</p>
                    </div>
                    {/* Shown once California sign-up is switched on (CALIFORNIA_SIGNUP_OPEN in lib/plans.ts). */}
                    {CALIFORNIA_SIGNUP_OPEN && <fieldset>
                      <legend className={labelClass}>Where do you file?</legend>
                      <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-lg text-sm">
                        {(Object.keys(BAR_STATES) as BarState[]).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => chooseState(s)}
                            aria-pressed={barState === s}
                            className={`py-2.5 rounded-md font-medium transition-colors ${barState === s ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                          >
                            {BAR_STATES[s].name}
                          </button>
                        ))}
                      </div>
                      {ca && (
                        <p className="text-xs text-gray-500 mt-2">
                          California is priced per attorney: ${CA_RATE} a month for unlimited filings in California&apos;s Tyler (eFileCA) courts.
                        </p>
                      )}
                    </fieldset>}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="firstName">First name</label>
                        <input id="firstName" type="text" required autoComplete="given-name" value={form.firstName} onChange={set("firstName")} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="lastName">Last name</label>
                        <input id="lastName" type="text" required autoComplete="family-name" value={form.lastName} onChange={set("lastName")} className={inputClass} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="email">Email</label>
                      <input id="email" type="email" required autoComplete="email" value={form.email} onChange={set("email")} className={inputClass} placeholder="jane@smithlaw.com" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="password">Password</label>
                      <input id="password" type="password" required minLength={8} autoComplete="new-password" value={form.password} onChange={set("password")} className={inputClass} />
                      <p className="text-xs text-gray-500 mt-1">At least 8 characters.</p>
                    </div>
                    <button type="submit" className={`w-full ${primaryButton}`}>Continue</button>
                  </form>
                )}

                {step === 1 && (
                  <form onSubmit={next} className="space-y-5">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your {BAR_STATES[barState].bar}</h1>
                      <p className="text-gray-500 text-sm">Your filings go to the court under this number.</p>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="bar">{BAR_STATES[barState].bar}</label>
                      <input id="bar" type="text" required value={form.bar} onChange={set("bar")} className={inputClass} placeholder="Numbers only" inputMode="numeric" pattern="[0-9]{1,10}" title="Numbers only" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="teamName">
                        Firm name {active !== "firm" && <span className="text-gray-400 font-normal">(optional)</span>}
                      </label>
                      <input id="teamName" type="text" required={active === "firm"} value={form.teamName} onChange={set("teamName")} className={inputClass} placeholder="Smith Law" />
                      {active !== "firm" && <p className="text-xs text-gray-500 mt-1">Leave it blank if you practice on your own.</p>}
                    </div>
                    {ca && (
                      <div>
                        <label className={labelClass} htmlFor="caAttorneyCount">Attorneys filing in California</label>
                        <input id="caAttorneyCount" type="number" required min={1} max={500} value={caAttorneyCount} onChange={(e) => setCaAttorneyCount(e.target.value)} className={inputClass} />
                        <p className="text-xs text-gray-500 mt-1">
                          ${CA_RATE} each a month{caAttorneys > 1 ? `: $${CA_RATE * caAttorneys} a month for ${caAttorneys} attorneys` : ""}. Paralegals and staff don&apos;t count.
                        </p>
                      </div>
                    )}
                    {active === "firm" && (
                      <div>
                        <label className={labelClass} htmlFor="attorneyCount">Number of attorneys</label>
                        <input id="attorneyCount" type="number" required min={2} max={500} value={form.attorneyCount} onChange={set("attorneyCount")} className={inputClass} />
                        <p className="text-xs text-gray-500 mt-1">${FIRM_RATE} each a month: ${FIRM_RATE * attorneys} a month for {attorneys} attorneys.</p>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(0)} className={backButton}>Back</button>
                      <button type="submit" className={primaryButton}>Continue</button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Add a card</h1>
                      <p className="text-gray-500 text-sm">$0 today. Nothing is charged until your free period ends on {untilLong}.</p>
                    </div>
                    <dl className="rounded-lg border border-gray-200 divide-y divide-gray-100 text-sm">
                      <div className="flex justify-between px-4 py-3">
                        <dt className="text-gray-600">Plan</dt>
                        <dd className="font-semibold text-gray-900">{info.name}{active === "unlimited" && yearly ? ", yearly" : ""}</dd>
                      </div>
                      {ca && (
                        <div className="flex justify-between px-4 py-3">
                          <dt className="text-gray-600">Attorneys</dt>
                          <dd className="font-semibold text-gray-900">{caAttorneys}</dd>
                        </div>
                      )}
                      <div className="flex justify-between px-4 py-3">
                        <dt className="text-gray-600">Due today</dt>
                        <dd className="font-semibold text-gray-900">$0.00</dd>
                      </div>
                      <div className="flex justify-between gap-4 px-4 py-3">
                        <dt className="text-gray-600 whitespace-nowrap">From {untilShort}</dt>
                        <dd className="font-semibold text-gray-900 text-right">{priceAfter}</dd>
                      </div>
                    </dl>
                    <p className="text-sm text-gray-500">
                      Next you&apos;ll enter your card on Stripe&apos;s secure page, then come straight back. Cancel before {untilShort} and you won&apos;t be charged.
                    </p>
                    {/* Links open in a new tab so the form keeps what was typed. */}
                    <p className="text-sm text-gray-500">
                      By creating an account you agree to the{" "}
                      <Link href="/terms" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">Terms of Service</Link>{" "}
                      and{" "}
                      <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2">Privacy Policy</Link>.
                    </p>
                    {demoNote && (
                      <div role="status" className="bg-amber-50 border border-amber-200 text-amber-900 rounded-lg px-4 py-3 text-sm">
                        This is a preview copy of the website, so it stops here. On courtpath.com the attorney now adds a card on
                        Stripe&apos;s secure page ($0 today) and comes straight back to Courtpath with the account ready
                        {ca ? " to file in California" : ""}.
                      </div>
                    )}
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setStep(1)} className={backButton} disabled={submitting}>Back</button>
                      <button type="button" onClick={submit} disabled={submitting} className={primaryButton}>
                        {submitting ? "Opening secure checkout..." : "Continue to add card"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
