"use client";

import { useEffect, useState } from "react";

export default function PricingHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric shapes */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-[10%] left-[5%] w-64 h-64 bg-white/5 transform -rotate-12 transition-transform duration-[3000ms]"
            style={{
              transform: isVisible ? "rotate(-12deg) scale(1)" : "rotate(0deg) scale(0.8)",
            }}
          />
          <div
            className="absolute top-[20%] right-[15%] w-80 h-80 bg-accent/10 rounded-full transition-transform duration-[3500ms]"
            style={{
              transform: isVisible ? "scale(1)" : "scale(0.7)",
            }}
          />
          <div
            className="absolute bottom-[15%] left-[20%] w-72 h-72 border-4 border-white/10 transform rotate-45 transition-transform duration-[4000ms]"
            style={{
              transform: isVisible ? "rotate(45deg) scale(1)" : "rotate(0deg) scale(0.6)",
            }}
          />
          <div
            className="absolute bottom-[10%] right-[10%] w-96 h-96 bg-gradient-to-br from-accent/15 to-transparent rounded-full blur-3xl transition-opacity duration-[2000ms]"
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
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-white">Transparent Pricing</span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Plans &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
              Pricing
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-xl sm:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Pick the plan that best fits your needs
          </p>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap justify-center gap-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            {[
              { icon: "✓", text: "No Hidden Fees" },
              { icon: "✓", text: "Cancel Anytime" },
              { icon: "✓", text: "24/7 Support" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-sm font-bold">
                  {item.icon}
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 sm:h-24"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64 C240,90 480,100 720,85 C960,70 1200,50 1440,64 L1440,120 L0,120 Z"
            fill="white"
            className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: "800ms" }}
          />
        </svg>
      </div>
    </section>
  );
}
