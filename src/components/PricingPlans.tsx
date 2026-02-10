"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Basic",
    description: "Perfect for solo practitioners getting started",
    price: "49",
    period: "month",
    features: [
      "Up to 25 filings per month",
      "Basic document templates",
      "Email support",
      "Case management dashboard",
      "Mobile access",
      "Document storage (5GB)",
    ],
    highlighted: false,
    cta: "Get Started",
  },
  {
    name: "Professional",
    description: "Ideal for small to medium law firms",
    price: "149",
    period: "month",
    features: [
      "Unlimited filings",
      "Advanced document templates",
      "Priority email & phone support",
      "Advanced case management",
      "Mobile & tablet apps",
      "Document storage (50GB)",
      "Team collaboration tools",
      "Custom notifications",
      "Calendar integration",
    ],
    highlighted: true,
    badge: "Most Popular",
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "For large firms with custom needs",
    price: "Custom",
    period: null,
    features: [
      "Unlimited filings",
      "Custom document templates",
      "Dedicated account manager",
      "Advanced analytics & reporting",
      "White-label options",
      "Unlimited document storage",
      "API access",
      "Custom integrations",
      "Training & onboarding",
      "SLA guarantee",
    ],
    highlighted: false,
    cta: "Contact Sales",
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
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-2 bg-gradient-to-r from-accent to-accent-dark text-white text-sm font-bold rounded-full shadow-lg">
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-3xl transition-all duration-500 ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-primary to-primary-dark shadow-2xl border-2 border-accent"
                      : isHovered
                      ? "bg-white shadow-2xl border-2 border-accent"
                      : "bg-white shadow-lg border border-gray-200"
                  }`}
                >
                  {/* Glow effect */}
                  {(plan.highlighted || isHovered) && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/20 to-transparent blur-xl -z-10" />
                  )}

                  <div className="p-8 sm:p-10">
                    {/* Plan name */}
                    <h3
                      className={`text-2xl font-bold mb-2 transition-colors ${
                        plan.highlighted ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-sm mb-6 transition-colors ${
                        plan.highlighted ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        {plan.period ? (
                          <>
                            <span
                              className={`text-5xl font-bold transition-colors ${
                                plan.highlighted ? "text-white" : "text-gray-900"
                              }`}
                            >
                              ${plan.price}
                            </span>
                            <span
                              className={`text-lg transition-colors ${
                                plan.highlighted ? "text-white/70" : "text-gray-600"
                              }`}
                            >
                              /{plan.period}
                            </span>
                          </>
                        ) : (
                          <span
                            className={`text-4xl font-bold transition-colors ${
                              plan.highlighted ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {plan.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA button */}
                    <a
                      href="/get-started"
                      className={`block w-full py-4 px-6 rounded-xl font-bold text-center transition-all mb-8 ${
                        plan.highlighted
                          ? "bg-accent hover:bg-accent-dark text-white shadow-lg hover:shadow-xl hover:scale-105"
                          : "bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-lg hover:scale-105"
                      }`}
                    >
                      {plan.cta}
                    </a>

                    {/* Features list */}
                    <ul className="space-y-4">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3">
                          <div
                            className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 transition-colors ${
                              plan.highlighted
                                ? "bg-accent/20 text-accent-light"
                                : "bg-gray-100 text-accent"
                            }`}
                          >
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span
                            className={`text-sm transition-colors ${
                              plan.highlighted ? "text-white/90" : "text-gray-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
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
