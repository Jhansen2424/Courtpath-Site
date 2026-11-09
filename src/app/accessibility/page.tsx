import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Accessibility | Courtpath",
  description: "Courtpath's commitment to an accessible website, the standard we follow, and how to report a barrier.",
  path: "/accessibility",
});

const UPDATED = "2026-11-09";
const UPDATED_LABEL = "November 9, 2026";

export default function AccessibilityPage() {
  return (
    <main id="main-content">
      <Navbar />
      <header className="bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Accessibility</h1>
          <p className="mt-6 text-sm text-white/80">
            Last updated <time dateTime={UPDATED}>{UPDATED_LABEL}</time>
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="post-body">
          <p>
            Courtpath wants every attorney and staff member to be able to use courtpath.com, including people who use
            screen readers, keyboard navigation, magnification or other assistive technology.
          </p>

          <h2>The standard we follow</h2>
          <p>
            We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. We test the site with automated
            accessibility checks and by hand, including keyboard-only navigation, and we fix problems as we find them.
          </p>

          <h2>What we have in place</h2>
          <ul>
            <li>A &ldquo;Skip to main content&rdquo; link at the top of every page.</li>
            <li>Text and buttons with color contrast that meets WCAG AA.</li>
            <li>Labels on every form field and on buttons and links that use only an icon.</li>
            <li>Visible keyboard focus on links, buttons and form fields.</li>
            <li>Animations turned off for visitors whose system asks for reduced motion.</li>
          </ul>

          <h2>Report a barrier</h2>
          <p>
            If any part of courtpath.com is hard to use, please tell us and we will help you and work on a fix. Email{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, call{" "}
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>, or use our{" "}
            <Link href="/contact">contact page</Link>. Let us know the page and what you were trying to do.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
