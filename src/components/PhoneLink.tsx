"use client";

import { ADS_PHONE_SEND_TO, reportConversion } from "@/lib/ads";

// A tel: link that reports the "Phone Click - Website" Google Ads conversion.
// Attorneys and paralegals often call before committing a firm to a new
// EFSP — without this, the phone path is invisible to campaign measurement.
export default function PhoneLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => reportConversion(ADS_PHONE_SEND_TO)}>
      {children}
    </a>
  );
}
