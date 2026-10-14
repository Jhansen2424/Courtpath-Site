// GA4 measurement for the organic landing pages and the signup funnel.
//
// GA4 loads only when NEXT_PUBLIC_GA4_ID is set (e.g. "G-XXXXXXX" in Vercel),
// so the events below are no-ops until the property exists. Google Ads
// conversions are separate and live in lib/ads.ts.
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

type EventParams = Record<string, string | number | undefined>;

// Events sent here (GA4 recommended names where one exists):
//   sign_up        signup completed            { plan }
//   signup_start   signup form first touched   { plan }
//   generate_lead  contact form submitted      { subject }
//   phone_click    any tel: link tapped        { location }
//   cta_click      landing-page call to action { page, position }
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined" || !GA4_ID) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("event", event, { ...params, send_to: GA4_ID });
}
