import Link from "next/link";
import Callout from "@/components/blog/Callout";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const EFILING_DOCS = "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs";

export const meta: PostMeta = {
  slug: "how-to-efile-new-civil-case-utah-district-court",
  title: "How to E-File a New Civil Case in Utah District Court",
  description:
    "A step-by-step guide for Utah attorneys: choosing a courthouse that accepts new cases, entering case and party data, formatting the complaint, paying the 2026 filing fee, and serving the defendant.",
  category: "How-to filing",
  status: "draft",
  updatedAt: "2026-10-02",
  author: "Courtpath",
  faqs: [
    {
      question: "Can I open a new case at any district courthouse in the county?",
      answer:
        "No. Some courthouses don’t accept new case filings. In Salt Lake County, new cases are filed in Salt Lake rather than West Jordan; in Davis County they go to Farmington; and in Utah County, American Fork and Salem accept no new cases. The courts publish the full list in their Case Initiation Business Rules.",
    },
    {
      question: "What file format does a Utah complaint need to be in?",
      answer:
        "A text-searchable PDF, created by saving or printing to PDF rather than scanning. Documents that need a judge’s signature, such as proposed orders, are submitted in Rich Text Format (RTF) instead.",
    },
    {
      question: "Does e-filing the complaint serve the defendant?",
      answer:
        "No. Original service of the summons and complaint under URCP 4 can’t be done through e-filing. The summons and complaint must be served within 120 days after the complaint is filed, and the defendant then has 21 days to answer (30 days if served outside Utah).",
    },
    {
      question: "What is the filing fee for a civil complaint in Utah?",
      answer:
        "Since May 6, 2026: $105 for claims of $2,000 or less, $215 for claims over $2,000 and under $10,000, and $375 for claims of $10,000 or more or for non-monetary relief. A divorce petition is $350.",
    },
    {
      question: "What time is the e-filing deadline on the last day?",
      answer:
        "Under URCP 6(a), an electronic filing is timely if it’s made before midnight on the last day of the period.",
    },
  ],
  sources: [
    { title: "UCJA Rule 4-503: Mandatory electronic filing", url: `${RULES}?rule=4-503&type=ucja` },
    { title: "URCP Rule 3: Commencement of action", url: `${RULES}?type=urcp&rule=3` },
    { title: "URCP Rule 4: Process", url: `${RULES}?type=urcp&rule=4` },
    { title: "URCP Rule 6: Time", url: `${RULES}?type=urcp&rule=6` },
    { title: "URCP Rule 10: Form of pleadings", url: `${RULES}?type=urcp&rule=10` },
    { title: "URCP Rule 12: Defenses and objections", url: `${RULES}?type=urcp&rule=12` },
    { title: "URCP Rule 26: Discovery tiers", url: `${RULES}?type=urcp&rule=26` },
    { title: "Case Initiation Business Rules (Feb 2026)", url: `${EFILING_DOCS}/Case_Initiation_Business_Rules.pdf` },
    { title: "Utah State District Courts eFiling Standards", url: `${EFILING_DOCS}/standards.pdf` },
    {
      title: "Electronic Filing: How Will Common Mistakes Affect You as Counsel?",
      url: `${EFILING_DOCS}/Attorney_eFiling_Training_Common_Mistakes.pdf`,
    },
    {
      title: "Utah State Courts filing fees (effective May 6, 2026)",
      url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/fees.html",
    },
  ],
  related: ["utah-rule-5-electronic-service"],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        Utah attorneys must open new civil cases electronically, through a certified e-filing
        service provider. You enter the case data, upload the complaint as a searchable PDF, and pay
        the filing fee by card. Once the court accepts the filing, the case gets a number and an
        assigned judge, and you still serve the defendant the traditional way.
      </p>

      <p>
        Electronic filing has been mandatory for attorneys in Utah district court civil, probate and
        domestic cases since{" "}
        <a href={`${RULES}?rule=4-503&type=ucja`}>UCJA Rule 4-503</a> took effect in December 2022.
        The rule also covers Licensed Paralegal Practitioners. The steps below follow the courts’ own
        e-filing standards and training materials, and they apply whichever certified provider you
        file through.
      </p>

      <h2>Before you start</h2>
      <ul>
        <li>
          <strong>An account with a certified provider.</strong> Four providers are certified for
          Utah district and justice courts: the Utah State Bar (eFlex), GreenFiling, Judicialink and
          Courtpath. The courts keep the{" "}
          <a href="https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/providers.html">
            current list
          </a>
          .
        </li>
        <li>
          <strong>A complaint that meets URCP 10.</strong> The caption needs the court, the title
          of the action, the name of the pleading and, for an original claim, the discovery tier.
          The top-left corner needs your name, address, email address, phone number and Utah Bar
          number. Text must be at least 12-point and double-spaced, with 1-inch margins.
        </li>
        <li>
          <strong>A current card on file.</strong> The filing fee is charged when you submit.
        </li>
      </ul>

      <h2>Step 1: Pick a courthouse that accepts new cases</h2>
      <p>
        This step catches people out. Not every district courthouse opens new cases, and some take
        only certain case types. The courts’{" "}
        <a href={`${EFILING_DOCS}/Case_Initiation_Business_Rules.pdf`}>Case Initiation Business Rules</a>{" "}
        (February 2026) list where new filings go. The locations to watch:
      </p>
      <table>
        <thead>
          <tr>
            <th>County</th>
            <th>Where new cases are filed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Salt Lake</td>
            <td>Salt Lake (not West Jordan)</td>
          </tr>
          <tr>
            <td>Davis</td>
            <td>Farmington (not Bountiful or Layton)</td>
          </tr>
          <tr>
            <td>Utah</td>
            <td>
              Provo for all case types. Spanish Fork takes new cases except domestic, eviction and
              debt collection. American Fork and Salem accept no new cases.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        The other districts accept new cases of all types at their courthouses. Check the current
        PDF before filing, because the courts update it.
      </p>

      <h2>Step 2: Enter the case information</h2>
      <p>
        Your provider will ask for the court location, the case type, the claim amount, the
        discovery tier and at least one plaintiff and one defendant. The tier comes from{" "}
        <a href={`${RULES}?type=urcp&rule=26`}>URCP 26</a> and has to match the tier in your
        caption:
      </p>
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Damages claimed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>$50,000 or less</td>
          </tr>
          <tr>
            <td>2</td>
            <td>More than $50,000 and less than $300,000, or non-monetary relief only</td>
          </tr>
          <tr>
            <td>3</td>
            <td>$300,000 or more</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Domestic relations actions</td>
          </tr>
        </tbody>
      </table>

      <h2>Step 3: Enter every party the way the court’s system expects</h2>
      <p>
        Party data feeds the court’s case management system (CORIS). It drives case searches,
        judgment entry and collections, so the courts are strict about it. From the courts’ training
        on common mistakes:
      </p>
      <ul>
        <li>Enter each party individually, with full names.</li>
        <li>
          The only punctuation allowed is the hyphen in a hyphenated name. Leave out periods, commas
          and apostrophes.
        </li>
        <li>Leave off professional titles such as “Dr.,” and drop “The” wherever possible.</li>
        <li>Use the separate name fields. Only a business goes entirely in the last-name field.</li>
        <li>
          Include the date of birth, Social Security number and address when you have them. The
          system protects those fields.
        </li>
      </ul>
      <p>
        The data you enter must also match your documents. Under the courts’{" "}
        <a href={`${EFILING_DOCS}/standards.pdf`}>eFiling Standards</a>, a mismatch can mean filing
        a Request for Data Correction before the case moves forward.
      </p>

      <h2>Step 4: Upload the complaint and other documents</h2>
      <ul>
        <li>
          <strong>Save to PDF; don’t scan.</strong> Documents that don’t need a court signature must
          be PDFs created by saving or printing to PDF, so the text stays searchable. Scanning is for
          exhibits you didn’t prepare.
        </li>
        <li>
          <strong>Use RTF for anything the judge signs.</strong> Proposed orders go in RTF, with no
          signature line and no page numbers. Don’t type “Proposed” in the title; the system marks
          the document as proposed automatically.
        </li>
        <li>
          <strong>Sign with /s/.</strong> Use “/s/ Your Name.” Don’t paste in an image of a
          signature.
        </li>
        <li>
          <strong>Keep each file under 7 MB.</strong> The courts also cap the size of a whole
          submission. Split larger documents into parts and label them “Part 2 of 3” and so on. Scan in black and white, since color inflates file size.
        </li>
        <li>
          <strong>One document, one document type.</strong> Upload each document separately with
          the correct document type, and use the additional-text field for its full title.
          Bundling documents into one PDF can hide a document the court needs to act on.
        </li>
      </ul>

      <h2>Step 5: Pay the filing fee, or ask for a waiver</h2>
      <p>
        The fee is collected when you file.{" "}
        <a href="https://www.utcourts.gov/en/self-help/legal-help/procedures/fees.html">
          District court fees
        </a>{" "}
        changed on May 6, 2026:
      </p>
      <table>
        <thead>
          <tr>
            <th>Complaint or petition</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Damages of $2,000 or less</td>
            <td>$105</td>
          </tr>
          <tr>
            <td>Damages over $2,000 and under $10,000</td>
            <td>$215</td>
          </tr>
          <tr>
            <td>Damages of $10,000 or more, or non-monetary relief</td>
            <td>$375</td>
          </tr>
          <tr>
            <td>Divorce or separate maintenance</td>
            <td>$350</td>
          </tr>
          <tr>
            <td>Civil jury demand</td>
            <td>$250</td>
          </tr>
        </tbody>
      </table>
      <p>
        If your client can’t pay, file the Affidavit and Application for Waiver of Court Fees and a
        proposed Order to Waive Fees together with the complaint, each under its correct document
        type. That keeps your card from being charged. If the fee waiver is denied, you’ll pay the
        fee directly to the court.
      </p>
      <p>
        Card problems are costly. An expired or declined card puts the filing on hold, and under{" "}
        <a href={`${RULES}?type=urcp&rule=3`}>URCP 3</a> a dishonored fee has to be made good within
        10 days of the court’s notice.
      </p>

      <Callout title="Common mistakes that stall a new case">
        <ul>
          <li>Filing at a courthouse that doesn’t accept new cases</li>
          <li>Party names with punctuation, titles or the whole name in one field</li>
          <li>Scanning the complaint instead of saving it to PDF</li>
          <li>An expired card on file</li>
          <li>Several documents merged into one upload</li>
        </ul>
      </Callout>

      <h2>Step 6: After the court accepts the filing</h2>
      <p>
        Court staff review the submission. Once it’s accepted, the case is assigned a case number
        and a judge, and both belong in the caption of everything you file afterward. The court
        sends an electronic notification each time a document is added to the case.
      </p>
      <p>
        Deadlines run to midnight. Under <a href={`${RULES}?type=urcp&rule=6`}>URCP 6(a)</a>, an
        electronic filing made before midnight on the last day is timely.
      </p>

      <h2>Step 7: Serve the defendant (e-filing won’t do it)</h2>
      <p>
        E-filing serves later documents on parties who have e-filing accounts. It can’t accomplish
        original service of the summons and complaint. Under{" "}
        <a href={`${RULES}?type=urcp&rule=4`}>URCP 4</a>:
      </p>
      <ul>
        <li>Serve the summons and complaint within 120 days after filing the complaint.</li>
        <li>Anyone 18 or older who isn’t a party or a party’s attorney can serve.</li>
        <li>
          The defendant has 21 days to answer after service in Utah, or 30 days if served outside
          the state (<a href={`${RULES}?type=urcp&rule=12`}>URCP 12(a)</a>).
        </li>
      </ul>
      <p>
        When service is done, file each defendant’s summons and proof of service together as a
        single PDF, using the “Summons on Return” document type. The court asks for a separate
        summons and return for each defendant.
      </p>
      <p>
        Utah also lets you serve first and file later.{" "}
        <a href={`${RULES}?type=urcp&rule=3`}>URCP 3(a)</a> allows an action to begin by serving the
        summons and complaint. If you go that route, the complaint, summons and proof of service
        must be filed within 10 days of service, or the action is deemed dismissed.
      </p>
      <p>
        For how later documents are served once the case is open, see our guide to{" "}
        <Link href="/blog/utah-rule-5-electronic-service">e-service under URCP 5</Link>.
      </p>

      <h2>Filing a new case in Courtpath</h2>
      <p>
        Courtpath is a certified Utah e-filing provider. It walks you through each step above,
        including the case data, parties and documents, and checks the filing before you submit.
        Watch the <Link href="/tutorials">“Filing a new case” tutorial</Link> to see how it works. User licenses are free through January 1, 2027.{" "}
        <Link href="/pricing">See plans</Link>.
      </p>
    </>
  );
}
