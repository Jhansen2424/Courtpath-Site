import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Callout from "@/components/blog/Callout";
import {
  ClosingCta,
  ContentSection,
  DraftBanner,
  LandingFaq,
  LandingHero,
  LandingJsonLd,
  PlanFit,
  ProofStrip,
  SourcesNote,
} from "@/components/landing/Sections";
import { landingMetadata } from "@/lib/landing";
import { landingEntry } from "@/content/landing/registry";
import { planCtaLabel } from "@/lib/offer";

const PATH = "/utah-debt-collection-efiling";
const PAGE = "utah-debt-collection-efiling";
const RULES = "https://legacy.utcourts.gov/rules/view.php";
const SB270 = "https://le.utah.gov/Session/2026/bills/enrolled/SB0270.pdf";
const COURT_NEWS = "https://legacy.utcourts.gov/utc/news/2026/10/";
const MISTAKES_PDF =
  "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs/Attorney_eFiling_Training_Common_Mistakes.pdf";
const TITLE = "Utah Debt Collection & Eviction E-Filing";
const DESCRIPTION =
  "How SB 270's new debt collection and eviction division works, plus current Utah filing fees, default packets, writs and serving unrepresented defendants.";
// SB 270 (2026) takes effect at midnight Mountain time on January 1, 2027.
const SB270_EFFECTIVE = "2027-01-01T07:00:00Z";

export const revalidate = 3600;

export const metadata = landingMetadata({ title: `${TITLE} | Courtpath`, description: DESCRIPTION, path: PATH });

