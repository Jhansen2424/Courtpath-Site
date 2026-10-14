import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ClosingCta,
  ContentSection,
  DraftBanner,
  InlineCta,
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

const PATH = "/utah-efiling-providers";
const PAGE = "utah-efiling-providers";
const CHECKED = "October 14, 2026";
const TITLE = "Utah E-Filing Providers Compared: Prices";
const DESCRIPTION =
  "eFlex, GreenFiling, Judicialink, InfoTrack and Courtpath compared: per-filing and monthly prices, trials, staff access, support and signup.";
const TYBERA_UTAH = "https://www.tybera.com/support/utah-support/";

export const revalidate = 3600;

export const metadata = landingMetadata({ title: `${TITLE} | Courtpath`, description: DESCRIPTION, path: PATH });

type Row = { label: string; courtpath: string; eflex: string; greenfiling: string; judicialink: string; infotrack: string };

// Each cell comes from the provider's own website (or, for eFlex, its vendor
// Tybera's Utah support page) on the CHECKED date. Built per render so the
// Courtpath cells follow the offer on January 1. Re-check quarterly.
function buildRows(free: boolean): Row[] {
  return [
    {
      label: "On the courts’ certified list",
      courtpath: "Yes, since December 2019",
      eflex: "Yes, since May 2009",
      greenfiling: "Yes, since September 2010",
      judicialink: "Yes, since November 2012",
      infotrack: "Not on the list; sells Utah e-filing",
    },
    {
      label: "Pay per filing",
      courtpath: free ? "Free until Jan 1, 2027, then $4" : "$4",
      eflex: "$5 without a subscription",
      greenfiling: "$6",
      judicialink: "$3.50",
      infotrack: "$9",
    },
    {
      label: "Unlimited filing",
      courtpath: `${free ? "Free until Jan 1, 2027, then " : ""}$25/month for one attorney; $21–$23 per attorney/month for firms; or from $240/year`,
      eflex: "$26/month, $71/quarter or $270/year",
      greenfiling: "$32 per attorney/month; $22–$30 for groups",
      judicialink: "$19.95 per filer/month; less for 6+ filers or with annual prepay",
      infotrack: "None; per filing only",
    },
    {
      label: "Trial or offer",
      courtpath: free ? "Every plan free until Jan 1, 2027; no card to sign up" : "No subscription needed on Bronze",
      eflex: "30-day trial",
      greenfiling: "First month free",
      judicialink: "30-day trial; guest demo login",
      infotrack: "Free account",
    },
    {
      label: "Paralegal and staff access",
      courtpath: "Paralegal and staff use on Silver, Gold and Platinum",
      eflex: "Not stated",
      greenfiling: "Free support-staff accounts on Plus",
      judicialink: "Unlimited free staff accounts",
      infotrack: "Not stated",
    },
    {
      label: "Support",
      courtpath: "Phone, weekdays 9–5 Mountain",
      eflex: "Phone through Tybera, weekdays 8–5 Mountain",
      greenfiling: "Phone, live chat and email",
      judicialink: "Missed calls returned within 2 hours; email within 24 hours",
      infotrack: "Not stated on its Utah page",
    },
    {
      label: "Getting started",
      courtpath: "Sign up online; account ready within 24 hours",
      eflex: "Request an account and wait for administrator approval",
      greenfiling: "Sign up online",
      judicialink: "Sign up online",
      infotrack: "Sign up online or request a demo",
    },
  ];
}

const COLUMNS: { key: keyof Omit<Row, "label">; name: string }[] = [
  { key: "courtpath", name: "Courtpath" },
  { key: "eflex", name: "eFlex (Utah State Bar)" },
  { key: "greenfiling", name: "GreenFiling" },
  { key: "judicialink", name: "Judicialink" },
  { key: "infotrack", name: "InfoTrack" },
];

