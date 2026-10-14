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

const PATH = "/courtpath-vs-eflex";
const PAGE = "courtpath-vs-eflex";
const CHECKED = "October 14, 2026";

export const revalidate = 3600;

export const metadata = landingMetadata({
  title: "Courtpath vs. eFlex: Utah E-Filing Compared | Courtpath",
  description:
    "How Courtpath and the Utah State Bar's eFlex portal compare on sign-up, pricing, trials and staff access, with sources, plus what switching involves.",
  path: PATH,
});

// Built per render so the Courtpath cells follow the offer on January 1.
function buildRows(FREE: boolean) {
  const ROWS: { label: string; courtpath: string; eflex: string }[] = [
  {
    label: "Who offers it",
    courtpath: "Courtpath, a Utah company in Murray, built by attorneys",
    eflex: "The Utah State Bar",
  },
  {
    label: "Certified by the Utah State Courts",
    courtpath: "Since December 2019",
    eflex: "Since May 2009",
  },
  {
    label: "Getting started",
    courtpath: "Sign up online; account ready within 24 hours",
    eflex: "Request an account, wait for administrator approval, then purchase a subscription",
  },
  {
    label: "Trial or offer",
    courtpath: FREE ? "Every plan free until January 1, 2027; no card" : "No subscription needed on Bronze ($4 per filing)",
    eflex: "30-day trial",
  },
  {
    label: "Published pricing",
    courtpath: "Yes: $4 per filing, or unlimited from $25/month or $240/year",
    eflex: "Not published on the portal",
  },
  {
    label: "Paralegal and staff access",
    courtpath: "Included on Silver, Gold and Platinum",
    eflex: "Not published",
  },
];
  return ROWS;
}

export default function CourtpathVsEflexPage() {
  const { status } = landingEntry(PATH);
  const FREE = isFreePeriod();
  const ROWS = buildRows(FREE);
  return (
    <main>
      <Navbar />
      <LandingHero
        page={PAGE}
        eyebrow="Courtpath vs. eFlex"
        title="Looking at an alternative to eFlex?"
        intro={
          <p>
            eFlex, offered through the Utah State Bar, is the e-filing portal many Utah attorneys
            started on. Courtpath files into the same courts, with published prices, online signup
            and a filing workflow built for paralegals.
          </p>
        }
        ctaHref="/signup/gold"
      />
      <DraftBanner status={status} />
      <ProofStrip />

      <ContentSection>
        <h2>Side by side</h2>
        <p>
          From each provider’s own website, checked on {CHECKED}. Confirm current eFlex pricing with
          the Utah State Bar.
        </p>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Courtpath</th>
              <th>eFlex</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                <td>{r.courtpath}</td>
                <td>{r.eflex}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>The same courts, a different experience</h2>
        <p>
          Every certified provider files into the same court system. The court accepts, rejects and
          dockets your filing the same way whichever provider you use. What changes is everything
          around the filing:
        </p>
        <ul>
          <li>
            <strong>A guided filing workflow</strong> with real-time validation and auto-saved
            drafts, so problems surface before you submit.
          </li>
          <li>
            <strong>Case and document access</strong> across all your cases, with hearing dates and
            deadline reminders.
          </li>
          <li>
            <strong>Electronic service on every plan.</strong> Opposing counsel are served through
            the court’s system when you file.
          </li>
          <li>
            <strong>A person on the phone</strong> in Murray, Monday to Friday, 9 to 5 Mountain.
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
            Log in. Your cases live with the court, not with eFlex, so there’s nothing to export or
            migrate.
          </li>
          <li>File your next document through Courtpath. You can keep eFlex until you’re sure.</li>
        </ol>
        <p>
          Still deciding between providers? See{" "}
          <Link href="/utah-efiling-providers">all four Utah providers compared</Link>.
        </p>
      </ContentSection>

      <HowItWorks />
      <PlanFit
        page={PAGE}
        plan="gold"
        reason="Firms switching from eFlex usually start on Gold. Solo attorneys choose Silver."
      />
      <LandingFaq
        faqs={[
          {
            q: "Is Courtpath certified like eFlex?",
            a: "Yes. Both are on the Utah State Courts’ list of certified e-filing service providers for district and justice courts. Courtpath has been certified since December 2019.",
          },
          {
            q: "Will I lose access to my existing cases if I switch?",
            a: "No. Cases and filed documents are held by the court, not the provider, so they’re available when you log in to Courtpath.",
          },
          {
            q: "Can I use Courtpath and eFlex at the same time?",
            a: "Yes. You can try Courtpath on a few filings before deciding whether to switch fully.",
          },
          {
            q: "What does Courtpath cost after the free period?",
            a: "From January 1, 2027: $4 per filing with no subscription, $25 a month for unlimited filing for one attorney, from $21 per attorney a month for firms, or from $240 a year.",
          },
        ]}
      />
      <SourcesNote
        checked={CHECKED}
        sources={[
          { title: "Certified Electronic Filing Service Providers (Utah State Courts)", url: UTAH_EFSP_LIST_URL },
          { title: "Utah State Bar eFiling Portal (eFlex)", url: "https://efiling.utahbar.org/" },
          { title: "eFlex: Getting started", url: "https://efiling.utahbar.org/manual/fiGetStarted.htm" },
          { title: "Courtpath pricing", url: "https://www.courtpath.com/pricing" },
        ]}
      />
      <ClosingCta
        page={PAGE}
        heading={FREE ? "Try Courtpath next to eFlex, free until 2027" : "Try Courtpath next to eFlex"}
        ctaHref="/signup/gold"
      />
      <Footer />
    </main>
  );
}
