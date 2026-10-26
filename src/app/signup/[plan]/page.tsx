"use client";

import { use, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { track } from "@/lib/analytics";
import {
  LEGACY_PLANS, PLANS, billingKeyFor, firmRate, formatDate, freeUntil, isPublicPlan, type PublicPlan,
} from "@/lib/plans";

// What each plan's summary card lists under the price.
const PLAN_POINTS: Record<PublicPlan, { description: string; points: string[] }> = {
  basic: {
    description: "Pay as you go. No monthly fee; you pay only when you file.",
    points: ["E-filing in every Utah district and justice court", "Electronic service", "Case history and documents", "One user"],
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

export default function SignupPage({ params }: { params: Promise<{ plan: string }> }) {
  const { plan: planParam } = use(params);
  const router = useRouter();
  const key = planParam.toLowerCase();
  const legacy = LEGACY_PLANS[key];
  const plan: PublicPlan | null = isPublicPlan(key) ? key : null;

  const [step, setStep] = useState(0);
  const [yearly, setYearly] = useState(false);
  const [form, setForm] = useState<FormState>({
    firstName: "", lastName: "", email: "", password: "", bar: "", teamName: "", attorneyCount: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fire signup_start once, on the first field the visitor touches.
  const started = useRef(false);
  const until = freeUntil();

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

  if (legacy) return <main className="min-h-screen" />;

  if (!plan) {
    return (
      <main>
        <Navbar />
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan not found</h1>
            <a href="/pricing" className="text-accent underline">See the plans</a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const info = PLANS[plan];
  const billingKey = billingKeyFor(plan, yearly);
  const attorneys = Math.max(2, Math.floor(Number(form.attorneyCount) || 2));
  const priceAfter =
    plan === "firm" ? `$${firmRate(attorneys)} per attorney a month ($${firmRate(attorneys) * attorneys} a month for ${attorneys})`
    : plan === "unlimited" && yearly ? "$240 a year"
    : info.after;
  const untilLong = formatDate(until);
  const untilShort = formatDate(until, "short");

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  // Steps 1 and 2 only move on when the browser's own checks pass (required, email, 8+ characters).
  const next = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep((s) => Math.min(s + 1, 2));
  };

  const submit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, attorneyCount: plan === "firm" ? String(attorneys) : "1", plan: billingKey }),
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
    "flex-1 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed";
  const backButton = "px-6 py-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors";

  return (
    <main>
      <Navbar />

      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/pricing" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to plans
          </a>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Plan summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 lg:sticky lg:top-28">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                    {info.name} plan
                  </div>
                  <a href="/pricing" className="text-sm text-gray-500 hover:text-accent underline">Change plan</a>
                </div>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-gray-900">$0</span>
                  <span className="text-gray-500 text-sm ml-2">today</span>
                </div>
                <p className="text-accent font-semibold text-sm mb-1">Free until {untilLong}</p>
                <p className="text-gray-600 text-sm mb-5">Then {priceAfter}</p>

                {plan === "unlimited" && (
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

                <p className="text-gray-600 text-sm mb-5">{PLAN_POINTS[plan].description}</p>
                <ul className="space-y-3">
                  {PLAN_POINTS[plan].points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-6">Court filing fees are separate on every plan. You can switch plans anytime.</p>
              </div>
            </div>

            {/* Sign-up steps */}
            <div className="lg:col-span-3">
              <div ref={cardRef} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <ol className="flex items-center gap-2 mb-8" aria-label="Sign-up steps">
                  {STEPS.map((label, i) => (
                    <li key={label} className={`flex items-center gap-2 ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                          i < step ? "bg-accent/15 text-accent" : i === step ? "bg-accent text-white" : "bg-gray-100 text-gray-400"
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
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Utah bar number</h1>
                      <p className="text-gray-500 text-sm">Your filings go to the court under this number.</p>
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="bar">Utah bar number</label>
                      <input id="bar" type="text" required value={form.bar} onChange={set("bar")} className={inputClass} placeholder="Numbers only" inputMode="numeric" pattern="[0-9]{1,10}" title="Numbers only" />
                    </div>
                    <div>
                      <label className={labelClass} htmlFor="teamName">
                        Firm name {plan !== "firm" && <span className="text-gray-400 font-normal">(optional)</span>}
                      </label>
                      <input id="teamName" type="text" required={plan === "firm"} value={form.teamName} onChange={set("teamName")} className={inputClass} placeholder="Smith Law" />
                      {plan !== "firm" && <p className="text-xs text-gray-500 mt-1">Leave it blank if you practice on your own.</p>}
                    </div>
                    {plan === "firm" && (
                      <div>
                        <label className={labelClass} htmlFor="attorneyCount">Number of attorneys</label>
                        <input id="attorneyCount" type="number" required min={2} max={500} value={form.attorneyCount} onChange={set("attorneyCount")} className={inputClass} />
                        <p className="text-xs text-gray-500 mt-1">${firmRate(attorneys)} each a month for {attorneys} attorneys. $23 for 2 to 10, $22 for 11 to 20, $21 for 21 or more.</p>
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
                        <dd className="font-semibold text-gray-900">{info.name}{plan === "unlimited" && yearly ? ", yearly" : ""}</dd>
                      </div>
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

      <Footer />
    </main>
  );
}
