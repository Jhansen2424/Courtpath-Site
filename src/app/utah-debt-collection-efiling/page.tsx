import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Callout from "@/components/blog/Callout";
import {
  ClosingCta,
  ContentSection,
  DraftBanner,
  HowItWorks,
  LandingFaq,
  LandingHero,
  PlanFit,
  ProofStrip,
  SourcesNote,
} from "@/components/landing/Sections";
import { landingMetadata } from "@/lib/landing";
import { landingEntry } from "@/content/landing/registry";

const PATH = "/utah-debt-collection-efiling";
const PAGE = "utah-debt-collection-efiling";
const RULES = "https://legacy.utcourts.gov/rules/view.php";
const SB270 = "https://le.utah.gov/Session/2026/bills/enrolled/SB0270.pdf";
const COURT_NEWS = "https://legacy.utcourts.gov/utc/news/2026/10/";
const MISTAKES_PDF =
  "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs/Attorney_eFiling_Training_Common_Mistakes.pdf";

export const revalidate = 3600;

export const metadata = landingMetadata({
  title: "Utah Debt Collection & Eviction E-Filing | Courtpath",
  description:
    "What SB 270's Debt Collection and Housing Action Division means for collections and eviction filers from January 1, 2027, plus fees, default packets, writs and serving unrepresented defendants.",
  path: PATH,
});

export default function DebtCollectionPage() {
  const { status } = landingEntry(PATH);
  return (
    <main>
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="Debt collection and eviction e-filing"
        title="High-volume filing in Utah, and the new court division coming January 1"
        intro={
          <p>
            Debt collection and eviction cases are moving to a new statewide division of the district
            court in 2027. Courtpath helps collections and landlord firms file at volume, with staff
            access and unlimited plans.
          </p>
        }
        ctaHref="/contact"
        ctaLabel="Talk to us about volume filing"
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>What changes on January 1, 2027</h2>
        <p>
          <a href={SB270}>SB 270</a>, passed in the 2026 session, lets the Judicial Council establish
          a statewide division of the district court for debt collection and housing actions, and it
          takes effect January 1, 2027. Under the bill:
        </p>
        <ul>
          <li>
            <strong>What’s covered:</strong> eviction (forcible entry and detainer) cases, and cases
            eligible to be filed as debt collection cases on or after January 1, 2027.
          </li>
          <li>
            <strong>Where the cases go:</strong> notwithstanding the venue statutes, district courts
            must transfer these cases to the division for centralized pretrial and post-judgment
            processing.
          </li>
          <li>
            <strong>When they go back:</strong> the division can transfer a case to a proper venue if
            it’s set for trial, or if it needs an evidentiary hearing other than an eviction hearing.
          </li>
          <li>
            <strong>Who staffs it:</strong> commissioners and judicial assistants. The courts posted
            four commissioner nominees for public comment on{" "}
            <a href={COURT_NEWS}>October 6, 2026</a>.
          </li>
        </ul>
        <p>
          The courts haven’t yet published filing procedures for the division. We’ll update this page
          as they do. Last checked: October 14, 2026.
        </p>

        <h2>Filing fees for collections and evictions</h2>
        <table>
          <thead>
            <tr>
              <th>Filing</th>
              <th>Fee (from May 6, 2026)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Complaint, claim of $2,000 or less</td>
              <td>$105</td>
            </tr>
            <tr>
              <td>Complaint, over $2,000 and under $10,000</td>
              <td>$215</td>
            </tr>
            <tr>
              <td>Complaint, $10,000 or more</td>
              <td>$375</td>
            </tr>
            <tr>
              <td>Writ of replevin, attachment, execution or garnishment</td>
              <td>$75 (was $50)</td>
            </tr>
          </tbody>
        </table>
        <p className="text-sm">
          Claim amounts exclude court costs, interest and attorney fees. One e-filing can collect at
          most six fees; file the rest separately.
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

        <Callout title="Most defendants won’t be on e-filing">
          <p>
            Defendants in collections and eviction cases are often self-represented. A party without
            a lawyer doesn’t have access to e-filing, so filing through Courtpath doesn’t serve them.
            Serve later documents by email (or mail if they’ve given no email) and include a
            certificate of service. See our guide to{" "}
            <Link href="/blog/utah-rule-5-electronic-service">e-service under URCP 5</Link>.
          </p>
        </Callout>

        <h2>Built for volume</h2>
        <ul>
          <li>
            <strong>Unlimited filing</strong> on Platinum, billed annually, for single- and
            multi-attorney firms.
          </li>
          <li>
            <strong>Paralegal and staff access</strong>, so the people who prepare default packets
            and writs can file them.
          </li>
          <li>
            <strong>Case and hearing tracking</strong> across every case, with deadline reminders.
          </li>
        </ul>
      </ContentSection>

      <HowItWorks />
      <PlanFit
        page={PAGE}
        plan="platinum"
        reason="High-volume collections and eviction firms get the most from annual unlimited filing."
      />
      <LandingFaq
        faqs={[
          {
            q: "What is Utah’s Debt Collection and Housing Action Division?",
            a: "A statewide division of the district court authorized by SB 270 (2026), effective January 1, 2027. District courts transfer debt collection and eviction cases to it for centralized pretrial and post-judgment processing.",
          },
          {
            q: "Do I file debt collection cases differently starting in 2027?",
            a: "The courts haven’t published filing procedures for the division yet. Attorneys will still e-file through a certified provider. We’ll update this page when the courts announce the details.",
          },
          {
            q: "What does a writ of garnishment cost in Utah?",
            a: "$75 since May 6, 2026, up from $50. The same fee applies to writs of replevin, attachment and execution.",
          },
          {
            q: "Do I need to serve a self-represented defendant separately?",
            a: "Yes. Self-represented parties don’t have access to e-filing, so you serve them by email or mail and include a certificate of service with your document.",
          },
        ]}
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
      <ClosingCta
        page={PAGE}
        heading="Get set up before the new division opens"
        ctaHref="/signup/platinum"
        ctaLabel="Start Platinum"
      />
      <Footer />
    </main>
  );
}
