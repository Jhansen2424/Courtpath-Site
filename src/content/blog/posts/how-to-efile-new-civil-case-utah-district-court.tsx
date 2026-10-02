import Link from "next/link";
import Callout from "@/components/blog/Callout";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const EFILING_DOCS = "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs";

export const meta: PostMeta = {
  slug: "how-to-efile-new-civil-case-utah-district-court",
  title: "How to E-File a New Civil Case in Utah District Court",
  description:
    "Step by step for Utah attorneys: which courthouses accept new cases, entering case and party data, formatting and redacting the complaint, the 2026 filing fees, and issuing and serving the summons.",
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
        "No. Original service of the summons and complaint under URCP 4 can’t be done through e-filing. Unless the court sets a different period, they must be served within 120 days after the complaint is filed. The defendant then generally has 21 days to answer (30 days if served outside Utah).",
    },
    {
      question: "What is the filing fee for a civil complaint in Utah?",
      answer:
        "Since May 6, 2026: $105 for claims of $2,000 or less, $215 for claims over $2,000 and under $10,000, and $375 for claims of $10,000 or more or for non-monetary relief. Claim amounts exclude costs, interest and attorney fees. A divorce petition is $350.",
    },
    {
      question: "Who issues the summons in a Utah state court case?",
      answer:
        "You do. Under URCP 4(a), the summons is signed and issued by the plaintiff or the plaintiff’s attorney, not the clerk. Federal court is different: under FRCP 4(b), the clerk of the U.S. District Court for the District of Utah issues the summons.",
    },
  ],
  sources: [
    { title: "UCJA Rule 4-503: Mandatory electronic filing", url: `${RULES}?rule=4-503&type=ucja` },
    {
      title: "UCJA Rule 4-202.09(10): Non-public information in public records",
      url: `${RULES}?rule=4-202.09&type=ucja`,
    },
    { title: "URCP Rule 3: Commencement of action", url: `${RULES}?type=urcp&rule=3` },
    { title: "URCP Rule 4: Process", url: `${RULES}?type=urcp&rule=4` },
    { title: "URCP Rule 5: Service and filing", url: `${RULES}?type=urcp&rule=5` },
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
      title: "SB 283 (2026): Court Fees and Administration Amendments",
      url: "https://le.utah.gov/Session/2026/bills/enrolled/SB0283.pdf",
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
        assigned judge. You still serve the defendant the traditional way.
      </p>

      <p>
        <a href={`${RULES}?rule=4-503&type=ucja`}>UCJA Rule 4-503</a> requires attorneys and
        Licensed Paralegal Practitioners to e-file in district court civil and probate cases. The
        courts’ training materials apply it to domestic cases too. The only exception for lawyers is
        a hardship exemption approved by the Judicial Council. The steps below follow the courts’ own
        e-filing standards and training materials, and they apply whichever certified provider you
        file through.
      </p>
      <p>
        This guide is for Utah’s <em>state</em> district courts. The federal U.S. District Court for
        the District of Utah uses a separate system, CM/ECF, with its own procedures. For example,
        in federal court the clerk issues the summons (FRCP 4(b)).
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
          <strong>
            A complaint that meets <a href={`${RULES}?type=urcp&rule=10`}>URCP 10</a>.
          </strong>
          <ul>
            <li>
              <strong>Caption:</strong> the court, the title of the action naming all parties, the
              name of the pleading and, for any claim for relief, the discovery tier.
            </li>
            <li>
              <strong>Top-left corner of the first page:</strong> your name, address, email,
              phone, Utah Bar number and the party you represent.
            </li>
            <li>
              <strong>Format:</strong> at least 12-point text, double-spaced except where single
              spacing is customary, with margins of at least 1 inch.
            </li>
          </ul>
        </li>
        <li>
          <strong>A civil cover sheet.</strong> Under URCP 10(a)(4), anyone filing a claim for
          relief must also file a completed cover sheet substantially similar to the Judicial
          Council’s form.
        </li>
        <li>
          <strong>Redacted documents.</strong> Under{" "}
          <a href={`${RULES}?rule=4-202.09&type=ucja`}>UCJA 4-202.09(10)</a>, a public filing may
          show only:
          <ul>
            <li>the last four digits of a Social Security or account number;</li>
            <li>the issuing state and last four digits of a driver’s license number;</li>
            <li>a minor’s initials;</li>
            <li>a non-party’s city, state and ZIP code, with no email or phone number.</li>
          </ul>
          If the court needs the full information, put it on a separate cover sheet filed as
          private.
        </li>
        <li>
          <strong>A summons you’ve prepared.</strong> In Utah state court, the plaintiff’s attorney
          signs and issues the summons (<a href={`${RULES}?type=urcp&rule=4`}>URCP 4(a)</a>), not
          the clerk. Under Rule 4(c), the summons must include:
          <ul>
            <li>the court’s name and address, the parties and the county;</li>
            <li>your contact information;</li>
            <li>the time to answer and a warning that default judgment may be entered;</li>
            <li>a statement that the complaint is on file or will be filed within 10 days;</li>
            <li>the Judicial Council’s bilingual notice.</li>
          </ul>
        </li>
        <li>
          <strong>A current card on file.</strong> The filing fee is charged when you submit.
        </li>
      </ul>

      <h2>Step 1: Find the courthouse that opens new cases in your county</h2>
      <p>
        This step assumes you’ve already chosen the proper county under Utah’s venue statutes. The
        catch is that not every courthouse in a county opens new cases, and some take only certain
        case types. The courts’{" "}
        <a href={`${EFILING_DOCS}/Case_Initiation_Business_Rules.pdf`}>Case Initiation Business Rules</a>{" "}
        (February 2026) list where new filings go. The counties to watch:
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
        Every other district courthouse accepts new cases of all types, and Logan also takes small
        claims. Check the current PDF before filing, because the courts update it.
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
            <td>
              More than $50,000 and less than $300,000. Also non-monetary relief, unless it’s joined
              with a damages claim over $300,000.
            </td>
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
        Party data feeds the court’s case management system (CORIS), which drives case searches,
        judgment entry and collections. The courts are strict about it. From their training on
        common mistakes:
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
          Include all the party data you have, including date of birth, Social Security number and
          address. The courts warn that incomplete data risks errors in judgment entry, collections
          and case searches. This is data entry, which is separate from the documents themselves,
          which must be redacted.
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
          be PDFs created by saving or printing to PDF, so the text stays searchable. Scan only
          exhibits you didn’t prepare and signed affidavits or declarations (
          <a href={`${RULES}?type=urcp&rule=5`}>URCP 5(f)</a>).
        </li>
        <li>
          <strong>Use RTF for anything the judge signs.</strong> Proposed orders go in RTF with no
          signature line and no page numbers. End the document with a note that the signature
          appears at the top of the first page. Don’t type “Proposed” in the title; the system marks
          the document as proposed automatically.
        </li>
        <li>
          <strong>Sign with /s/.</strong> Use “/s/ Your Name.” Don’t paste in an image of a
          signature.
        </li>
        <li>
          <strong>Mind the size and color limits.</strong> The courts’ training puts the limit at
          7 MB per file and 10 MB for the whole submission. Split larger documents into parts and
          label them “Part 2 of 3” and so on. Scanned documents must be black and white; color
          doesn’t meet the e-filing specifications.
        </li>
        <li>
          <strong>One document, one document type.</strong> Upload each document separately with
          the correct document type, and use the additional-text field for its full title.
          Bundling documents into one PDF can hide a document the court needs to act on.
        </li>
      </ul>

      <h2>Step 5: Pay the filing fee, or ask for a waiver</h2>
      <p>
        The fee is collected when you file. District court fees changed on May 6, 2026 (see the{" "}
        <a href="https://www.utcourts.gov/en/self-help/legal-help/procedures/fees.html">
          court fee schedule
        </a>{" "}
        and <a href="https://le.utah.gov/Session/2026/bills/enrolled/SB0283.pdf">SB 283</a>, which
        amended Utah Code 78A-2-301). Claim amounts exclude court costs, interest and attorney fees.
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
            <td>Divorce (dissolution of marriage)</td>
            <td>$350</td>
          </tr>
          <tr>
            <td>Temporary separation</td>
            <td>$35</td>
          </tr>
          <tr>
            <td>Civil jury demand</td>
            <td>$250</td>
          </tr>
        </tbody>
      </table>
      <p>
        One e-filing collects at most six filing fees. Past that, you have three options: file the
        rest separately, pay online, or contact the court.
      </p>
      <p>
        If your client can’t pay, file the Affidavit and Application for Waiver of Court Fees and a
        proposed Order to Waive Fees together with the complaint. Use the correct document type for
        each, and say which fees you’re asking to waive; that keeps your card from being charged. If
        the judge orders all or part of the fee paid, you pay the court directly, and the case may
        not proceed until you do.
      </p>
      <p>
        Card problems are costly. An expired or declined card puts the filing on hold. Under{" "}
        <a href={`${RULES}?type=urcp&rule=3`}>URCP 3(a)</a>, a dishonored payment must be replaced
        by cash or cashier’s check within 10 days of the court’s notice. The filing stays valid, but
        the court can impose sanctions, up to dismissal.
      </p>

      <Callout title="Common mistakes that stall a new case">
        <ul>
          <li>Filing at a courthouse that doesn’t open new cases</li>
          <li>Party names with punctuation, titles or the whole name in one field</li>
          <li>Unredacted Social Security, account or license numbers in the complaint</li>
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
        Unless a statute or court order sets a different time, an electronic filing made before
        midnight on the last day is timely (
        <a href={`${RULES}?type=urcp&rule=6`}>URCP 6(a)(4)</a>).
      </p>

      <h2>Step 7: Serve the defendant (e-filing won’t do it)</h2>
      <p>
        Once the case is open, e-filing serves later documents on parties who are represented by a
        lawyer. It can’t accomplish original service of the summons and complaint. Under{" "}
        <a href={`${RULES}?type=urcp&rule=4`}>URCP 4</a>:
      </p>
      <ul>
        <li>
          You sign and issue the summons, and you can issue a separate summons for each defendant.
        </li>
        <li>
          Serve the summons and complaint within 120 days after filing, unless the court sets a
          different period. An unserved defendant can be dismissed without prejudice.
        </li>
        <li>Anyone 18 or older who isn’t a party or a party’s attorney can serve.</li>
        <li>
          A defendant can accept service by signing an acknowledgment of receipt, and Rule 4(d)(3)
          says all parties have a duty to avoid unnecessary service costs. It’s worth asking
          opposing counsel before hiring a process server.
        </li>
        <li>
          Unless a statute or court order says otherwise, the defendant has 21 days after service in
          Utah to answer, or 30 days if served outside the state (
          <a href={`${RULES}?type=urcp&rule=12`}>URCP 12(a)</a>).
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
        must be filed within 10 days of service, or the action is deemed dismissed. The summons also
        has to tell the defendant that no answer is needed if the complaint isn’t filed in time.
      </p>
      <p>
        If the defendant appears without a lawyer, they won’t have access to e-filing. Later
        documents must be served on them another way, usually email, with a certificate of service.
        For details, see our guide to{" "}
        <Link href="/blog/utah-rule-5-electronic-service">e-service under URCP 5</Link>.
      </p>

      <h2>Filing a new case in Courtpath</h2>
      <p>
        Courtpath is a certified Utah e-filing provider. It walks you through each step above,
        including the case data, parties and documents, and checks the filing before you submit.
        Watch the <Link href="/tutorials">“Filing a new case” tutorial</Link> to see how it works.
        User licenses are free until January 1, 2027. <Link href="/pricing">See plans</Link>.
      </p>
    </>
  );
}