export default function ProvidersPage() {
  const { status } = landingEntry(PATH);
  const free = isFreePeriod();
  const rows = buildRows(free);
  const sticky = "sticky left-0 z-10 bg-white";
  return (
    <main>
      <LandingJsonLd path={PATH} title={TITLE} description={DESCRIPTION} checked="2026-10-14" />
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="Compare Utah e-filing providers"
        title="Utah e-filing providers compared"
        intro={
          <p>
            Every certified provider files into the same court system. What differs is price, signup,
            staff access and support. Here’s how eFlex, GreenFiling, Judicialink, InfoTrack and
            Courtpath compare, with sources.
          </p>
        }
        ctaHref="/pricing"
        ctaLabel={pricingCtaLabel()}
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection wide>
        <h2>The comparison</h2>
        <p>
          From each provider’s own website, checked on {CHECKED}. eFlex prices come from its vendor
          Tybera’s Utah support page. Confirm current pricing with the provider before you decide.
        </p>
        <p className="text-sm sm:hidden">Swipe the table sideways to see every provider.</p>
        <div className="overflow-x-auto">
          <table className="min-w-[860px]">
            <thead>
              <tr>
                <td className={sticky}></td>
                {COLUMNS.map((c) => (
                  <th key={c.key} scope="col" className={c.key === "courtpath" ? "bg-accent/10 px-3" : "px-3"}>
                    {c.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className={`${sticky} pr-4`}>
                    {r.label}
                  </th>
                  {COLUMNS.map((c) => (
                    <td key={c.key} className={c.key === "courtpath" ? "bg-accent/10 px-3" : "px-3"}>
                      {r[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm">
          GreenFiling adds $1 per filing for its Auto-File and eFile-by-Email features. Court filing
          fees are separate and the same with every provider.
        </p>

        <InlineCta
          page={PAGE}
          position="after-table"
          href="/pricing"
          label={pricingCtaLabel()}
          note="Try Courtpath on your next filing. You can keep your current provider while you compare."
        />

        <h2>Which provider fits which filer</h2>
        <ul>
          <li>
            <strong>Lowest price per filing:</strong> Judicialink, at $3.50. Then Courtpath at $4,
            eFlex $5, GreenFiling $6 and InfoTrack $9.
          </li>
          <li>
            <strong>Lowest monthly unlimited price for one attorney:</strong> Judicialink, at $19.95.
            Then Courtpath at $25, eFlex $26 and GreenFiling $32.
          </li>
          {free && (
            <li>
              <strong>Free right now:</strong> Courtpath, on every plan until January 1, 2027, with
              no card needed to sign up.
            </li>
          )}
          <li>
            <strong>A guided workflow and phone support:</strong> Courtpath checks a filing as you
            build it, saves drafts automatically, and has a person on the phone in Murray, weekdays
            9 to 5 Mountain.
          </li>
          <li>
            <strong>Practice-management integrations:</strong> InfoTrack advertises filing from
            Clio, MyCase, Smokeball and others, at a higher per-filing price.
          </li>
          <li>
            <strong>The Bar-run option:</strong> eFlex is offered through the Utah State Bar and has
            been certified the longest, since 2009. New accounts need administrator approval.
          </li>
        </ul>
        <p>
          Using eFlex today? See <Link href="/courtpath-vs-eflex">Courtpath vs. eFlex</Link>. New to
          e-filing? Start with <Link href="/utah-efiling">how to e-file in Utah courts</Link>.
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
        options={[
          { plan: "silver", who: "Solo attorney" },
          { plan: "gold", who: "Firm with 2 or more attorneys" },
        ]}
        footnote="Only file now and then? Bronze has no subscription: $4 per filing from 2027."
      />
      <LandingFaq
        faqs={[
          {
            q: "Which e-filing providers are certified in Utah?",
            a: "As of October 2026, the Utah State Courts’ list of certified e-filing service providers names four: the Utah State Bar (eFlex), GreenFiling, Judicialink and Courtpath. Some other services, such as InfoTrack, also sell Utah e-filing.",
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
      <ClosingCta
        page={PAGE}
        heading="Try Courtpath alongside your current provider"
        ctaHref="/pricing"
        ctaLabel={pricingCtaLabel()}
      />
      <SourcesNote
        checked={CHECKED}
        sources={[
          { title: "Certified Electronic Filing Service Providers (Utah State Courts)", url: UTAH_EFSP_LIST_URL },
          { title: "Courtpath pricing", url: "https://www.courtpath.com/pricing" },
          { title: "Utah State Bar eFiling Portal (eFlex)", url: "https://efiling.utahbar.org/" },
          { title: "eFlex: Getting started", url: "https://efiling.utahbar.org/manual/fiGetStarted.htm" },
          { title: "Tybera: Utah support (eFlex subscription rates and support hours)", url: TYBERA_UTAH },
          { title: "GreenFiling: Utah plans and pricing", url: "https://www.greenfiling.com/utah/" },
          { title: "Judicialink: features and pricing", url: "https://judicialink.com/features" },
          { title: "InfoTrack: Utah court filing", url: "https://www.infotrack.com/utah" },
        ]}
      />
      <Footer />
    </main>
  );
}
