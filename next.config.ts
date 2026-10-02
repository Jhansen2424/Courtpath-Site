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
];

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },
  async redirects() {
    return legacyRedirects.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
