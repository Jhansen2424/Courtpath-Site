"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BASIC_FILINGS, FREE_DAYS, launchSpecialOn } from "@/lib/plans";

// Rows every card lists, so the plans compare at a glance; each plan marks which it includes.
const rows = [
  "E-filing in every Utah district and justice court",
  "Electronic service and case history",
  "Help from our Utah support team",
  "Paralegals and staff file for you",
  "No per-filing fees",
  "Several attorneys, with admin controls",
  "The firm's filings and court notices in one place",
];

const plans = [
  {
    name: "Basic",
    planId: "basic",
    tag: "For occasional filers",
    icon: "file",
    price: "$10",
    unit: "/ month",
    note: "Extra filings are $4 each, or switch to Unlimited.",
    limit: { value: `${BASIC_FILINGS} filings`, label: "a month" },
    includes: 3,
    popular: false,
  },
  {
    name: "Unlimited",
    planId: "unlimited",
    tag: "For regular filers",
    icon: "bolt",
    price: "$25",
    unit: "/ month",
    note: "Or $240 a year (save $60). Cheaper than Basic from 7 filings a month.",
    limit: { value: "Unlimited", label: "filings" },
    includes: 5,
    popular: true,
    yearlyHref: "/signup/unlimited?billing=yearly",
  },
  {
    name: "Firm",
    planId: "firm",
    tag: "2 or more attorneys",
    icon: "building",
    price: "$21",
    unit: "/ attorney / month",
    note: "The same price for every attorney, whatever the size of the firm.",
    limit: { value: "Unlimited", label: "filings for every attorney" },
    includes: rows.length,
    popular: false,
  },
];

const steps = [
  { title: "Pick a plan and sign up", body: "Your name, email, Utah bar number and a card. You pay $0 today." },
  { title: `File free for ${FREE_DAYS} days`, body: "No Courtpath fee on any filing during your first month. Court filing fees still apply." },
  { title: "Then your plan starts", body: "Your card is charged for the plan you chose. Cancel before the month ends and you pay nothing. Switch plans anytime." },
];

const icons: Record<string, string> = {
  file: "M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zm7 0v5h5",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  building: "M4 21V5a1 1 0 011-1h9a1 1 0 011 1v16M15 10h4a1 1 0 011 1v10M8 8h3M8 12h3M8 16h3M3 21h18",
};

const Icon = ({ name, className }: { name: string; className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
    <path d={icons[name]} />
  </svg>
);

const Mark = ({ included }: { included: boolean }) =>
  included ? (
    <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-label="Included">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-label="Not included">
      <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );

/**
 * The plans. On /pricing it is the whole top of the page (pageTitle): a short title and the cards
 * right under the fixed navbar, so the prices show without scrolling. Landing pages reuse it.
 */
export default function PricingPlans({ pageTitle = false }: { pageTitle?: boolean }) {
  // Worked out in the browser so a page built earlier still shows the right offer today.
  const [launchSpecial, setLaunchSpecial] = useState(false);
  useEffect(() => setLaunchSpecial(launchSpecialOn()), []);
  const Title = pageTitle ? "h1" : "h2";

  return (
    <section id="plans" className={`relative bg-gradient-to-b from-white to-gray-50 ${pageTitle ? "pt-36 sm:pt-40 pb-20" : "py-20"}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="inline-block px-3 py-1 bg-accent/10 text-accent-dark rounded-full text-sm font-semibold mb-4">
            Every plan starts with a free month
          </p>
          <Title className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {pageTitle ? "Simple pricing. Try any plan free." : "Three plans. Each starts with a free month."}
          </Title>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nothing is charged until your free month ends. Court filing fees are separate on every plan.
          </p>
          {launchSpecial && (
            <p className="mt-4 inline-block px-4 py-1.5 bg-primary text-white rounded-full text-sm font-medium">
              Launch special: sign up now and Courtpath is free until January 1, 2027.
            </p>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.planId}
              className={`relative flex flex-col bg-white rounded-2xl p-6 transition-shadow hover:shadow-xl ${
                plan.popular ? "border-2 border-accent shadow-xl md:scale-[1.03] z-10" : "border border-gray-200 shadow-md"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wide shadow">
                  Most popular
                </span>
              )}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    plan.planId === "firm" ? "bg-accent text-white" : plan.popular ? "bg-accent/15 text-accent-dark" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  <Icon name={plan.icon} className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight">{plan.name}</h3>
                  <p className="text-xs font-semibold text-accent-dark">{plan.tag}</p>
                </div>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-gray-900">{plan.price}</span>
                <span className="text-sm text-gray-500">{plan.unit}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1 mb-4 min-h-[2.5rem]">{plan.note}</p>

              <div className="flex items-baseline gap-2 bg-gradient-to-r from-accent/10 to-transparent rounded-lg px-3 py-2.5 mb-5 border-l-2 border-accent">
                <span className="text-lg font-bold text-gray-900">{plan.limit.value}</span>
                <span className="text-sm text-gray-600">{plan.limit.label}</span>
              </div>

              <Link
                href={`/signup/${plan.planId}`}
                className={`block w-full py-3 px-6 font-bold text-sm rounded-lg text-center text-white transition-all hover:shadow-lg ${
                  plan.popular ? "bg-accent hover:bg-accent-dark" : "bg-primary hover:bg-primary-dark"
                }`}
              >
                Start free month
              </Link>
              <div className="h-7 mt-1.5 mb-3 text-center text-sm">
                {plan.yearlyHref && (
                  <Link href={plan.yearlyHref} className="text-gray-500 hover:text-accent underline">
                    Or start yearly at $240
                  </Link>
                )}
              </div>

              <ul className="space-y-2.5 text-sm">
                {rows.map((row, i) => (
                  <li key={row} className="flex items-start gap-2">
                    <Mark included={i < plan.includes} />
                    <span className={i < plan.includes ? "text-gray-700" : "text-gray-400 line-through"}>{row}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

        {/* Criminal Defense */}
        <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-md p-6 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Criminal Defense</h3>
              <span className="text-sm text-gray-500">
                <span className="text-2xl font-black text-gray-900">$9.99</span> / month
              </span>
            </div>
            <p className="text-sm text-gray-600">
              For criminal defense attorneys: unlimited Appearances of Counsel and Notices of Limited Appearance, Requests for
              Discovery and Entries of Plea. Everything else is $4 a filing.
            </p>
          </div>
          <Link
            href="/signup/criminal-defense"
            className="shrink-0 py-3 px-6 bg-primary hover:bg-primary-dark text-white font-bold text-sm rounded-lg text-center transition-all hover:shadow-lg"
          >
            Start free month
          </Link>
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Not sure which plan? Start on Basic and switch anytime, even during your free month.
        </p>

        {/* How the free month works */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How the free month works</h2>
          <ol className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="bg-white rounded-2xl border border-gray-200 p-6">
                <span className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold mb-4">{i + 1}</span>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Need a custom solution?</h3>
              <p className="text-gray-600">Contact our sales team for enterprise pricing and custom features.</p>
            </div>
            <a
              href="/contact"
              className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
