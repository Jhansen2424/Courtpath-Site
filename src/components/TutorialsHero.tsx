"use client";

import { useEffect, useState } from "react";

export default function TutorialsHero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-[50vh] overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Animated geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div
            className="absolute top-[15%] left-[10%] w-72 h-72 bg-white/5 transform rotate-12 transition-transform duration-[3000ms]"
            style={{
              transform: isVisible ? "rotate(12deg) scale(1)" : "rotate(0deg) scale(0.8)",
            }}
          />
          <div
            className="absolute top-[25%] right-[15%] w-80 h-80 bg-accent/10 rounded-full transition-transform duration-[3500ms]"
            style={{
              transform: isVisible ? "scale(1)" : "scale(0.7)",
            }}
          />
          <div
            className="absolute bottom-[20%] left-[20%] w-64 h-64 border-4 border-white/10 transform -rotate-12 transition-transform duration-[4000ms]"
            style={{
              transform: isVisible ? "rotate(-12deg) scale(1)" : "rotate(0deg) scale(0.6)",
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
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span className="text-sm font-medium text-white">Learn How to Use Courtpath</span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Tutorial{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent">
              Videos
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-xl sm:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Check out how to use our app and your account. To learn more, click on the link below to
            visit our user guide.
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "600ms" }}
          >
            <a
              href="https://support.courtpath.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Courtpath User Guide
            </a>
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
