"use client";

import { OPEN_EVENT } from "@/lib/consent";

/** Footer link that reopens the cookie choices panel (CookieConsent). */
export default function PrivacyChoicesLink({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Your Privacy Choices
    </button>
  );
}
