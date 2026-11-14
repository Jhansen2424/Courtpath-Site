"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Cookie notice and "Your Privacy Choices". The only cookies on courtpath.com come from
 * Google's tag: Google Ads (conversion measurement) and Google Analytics 4 (site use); Vercel
 * Analytics sets none. Consent Mode defaults
 * are set in app/layout.tsx before the tag loads: granted unless the visitor declined here or
 * their browser sends Global Privacy Control, which is honored as a decline.
 * The choice is kept in localStorage under CONSENT_KEY; the footer's "Your Privacy Choices"
 * reopens this panel by dispatching OPEN_EVENT.
 */
import { CONSENT_KEY, OPEN_EVENT } from "@/lib/consent";

type Choice = "granted" | "denied";

function applyConsent(choice: Choice) {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  const update = { ad_storage: choice, ad_user_data: choice, ad_personalization: choice, analytics_storage: choice };
  if (typeof w.gtag === "function") w.gtag("consent", "update", update);
  else (w.dataLayer = w.dataLayer || []).push(["consent", "update", update]);
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    const gpcOn = (navigator as unknown as { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
    setGpc(gpcOn);
    let stored: string | null = null;
    try { stored = localStorage.getItem(CONSENT_KEY); } catch { /* storage blocked: ask each visit */ }
    if (!stored && !gpcOn) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (choice: Choice) => {
    try { localStorage.setItem(CONSENT_KEY, choice); } catch { /* ignore */ }
    applyConsent(choice);
    setOpen(false);
  };

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-2 sm:p-6"
    >
      {/* Phones get one short line beside the buttons, so the notice doesn't cover a page's main button. Only the card
          takes clicks (not the full-width strip around it), and on wide screens it sits at the right, clear of the
          left-hand buttons the pages lead with. */}
      <div className="pointer-events-auto mx-auto flex max-w-3xl items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-2xl sm:gap-6 sm:p-5 lg:mr-0 lg:max-w-2xl">
        <div className="flex-1 text-sm text-gray-700">
          <h2 id="cookie-consent-title" className="sr-only sm:not-sr-only sm:mb-1 sm:block sm:text-base sm:font-semibold sm:text-gray-900">
            Cookies on Courtpath
          </h2>
          <p>
            <span className="sm:hidden">Google cookies measure our ads and site use. </span>
            <span className="hidden sm:inline">
              We use Google Ads and Google Analytics cookies to see which of our ads bring attorneys to Courtpath and
              how the site is used. You can decline, and the site works the same.{" "}
            </span>
            <Link href="/privacy#cookies" className="font-medium text-primary underline">
              Privacy Policy
            </Link>
          </p>
          {gpc && (
            <p className="mt-2 text-gray-600">Your browser&rsquo;s Global Privacy Control signal is on, so we treat it as a decline.</p>
          )}
        </div>
        <div className="flex shrink-0 gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 sm:px-5 sm:py-2.5"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark sm:px-5 sm:py-2.5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
