"use client";

import { ADS_PHONE_SEND_TO, reportConversion } from "@/lib/ads";
import { track } from "@/lib/analytics";

// A tel: link that reports phone taps. Attorneys and paralegals often call
// before committing a firm to a new EFSP — without this, the phone path is
// invisible to measurement.
//
// Every tap is a GA4 `phone_click` (with `location` saying where on the site).
// The "Phone Click - Website" Google Ads conversion fires only where
// `adsConversion` is left on — the ad landing pages — so the campaign's
// conversion definition stays as it was set up.
export default function PhoneLink({
  href,
  className,
  location,
  adsConversion = true,
  children,
}: {
  href: string;
  className?: string;
  location?: string;
  adsConversion?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        track("phone_click", { location });
        if (adsConversion) reportConversion(ADS_PHONE_SEND_TO);
      }}
    >
      {children}
    </a>
  );
}
