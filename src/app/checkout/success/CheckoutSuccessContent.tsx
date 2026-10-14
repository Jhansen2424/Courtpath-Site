"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { APP_LOGIN_URL } from "@/lib/site";
import { ADS_SIGNUP_SEND_TO, reportConversion } from "@/lib/ads";
import { track } from "@/lib/analytics";


export default function CheckoutSuccessContent() {
  // --- Stripe-backed account creation is disabled. All plans are free, so we
  // just confirm the submission and let the user know we'll be in touch. ---
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg] = useState<string | null>(null);
  // ready = the app account was created on signup; exists = that email already has one;
  // pending = it will be set up by hand (the old "allow 24 hours" message).
  const [account, setAccount] = useState<"ready" | "exists" | "pending">("pending");

  useEffect(() => {
    const a = new URL(window.location.href).searchParams.get("account");
    if (a === "ready" || a === "exists") setAccount(a);
    const t = setTimeout(() => setStatus("success"), 400);
    return () => clearTimeout(t);
  }, []);

  // Report the "Signup Complete" conversion once per signup — only when the
  // ?plan= param is present, i.e. the visitor came through the signup flow
  // rather than loading this URL directly. The param is then dropped from the
  // URL, so a reload, back/forward or Strict Mode's second effect run can't
  // count the same signup twice.
  useEffect(() => {
    const url = new URL(window.location.href);
    const plan = url.searchParams.get("plan");
    if (!plan) return;
    reportConversion(ADS_SIGNUP_SEND_TO);
    track("sign_up", { plan });
    url.searchParams.delete("plan");
    window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
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
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          Thank you for signing up!
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {account === "ready"
            ? "Your account is ready. Log in with the email and password you just chose."
            : account === "exists"
            ? "You already have a Courtpath account with this email. Log in with your existing password, or contact us if you need help getting in."
            : "Please allow 24 hours for account creation."}
        </p>
        <p className="text-xl text-gray-600 mb-8">
          You can login here:{" "}
          <a href={APP_LOGIN_URL} className="text-accent underline break-all">
            {APP_LOGIN_URL}
          </a>
        </p>
        <p className="text-xl font-semibold text-gray-900">Happy filing!</p>
      </div>
    </section>
  );
}
