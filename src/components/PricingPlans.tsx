"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Bronze",
    price: "4",
    period: "Per Filing",
    features: [
      "Pay-per-filing plan",
      "Single user account",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    highlighted: false,
    cta: "Sign up now!",
  },
  {
    name: "Silver",
    price: "25",
    period: "Per Month",
    features: [
      "Single attorney plan",
      "Allow paralegals and staff to file under single attorney",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    highlighted: false,
    cta: "Sign up now!",
  },
  {
    name: "Gold",
    price: "21",
    period: "Per Month (Starting)",
    badge: "MOST POPULAR",
    features: [
      "Multiple attorneys at reduced prices",
      "Paralegal & staff use",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    highlighted: true,
    cta: "Sign up now!",
  },
  {
    name: "Platinum",
    price: "240",
    period: "Per Year (Starting)",
    features: [
      "Annual unlimited plan for single & multiple attorney firms",
      "Paralegal & staff use",
      "Electronic service",
      "Case history",
      "Document access",
      "Support",
    ],
    highlighted: false,
    cta: "Sign up now!",
  },
];

export default function PricingPlans() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Choose Your Plan
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Simple,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Transparent
              </span>{" "}
              Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              All plans include our core features. Choose the one that fits your practice size.
            </p>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-start">
          {plans.map((plan, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const shouldDim = isAnyHovered && !isHovered;

            return (
              <div
                key={index}
                className={`relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${shouldDim ? "opacity-50 scale-95" : "opacity-100 scale-100"} ${
                  plan.highlighted ? "lg:-mt-4 lg:mb-4" : ""
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Badge for highlighted plan */}
                {plan.badge && (
                  <div className="bg-accent text-white text-center py-3 px-4 rounded-t-2xl font-bold text-sm tracking-wide">
                    {plan.name}
                    <div className="text-xs font-semibold tracking-widest mt-0.5">{plan.badge}</div>
                  </div>
                )}

                <div
                  className={`relative h-full transition-all duration-500 ${
                    plan.highlighted
                      ? "bg-white shadow-2xl border-2 border-accent rounded-b-2xl"
                      : isHovered
                      ? "bg-white shadow-2xl border-2 border-accent rounded-2xl"
                      : "bg-white shadow-lg border border-gray-200 rounded-2xl"
                  }`}
                >
                  {/* Glow effect */}
                  {(plan.highlighted || isHovered) && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-xl -z-10" />
                  )}

                  <div className="p-8 text-center">
                    {/* Plan name (if not highlighted, show here) */}
                    {!plan.badge && (
                      <h3 className="text-2xl font-bold text-accent mb-6">
                        {plan.name}
                      </h3>
                    )}

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-start justify-center">
                        <span className="text-sm text-gray-500 mt-2 mr-1">$</span>
                        <span className="text-6xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{plan.period}</p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-6" />

                    {/* Features list */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-gray-700 text-center">
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA button */}
                    <a
                      href="/get-started"
                      className="inline-block w-full py-3 px-6 bg-accent hover:bg-accent-dark text-white font-bold text-sm rounded-md transition-all hover:shadow-lg hover:scale-105"
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Need a custom solution?
              </h3>
              <p className="text-gray-600">
                Contact our sales team for enterprise pricing and custom features.
              </p>
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
