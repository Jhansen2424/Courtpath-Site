"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PLAN_INFO: Record<
  string,
  {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    requiresTeam: boolean;
    tiers?: { label: string; price: string }[];
  }
> = {
  bronze: {
    name: "Bronze",
    price: "$4",
    period: "per filing",
    description: "Pay only when you file. Perfect for occasional filers.",
    features: [
      "Pay-per-filing plan",
      "Single user account",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    requiresTeam: false,
  },
  silver: {
    name: "Silver",
    price: "$25",
    period: "per month",
    description: "Unlimited monthly filings for a single attorney.",
    features: [
      "Single attorney plan",
      "Allow paralegals and staff to file under single attorney",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    requiresTeam: false,
  },
  gold: {
    name: "Gold",
    price: "From $21",
    period: "per member / month",
    description:
      "Monthly unlimited plan for multi-attorney firms at reduced per-seat pricing.",
    features: [
      "Multiple attorneys at reduced prices",
      "Paralegal & staff use",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    requiresTeam: true,
    tiers: [
      { label: "2–10 Attorneys", price: "$23 / member / month" },
      { label: "11–20 Attorneys", price: "$22 / member / month" },
      { label: "21+ Attorneys", price: "$21 / member / month" },
    ],
  },
  platinum: {
    name: "Platinum",
    price: "From $240",
    period: "per year",
    description:
      "Annual unlimited plan for single and multi-attorney firms.",
    features: [
      "Annual unlimited plan for single & multiple attorney firms",
      "Paralegal & staff use",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    requiresTeam: true,
  },
};

interface FormState {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  bar: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  teamName: string;
  attorneyCount: string;
}

export default function SignupPage({
  params,
}: {
  params: { plan: string };
}) {
  const router = useRouter();
  const planKey = params.plan.toLowerCase();
  const plan = PLAN_INFO[planKey];

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    password: "",
    bar: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    teamName: "",
    attorneyCount: "2",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!plan) {
    return (
      <main>
        <Navbar />
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Plan not found</h1>
            <a href="/pricing" className="text-accent underline">
              View all plans
            </a>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: planKey }),
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

  return (
    <main>
      <Navbar />

      <section className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to plans
          </a>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Plan summary card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sticky top-8">
                <div className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
                  {plan.name} Plan
                </div>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500 text-sm ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                {plan.tiers && (
                  <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
                    {plan.tiers.map((tier) => (
                      <div
                        key={tier.label}
                        className="flex justify-between items-center px-4 py-3 text-sm border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-600">{tier.label}</span>
                        <span className="font-semibold text-gray-900">{tier.price}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-accent mt-0.5 shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Signup form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Sign up for {plan.name}
                </h1>
                <p className="text-gray-500 text-sm mb-8">
                  Fill in your details below. You&apos;ll be taken to a secure payment page next.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name row */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.firstName}
                        onChange={set("firstName")}
                        className={inputClass}
                        placeholder="Jane"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Middle Name</label>
                      <input
                        type="text"
                        value={form.middleName}
                        onChange={set("middleName")}
                        className={inputClass}
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.lastName}
                        onChange={set("lastName")}
                        className={inputClass}
                        placeholder="Smith"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass}
                      placeholder="jane@smithlaw.com"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label className={labelClass}>
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={form.password}
                      onChange={set("password")}
                      className={inputClass}
                      placeholder="Minimum 8 characters"
                    />
                  </div>

                  {/* Bar Number */}
                  <div>
                    <label className={labelClass}>
                      Utah Bar Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={form.bar}
                      onChange={set("bar")}
                      className={inputClass}
                      placeholder="Numbers only"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      className={inputClass}
                      placeholder="555-555-5555"
                    />
                  </div>

                  {/* Address */}
                  <div className="space-y-3">
                    <label className={labelClass}>Address</label>
                    <input
                      type="text"
                      value={form.address1}
                      onChange={set("address1")}
                      className={inputClass}
                      placeholder="Street address"
                    />
                    <input
                      type="text"
                      value={form.address2}
                      onChange={set("address2")}
                      className={inputClass}
                      placeholder="Apt, suite, unit (optional)"
                    />
                    <div className="grid sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={form.city}
                        onChange={set("city")}
                        className={inputClass}
                        placeholder="City"
                      />
                      <input
                        type="text"
                        value={form.state}
                        onChange={set("state")}
                        className={inputClass}
                        placeholder="State"
                        maxLength={2}
                      />
                      <input
                        type="text"
                        value={form.zip}
                        onChange={set("zip")}
                        className={inputClass}
                        placeholder="ZIP"
                        inputMode="numeric"
                      />
                    </div>
                  </div>

                  {/* Team fields — gold & platinum only */}
                  {plan.requiresTeam && (
                    <>
                      <div>
                        <label className={labelClass}>
                          Firm / Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.teamName}
                          onChange={set("teamName")}
                          className={inputClass}
                          placeholder="Smith & Associates"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>
                          Number of Attorneys <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          required
                          min={2}
                          value={form.attorneyCount}
                          onChange={set("attorneyCount")}
                          className={inputClass}
                        />
                        {plan.tiers && (
                          <p className="text-xs text-gray-500 mt-1">
                            {Number(form.attorneyCount) >= 21
                              ? "$21 / member / month"
                              : Number(form.attorneyCount) >= 11
                              ? "$22 / member / month"
                              : "$23 / member / month"}
                          </p>
                        )}
                      </div>
                    </>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Redirecting to payment..." : "Pay Now"}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    You&apos;ll be redirected to a secure Stripe checkout page to complete payment.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
