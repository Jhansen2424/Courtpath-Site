"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { APP_LOGIN_URL } from "@/lib/site";
import { ADS_SIGNUP_SEND_TO, reportConversion } from "@/lib/ads";
import { track } from "@/lib/analytics";
import { formatDate, freeUntil, nameForBillingKey } from "@/lib/plans";

type Account = "ready" | "exists" | "linked" | "pending";

const REDIRECT_SECONDS = 4;

export default function CheckoutSuccessContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [account, setAccount] = useState<Account>("pending");
  const [kind, setKind] = useState<"signup" | "card">("signup");
  const [planKey, setPlanKey] = useState<string | null>(null);
  // a one-time link that opens the app already signed in (new accounts only)
  const [loginUrl, setLoginUrl] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    // Strict Mode runs effects twice in development; one confirmation is enough.
    if (ran.current) return;
    ran.current = true;
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");
    const plan = url.searchParams.get("plan");
    setPlanKey(plan);
    if (!sessionId) {
      setErrorMsg("This page needs the link Stripe sends you back with.");
      setStatus("error");
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/create-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (!res.ok) { setErrorMsg(data.error || null); setStatus("error"); return; }
        setAccount(data.account);
        setKind(data.kind === "card" ? "card" : "signup");
        if (typeof data.loginUrl === "string") setLoginUrl(data.loginUrl);
        // Report the "Signup Complete" conversion once per signup, then drop ?plan= so a reload can't count it again.
        if (plan && data.kind !== "card") {
          reportConversion(ADS_SIGNUP_SEND_TO);
          track("sign_up", { plan });
          url.searchParams.delete("plan");
          window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
        }
        setStatus("success");
      } catch {
        setErrorMsg("Network error while confirming your signup.");
        setStatus("error");
      }
    })();
  }, []);

  // Once the account exists, take them on to the app: signed in with the one-time link, or to the
  // sign-in page without one. The short wait lets the conversion tags above finish reporting
  // before the page unloads.
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);
  const signInUrl = loginUrl ?? `${APP_LOGIN_URL.replace(/\/$/, "")}/login${account === "ready" ? "?welcome=1" : ""}`;
  useEffect(() => {
    if (status !== "success" || account === "pending") return;
    if (secondsLeft <= 0) {
      window.location.assign(signInUrl);
      return;
    }
    const t = setTimeout(() => setSecondsLeft((n) => n - 1), 1000);
    return () => clearTimeout(t);
  }, [status, account, secondsLeft, signInUrl]);

  if (status === "loading") {
    return (
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Setting up your account&hellip;</h1>
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
            We couldn&apos;t confirm your signup. If you entered a card, it is safe: contact us and we&apos;ll finish setting you up.
          </p>
          {errorMsg && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2 mb-6">{errorMsg}</p>}
          <Link href="/contact" className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all">
            Contact Support
          </Link>
        </div>
      </section>
    );
  }

  const message =
    account === "ready" ? "Your account is ready. We also emailed you a link to confirm your address; confirm it before your first filing."
    : account === "exists" ? "You already had a Courtpath account with this email, so we added your card to it. Log in with your existing password."
    : account === "linked" ? "Your card is on file for your Courtpath plan."
    : "Your card is on file. Please allow 24 hours for us to finish setting up your account.";

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-8">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
          {kind === "card" ? "Thank you!" : "Thank you for signing up!"}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{message}</p>
        <p className="text-gray-500 mb-8">
          {kind === "card"
            ? "You won't be charged before January 1, 2027."
            : `Your free period on ${nameForBillingKey(planKey)} runs through ${formatDate(freeUntil())}, and your card won't be charged before then.`}
        </p>
        {account === "pending" ? (
          <p className="text-xl text-gray-600 mb-8">
            You can log in here:{" "}
            <a href={APP_LOGIN_URL} className="text-accent underline break-all">{APP_LOGIN_URL}</a>
          </p>
        ) : (
          <div className="mb-8">
            <a
              href={signInUrl}
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all"
            >
              {loginUrl ? "Open Courtpath" : "Sign in now"}
            </a>
            <p className="mt-4 text-gray-500" aria-live="polite">
              {`Taking you to ${loginUrl ? "Courtpath" : "sign in"}${secondsLeft > 0 ? ` in ${secondsLeft}s` : ""}…`}
            </p>
          </div>
        )}
        <p className="text-xl font-semibold text-gray-900">Happy filing!</p>
      </div>
    </section>
  );
}
