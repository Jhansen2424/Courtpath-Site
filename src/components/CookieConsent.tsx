"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Cookie notice and "Your Privacy Choices". The only cookies on courtpath.com come from the
 * Google Ads tag (conversion measurement); Vercel Analytics sets none. Consent Mode defaults
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
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-2xl sm:flex sm:items-center sm:gap-6">
        <div className="flex-1 text-sm text-gray-700">
          <h2 id="cookie-consent-title" className="mb-1 text-base font-semibold text-gray-900">
            Cookies on Courtpath
          </h2>
          <p>
            We use a Google Ads cookie to see which of our ads bring attorneys to Courtpath. Our site analytics use no
            cookies. You can decline, and the site works the same.{" "}
            <Link href="/privacy#cookies" className="font-medium text-primary underline">
              Privacy Policy
            </Link>
          </p>
          {gpc && (
            <p className="mt-2 text-gray-600">Your browser&rsquo;s Global Privacy Control signal is on, so we treat it as a decline.</p>
          )}
        </div>
        <div className="mt-4 flex gap-3 sm:mt-0 sm:shrink-0">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
