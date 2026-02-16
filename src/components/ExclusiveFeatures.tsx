"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    icon: "💡",
    title: "Intuitive",
    description:
      "A better user interface that is easy to learn, read and navigate on mobile, tablet and desktop.",
  },
  {
    icon: "📱",
    title: "Mobile",
    description:
      "File your court documents on the go with our mobile version that works on Android and Apple.",
  },
  {
    icon: "⚡",
    title: "Step By Step Process",
    description:
      "Our user interface takes you through the process step-by-step with all required information provided, reducing the chances of the court rejecting the filing and making it less burdensome.",
  },
  {
    icon: "📄",
    title: "Document Review",
    description:
      "The best document review options in Utah. There are a number of nuances that we provide that make the document reviewing, downloading and uploading easier and more intuitive than other providers.",
  },
  {
    icon: "⬇️",
    title: "Downloads",
    description:
      "We allow users to be able to download all filings in a case, which can be very helpful for a lawyer at various stages of a case including when it is completed and the lawyer gives a copy of the file to the client.",
  },
  {
    icon: "🔔",
    title: "Customizable Notifications",
    description:
      "Our notifications are customizable so that the lawyer can decide how many notifications to receive after a filing is submitted to the court and we offer text message notifications.",
  },
  {
    icon: "✅",
    title: "Services of Process",
    description:
      "Within the application, you have the option to take care of all services of process for documents that must be served. You also have the option for Courtpath to contact a constable and have the licensed constable provide service or process of any filing you want.",
  },
  {
    icon: "💳",
    title: "Easy Court Filing Payments",
    description:
      "For court filing fees, we can place a card on file for easy e-filing, and also offer one-time-use card payments for filing fees so the user can choose what is best for them.",
  },
  {
    icon: "📂",
    title: "Recent Filings",
    description:
      "We have a 'recent filings' list that provides a list of all filings for the user from all cases for the last 60 days. This helps with identifying deadlines and ensuring items were filed on time.",
  },
  {
    icon: "📅",
    title: "Calendar",
    description:
      "We are always adding new features that improve the eFiling process including, for example, an upcoming roll-out of our calendaring feature that will identify deadlines for various filing and hearings and enable the user to add the deadlines to the lawyer's personal calendar",
  },
  {
    icon: "✉️",
    title: "Unlimited Email Addresses",
    description:
      "A user can designate unlimited email addresses to receive email notifications",
  },
];

export default function ExclusiveFeatures() {
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
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #1a3a5c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Industry Leading
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Exclusive Courtpath{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-light">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Courtpath has the following innovations that no other provider currently offers.
            </p>
          </div>
        </div>

        {/* Features Grid with Bento Box Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.slice(0, 9).map((feature, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            const shouldDim = isAnyHovered && !isHovered;

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${shouldDim ? "opacity-40 scale-95" : "opacity-100 scale-100"}`}
                style={{ transitionDelay: `${index * 50}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Card */}
                <div
                  className={`relative h-full p-8 rounded-2xl transition-all duration-500 ${
                    isHovered
                      ? "bg-gradient-to-br from-primary to-primary-dark shadow-2xl shadow-primary/20"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {/* Glow effect on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-xl" />
                  )}

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with animation */}
                    <div
                      className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center text-3xl transition-all duration-500 ${
                        isHovered
                          ? "bg-accent/20 scale-110 rotate-6"
                          : "bg-white scale-100 rotate-0"
                      }`}
                    >
                      <span className="transition-transform duration-500 group-hover:scale-125">
                        {feature.icon}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                        isHovered ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm leading-relaxed transition-colors duration-500 ${
                        isHovered ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {feature.description}
                    </p>

                    {/* Hover indicator */}
                    <div
                      className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-500 ${
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    >
                      <span className="text-accent-light">Learn more</span>
                      <svg
                        className="w-4 h-4 text-accent-light"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 transition-opacity duration-500 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-full h-full bg-accent/10 rounded-bl-full" />
                  </div>
                </div>

                {/* Number badge */}
                <div
                  className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                    isHovered
                      ? "bg-accent text-white scale-110"
                      : "bg-white text-gray-400 border-2 border-gray-200 scale-100"
                  }`}
                >
                  {index + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Last two features centered side by side */}
        <div className="mt-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.slice(9).map((feature, idx) => {
              const index = idx + 9;
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;
              const shouldDim = isAnyHovered && !isHovered;

              return (
                <div
                  key={index}
                  className={`group relative transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  } ${shouldDim ? "opacity-40 scale-95" : "opacity-100 scale-100"}`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Card */}
                  <div
                    className={`relative h-full p-8 rounded-2xl transition-all duration-500 ${
                      isHovered
                        ? "bg-gradient-to-br from-primary to-primary-dark shadow-2xl shadow-primary/20"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    {/* Glow effect on hover */}
                    {isHovered && (
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 to-transparent blur-xl" />
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Icon with animation */}
                      <div
                        className={`w-16 h-16 mb-6 rounded-xl flex items-center justify-center text-3xl transition-all duration-500 ${
                          isHovered
                            ? "bg-accent/20 scale-110 rotate-6"
                            : "bg-white scale-100 rotate-0"
                        }`}
                      >
                        <span className="transition-transform duration-500 group-hover:scale-125">
                          {feature.icon}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-bold mb-3 transition-colors duration-500 ${
                          isHovered ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={`text-sm leading-relaxed transition-colors duration-500 ${
                          isHovered ? "text-white/90" : "text-gray-600"
                        }`}
                      >
                        {feature.description}
                      </p>

                      {/* Hover indicator */}
                      <div
                        className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-500 ${
                          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                        }`}
                      >
                        <span className="text-accent-light">Learn more</span>
                        <svg
                          className="w-4 h-4 text-accent-light"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div
                      className={`absolute top-0 right-0 w-20 h-20 transition-opacity duration-500 ${
                        isHovered ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="absolute top-0 right-0 w-full h-full bg-accent/10 rounded-bl-full" />
                    </div>
                  </div>

                  {/* Number badge */}
                  <div
                    className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                      isHovered
                        ? "bg-accent text-white scale-110"
                        : "bg-white text-gray-400 border-2 border-gray-200 scale-100"
                    }`}
                  >
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
            <div className="text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to experience the difference?
              </h3>
              <p className="text-gray-600">Join hundreds of law firms already using Courtpath.</p>
            </div>
            <a
              href="/pricing"
              className="flex-shrink-0 px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
