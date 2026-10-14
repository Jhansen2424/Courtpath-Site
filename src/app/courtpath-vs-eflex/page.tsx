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

const PATH = "/courtpath-vs-eflex";
const PAGE = "courtpath-vs-eflex";
const CHECKED = "October 14, 2026";
const TITLE = "Courtpath vs. eFlex: Utah E-Filing Compared";
const DESCRIPTION =
  "How Courtpath and the Utah State Bar's eFlex portal compare on price, signup, staff access and support, with sources, and what switching from eFlex involves.";
const TYBERA_UTAH = "https://www.tybera.com/support/utah-support/";

export const revalidate = 3600;

export const metadata = landingMetadata({ title: `${TITLE} | Courtpath`, description: DESCRIPTION, path: PATH });

type Row = { label: string; courtpath: string; eflex: string };

// From each provider's site (eFlex prices and hours from its vendor Tybera's
// Utah support page) on the CHECKED date. Built per render so the Courtpath
// cells follow the offer on January 1.
function buildRows(free: boolean): Row[] {
  const until = free ? "Free until Jan 1, 2027, then " : "";
  return [
    {
      label: "Certified by the Utah State Courts",
      courtpath: "Since December 2019",
      eflex: "Since May 2009, offered through the Utah State Bar",
    },
    {
      label: "Getting started",
      courtpath: "Sign up online; account ready within 24 hours",
      eflex: "Request an account, then wait for administrator approval",
    },
    {
      label: "Pay per filing",
      courtpath: `${until}$4 (Bronze)`,
      eflex: "$5 without a subscription",
    },
    {
      label: "Unlimited, monthly",
      courtpath: `${until}$25 for one attorney; $21–$23 per attorney for firms`,
      eflex: "$26/month, or $71/quarter",
    },
    {
      label: "Unlimited, yearly",
      courtpath: `${until}from $240 (Platinum, for firms)`,
      eflex: "$270/year",
    },
    {
      label: "Trial or offer",
      courtpath: free ? "Every plan free until Jan 1, 2027; no card to sign up" : "No subscription needed on Bronze",
      eflex: "30-day trial",
    },
    {
      label: "Paralegal and staff access",
      courtpath: "Paralegal and staff use on Silver, Gold and Platinum",
      eflex: "Not stated",
    },
    {
      label: "Phone support",
      courtpath: "Courtpath, weekdays 9–5 Mountain",
      eflex: "Tybera, weekdays 8–5 Mountain",
    },
  ];
}

export default function CourtpathVsEflexPage() {
  const { status } = landingEntry(PATH);
  const free = isFreePeriod();
  const rows = buildRows(free);
  return (
    <main>
      <LandingJsonLd path={PATH} title={TITLE} description={DESCRIPTION} checked="2026-10-14" />
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="An eFlex alternative"
        title="Courtpath vs. eFlex for Utah e-filing"
        intro={
          <p>
            eFlex is the Utah State Bar’s e-filing portal. Courtpath files into the same courts for
            a little less per filing and per month, with online signup and paralegal and staff use
            built in.
          </p>
        }
        ctaHref="/pricing"
        ctaLabel={pricingCtaLabel()}
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>Side by side</h2>
        <p>
          From each provider’s own website, checked on {CHECKED}. eFlex prices and support hours
          come from its vendor Tybera’s Utah support page.
        </p>
        <table>
          <thead>
            <tr>
              <td></td>
              <th scope="col" className="bg-accent/10 px-3">
                Courtpath
              </th>
              <th scope="col" className="px-3">
                eFlex
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label}>
                <th scope="row" className="pr-4">
                  {r.label}
                </th>
                <td className="bg-accent/10 px-3">{r.courtpath}</td>
                <td className="px-3">{r.eflex}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <InlineCta
          page={PAGE}
          position="after-table"
          href="/pricing"
          label={pricingCtaLabel()}
          note="Try Courtpath on your next filing. You can keep eFlex while you compare."
        />

        <h2>The same courts, a different experience</h2>
        <p>
          Every certified provider files into the same court system. The court accepts, rejects and
          dockets your filing the same way whichever provider you use. What changes is everything
          around the filing:
        </p>
        <ul>
          <li>
            <strong>A guided filing workflow</strong> that checks your filing as you build it and
            saves drafts automatically, so problems surface before you submit.
          </li>
          <li>
            <strong>Case and document access</strong> across all your cases in one dashboard.
          </li>
          <li>
            <strong>Electronic service on every plan.</strong> Opposing counsel are served through
            the court’s system when you file, since every attorney filing in district court has an
            e-filing account.
          </li>
          <li>
            <strong>A person on the phone</strong> in Murray, weekdays 9 to 5 Mountain.
          </li>
        </ul>

        <h2>When eFlex may be the better fit</h2>
        <p>
          If your firm has prepaid an eFlex subscription, it may make sense to use it until it runs
          out. Some attorneys also prefer a system offered through the Bar. Either way, nothing stops
          you from opening a Courtpath account alongside eFlex and comparing them on real filings.
        </p>

        <h2>Switching from eFlex</h2>
        <ol>
          <li>Create a Courtpath account with your Utah Bar number.</li>
          <li>
            We set up your account within 24 hours. Your cases live with the court, not with eFlex,
            so there’s nothing to export, and cases where you’re counsel of record are there when
            you log in.
          </li>
          <li>File your next document through Courtpath. Keep eFlex until you’re sure.</li>
        </ol>
        <p>
          Comparing more than two? See{" "}
          <Link href="/utah-efiling-providers">all Utah e-filing providers compared</Link>.
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
            q: "Is Courtpath certified like eFlex?",
            a: "Yes. Both are on the Utah State Courts’ list of certified e-filing service providers. Courtpath has been certified since December 2019.",
          },
          {
            q: "Will I lose access to my existing cases if I switch?",
            a: "No. Cases and filed documents are held by the court, not the provider, so cases where you’re counsel of record are available when you log in to Courtpath.",
          },
          {
            q: "Can I use Courtpath and eFlex at the same time?",
            a: "Yes. You can try Courtpath on a few filings before deciding whether to switch fully.",
          },
          {
            q: free ? "What does Courtpath cost after the free period?" : "What does Courtpath cost?",
            a: "$4 per filing with no subscription (Bronze); $25 a month for unlimited filing for one attorney (Silver); $21 to $23 per attorney a month for firms (Gold); or from $240 a year billed annually (Platinum, for firms).",
          },
        ]}
      />
      <ClosingCta
        page={PAGE}
        heading={free ? "Try Courtpath next to eFlex, free until 2027" : "Try Courtpath next to eFlex"}
        ctaHref="/pricing"
        ctaLabel={pricingCtaLabel()}
      />
      <SourcesNote
        checked={CHECKED}
        sources={[
          { title: "Certified Electronic Filing Service Providers (Utah State Courts)", url: UTAH_EFSP_LIST_URL },
          { title: "Utah State Bar eFiling Portal (eFlex)", url: "https://efiling.utahbar.org/" },
          { title: "eFlex: Getting started", url: "https://efiling.utahbar.org/manual/fiGetStarted.htm" },
          { title: "Tybera: Utah support (eFlex subscription rates and support hours)", url: TYBERA_UTAH },
          { title: "Courtpath pricing", url: "https://www.courtpath.com/pricing" },
        ]}
      />
      <Footer />
    </main>
  );
}
