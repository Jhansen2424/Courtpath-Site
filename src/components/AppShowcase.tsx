"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AppShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const actions = [
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      ),
      title: "File a New Case",
      desc: "Start a new filing in minutes with our guided workflow.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      ),
      title: "Add a Filing",
      desc: "Submit additional documents to an existing case with ease.",
    },
    {
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16"
        />
      ),
      title: "Track Every Case",
      desc: "See all your active cases and their status at a glance.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50"
    >
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Simple by Design
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              E-Filing Made{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">
                Effortless
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              No complicated menus. No confusing workflows. Courtpath puts everything you
              need front and center — file a new case, add a filing, or check your case
              status in just a few clicks.
            </p>

            {/* Action items */}
            <div className="space-y-5">
              {actions.map((action, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {action.icon}
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {action.title}
                    </h3>
                    <p className="text-gray-600">{action.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - App screenshot */}
          <div className="relative">
            {/* Background card layers */}
            <div
              className={`absolute inset-0 translate-x-4 translate-y-4 bg-gradient-to-br from-primary/15 to-primary/5 rounded-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "200ms" }}
            />
            <div
              className={`absolute inset-0 translate-x-2 translate-y-2 bg-gradient-to-br from-accent/15 to-accent/5 rounded-2xl transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "300ms" }}
            />

            {/* Main card */}
            <div
              className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              {/* Top bar mimicking app chrome */}
              <div className="h-2 bg-gradient-to-r from-primary via-accent to-primary-light" />

              {/* Screenshot */}
              <div className="relative aspect-[1633/794] bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                  src="/images/courtp-app.webp"
                  alt="Courtpath Application Dashboard"
                  width={1633}
                  height={794}
                  className="w-full h-full"
                  quality={100}
                  unoptimized
                />
              </div>

              {/* Bottom bar */}
              <div className="p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-gray-700">
                      Dashboard View
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    Clean, intuitive interface
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -bottom-10 -left-5 px-5 py-3 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-white font-semibold text-sm">
                  No Training Needed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
