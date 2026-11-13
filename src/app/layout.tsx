import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import { ADS_ID } from "@/lib/ads";
import { GA4_ID } from "@/lib/analytics";
import CookieConsent from "@/components/CookieConsent";
import { CONSENT_KEY } from "@/lib/consent";
import { SITE_DEMO } from "@/lib/plans";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Courtpath | Utah Court E-Filing",
  description: "Certified e-filing for Utah district and justice courts.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: "Courtpath Incorporated",
  url: SITE_URL,
  logo: `${SITE_URL}/images/courtlogo.png`,
  description:
    "Certified Electronic Filing Service Provider for the Utah State District and Justice Courts.",
  email: CONTACT.email,
  telephone: CONTACT.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: CONTACT.street,
    addressLocality: CONTACT.city,
    addressRegion: CONTACT.region,
    postalCode: CONTACT.postalCode,
    addressCountry: "US",
  },
  areaServed: { "@type": "State", name: "Utah" },
  sameAs: [CONTACT.linkedIn],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* First stop for keyboard and screen-reader users (WCAG 2.4.1); each page's <main id="main-content"> has this id. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-primary focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {SITE_DEMO && (
          <div role="note" className="fixed bottom-3 left-3 z-[55] rounded-full bg-amber-100 text-amber-900 text-xs font-medium px-3 py-1.5 shadow-md">
            Preview copy, not the live site
          </div>
        )}
        <CookieConsent />
        {/* Google tag — site-wide so ad-click gclids are captured on every
            possible landing page. Consent Mode defaults come first: declined
            (CookieConsent) or Global Privacy Control means no ad cookies. Ads conversions live in lib/ads.ts; GA4
            (lib/analytics.ts) shares the same gtag.js. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-base" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function(){var c=null;try{c=localStorage.getItem('${CONSENT_KEY}')}catch(e){}
var off=c==='denied'||navigator.globalPrivacyControl===true;var v=off?'denied':'granted';
gtag('consent','default',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v,wait_for_update:500});})();
gtag('js', new Date());
gtag('config', '${ADS_ID}');${GA4_ID ? `
gtag('config', '${GA4_ID}');` : ""}`}
        </Script>
        {/* Vercel Web Analytics — page views on every page (including
            client-side navigation) plus the events lib/analytics.ts sends. */}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
