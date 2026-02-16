"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function WhyWeBuilt() {
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
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Laptop Mockup */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Floating "quote" decoration */}
            <div
              className={`absolute -top-8 -left-8 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm border border-accent/30 flex items-center justify-center transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100 rotate-12" : "opacity-0 scale-75 rotate-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <svg className="w-10 h-10 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Laptop mockup container */}
            <div className="relative">
              {/* Shadow base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/10 blur-2xl rounded-full" />

              {/* Laptop base */}
              <div className="relative bg-gray-800 rounded-t-2xl pt-8 px-8 pb-0 shadow-2xl">
                {/* Screen bezel */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-700" />

                {/* Screen */}
                <div className="bg-white rounded-t-xl overflow-hidden shadow-inner border border-gray-300">
                  <div className="relative aspect-[1631/778]">
                    <Image
                      src="/images/courtp-4.png"
                      alt="Courtpath Interface"
                      width={1631}
                      height={778}
                      className="w-full h-full"
                      quality={100}
                      unoptimized
                    />
                  </div>
                </div>
              </div>

              {/* Laptop keyboard base */}
              <div className="relative">
                <div className="bg-gradient-to-b from-gray-700 to-gray-800 h-6 rounded-b-2xl" />
                <div className="bg-gradient-to-b from-gray-600 to-gray-700 h-3 mx-16 rounded-b-3xl shadow-lg" />
              </div>
            </div>

            {/* Floating badge */}
            <div
              className={`absolute -bottom-6 -right-6 px-5 py-3 bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-gray-900">Live Since 2015</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-accent rounded-md mb-6">
              <span className="text-sm font-bold text-white">A Better Way</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Why We Made{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Courtpath
              </span>
            </h2>

            {/* Story paragraphs */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                We came up with Courtpath a few years ago while we were using other electronic
                filing systems and kept thinking,{" "}
                <span className="font-semibold text-gray-900">
                  "There has to be a better way!"
                </span>{" "}
                All of the different options for e-filing at the time either had limited capacity or
                the user interface was old and difficult to navigate.
              </p>

              <p>
                This led us thinking about different things we wanted to see in a filing system that
                nobody else had, and as practicing lawyers, we wanted to focus on the needs of
                lawyers and paralegals. We didn't want something that was a basic repeat of other
                systems, and knew we could create something much more effective and user friendly.
              </p>

              <p>
                After over three years of development and working with Government entities, third
                parties, developers and practitioners, Courtpath has redefined the eFiling process to
                meet lawyers' objectives and continues to evolve to advance the ever-changing needs of
                practitioners.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`mt-10 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <a
                href="/pricing"
                className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                SIGN UP
              </a>
            </div>

            {/* Timeline decoration */}
            <div
              className={`mt-12 pt-8 border-t border-gray-200 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Development Timeline</p>
                  <p className="font-semibold text-gray-900">3+ Years of Innovation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
