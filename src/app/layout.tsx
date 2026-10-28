import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import { ADS_ID } from "@/lib/ads";
import { GA4_ID } from "@/lib/analytics";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        {/* Google tag — site-wide so ad-click gclids are captured on every
            possible landing page. Ads conversions live in lib/ads.ts; GA4
            (when NEXT_PUBLIC_GA4_ID is set) shares the same gtag.js. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-base" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
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
