"use client";

import { useEffect, useState } from "react";

export default function AboutHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-white/5 transform rotate-45 transition-transform duration-[3000ms]"
            style={{
              transform: isVisible ? "rotate(45deg) scale(1)" : "rotate(0deg) scale(0.8)",
            }}
          />
          <div
            className="absolute top-[20%] right-[10%] w-72 h-72 bg-accent/10 rounded-full transition-transform duration-[4000ms]"
            style={{
              transform: isVisible ? "scale(1)" : "scale(0.6)",
            }}
          />
          <div
            className="absolute bottom-[10%] left-[15%] w-80 h-80 border-4 border-white/10 transform -rotate-12 transition-transform duration-[3500ms]"
            style={{
              transform: isVisible ? "rotate(-12deg) scale(1)" : "rotate(0deg) scale(0.7)",
            }}
          />
          <div
            className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl transition-opacity duration-[2000ms]"
            style={{
              opacity: isVisible ? 1 : 0,
            }}
          />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Diagonal stripes */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent transform -skew-y-12" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-4xl">
          {/* Animated badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm font-medium text-white">Built by Legal Professionals</span>
          </div>

          {/* Main heading with staggered animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span
              className={`block transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              E-Filing Designed
            </span>
            <span
              className={`block transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              by{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
                  Attorneys
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 400 20"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 12C100 5 200 3 398 12"
                    stroke="#d4a441"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "1000ms" }}
                  />
                </svg>
              </span>
            </span>
            <span
              className={`block transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              for Attorneys
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl leading-relaxed transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            We understand the challenges of e-filing because we've lived them. Courtpath was built
            from the ground up by legal professionals who know exactly what you need.
          </p>

          {/* Stats cards */}
          <div
            className={`grid sm:grid-cols-3 gap-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            {[
              { value: "2015", label: "Founded" },
              { value: "50K+", label: "Filings Processed" },
              { value: "500+", label: "Law Firms Trust Us" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300 group"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 sm:h-32"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,90 480,100 720,85 C960,70 1200,50 1440,64 L1440,120 L0,120 Z"
            fill="white"
            className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "1200ms" }}
          />
        </svg>
      </div>
    </section>
  );
}