export default function DebtCollectionPage() {
  const { status } = landingEntry(PATH);
  // Evaluated per render so the tense flips with the law's effective date.
  const inEffect = Date.now() >= Date.parse(SB270_EFFECTIVE);
  return (
    <main>
      <LandingJsonLd path={PATH} title={TITLE} description={DESCRIPTION} checked="2026-10-14" />
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow={inEffect ? "SB 270 took effect January 1, 2027" : "New law takes effect January 1, 2027"}
        title="Utah debt collection and eviction e-filing"
        intro={
          <p>
            SB 270 lets Utah’s courts move debt collection and eviction cases into one centralized
            division. Courtpath helps collections and landlord firms file at volume, with unlimited
            plans and paralegal and staff use.
          </p>
        }
        ctaHref="/signup/platinum"
        ctaLabel={planCtaLabel("Platinum")}
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>SB 270 and the new division</h2>
        <p>
          <a href={SB270}>SB 270</a>, passed in the 2026 session, lets the Judicial Council establish
          a division of the district court to manage debt collection and housing actions. The law{" "}
          {inEffect ? "took" : "takes"} effect January 1, 2027, and the courts{" "}
          {inEffect ? "have been preparing" : "are preparing"} to implement it. Under the bill, once
          the division is established:
        </p>
        <ul>
          <li>
            <strong>What’s covered:</strong> eviction (forcible entry and detainer) cases, and cases
            eligible to be filed as debt collection cases on or after January 1, 2027.
          </li>
          <li>
            <strong>Where the cases go:</strong> district courts must transfer these cases to the
            division for centralized pretrial and post-judgment processing, whichever county they
            were filed in.
          </li>
          <li>
            <strong>When they go back:</strong> the division can send a case to the proper venue if
            it’s set for trial, or if it needs an evidentiary hearing other than an eviction hearing.
          </li>
          <li>
            <strong>Who staffs it:</strong> commissioners and judicial assistants. The courts posted
            four nominees for two commissioner positions for public comment on{" "}
            <a href={COURT_NEWS}>October 6, 2026</a>.
          </li>
        </ul>
        <p>
          As of October 14, 2026, the courts hadn’t published filing procedures for the division.
          We’ll update this page when they do.
        </p>

        <h2>Complaint and writ fees</h2>
        <table>
          <thead>
            <tr>
              <th scope="col">Filing</th>
              <th scope="col">Fee since May 6, 2026</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Complaint, claim of $2,000 or less</td>
              <td>$105</td>
            </tr>
            <tr>
              <td>Complaint, claim over $2,000 and under $10,000</td>
              <td>$215</td>
            </tr>
            <tr>
              <td>Complaint, claim of $10,000 or more</td>
              <td>$375</td>
            </tr>
            <tr>
              <td>Writ of replevin, attachment, execution or garnishment</td>
              <td>$75 (was $50)</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm">
          For the two lower tiers, the claim amount excludes court costs, interest and attorney fees.
          One e-filing collects at most six filing fees; past that, file separately, pay online or
          contact the court.
        </p>

        <h2>Default packets and judgments</h2>
        <p>From the courts’ attorney training on common mistakes:</p>
        <ul>
          <li>
            Enter the principal judgment amount on the judgment details screen. Leaving it blank can
            put the filing on hold.
          </li>
          <li>
            Select the right judgment creditors and debtors, and make sure the amounts you enter add
            up to the total.
          </li>
          <li>
            Don’t type “Proposed” on the judgment. The system marks it as proposed, and a typed word
            can’t be removed once the judge signs.
          </li>
          <li>If only the judgment is declined, resubmit the judgment, not the whole packet.</li>
          <li>
            File each defendant’s summons and proof of service together as one PDF, under the
            “Summons on Return” document type.
          </li>
        </ul>

        <h2>Writs of execution and garnishment</h2>
        <p>The courts’ guidance for a writ of execution:</p>
        <ul>
          <li>There must be a final judgment against the party the writ names.</li>
          <li>Fourteen calendar days must have passed since the judgment was entered.</li>
          <li>No stay or satisfaction of judgment can be on file, and no bankruptcy pending.</li>
        </ul>
        <p>
          Only the application (as a PDF) and the writ (as RTF, for the court’s signature) are
          e-filed. The notice of execution and exemptions, the reply and request for hearing, and
          similar forms go with the writ when it’s served. Garnishments follow the same practice.
        </p>

        <Callout title="Self-represented defendants aren’t served by e-filing">
          <p>
            Only attorneys and Licensed Paralegal Practitioners can use a provider like Courtpath, so
            filing doesn’t serve a defendant who has no lawyer. Serve later documents by email, or by
            mail if they’ve given no email, and include a certificate of service. See our guide to{" "}
            <Link href="/blog/utah-rule-5-electronic-service">e-service under URCP 5</Link>.
          </p>
        </Callout>

        <h2>Built for volume</h2>
        <ul>
          <li>
            <strong>Unlimited filing</strong> on Platinum, billed annually, for firms with two or
            more attorneys.
          </li>
          <li>
            <strong>Paralegal and staff use</strong> included, for the people who prepare default
            packets and writs.
          </li>
          <li>
            <strong>Case and document access</strong> across every case in one dashboard.
          </li>
        </ul>
        <p>
          New to Utah e-filing? Start with <Link href="/utah-efiling">how to e-file in Utah courts</Link>
          , or see our step-by-step guide to{" "}
          <Link href="/blog/how-to-efile-new-civil-case-utah-district-court">
            e-filing a new civil case
          </Link>
          .
        </p>
      </ContentSection>

      <PlanFit
        page={PAGE}
        options={[
          { plan: "platinum", who: "Collections or eviction firm" },
          { plan: "silver", who: "Solo attorney" },
        ]}
        footnote="Filing only occasionally? Bronze has no subscription: $4 per filing from 2027."
      />
      <LandingFaq
        faqs={[
          {
            q: "What is Utah’s Debt Collection and Housing Action Division?",
            a: "A district court division that SB 270 (2026) lets the Judicial Council establish, effective January 1, 2027. Once it’s established, district courts must transfer debt collection and eviction cases to it for centralized pretrial and post-judgment processing.",
          },
          {
            q: "Do I file debt collection cases differently under SB 270?",
            a: "As of October 14, 2026, the courts hadn’t published filing procedures for the division. Attorneys will still e-file through a certified provider. We’ll update this page when the courts announce the details.",
          },
          {
            q: "What does a writ of garnishment cost in Utah?",
            a: "$75 since May 6, 2026, up from $50. The same fee applies to writs of replevin, attachment and execution.",
          },
          {
            q: "Do I need to serve a self-represented defendant separately?",
            a: "Yes. Only attorneys and Licensed Paralegal Practitioners can use a provider like Courtpath, so filing doesn’t serve a defendant without a lawyer. Serve them by email or mail and include a certificate of service with your document.",
          },
        ]}
      />
      <ClosingCta
        page={PAGE}
        heading="Set up your firm for high-volume filing"
        ctaHref="/signup/platinum"
        ctaLabel={planCtaLabel("Platinum")}
      />
      <SourcesNote
        checked="October 14, 2026"
        sources={[
          { title: "SB 270 (2026), State Court Amendments, enrolled copy", url: SB270 },
          { title: "Utah Courts news: Debt Collection and Housing Action Division commissioners", url: COURT_NEWS },
          {
            title: "SB 283 (2026), Court Fees and Administration Amendments",
            url: "https://le.utah.gov/Session/2026/bills/enrolled/SB0283.pdf",
          },
          {
            title: "Utah court filing fees (effective May 6, 2026)",
            url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/fees.html",
          },
          { title: "Electronic Filing: How Will Common Mistakes Affect You as Counsel?", url: MISTAKES_PDF },
          { title: "URCP Rule 5: Service and filing", url: `${RULES}?type=urcp&rule=5` },
        ]}
      />
      <Footer />
    </main>
  );
}
