// Measurement for the landing pages and the signup funnel.
//
// Every event goes to Vercel Web Analytics as a custom event (at most 2
// properties each on our plan); its script loads site-wide from the root
// layout. GA4 gets them too once NEXT_PUBLIC_GA4_ID is set (e.g. "G-XXXXXXX"
// in Vercel). Google Ads conversions are separate and live in lib/ads.ts.
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

type EventParams = Record<string, string | number | undefined>;

declare global {
  interface Window {
    va?: (...args: unknown[]) => void;
    vaq?: unknown[][];
  }
}

// Events sent here (GA4 recommended names where one exists):
//   sign_up         signup completed               { plan }
//   signup_start    signup form first touched      { plan }
//   signup_step     signup moved on to a step      { plan, step }
//   begin_checkout  signup sent on to Stripe       { plan }
//   generate_lead   contact form submitted         { subject }
//   phone_click     any tel: link tapped           { location }
//   cta_click       landing-page call to action    { page, position }
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  // Queued until Vercel's script loads, which drains window.vaq.
  window.va = window.va || ((...args: unknown[]) => { (window.vaq = window.vaq || []).push(args); });
  const data = Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined));
  window.va("event", { name: event, data });

  if (!GA4_ID) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(..._args: unknown[]) {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  }
  gtag("event", event, { ...params, send_to: GA4_ID });
}
