"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light";

const STYLES = {
  primary: `inline-block px-8 py-4 bg-accent text-white font-semibold rounded-lg text-center transition-all hover:bg-accent-dark hover:shadow-lg ${FOCUS}`,
  ghostDark: `inline-block px-8 py-4 text-white font-medium rounded-lg border border-white/25 text-center hover:bg-white/5 transition-all ${FOCUS}`,
  ghostLight: `inline-block px-8 py-4 text-primary font-medium rounded-lg border border-primary/25 text-center hover:bg-primary/5 transition-all ${FOCUS}`,
};

// A landing-page call to action that reports `cta_click` with the page and
// its position on the page, so each section's pull can be compared.
export default function LandingCta({
  href,
  page,
  position,
  variant = "primary",
  children,
}: {
  href: string;
  page: string;
  position: string;
  variant?: keyof typeof STYLES;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={STYLES[variant]}
      onClick={() => track("cta_click", { page, position })}
    >
      {children}
    </Link>
  );
}
