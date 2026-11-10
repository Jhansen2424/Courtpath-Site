import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CONTACT, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service | Courtpath",
  description:
    "The terms that govern use of the Courtpath website, e-filing application and related services: accounts, filings, fees, your content, and disputes.",
  path: "/terms",
});

const EFFECTIVE = "2018-01-01";
const EFFECTIVE_LABEL = "January 1, 2018";
const UPDATED = "2026-11-10";
const UPDATED_LABEL = "November 10, 2026";

// The registered agent's address, the company's legal address for notices. CONTACT has the Murray office.
const TERMS_ADDRESS = "7533 S Center View Ct., Ste. R, West Jordan, UT 84084, USA";

export default function TermsPage() {
  return (
    <main id="main-content">
      <Navbar />
      <header className="bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-40 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Terms of Service</h1>
          <p className="mt-6 text-sm text-white/80">
            Effective date <time dateTime={EFFECTIVE}>{EFFECTIVE_LABEL}</time>
            <span aria-hidden="true"> &middot; </span>
            Last updated <time dateTime={UPDATED}>{UPDATED_LABEL}</time>
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="post-body">
          <p>
            These Terms of Service (“Terms”) govern access to and use of the Courtpath website, applications, and
            related services (collectively, the “Services”). The Services are provided by Courtpath, Inc. (“Courtpath,”
            “we,” “us,” or “our”), located at {TERMS_ADDRESS}.
          </p>
          <p>
            By creating an account, clicking to accept these Terms, or using the Services, you agree to these Terms. If
            you use the Services on behalf of a law firm, company, government body, or other organization, you represent
            that you are authorized to accept these Terms for that organization. In that case, “you” includes the
            organization and its authorized users.
          </p>
          <p>If you do not agree, do not access or use the Services.</p>

          <nav aria-label="Sections" className="rounded-lg border border-gray-200 bg-gray-50 px-6 py-5 text-base">
            <p className="font-semibold text-gray-900">Contents</p>
            <ol className="mt-3 sm:columns-2 sm:gap-8">
              {SECTIONS.map(([id, title]) => (
                <li key={id}>
                  <a href={`#${id}`}>{title}</a>
                </li>
              ))}
            </ol>
          </nav>

          <h2 id="services">1. The Services</h2>
          <p>
            Courtpath provides online tools that may allow users to prepare and submit court filings, access case
            documents and filing information, receive notifications, manage case-related information, make or facilitate
            payments, and request service of process through third parties.
          </p>
          <p>
            Features, supported courts, and availability may change. Some features may be available only for particular
            courts, case types, jurisdictions, or subscription plans. The Services do not guarantee that a court will
            accept, docket, or process any submission.
          </p>
          <p>
            Courtpath is a technology and filing-service provider, not a law firm. Use of the Services does not create an
            attorney-client relationship with Courtpath. Courtpath does not provide legal advice, represent you or your
            clients, select legal strategies, or determine what documents you should file.
          </p>

          <h2 id="accounts">2. Eligibility and accounts</h2>
          <p>
            You may use the Services only if you can form a binding contract and are legally permitted to do so. You must
            provide accurate account and contact information and keep it current.
          </p>
          <p>You are responsible for:</p>
          <ul>
            <li>maintaining the confidentiality of your login credentials;</li>
            <li>all activity under your account, including activity by your authorized users;</li>
            <li>promptly notifying Courtpath of suspected unauthorized access; and</li>
            <li>ensuring that each person using your account is authorized to do so.</li>
          </ul>
          <p>
            You must not share an individual account except as permitted by your plan and account settings. You are
            responsible for your employees’, agents’, and other authorized users’ compliance with these Terms.
          </p>

          <h2 id="responsibilities">3. Your responsibilities for filings and legal matters</h2>
          <p>
            You are solely responsible for the content, accuracy, legality, timing, and consequences of your use of the
            Services, including:
          </p>
          <ul>
            <li>selecting the correct court, case, filing type, parties, and service recipients;</li>
            <li>preparing and reviewing documents and information before submission;</li>
            <li>confirming applicable rules, deadlines, formatting, signatures, fees, and service requirements;</li>
            <li>ensuring that you have authority to submit documents and provide information;</li>
            <li>
              checking submission status and confirming whether a filing was accepted, rejected, docketed, or served; and
            </li>
            <li>taking any necessary action if a submission is delayed, rejected, incomplete, or unsuccessful.</li>
          </ul>
          <p>
            A submission through Courtpath is not proof that a court received or accepted it. Do not rely solely on a
            Courtpath status, notification, calendar, reminder, or timestamp to calculate or meet a legal deadline. Check
            the court’s official record and applicable rules, and keep copies of confirmations and filed documents.
          </p>
          <p>
            Courtpath may provide workflow prompts, validation, calendar entries, reminders, or other automated
            information. These are convenience features only, may be incomplete or delayed, and are not legal advice or a
            substitute for your own review.
          </p>

          <h2 id="third-parties">4. Court, payment, and third-party services</h2>
          <p>
            The Services may connect with or rely on courts, government systems, payment processors, electronic-filing
            networks, process servers, and other third parties. Those parties are not controlled by Courtpath. Their
            systems, requirements, fees, decisions, and availability may change without notice.
          </p>
          <p>
            A court or other authority—not Courtpath—decides whether to accept, reject, process, or docket a filing.
            Courtpath does not control court operations, outages, processing times, fee schedules, or decisions.
          </p>
          <p>
            If you request service of process through the Services, the service is performed by the applicable
            third-party process server or other provider, subject to that provider’s availability and terms. You are
            responsible for verifying that service is legally sufficient and completed when required.
          </p>

          <h2 id="fees">5. Fees, subscriptions, and payment</h2>
          <p>
            You agree to pay the subscription, per-filing, transaction, court, service-of-process, and other fees
            displayed for your selected plan or transaction before you incur them. Court filing fees and other
            third-party charges may be separate from Courtpath’s fees.
          </p>
          <p>
            <strong>Promotional pricing.</strong> Courtpath’s website currently advertises user licenses at no charge
            until January 1, 2027. Unless Courtpath expressly confirms otherwise, this promotion does not waive court
            fees, third-party fees, or other charges disclosed before a transaction. After a promotion ends, fees shown on
            the website, in your account, or at checkout may apply.
          </p>
          <p>
            For paid plans, you authorize Courtpath and its payment processors to charge your selected payment method for
            applicable recurring and transaction fees. Subscription terms, billing frequency, included users and filings,
            and any usage-based charges will be shown when you select or change a plan. You are responsible for
            applicable taxes, excluding taxes on Courtpath’s net income.
          </p>
          <p>
            Unless applicable law requires otherwise or a specific plan or policy says otherwise, fees are non-refundable.
            If a filing is rejected or a transaction fails, any refund or credit will be governed by the refund policy
            disclosed for that charge or, if none is disclosed, determined by Courtpath in good faith and consistent with
            applicable law. Courtpath does not control whether a court or third party refunds its fees.
          </p>
          <p>
            You may cancel a subscription through your account or by contacting Courtpath at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Cancellation takes effect at the end of the
            then-current billing period unless otherwise stated. You remain responsible for fees incurred before
            cancellation.
          </p>

          <h2 id="your-content">6. Your content and case information</h2>
          <p>
            “Your Content” means documents, case information, personal information, messages, and other materials that
            you or your authorized users submit to or store through the Services.
          </p>
          <p>
            You retain your rights in Your Content. You grant Courtpath a limited, non-exclusive license to host, store,
            reproduce, transmit, display, and otherwise process Your Content as reasonably necessary to provide,
            maintain, secure, and support the Services; comply with law; and enforce these Terms. Courtpath may use
            service providers to perform these functions subject to appropriate contractual protections.
          </p>
          <p>
            You represent that you have the rights and permissions necessary to submit Your Content and grant this
            license. You are responsible for obtaining any client, party, or other required consent and for complying
            with professional, court, confidentiality, and data-protection obligations that apply to you.
          </p>
          <p>
            You must not submit information that you are not authorized to disclose or process through the Services. Do
            not submit sensitive personal information unless it is necessary for your use of the Services and you have
            confirmed that doing so is permitted and appropriately protected.
          </p>

          <h2 id="privacy">7. Privacy, security, and retention</h2>
          <p>
            Courtpath’s Privacy Policy, available at <Link href="/privacy">https://www.courtpath.com/privacy</Link>,
            explains how Courtpath collects and uses personal information. The Privacy Policy is incorporated into these
            Terms.
          </p>
          <p>
            Courtpath will use reasonable administrative, technical, and organizational measures designed to protect
            information handled through the Services. No online service can guarantee absolute security. You are
            responsible for maintaining your own copies of important filings, documents, and confirmations.
          </p>
          <p>
            Courtpath’s retention and deletion practices are described in the Privacy Policy or at{" "}
            <Link href="/privacy">https://www.courtpath.com/privacy</Link>.
          </p>
          <p>
            If Courtpath processes personal data on behalf of an organization, the parties may also need a separate
            data-processing agreement.
          </p>

          <h2 id="acceptable-use">8. Acceptable use</h2>
          <p>You must not, and must not help others to:</p>
          <ul>
            <li>use the Services unlawfully, fraudulently, or to violate another person’s rights;</li>
            <li>submit false, misleading, unauthorized, or malicious content;</li>
            <li>access another user’s account or data without permission;</li>
            <li>interfere with, disrupt, probe, or bypass security or access controls;</li>
            <li>reverse engineer, copy, resell, or exploit the Services except as permitted by law or written agreement;</li>
            <li>introduce malware, scrape the Services, or use automated access without Courtpath’s written permission;</li>
            <li>use the Services in a way that could damage Courtpath, a court, another user, or a third party; or</li>
            <li>use the Services to store or transmit content that violates applicable law or court rules.</li>
          </ul>
          <p>
            Courtpath may investigate suspected violations and may remove content or restrict access as reasonably
            necessary to protect users, the Services, or third parties.
          </p>

          <h2 id="intellectual-property">9. Courtpath’s intellectual property</h2>
          <p>
            Courtpath and its licensors own the Services, including their software, design, text, graphics, and
            trademarks, excluding Your Content and third-party materials. Subject to these Terms and your plan, Courtpath
            grants you a limited, non-exclusive, non-transferable, revocable right to use the Services for your internal
            professional or organizational purposes.
          </p>
          <p>You may provide feedback or suggestions. Courtpath may use them without restriction or payment to you.</p>

          <h2 id="links">10. Third-party services and links</h2>
          <p>
            The Services may contain links to or integrations with third-party products and services. Courtpath does not
            control or endorse those services and is not responsible for their content, security, availability, or
            practices. Your use of them may be subject to separate terms and privacy policies.
          </p>

          <h2 id="termination">11. Suspension and termination</h2>
          <p>You may stop using the Services at any time and cancel any subscription as described above.</p>
          <p>
            Courtpath may suspend or restrict access if it reasonably believes that you have violated these Terms, your
            use creates a security or legal risk, payment is overdue, or suspension is needed to protect the Services or
            another person. Where practical, Courtpath will provide notice and an opportunity to address the issue.
            Courtpath may terminate access for a material or repeated violation, or as otherwise permitted by law.
          </p>
          <p>
            When access ends, your right to use the Services ends. Sections that by their nature should survive—including
            payment obligations, ownership, disclaimers, liability limits, indemnification, and dispute terms—will
            continue to apply. Data access, export, and deletion after termination are governed by the Privacy Policy
            and any applicable data-processing agreement.
          </p>

          <h2 id="changes-to-services">12. Service changes and availability</h2>
          <p>
            Courtpath may update, modify, or discontinue features. Courtpath will use reasonable efforts to provide notice
            of material changes when practical. Courtpath does not guarantee uninterrupted, error-free, or continuous
            availability, and may conduct maintenance, respond to security issues, or address third-party outages.
          </p>

          <h2 id="disclaimers">13. Disclaimers</h2>
          <p>
            To the fullest extent permitted by law, the Services are provided “as is” and “as available.” Courtpath
            disclaims all express or implied warranties, including warranties of merchantability, fitness for a
            particular purpose, title, non-infringement, and any warranty that the Services will be uninterrupted,
            error-free, secure, or result in court acceptance or timely processing of a filing.
          </p>
          <p>
            Courtpath does not warrant the accuracy or completeness of court records, deadlines, notifications,
            calendars, forms, validation checks, or other information provided through or obtained from the Services. You
            are responsible for independently verifying important information with the court or other authoritative
            source.
          </p>
          <p>Nothing in these Terms excludes a warranty or right that cannot legally be excluded.</p>

          <h2 id="liability">14. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Courtpath and its affiliates, officers, employees, agents, and
            licensors will not be liable for indirect, incidental, special, consequential, exemplary, or punitive
            damages; lost profits, revenue, business, goodwill, or data; missed deadlines; rejected or delayed filings;
            or costs of obtaining substitute services, arising out of or related to the Services or these Terms, even if
            advised that such damages are possible.
          </p>
          <p>
            To the fullest extent permitted by law, the total liability of Courtpath and its affiliates for all claims
            arising out of or related to the Services or these Terms will not exceed the greater of (a) the amounts you
            paid to Courtpath for the Services in the 12 months before the event giving rise to the claim, or (b) US$100.
          </p>
          <p>
            These limitations apply regardless of the legal theory and even if a remedy fails of its essential purpose.
            They do not limit liability where applicable law does not permit that limitation.
          </p>

          <h2 id="indemnification">15. Indemnification</h2>
          <p>
            To the extent permitted by law, you will defend and indemnify Courtpath and its affiliates, officers,
            employees, and agents against third-party claims, losses, liabilities, and reasonable expenses arising from
            your unlawful use of the Services, Your Content, your violation of these Terms, or your infringement of
            another person’s rights. Courtpath will give you reasonable notice of the claim and allow you to control the
            defense and settlement, provided you may not settle a claim in a way that imposes liability or obligations on
            Courtpath without Courtpath’s written consent.
          </p>

          <h2 id="changes">16. Changes to these Terms</h2>
          <p>
            Courtpath may update these Terms. For material changes, Courtpath will provide reasonable notice through the
            Services, by email, or by posting an updated version with a new effective date. Changes apply from the stated
            effective date. Your continued use after that date means you accept the updated Terms. If you do not agree,
            stop using the Services and cancel any subscription.
          </p>

          <h2 id="governing-law">17. Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of the State of Utah, excluding its conflict-of-law rules, except where
            federal law or non-waivable consumer protections apply.
          </p>
          <p>
            Any lawsuit arising out of or related to these Terms or the Services must be brought in the state courts of
            the Third Judicial District in Salt Lake County, Utah, or in the United States District Court for the
            District of Utah, and each party consents to that jurisdiction and venue, except where applicable law
            requires otherwise.
          </p>

          <h2 id="general">18. General terms</h2>
          <p>
            These Terms, together with the Privacy Policy and any applicable order form or data-processing agreement, are
            the entire agreement between you and Courtpath concerning the Services. If an order form conflicts with these
            Terms, the order form controls for that conflict.
          </p>
          <p>
            You may not assign these Terms without Courtpath’s written consent, except as part of a merger,
            reorganization, or sale of substantially all your assets. Courtpath may assign these Terms in connection with
            a merger, reorganization, or sale of its business or assets.
          </p>
          <p>
            If a provision is unenforceable, it will be modified to the minimum extent necessary, and the remaining
            provisions will remain in effect. A party’s failure to enforce a provision is not a waiver. These Terms do not
            create an agency, partnership, joint venture, or employment relationship. Headings are for convenience only.
          </p>

          <h2 id="contact">19. Contact</h2>
          <p>Questions or notices about these Terms may be sent to:</p>
          <address className="not-italic">
            Courtpath, Inc.
            <br />
            {TERMS_ADDRESS}
            <br />
            Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <br />
            Phone: <a href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</a>
          </address>
        </div>
      </article>
      <Footer />
    </main>
  );
}

const SECTIONS: [string, string][] = [
  ["services", "The Services"],
  ["accounts", "Eligibility and accounts"],
  ["responsibilities", "Your responsibilities for filings and legal matters"],
  ["third-parties", "Court, payment, and third-party services"],
  ["fees", "Fees, subscriptions, and payment"],
  ["your-content", "Your content and case information"],
  ["privacy", "Privacy, security, and retention"],
  ["acceptable-use", "Acceptable use"],
  ["intellectual-property", "Courtpath’s intellectual property"],
  ["links", "Third-party services and links"],
  ["termination", "Suspension and termination"],
  ["changes-to-services", "Service changes and availability"],
  ["disclaimers", "Disclaimers"],
  ["liability", "Limitation of liability"],
  ["indemnification", "Indemnification"],
  ["changes", "Changes to these Terms"],
  ["governing-law", "Governing law and disputes"],
  ["general", "General terms"],
  ["contact", "Contact"],
];
