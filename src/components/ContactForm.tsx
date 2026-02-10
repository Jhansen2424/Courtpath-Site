"use client";

import { useEffect, useRef, useState } from "react";

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #1a3a5c 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="sticky top-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Don't hesitate to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  reach out!
                </span>
              </h2>

              <div className="space-y-4 text-lg text-gray-600 mb-8">
                <p>
                  Need service or support? You can browse{" "}
                  <a
                    href="https://support.courtpath.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-dark font-semibold underline decoration-accent/30 hover:decoration-accent transition-colors"
                  >
                    Courtpath Online Support
                  </a>{" "}
                  for quick answers, manuals, and in-depth technical articles we have gathered from
                  the Utah Courts.
                </p>
                <p>
                  You can also leave us a message here and we will try to find you an answer.
                </p>
                <p>
                  You can also send us an email at{" "}
                  <a
                    href="mailto:support@courtpath.com"
                    className="text-accent hover:text-accent-dark font-semibold underline decoration-accent/30 hover:decoration-accent transition-colors"
                  >
                    support@courtpath.com
                  </a>{" "}
                  and we'll help you find a solution.
                </p>
              </div>

              {/* Products and Services */}
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  PRODUCTS AND SERVICES
                </h3>
                <p className="text-gray-600">
                  If you are looking to upgrade your account or you are having account issues, try
                  one of our products and serves sales managers.
                </p>
              </div>

              {/* Trust indicators */}
              <div
                className={`mt-8 grid grid-cols-3 gap-4 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: "400ms" }}
              >
                {[
                  { icon: "🔒", label: "Secure" },
                  { icon: "⚡", label: "Fast Reply" },
                  { icon: "✓", label: "Trusted" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-white shadow-sm border border-gray-100"
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-sm font-semibold text-gray-700">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative">
              {/* Decorative corner accent */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl rotate-12 blur-xl" />

              <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 sm:p-12">
                <form className="space-y-6">
                  {/* Name fields */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="First"
                      />
                      <p className="mt-1 text-xs text-gray-500">First</p>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2 opacity-0 pointer-events-none">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="Last"
                      />
                      <p className="mt-1 text-xs text-gray-500">Last</p>
                    </div>
                  </div>

                  {/* Phone and Email */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="">Choose Subject</option>
                      <option value="support">Technical Support</option>
                      <option value="demo">Request Demo</option>
                      <option value="billing">Billing Question</option>
                      <option value="sales">Sales Inquiry</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      What can we help you with? <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none bg-gray-50 focus:bg-white"
                      placeholder="Tell us about your question or issue..."
                    />
                  </div>

                  {/* reCAPTCHA placeholder */}
                  <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
                      <span className="text-sm text-gray-600">I'm not a robot</span>
                      <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-10 py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2 group"
                  >
                    <span>Submit</span>
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
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>

                  {/* Privacy note */}
                  <p className="text-xs text-gray-500 text-center sm:text-left">
                    By submitting this form, you agree to our{" "}
                    <a href="/privacy" className="text-accent hover:text-accent-dark underline">
                      Privacy Policy
                    </a>
                    . We respect your privacy and will never share your information.
                  </p>
                </form>
              </div>

              {/* Floating badge */}
              <div
                className={`absolute -bottom-6 -left-6 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-xl transition-all duration-1000 ${
                  isVisible ? "opacity-100 scale-100 rotate-3" : "opacity-0 scale-75 rotate-0"
                }`}
                style={{ transitionDelay: "800ms" }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm font-bold text-white">24hr Response</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
