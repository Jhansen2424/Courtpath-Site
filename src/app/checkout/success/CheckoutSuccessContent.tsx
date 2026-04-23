"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COURTPATH_LOGIN = "https://courtpath-production.up.railway.app";

export default function CheckoutSuccessContent() {
  // --- Stripe-backed account creation is disabled. All plans are free, so we
  // just confirm the submission and let the user know we'll be in touch. ---
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setStatus("success"), 400);
    return () => clearTimeout(t);
  }, []);

  if (status === "loading") {
    return (
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Submitting your signup&hellip;</h1>
          <p className="text-gray-500">Please don&apos;t close this page.</p>
        </div>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-lg mx-auto px-4 py-32 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-8">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Something Went Wrong</h1>
          <p className="text-gray-600 mb-2">
            We couldn&apos;t finish submitting your signup. Please try again or contact us.
          </p>
          {errorMsg && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2 mb-6">{errorMsg}</p>
          )}
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all"
          >
            Contact Support
          </Link>
        </div>
      </section>
    );
  }

  // success
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Thanks for signing up!{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Welcome to Courtpath.
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          We&apos;ve received your information and will be in touch shortly to get your account set up.
        </p>
        <p className="text-sm text-gray-400 mb-8">
          Already have an account?{" "}
          <a href={COURTPATH_LOGIN} className="text-accent underline">
            Sign in here
          </a>
        </p>
      </div>
    </section>
  );
}
