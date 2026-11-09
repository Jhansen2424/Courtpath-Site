import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrivacyChoicesLink from "@/components/PrivacyChoicesLink";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy | Courtpath",
  description: "What information courtpath.com collects, how it is used and shared, the cookies we use, and your choices.",
  path: "/privacy",
});

const UPDATED = "2026-11-09";
const UPDATED_LABEL = "November 9, 2026";

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <Navbar />
      <header className="bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Privacy Policy</h1>
          <p className="mt-6 text-sm text-white/80">
            Last updated <time dateTime={UPDATED}>{UPDATED_LABEL}</time>
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="post-body">
          <p>
            This policy explains what information Courtpath Incorporated (&ldquo;Courtpath&rdquo;, &ldquo;we&rdquo;)
            collects through courtpath.com, how we use and share it, and the choices you have. Courtpath is located at{" "}
            {CONTACT.street}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}.
          </p>

          <h2>Information we collect</h2>
          <ul>
            <li>
              <strong>Contact form:</strong> your name, email address, phone number and message.
            </li>
            <li>
              <strong>Account sign-up:</strong> your name, email address, password, Utah bar number and the number of
              attorneys at your firm, used to create your Courtpath account.
            </li>
            <li>
              <strong>Payment details:</strong> card details are entered with and processed by Stripe, our payment
              processor. Courtpath does not store full card numbers.
            </li>
            <li>
              <strong>Site usage:</strong> pages visited and general device information, through Vercel Web Analytics
              (which uses no cookies), and ad-click information through the Google Ads tag described under{" "}
              <a href="#cookies">Cookies</a>.
            </li>
          </ul>

          <h2>How we use it</h2>
          <ul>
            <li>To answer your questions and provide support.</li>
            <li>To create and run your Courtpath account, including billing.</li>
            <li>To understand how the site is used and which of our ads bring visitors to it.</li>
            <li>To meet legal obligations and protect our service.</li>
          </ul>

          <h2>Who we share it with</h2>
          <p>
            We do not sell your personal information. We share it only with service providers that run parts of our
            service for us: Stripe (payments), Vercel (website hosting and analytics), Railway (hosting of the Courtpath
            application), our email provider (delivering messages) and Google (ad measurement, if you allow it). We may
            also disclose information when the law requires it.
          </p>
          <p>
            When you file documents through the Courtpath application, the information in your filing goes to the court
            and its e-filing system, as the filing requires.
          </p>

          <h2 id="cookies">Cookies</h2>
          <p>
            Courtpath&rsquo;s own pages set no cookies. The Google Ads tag can set a cookie (named <code>_gcl_au</code>,
            kept for about 90 days) so we can tell which of our ads led to a visit or sign-up. Vercel Web Analytics sets
            no cookies.
          </p>
          <p>
            When you first visit, we ask whether to allow the Google Ads cookie. You can change your answer at any time
            with <PrivacyChoicesLink className="font-medium text-primary underline" /> at the bottom of every page. Your
            choice is remembered in your browser&rsquo;s local storage, not in a cookie.
          </p>

          <h2>Global Privacy Control and Do Not Track</h2>
          <p>
            If your browser sends a Global Privacy Control signal, we treat it as a request to opt out, and the Google Ads
            cookie is not used. Our site does not change its behavior in response to the older &ldquo;Do Not Track&rdquo;
            browser setting.
          </p>

          <h2>Your choices and rights</h2>
          <p>
            You can ask us to access, correct or delete the personal information we hold about you by emailing{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Depending on where you live, you may have additional
            rights under state law; we will honor the requests that apply to you.
          </p>

          <h2>Keeping your information</h2>
          <p>
            We keep information for as long as we need it to provide the service, keep accurate business records and meet
            legal obligations, and we use reasonable safeguards to protect it.
          </p>

          <h2>Children</h2>
          <p>courtpath.com is for legal professionals and is not directed to children under 13.</p>

          <h2>Changes to this policy</h2>
          <p>
            If we change this policy, we will post the new version here and update the date at the top.
          </p>

          <h2>Contact us</h2>
          <p>
            Email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, call{" "}
            <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>, or use our{" "}
            <Link href="/contact">contact page</Link>.
          </p>
        </div>
      </article>
      <Footer />
    </main>
  );
}
