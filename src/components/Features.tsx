"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface FeatureProps {
  title: string;
  description: string;
  imagePosition: "left" | "right";
  features: string[];
  icon: "document" | "lightning" | "shield";
  imageSrc?: string;
}

// Document icon - for Easy-To-Use section
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

// Gavel icon - for court/legal theme
function GavelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 3l-7 7m0 0l-3-3m3 3l3 3M5 21h14M9 17l-4 4m0 0h4m-4 0v-4" />
    </svg>
  );
}

// Upload/Send icon - filing animation
function SendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19V5m0 0l-7 7m7-7l7 7" />
    </svg>
  );
}

// Clock/Speed icon
function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// Shield/Lock icon
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

// Stamp/Certified icon
function StampIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );
}

function FeatureSection({ title, description, imagePosition, features, icon, imageSrc }: FeatureProps) {
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

  // Different floating elements based on section theme
  const renderFloatingElements = () => {
    if (icon === "document") {
      // Easy-to-Use: Document and form elements
      return (
        <>
          {/* Floating document */}
          <div
            className={`absolute top-2 left-2 w-16 h-20 rounded-lg bg-white shadow-lg border border-gray-200 z-20 transition-all duration-1000 flex flex-col items-center justify-center ${
              isVisible ? "opacity-100 translate-y-0 rotate-[-6deg]" : "opacity-0 translate-y-8 rotate-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <DocumentIcon className="w-6 h-6 text-primary mb-1" />
            <div className="w-8 h-1 bg-gray-200 rounded mb-1" />
            <div className="w-6 h-1 bg-gray-200 rounded" />
          </div>

          {/* Filing progress indicator */}
          <div
            className={`absolute bottom-4 right-4 px-3 py-2 rounded-lg bg-green-500 shadow-lg z-20 transition-all duration-1000 flex items-center gap-2 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-medium text-white">Filed</span>
          </div>

          {/* Upload arrow animation */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${imagePosition === "left" ? "right-2" : "left-2"} w-12 h-12 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/25 z-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <SendIcon className="w-5 h-5 text-white" />
          </div>
        </>
      );
    }

    if (icon === "lightning") {
      // Lightning Fast: Speed and time elements
      return (
        <>
          {/* Clock showing speed */}
          <div
            className={`absolute top-2 left-2 w-14 h-14 rounded-full bg-white shadow-lg border border-gray-200 z-20 transition-all duration-700 flex items-center justify-center ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <ClockIcon className="w-7 h-7 text-accent" />
          </div>

          {/* Speed badge */}
          <div
            className={`absolute bottom-4 right-4 px-3 py-2 rounded-full bg-gradient-to-r from-accent to-accent-light shadow-lg z-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <span className="text-xs font-bold text-white">2 MIN AVG</span>
          </div>

          {/* Lightning bolt */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${imagePosition === "left" ? "right-2" : "left-2"} w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg z-20 transition-all duration-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
        </>
      );
    }

    if (icon === "shield") {
      // Secure & Compliant: Security elements
      return (
        <>
          {/* Shield icon */}
          <div
            className={`absolute top-2 left-2 w-14 h-16 rounded-lg bg-gradient-to-br from-primary to-primary-dark shadow-lg z-20 transition-all duration-1000 flex items-center justify-center ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <ShieldIcon className="w-8 h-8 text-white" />
          </div>

          {/* Encrypted badge */}
          <div
            className={`absolute bottom-4 right-4 px-3 py-2 rounded-lg bg-primary shadow-lg z-20 transition-all duration-1000 flex items-center gap-2 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-xs font-medium text-white">256-bit</span>
          </div>

          {/* Certified stamp */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 ${imagePosition === "left" ? "right-2" : "left-2"} w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg z-20 transition-all duration-1000 ${
              isVisible ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 rotate-45"
            }`}
            style={{ transitionDelay: "700ms" }}
          >
            <StampIcon className="w-6 h-6 text-white" />
          </div>
        </>
      );
    }

    return null;
  };

  const imageContent = (
    <div className="relative p-8">
      {renderFloatingElements()}

      {/* Main image placeholder */}
      <div
        className={`relative z-10 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 shadow-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-900/80 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 bg-gray-800 rounded-md flex items-center px-3">
              <span className="text-xs text-gray-500">app.courtpath.com</span>
            </div>
          </div>
        </div>

        {/* App screenshot */}
        {imageSrc ? (
          <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ) : (
          <div className="aspect-[4/3] bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 p-6 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <p className="text-gray-500 text-sm">App Screenshot Placeholder</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const textContent = (
    <div
      className={`transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        {title}
      </h2>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed">
        {description}
      </p>

      {/* Feature list */}
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-start gap-3 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            style={{ transitionDelay: `${500 + index * 100}ms` }}
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center mt-0.5">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div ref={sectionRef} className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {imagePosition === "left" ? (
            <>
              <div className="order-2 lg:order-1">{imageContent}</div>
              <div className="order-1 lg:order-2">{textContent}</div>
            </>
          ) : (
            <>
              <div>{textContent}</div>
              <div>{imageContent}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-gray-50">
      {/* Section header */}
      <div ref={headerRef} className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className={`transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent text-sm font-medium rounded-full mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Our Features Beat the Competition
            </h2>
          </div>
        </div>
      </div>

      {/* Feature 1 - Easy to Use */}
      <FeatureSection
        title="Easy-To-Use"
        description="Courtpath is based upon the need for a faster, more efficient method to e-filing for law professionals. It is designed with the user in mind, making each e-filing step as user-friendly as possible while maximizing efficiency and performance."
        imagePosition="left"
        icon="document"
        imageSrc="/images/courtp-1.png"
        features={[
          "Intuitive step-by-step filing wizard",
          "Auto-save drafts as you work",
          "Smart form validation in real-time",
          "One-click document uploads",
        ]}
      />
    </section>
  );
}
