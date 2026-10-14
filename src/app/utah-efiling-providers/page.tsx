import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ClosingCta,
  ContentSection,
  DraftBanner,
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

const PATH = "/utah-efiling-providers";
const PAGE = "utah-efiling-providers";
const CHECKED = "October 14, 2026";

export const revalidate = 3600;

export const metadata = landingMetadata({
  title: "Utah E-Filing Providers Compared (2026) | Courtpath",
  description:
    "Prices, sign-up, staff accounts and trials for every Utah e-filing provider, side by side, with sources. Checked October 2026.",
  path: PATH,
});

// Each cell comes from the provider's own website on the CHECKED date (see
// Sources). Re-check quarterly; prices change.
// Built per render so the Courtpath cells follow the offer on January 1.
function buildRows(FREE: boolean) {
  const ROWS: { label: string; courtpath: string; eflex: string; greenfiling: string; judicialink: string; infotrack: string }[] = [
  {
    label: "On the courts’ certified provider list",
    courtpath: "Yes, since December 2019",
    eflex: "Yes (Utah State Bar), since May 2009",
    greenfiling: "Yes, since September 2010",
    judicialink: "Yes, since November 2012",
    infotrack: "Not listed; sells Utah e-filing",
  },
  {
    label: "Pay per filing",
    courtpath: FREE ? "Free until Jan 1, 2027, then $4" : "$4",
    eflex: "Price not published",
    greenfiling: "$6",
    judicialink: "$3.50",
    infotrack: "$9",
  },
  {
    label: "Unlimited subscription",
    courtpath: "$25/month (one attorney); from $21 per attorney/month (firms); from $240/year",
    eflex: "Price not published",
    greenfiling: "$32 per attorney/month; $22–$30 for groups",
    judicialink: "$19.95 per filer/month, less for 6+ filers and with annual prepay",
    infotrack: "None; per filing only",
  },
  {
    label: "Trial or launch offer",
    courtpath: FREE ? "All plans free until Jan 1, 2027; no card" : "No subscription needed on Bronze",
    eflex: "30-day trial",
    greenfiling: "First month free",
    judicialink: "30-day trial; guest demo login",
    infotrack: "Free account",
  },
  {
    label: "Staff and paralegal accounts",
    courtpath: "Included on Silver, Gold and Platinum",
    eflex: "Not published",
    greenfiling: "Free on the Plus plan",
    judicialink: "Unlimited, free",
    infotrack: "Not published",
  },
  {
    label: "Getting started",
    courtpath: "Online signup; account ready within 24 hours",
    eflex: "Request an account; wait for administrator approval; buy a subscription",
    greenfiling: "Online signup",
    judicialink: "Online signup",
    infotrack: "Online signup or demo request",
  },
];
  return ROWS;
}

export default function ProvidersPage() {
  const { status } = landingEntry(PATH);
  const FREE = isFreePeriod();
  const ROWS = buildRows(FREE);
  return (
    <main>
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="Utah e-filing providers compared"
        title="Every Utah e-filing provider, side by side"
        intro={
          <p>
            All certified providers file into the same court system. What differs is price, how you
            sign up, staff access and support. Here’s how they compare, with sources.
          </p>
        }
        ctaHref="/pricing"
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>The comparison</h2>
        <p>
          Prices and terms below come from each provider’s own website, checked on {CHECKED}. Confirm
          current pricing with the provider before you decide.
        </p>
        <p className="text-sm sm:hidden">Swipe the table sideways to see every provider.</p>
        <div className="overflow-x-auto">
          <table className="min-w-[720px]">
            <thead>
              <tr>
                <th></th>
                <th>Courtpath</th>
                <th>eFlex (Utah State Bar)</th>
                <th>GreenFiling</th>
                <th>Judicialink</th>
                <th>InfoTrack</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  <td>{r.courtpath}</td>
                  <td>{r.eflex}</td>
                  <td>{r.greenfiling}</td>
                  <td>{r.judicialink}</td>
                  <td>{r.infotrack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          GreenFiling adds $1 per filing for its Auto-File and eFile-by-Email features. Court filing
          fees are separate and the same with every provider.
        </p>

        <h2>Which provider fits which filer</h2>
        <ul>
          <li>
            <strong>Lowest per-filing price after 2026:</strong> Judicialink, at $3.50. Courtpath is
            $4, GreenFiling $6 and InfoTrack $9.
          </li>
          {FREE && (
            <li>
              <strong>Free right now:</strong> Courtpath, on every plan until January 1, 2027, with
              no card required.
            </li>
          )}
          <li>
            <strong>Practice-management integrations:</strong> InfoTrack advertises filing from
            Clio, MyCase, Smokeball and others, at a higher per-filing price.
          </li>
          <li>
            <strong>The Bar-run option:</strong> eFlex is offered through the Utah State Bar and is
            widely used. New accounts need administrator approval, and prices aren’t published on
            the portal.
          </li>
          <li>
            <strong>Firms with paralegals and staff:</strong> Courtpath, GreenFiling and Judicialink
            all offer staff accounts on at least some plans.
          </li>
        </ul>
        <p>
          Comparing Courtpath with the most common choice? See{" "}
          <Link href="/courtpath-vs-eflex">Courtpath vs. eFlex</Link>.
        </p>

        <h2>What switching involves</h2>
        <p>
          Your cases and filed documents live with the court, not with your provider, so there’s
          nothing to export. You can open a Courtpath account while you still have another provider
          and compare them on real filings. Courtpath’s monthly plans have no long-term contract.
        </p>
      </ContentSection>

      <PlanFit
        page={PAGE}
        plan="gold"
        reason="Most firms start on Gold. Solo attorneys usually choose Silver, and occasional filers choose Bronze."
      />
      <LandingFaq
        faqs={[
          {
            q: "Are all Utah e-filing providers certified by the courts?",
            a: "The Utah State Courts certify providers for district and justice courts. As of October 2026, four are listed: the Utah State Bar (eFlex), GreenFiling, Judicialink and Courtpath. Some other services, such as InfoTrack, also sell Utah e-filing.",
          },
          {
            q: "Do e-filing providers charge court filing fees?",
            a: "Court filing fees are set by statute and are the same with every provider; the provider collects them when you file. Provider fees are separate.",
          },
          {
            q: "Can I use more than one provider?",
            a: "Yes. Each provider files into the same court system, so you can try a new provider without leaving your current one.",
          },
        ]}
      />
      <SourcesNote
        checked={CHECKED}
        sources={[
          { title: "Certified Electronic Filing Service Providers (Utah State Courts)", url: UTAH_EFSP_LIST_URL },
          { title: "Courtpath pricing", url: "https://www.courtpath.com/pricing" },
          { title: "Utah State Bar eFiling Portal (eFlex)", url: "https://efiling.utahbar.org/" },
          { title: "eFlex: Getting started", url: "https://efiling.utahbar.org/manual/fiGetStarted.htm" },
          { title: "GreenFiling: Utah plans and pricing", url: "https://www.greenfiling.com/utah/" },
          { title: "Judicialink: features and pricing", url: "https://judicialink.com/features" },
          { title: "InfoTrack: Utah court filing", url: "https://www.infotrack.com/utah" },
        ]}
      />
      <ClosingCta page={PAGE} heading="Try Courtpath alongside your current provider" ctaHref="/pricing" />
      <Footer />
    </main>
  );
}
