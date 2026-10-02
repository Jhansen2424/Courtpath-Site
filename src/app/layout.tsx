import type { Metadata } from "next";
import "./globals.css";
import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";

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
      </body>
    </html>
  );
}
