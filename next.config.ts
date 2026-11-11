import type { NextConfig } from "next";
import { APP_LOGIN_URL } from "./src/lib/site";

// URLs from the old WordPress site that search engines and bookmarks still
// point at. Each one goes to its closest equivalent on the current site.
const legacyRedirects = [
  { source: "/about-us", destination: "/about" },
  { source: "/tutorial-videos", destination: "/tutorials" },
  { source: "/courtpath-demo", destination: "/tutorials" },
  { source: "/frequently-asked-questions", destination: "/pricing#faq" },
  { source: "/plans", destination: "/pricing" },
  { source: "/shop", destination: "/pricing" },
  { source: "/cart", destination: "/pricing" },
  { source: "/checkout", destination: "/pricing" },
  { source: "/product/:slug*", destination: "/pricing" },
  { source: "/product-category/:slug*", destination: "/pricing" },
  { source: "/register", destination: "/pricing" },
  { source: "/support", destination: "/contact" },
  { source: "/easy-e-filing", destination: "/" },
  { source: "/simple-e-filing", destination: "/" },
  { source: "/home-extended", destination: "/" },
  { source: "/login", destination: APP_LOGIN_URL },
  { source: "/lostpassword", destination: APP_LOGIN_URL },
  { source: "/my-account/:slug*", destination: APP_LOGIN_URL },
  // the paid-traffic landing page under the old free-until-2027 launch special
  { source: "/free-until-2027", destination: "/free-trial" },
];

// Preview deployments (every branch but main) are the website's staging copies. California sign-up
// and the /california page are on there and off on courtpath.com until California filing goes
// live (CALIFORNIA_SIGNUP_OPEN in src/lib/plans.ts); previews also say they're a copy (SITE_DEMO).
// Fixed at build time, like every NEXT_PUBLIC_ value.
const preview = process.env.VERCEL_ENV === "preview";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_CALIFORNIA_SIGNUP: process.env.NEXT_PUBLIC_CALIFORNIA_SIGNUP || (preview ? "1" : ""),
    NEXT_PUBLIC_SITE_DEMO: process.env.NEXT_PUBLIC_SITE_DEMO || (preview ? "1" : ""),
  },
  images: {
    qualities: [100, 75],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
