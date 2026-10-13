// Google Ads conversion tracking for the Courtpath acquisition campaigns.
//
// The base tag loads site-wide from the root layout — it must run on the
// LANDING pages (not just the success page) so the gclid from an ad click is
// captured into the _gcl_aw cookie; a conversion fired later has nothing to
// attribute to without it.
export const ADS_ID = "AW-18509546692";

// "Signup Complete" conversion action (primary) — fires on /checkout/success.
export const ADS_SIGNUP_SEND_TO = "AW-18509546692/yAV_CMWRz5odEMSJhfpE";

// "Phone Click - Website" conversion action (secondary) — fires on tel: links.
export const ADS_PHONE_SEND_TO = "AW-18509546692/wcXBCPr_15odEMSJhfpE";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Pushing an arguments object onto dataLayer is safe whether or not gtag.js
// has finished loading — the library drains the queue when it initializes.
export function reportConversion(sendTo: string) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("event", "conversion", { send_to: sendTo });
}
