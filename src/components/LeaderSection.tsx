"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LeaderSection() {
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
    <section ref={sectionRef} className="relative pt-32 pb-24 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        {/* Diagonal lines pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #1a3a5c 0, #1a3a5c 1px, transparent 1px, transparent 40px)`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            {/* Main heading with gradient */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              A Leader in the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary-light">
                Court Filing Applications
              </span>
            </h2>

            {/* Content paragraphs */}
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                We care about the environment and therefore we focus on electronic filings. We
                believe in electronic documents and e-signatures and want to help move legal
                practice into the digital age with a secure, reliable and user-friendly system.
              </p>

              <p>
                We work closely with court clerks, court administrators, and filing attorneys to
                ensure our application works as effectively as possible. We are constantly improving
                our program, and are always working on new features.
              </p>
            </div>

            {/* CTA Button */}
            <div
              className={`mt-10 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <a
                href="/get-started"
                className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                SIGN UP
              </a>
            </div>

            {/* Feature highlights */}
            <div
              className={`mt-12 grid grid-cols-2 gap-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "600ms" }}
            >
              {[
                { icon: "🌱", label: "Eco-Friendly" },
                { icon: "🔒", label: "Secure Platform" },
                { icon: "🚀", label: "Constantly Evolving" },
                { icon: "🤝", label: "Court Approved" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-semibold text-gray-700">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Laptop Mockup */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            {/* Floating badge decoration */}
            <div
              className={`absolute -top-6 -right-6 px-6 py-3 bg-gradient-to-r from-accent to-accent-dark rounded-2xl shadow-xl transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100 rotate-6" : "opacity-0 scale-75 rotate-0"
              }`}
              style={{ transitionDelay: "800ms" }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-bold text-white">Industry Leader</span>
              </div>
            </div>

            {/* Laptop mockup container */}
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-50" />

              {/* Shadow base */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-8 bg-black/10 blur-2xl rounded-full" />

              {/* Laptop base */}
              <div className="relative bg-gray-800 rounded-t-2xl pt-8 px-8 pb-0 shadow-2xl">
                {/* Screen bezel */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-700" />

                {/* Screen */}
                <div className="bg-white rounded-t-xl overflow-hidden shadow-inner border border-gray-300">
                  <div className="relative aspect-[573/560]">
                    <Image
                      src="/images/courtp-5.png"
                      alt="Courtpath Leadership"
                      width={573}
                      height={560}
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

            {/* Floating stats badge */}
            <div
              className={`absolute -bottom-8 -left-8 p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "1000ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">99.9%</div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
