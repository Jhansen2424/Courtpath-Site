"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function StepByStep() {
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

  const hearings = [
    {
      case: "Smith v. Johnson",
      caseNo: "2025-CV-04821",
      date: "Feb 14, 2025",
      time: "9:00 AM",
      type: "Motion Hearing",
      status: "upcoming",
    },
    {
      case: "Davis Family Trust",
      caseNo: "2025-PR-01193",
      date: "Feb 18, 2025",
      time: "10:30 AM",
      type: "Status Conference",
      status: "upcoming",
    },
    {
      case: "Rodriguez v. Metro PD",
      caseNo: "2024-CR-08712",
      date: "Feb 21, 2025",
      time: "1:00 PM",
      type: "Trial Date",
      status: "upcoming",
    },
    {
      case: "Greenfield HOA Dispute",
      caseNo: "2025-CV-00384",
      date: "Feb 24, 2025",
      time: "2:30 PM",
      type: "Mediation",
      status: "scheduled",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-white">
      {/* Gradient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Case Management
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Upcoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Hearings & Deadlines
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay on top of every case with a clear view of upcoming hearings, court dates,
              and filing deadlines — all in one place.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Tilted Card with Image */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative dots */}
            <div
              className={`absolute -top-12 -left-12 grid grid-cols-4 gap-2 transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-accent/20" />
              ))}
            </div>

            {/* Main tilted card */}
            <div
              className={`relative perspective-1000 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div
                className="relative transform hover:scale-[1.02] transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: "rotateY(-8deg) rotateX(4deg)",
                }}
              >
                {/* Shadow layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-900/5 rounded-2xl blur-2xl transform translate-y-8 translate-x-8" />

                {/* Card */}
                <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  {/* Top accent stripe */}
                  <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary-light" />

                  {/* Image */}
                  <div className="relative aspect-[1024/550] bg-gradient-to-br from-gray-50 to-gray-100">
                    <Image
                      src="/images/courtp-3.png"
                      alt="Upcoming Hearings Dashboard"
                      width={1024}
                      height={550}
                      className="w-full h-full"
                      quality={100}
                      unoptimized
                    />
                  </div>

                  {/* Bottom accent */}
                  <div className="p-4 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Hearing Calendar</span>
                      </div>
                      <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        Always Up to Date
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -bottom-6 -right-6 px-5 py-3 bg-gradient-to-br from-accent to-accent-dark rounded-xl shadow-lg transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-white font-semibold text-sm">Smart Reminders</span>
              </div>
            </div>
          </div>

          {/* Right - Upcoming Hearings List */}
          <div className="order-1 lg:order-2">
            <div className="space-y-4">
              {hearings.map((hearing, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{hearing.case}</h3>
                      <p className="text-sm text-gray-500">{hearing.caseNo}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold whitespace-nowrap">
                      {hearing.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {hearing.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {hearing.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className={`mt-8 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Never miss a hearing</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Get automatic reminders for every upcoming court date and deadline.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium text-sm group"
                    >
                      See how it works
                      <svg
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
