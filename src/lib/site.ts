import type { Metadata } from "next";

export const SITE_URL = "https://www.courtpath.com";
export const SITE_NAME = "Courtpath";

// The e-filing app itself. Swap this for a branded subdomain (e.g.
// app.courtpath.com) once DNS for it exists — every login link reads from here.
export const APP_LOGIN_URL = "https://courtpath-production.up.railway.app/";

// Utah State Courts' list of certified Electronic Filing Service Providers.
export const UTAH_EFSP_LIST_URL =
  "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/providers.html";

export const CONTACT = {
  phoneDisplay: "(801) 797-3119",
  phoneE164: "+18017973119",
  email: "support@courtpath.com",
  linkedIn: "https://www.linkedin.com/company/courtpath",
  street: "480 E Winchester St",
  city: "Murray",
  region: "UT",
  postalCode: "84107",
};

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Courtpath — certified e-filing for Utah courts" };

/**
 * Per-page metadata with a canonical URL and matching Open Graph / Twitter
 * tags. A page-level `openGraph` object replaces the inherited one wholesale,
 * so the share image (app/opengraph-image.tsx) has to be listed explicitly.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
