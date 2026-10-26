"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BASIC_FILINGS, FREE_DAYS, launchSpecialOn } from "@/lib/plans";

const plans = [
  {
    name: "Basic",
    planId: "basic",
    tag: "For occasional filers",
    blurb: "Good for attorneys who file now and then. Where everyone starts if they're not sure.",
    price: "$10",
    unit: "per month",
    note: `Includes ${BASIC_FILINGS} filings a month. Extra filings are $4 each, or switch to Unlimited.`,
    includesLabel: "Includes",
    features: [
      `${BASIC_FILINGS} filings a month`,
      "E-filing in every Utah district and justice court",
      "Electronic service",
      "Case history and documents",
      "Help from our Utah support team",
      "One user",
    ],
    highlighted: false,
  },
  {
    name: "Unlimited",
    planId: "unlimited",
    tag: "For regular filers",
    blurb: "Unlimited filings for one attorney, and your staff can file for you.",
    price: "$25",
    unit: "per month",
    note: "Or $240 a year (save $60). Cheaper than Basic from 7 filings a month.",
    includesLabel: "Everything in Basic, plus",
    features: [
      "Unlimited filings, no per-filing fee",
      "Paralegals and staff file under your account",
      "Yearly billing: $240, about $20 a month",
    ],
    highlighted: true,
    yearlyHref: "/signup/unlimited?billing=yearly",
  },
  {
    name: "Firm",
    planId: "firm",
    tag: "2 or more attorneys",
    blurb: "One account for the whole office, priced per attorney.",
    pricePrefix: "from",
    price: "$21",
    unit: "per attorney / month",
    note: "$23 each for 2 to 10 attorneys, $22 for 11 to 20, $21 for 21 or more.",
    includesLabel: "Everything in Unlimited, plus",
    features: [
      "Unlimited filings for every attorney",
      "Admin controls to add and remove users",
      "The firm's filings and court notices in one place",
    ],
    highlighted: false,
  },
];

const steps = [
  { title: "Pick a plan and sign up", body: "Your name, email, Utah bar number and a card. You pay $0 today." },
  { title: `File free for ${FREE_DAYS} days`, body: "No Courtpath fee on any filing during your first month. Court filing fees still apply." },
  { title: "Then your plan starts", body: "Your card is charged for the plan you chose. Cancel before the month ends and you pay nothing. Switch plans anytime." },
];

const Check = () => (
  <svg className="w-4 h-4 text-accent mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default function PricingPlans() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // Worked out in the browser so a page built earlier still shows the right offer today.
  const [launchSpecial, setLaunchSpecial] = useState(false);

  useEffect(() => {
    setLaunchSpecial(launchSpecialOn());
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fade = (delay = 0, classes = "") => ({
    className: `${classes} transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`,
    style: { transitionDelay: `${delay}ms` },
  });

  return (
    <section ref={sectionRef} id="plans" className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div {...fade(0, "text-center mb-12")}>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Three plans. Each starts with a free month.</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nothing is charged until the month ends. Court filing fees are separate on every plan.
          </p>
          {launchSpecial && (
            <p className="mt-6 inline-block px-4 py-2 bg-accent/10 text-accent-dark rounded-full text-sm font-semibold">
              Launch special: sign up now and Courtpath is free until January 1, 2027.
            </p>
          )}
        </div>

        {/* Plan cards */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, index) => (
            <div key={plan.planId} {...fade(index * 120)}>
              <div
                className={`relative h-full flex flex-col bg-white rounded-2xl p-8 ${
                  plan.highlighted ? "border-2 border-accent shadow-2xl" : "border border-gray-200 shadow-lg"
                }`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <span className="px-3 py-1 bg-accent/10 text-accent-dark rounded-full text-xs font-semibold whitespace-nowrap">{plan.tag}</span>
                </div>
                <p className="text-sm text-gray-600 mb-6">{plan.blurb}</p>

                <div className="flex items-baseline gap-2">
                  {plan.pricePrefix && <span className="text-sm text-gray-500">{plan.pricePrefix}</span>}
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.unit}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2 mb-6">{plan.note}</p>

                <Link
                  href={`/signup/${plan.planId}`}
                  className={`block w-full py-3 px-6 font-bold text-sm rounded-lg text-center transition-all hover:shadow-lg ${
                    plan.highlighted ? "bg-accent hover:bg-accent-dark text-white" : "bg-primary hover:bg-primary-dark text-white"
                  }`}
                >
                  Start free month
                </Link>
                {plan.yearlyHref && (
                  <Link href={plan.yearlyHref} className="block text-center text-sm text-gray-500 hover:text-accent underline mt-3">
                    Or start yearly at $240
                  </Link>
                )}

                <div className="border-t border-gray-200 my-6" />
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{plan.includesLabel}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                      <Check />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Criminal Defense */}
        <div {...fade(360, "mt-6 bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6")}>
          <div className="flex-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
              <h3 className="text-xl font-bold text-gray-900">Criminal Defense</h3>
              <span className="text-sm text-gray-500">
                <span className="text-2xl font-bold text-gray-900">$9.99</span> per month
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
        <div {...fade(480, "mt-20")}>
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
        <div {...fade(600, "mt-16 text-center")}>
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
