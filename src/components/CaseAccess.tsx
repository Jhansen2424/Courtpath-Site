"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CaseAccess() {
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

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating folder icons */}
        <div
          className={`absolute top-20 left-[10%] w-20 h-20 transition-all duration-[2000ms] ${
            isVisible ? "opacity-20 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="text-accent/30">
            <path
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              stroke="currentColor"
              strokeWidth={2}
              fill="currentColor"
              fillOpacity={0.1}
            />
          </svg>
        </div>
        <div
          className={`absolute bottom-32 right-[15%] w-16 h-16 transition-all duration-[2000ms] ${
            isVisible ? "opacity-20 translate-y-0 rotate-12" : "opacity-0 translate-y-12 rotate-0"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="text-primary/20">
            <path
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              stroke="currentColor"
              strokeWidth={2}
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 mb-6">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span className="text-sm font-medium text-accent">Case Management</span>
            </div>

            {/* Title with gradient underline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Easy Document Access{" "}
              <span className="relative inline-block">
                In All Your Cases
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 7C50 3 150 1 298 7"
                    stroke="url(#gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className={`transition-all duration-1000 ${
                      isVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d4a441" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#d4a441" stopOpacity="1" />
                      <stop offset="100%" stopColor="#d4a441" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have all of your cases at your fingertips. Courtpath gives you the ability to view
              all your cases and access any documents filed with the court.
            </p>

            {/* Feature cards */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: "🔍", title: "Quick Search", desc: "Find any case or document instantly" },
                { icon: "📱", title: "Mobile Ready", desc: "Access anywhere, anytime" },
                { icon: "🔔", title: "Real-time Updates", desc: "Get notified of case changes" },
                { icon: "📊", title: "Smart Filters", desc: "Organize cases your way" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-white border border-gray-200 hover:border-accent/50 hover:shadow-lg transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium group"
              >
                Learn more about case management
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </a>
            </div>
          </div>

          {/* Right side - Image with creative presentation */}
          <div className="relative">
            {/* 3D Card stack effect */}
            <div className="relative">
              {/* Background cards */}
              <div
                className={`absolute inset-0 translate-x-4 translate-y-4 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "200ms" }}
              />
              <div
                className={`absolute inset-0 translate-x-2 translate-y-2 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "300ms" }}
              />

              {/* Main card */}
              <div
                className={`relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transition-all duration-1000 hover:shadow-accent/20 ${
                  isVisible ? "opacity-100 translate-y-0 rotate-0" : "opacity-0 translate-y-12 rotate-2"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {/* Accent bar */}
                <div className="h-2 bg-gradient-to-r from-accent via-accent-light to-accent" />

                {/* Image */}
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/images/courtp-2.png"
                    alt="Easy Document Access"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Bottom info bar */}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">All Cases Dashboard</p>
                        <p className="text-xs text-gray-500">Updated in real-time</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs text-gray-600">Live</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stats badges */}
            <div
              className={`absolute -top-6 -right-6 px-4 py-3 bg-white rounded-xl shadow-lg border border-gray-200 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">100%</p>
                <p className="text-xs text-gray-600">Accessible</p>
              </div>
            </div>

            <div
              className={`absolute -bottom-6 -left-6 px-4 py-3 bg-gradient-to-br from-primary to-primary-dark rounded-xl shadow-lg transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-xs text-white/80">Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
