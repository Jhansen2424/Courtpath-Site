import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
import { UTAH_EFSP_LIST_URL } from "@/lib/site";
import { isFreePeriod } from "@/lib/offer";

const PATH = "/utah-efiling";
const PAGE = "utah-efiling";
const RULES = "https://legacy.utcourts.gov/rules/view.php";

// Rebuild hourly so the offer copy flips on January 1 without a deploy.
export const revalidate = 3600;

export const metadata = landingMetadata({
  title: "Utah E-Filing for Attorneys: How to Start | Courtpath",
  description:
    "Who must e-file in Utah courts, the four certified e-filing providers, what it costs, and how to start. From Courtpath, a certified Utah e-filing provider.",
  path: PATH,
});

export default function UtahEfilingPage() {
  const { status } = landingEntry(PATH);
  return (
    <main>
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="Utah e-filing guide"
        title="E-filing in Utah courts, explained, and a faster way to do it"
        intro={
          <p>
            Utah attorneys must e-file through a court-certified provider. Courtpath is one of four,
            built by Utah attorneys for the people who actually do the filing.
          </p>
        }
        ctaHref="/pricing"
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>Who has to e-file in Utah</h2>
        <p>
          Utah requires attorneys to file electronically in most trial-court cases. Which system you
          use depends on the court:
        </p>
        <table>
          <thead>
            <tr>
              <th>Court and case type</th>
              <th>Who must e-file</th>
              <th>How</th>
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
              <td>Attorneys and agencies</td>
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
          Self-represented parties don’t have to e-file. They can file by email, mail, in person, or
          through the courts’ MyCase site for some case types. That matters for service: a party
          without a lawyer isn’t served through e-filing, so you serve them another way and include a
          certificate of service. Our guide to{" "}
          <Link href="/blog/utah-rule-5-electronic-service">e-service under URCP 5</Link> covers the
          details.
        </p>

        <h2>Utah’s certified e-filing providers</h2>
        <p>
          The Utah State Courts certify a short list of e-filing service providers for district and
          justice courts. As of October 2026, the{" "}
          <a href={UTAH_EFSP_LIST_URL}>courts’ list</a> names four: the Utah State Bar (eFlex),
          GreenFiling, Judicialink and Courtpath. They all file into the same court system, so the
          differences are price, how you sign up, staff access and support. See them side by side in{" "}
          <Link href="/utah-efiling-providers">Utah e-filing providers compared</Link>.
        </p>

        <h2>What e-filing costs</h2>
        <p>There are two separate costs, and searchers often mix them up:</p>
        <ul>
          <li>
            <strong>Court filing fees</strong> are set by statute and are the same whichever
            provider you use. A complaint for $10,000 or more is $375, and a divorce petition is $350
            (fees effective May 6, 2026).
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

        <h2>Courts Courtpath doesn’t cover</h2>
        <p>
          Juvenile and appellate filings go through the courts’ own systems, not through providers
          like Courtpath. Out-of-state attorneys admitted pro hac vice can’t e-file in Utah state
          courts directly; their local counsel files for them.
        </p>
      </ContentSection>

      <HowItWorks />
      <PlanFit
        page={PAGE}
        plan="gold"
        reason="Most firms start on Gold. Solo attorneys usually choose Silver, and occasional filers choose Bronze."
      />
      <LandingFaq
        faqs={[
          {
            q: "Is e-filing mandatory in Utah?",
            a: "For attorneys, yes, in district court civil, probate, domestic and criminal cases, and in justice court criminal cases. Self-represented parties may still file on paper, by email or through MyCase.",
          },
          {
            q: "Which e-filing providers are certified in Utah?",
            a: "As of October 2026, the Utah State Courts list four certified providers for district and justice courts: the Utah State Bar (eFlex), GreenFiling, Judicialink and Courtpath.",
          },
          {
            q: "Can paralegals e-file in Utah?",
            a: "Staff can prepare and submit filings through an attorney’s account; the attorney or Licensed Paralegal Practitioner of record is the filer. Courtpath’s Silver, Gold and Platinum plans include paralegal and staff access.",
          },
          {
            q: "Can I switch e-filing providers in the middle of a case?",
            a: "Yes. Every certified provider files into the same court system, so your cases and their documents stay with the court, not with the provider. When you log in to Courtpath, your existing cases are already there.",
          },
        ]}
      />
      <SourcesNote
        checked="October 14, 2026"
        sources={[
          { title: "Certified Electronic Filing Service Providers (Utah State Courts)", url: UTAH_EFSP_LIST_URL },
          {
            title: "eFiling in District and Justice Courts",
            url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/district.html",
          },
          { title: "UCJA Rule 4-503: Mandatory electronic filing", url: `${RULES}?rule=4-503&type=ucja` },
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
      <ClosingCta page={PAGE} heading="Ready to file with Courtpath?" ctaHref="/pricing" />
      <Footer />
    </main>
  );
}
