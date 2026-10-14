import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import { UTAH_EFSP_LIST_URL } from "@/lib/site";
import { isFreePeriod, pricingCtaLabel } from "@/lib/offer";

const PATH = "/utah-efiling";
const PAGE = "utah-efiling";
const RULES = "https://legacy.utcourts.gov/rules/view.php";
const TITLE = "How to E-File in Utah Courts: Rules and Costs";
const DESCRIPTION =
  "Who must e-file in Utah courts, which system each court uses, what it costs and how to start, from Courtpath, a court-certified e-filing provider.";

// Rebuild hourly so the offer copy follows the January 1 change without a deploy.
export const revalidate = 3600;

export const metadata = landingMetadata({ title: `${TITLE} | Courtpath`, description: DESCRIPTION, path: PATH });

export default function UtahEfilingPage() {
  const { status } = landingEntry(PATH);
  return (
    <main>
      <LandingJsonLd path={PATH} title={TITLE} description={DESCRIPTION} checked="2026-10-14" />
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="Utah e-filing guide"
        title="How to e-file in Utah courts"
        intro={
          <p>
            Utah attorneys must e-file, and in district court that means using a court-certified
            provider. Here’s who must file, what it costs and how to start. Courtpath is one of the
            four certified providers.
          </p>
        }
        ctaHref="/pricing"
        ctaLabel={pricingCtaLabel()}
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>Who has to e-file in Utah</h2>
        <p>
          Utah requires attorneys to e-file in district, juvenile and appellate courts, and in
          criminal cases in justice court. Which system you use depends on the court:
        </p>
        <table>
          <thead>
            <tr>
              <th scope="col">Court and case type</th>
              <th scope="col">Who must e-file</th>
              <th scope="col">How</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>District court: civil, probate and domestic</td>
              <td>
                Attorneys and Licensed Paralegal Practitioners (
                <a href={`${RULES}?rule=4-503&type=ucja`}>UCJA 4-503</a>)
              </td>
              <td>A certified e-filing provider, such as Courtpath</td>
            </tr>
            <tr>
              <td>District and justice court: criminal</td>
              <td>Attorneys (UCJA 4-603 and 9-302)</td>
              <td>A certified provider; government attorneys can also use the courts’ own portal</td>
            </tr>
            <tr>
              <td>Juvenile court</td>
              <td>Attorneys and agencies (UCJA 4-901)</td>
              <td>The courts’ CARE system</td>
            </tr>
            <tr>
              <td>Supreme Court and Court of Appeals</td>
              <td>Attorneys, since August 1, 2024</td>
              <td>The courts’ appellate e-filing system</td>
            </tr>
          </tbody>
        </table>
        <p>
          Attorneys who can’t e-file can ask the Judicial Council for a hardship exemption.
          Self-represented parties don’t have to e-file. They file by email, mail, in person, or
          through the courts’ MyCase site for some case types.
        </p>
        <p>
          That matters for service. Only attorneys and Licensed Paralegal Practitioners can use a
          provider like Courtpath, so filing through one doesn’t serve a self-represented party. You
          serve them by email or mail and include a certificate of service. Our guide to{" "}
          <Link href="/blog/utah-rule-5-electronic-service">e-service under URCP 5</Link> covers the
          details.
        </p>

        <h2>Choosing a provider</h2>
        <p>
          The Utah State Courts keep a <a href={UTAH_EFSP_LIST_URL}>list of certified e-filing
          service providers</a>. All of them file into the same court system, so the differences are
          price, signup, staff access and support. See them side by side in{" "}
          <Link href="/utah-efiling-providers">Utah e-filing providers compared</Link>, or{" "}
          <Link href="/courtpath-vs-eflex">Courtpath vs. eFlex</Link> if you use the Bar’s portal
          today.
        </p>

        <h2>What e-filing costs</h2>
        <p>There are two separate costs, and people often mix them up:</p>
        <ul>
          <li>
            <strong>Court filing fees</strong> are set by statute and are the same whichever
            provider you use. A complaint for $10,000 or more is $375, and a divorce petition is $350
            (fees effective May 6, 2026). They’re charged to your card when you file.
          </li>
          <li>
            <strong>Provider fees</strong> are what the e-filing service charges, either per filing
            or as a subscription.{" "}
            {isFreePeriod()
              ? "Courtpath is free until January 1, 2027, and then starts at $4 per filing."
              : "Courtpath starts at $4 per filing, with no subscription required."}
          </li>
        </ul>

        <h2>How to start e-filing</h2>
        <ol>
          <li>Pick a certified provider and create an account with your Utah Bar number.</li>
          <li>Add a card for court filing fees, which are charged when you file.</li>
          <li>
            File a new case or enter an appearance in an existing one. Our step-by-step guide to{" "}
            <Link href="/blog/how-to-efile-new-civil-case-utah-district-court">
              e-filing a new civil case
            </Link>{" "}
            covers courthouses, formats and fees.
          </li>
        </ol>
        <p>
          Collections and eviction firms: a new court division for those cases is authorized from
          January 1, 2027. See <Link href="/utah-debt-collection-efiling">debt collection and
          eviction e-filing</Link>.
        </p>

        <h2>Courts Courtpath doesn’t cover</h2>
        <p>
          Juvenile and appellate filings go through the courts’ own systems, not through providers
          like Courtpath. Out-of-state attorneys admitted pro hac vice can’t e-file in Utah district
          court directly; their local counsel files for them.
        </p>
      </ContentSection>

      <PlanFit
        page={PAGE}
        options={[
          { plan: "silver", who: "Solo attorney" },
          { plan: "gold", who: "Firm with 2 or more attorneys" },
        ]}
        footnote="Only file now and then? Bronze has no subscription: $4 per filing from 2027."
      />
      <LandingFaq
        faqs={[
          {
            q: "Is e-filing mandatory in Utah?",
            a: "For attorneys, yes: in district court civil, probate, domestic and criminal cases, justice court criminal cases, juvenile court (through CARE) and the appellate courts (since August 1, 2024). Attorneys can ask the Judicial Council for a hardship exemption. Self-represented parties may still file on paper, by email or through MyCase.",
          },
          {
            q: "Can paralegals e-file in Utah?",
            a: "The electronic filer must be an attorney or Licensed Paralegal Practitioner of record, using their own identifier (UCJA 4-503), and the courts don’t allow account holders to give system access to people without an account. Courtpath’s Silver, Gold and Platinum plans include paralegal and staff use; ask us how staff access works for your firm.",
          },
          {
            q: "Can I switch e-filing providers in the middle of a case?",
            a: "Yes. Every certified provider files into the same court system, so your cases and their documents stay with the court, not with the provider. Cases where you’re counsel of record are available when you log in to Courtpath.",
          },
          {
            q: "Does the court charge a fee to e-file?",
            a: "Courts charge their usual filing fees for the document you file, the same as on paper. The e-filing provider charges separately for its service.",
          },
        ]}
      />
      <ClosingCta page={PAGE} heading="Ready to file with Courtpath?" ctaHref="/pricing" ctaLabel={pricingCtaLabel()} />
      <SourcesNote
        checked="October 14, 2026"
        sources={[
          { title: "Certified Electronic Filing Service Providers (Utah State Courts)", url: UTAH_EFSP_LIST_URL },
          {
            title: "eFiling in District and Justice Courts",
            url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/district.html",
          },
          { title: "UCJA Rule 4-503: Mandatory electronic filing", url: `${RULES}?rule=4-503&type=ucja` },
          { title: "UCJA Rule 4-901: Electronic filing in juvenile court", url: `${RULES}?rule=4-901&type=ucja` },
          {
            title: "eFiling in the Appellate Courts",
            url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/appellate.html",
          },
          {
            title: "Utah court filing fees (effective May 6, 2026)",
            url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/fees.html",
          },
        ]}
      />
      <Footer />
    </main>
  );
}
