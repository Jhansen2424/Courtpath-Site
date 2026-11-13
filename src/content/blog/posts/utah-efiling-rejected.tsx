import Link from "next/link";
import PostLink from "@/components/blog/PostLink";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const EFILING_DOCS = "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs";
const FAQ = `${EFILING_DOCS}/eFiling_FAQ-Attorneys.pdf`;
const COMMON_MISTAKES = `${EFILING_DOCS}/Attorney_eFiling_Training_Common_Mistakes.pdf`;
const STANDARDS = `${EFILING_DOCS}/standards.pdf`;
const RTF_FORMATTING = `${EFILING_DOCS}/formattingrtfdocuments.pdf`;
const BUSINESS_RULES = `${EFILING_DOCS}/Case_Initiation_Business_Rules.pdf`;

export const meta: PostMeta = {
  slug: "utah-efiling-rejected",
  title: "Utah E-Filing Requirements: Why Filings Get Rejected and How to Refile",
  seoTitle: "Utah E-Filing Requirements: Rejected Filings",
  description:
    "Why Utah e-filings get rejected: searchable PDFs, RTF orders, the 7 MB limit, redaction, document types, and what happens to your filing date.",
  category: "Rules and fees",
  status: "draft",
  updatedAt: "2026-11-13",
  author: "Courtpath",
  faqs: [
    {
      question: "What file format does Utah e-filing require?",
      answer:
        "Documents you sign must be text-searchable PDFs. Orders, judgments and other documents the court signs must be RTF. The system rejects any other file type.",
    },
    {
      question: "What is the file size limit for Utah e-filing?",
      answer:
        "The court’s April 2026 attorney FAQ says the system accepts documents up to 7 MB. Larger documents must be split into parts, with parts after the first filed as “Other” and labeled, for example, “Part 2 of 3.”",
    },
    {
      question: "Does a rejected Utah e-filing keep its original filing date?",
      answer:
        "No. The court’s FAQ says the attempted filing date does not carry over. The filed date is the day the document is resubmitted, if that submission is approved.",
    },
    {
      question: "Can a Utah court clerk reject a filing because of formatting?",
      answer:
        "Under URCP 10(f), the clerk must accept a paper that does not conform to the caption, format or signature rules, but may require you to substitute a properly prepared paper. Hard rejections come from the system, for issues like invalid files, form fields or payment problems.",
    },
    {
      question: "How do I sign an e-filed document in Utah?",
      answer:
        "Type “/s/” followed by your name, with your printed name below. For another signer, use “/s/ Jane Doe with permission of John Doe.” Do not paste an image of a signature.",
    },
    {
      question: "Who is responsible for redacting Social Security numbers in Utah court filings?",
      answer:
        "The filer. UCJA 4-202.09(10) limits a Social Security number to its last four digits, and the court’s FAQ says clerks will not review e-filed documents for personal information.",
    },
    {
      question: "Should I write “Proposed” on a proposed order in Utah?",
      answer:
        "No. File it as document type “Order.” The system marks it as proposed automatically, and a typed “Proposed” cannot be removed after the judge signs.",
    },
  ],
  sources: [
    { title: "eFiling FAQ for Attorneys (April 2026)", url: FAQ },
    { title: "Attorney eFiling Training: Common Mistakes", url: COMMON_MISTAKES },
    { title: "eFiling Standards", url: STANDARDS },
    { title: "Formatting Documents for eFiling", url: RTF_FORMATTING },
    { title: "Case Initiation Business Rules (Feb 2026)", url: BUSINESS_RULES },
    {
      title: "eFiling in District and Justice Courts",
      url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/district.html",
    },
    { title: "URCP 5", url: `${RULES}?type=urcp&rule=5` },
    { title: "URCP 6", url: `${RULES}?type=urcp&rule=6` },
    { title: "URCP 7", url: `${RULES}?type=urcp&rule=7` },
    { title: "URCP 10", url: `${RULES}?type=urcp&rule=10` },
    { title: "URCP 11", url: `${RULES}?type=urcp&rule=11` },
    { title: "UCJA 4-202.09", url: `${RULES}?type=ucja&rule=4-202.09` },
    { title: "UCJA 4-503", url: `${RULES}?type=ucja&rule=4-503` },
  ],
  related: [
    "how-to-efile-new-civil-case-utah-district-court",
    "utah-court-holidays-deadlines",
    "notice-of-appearance-utah",
    "utah-rule-7-motions",
  ],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        When a filing misses Utah e-filing requirements, the cause is usually fixable: a wrong file
        type, a protected or form-filled PDF, an RTF order with a header or image, missing data, or
        a payment problem. A rejected filing keeps no place in line, so the filed date is the day you
        resubmit, if the court approves that submission.
      </p>

      <h2>Utah e-filing requirements: the format rules every filing must meet</h2>
      <p>
        Attorneys and Licensed Paralegal Practitioners of record must e-file in district court civil
        and probate cases (<a href={`${RULES}?type=ucja&rule=4-503`}>UCJA 4-503</a>).
      </p>
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Format</th>
            <th>Key rules</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Anything you sign (complaints, motions, memoranda, notices)</td>
            <td>Text-searchable PDF</td>
            <td>
              Print or save to PDF from your word processor. Scan only exhibits you did not prepare.
              Black and white. Up to 7 MB per document.
            </td>
          </tr>
          <tr>
            <td>Anything the court signs (orders, judgments, writs)</td>
            <td>RTF</td>
            <td>
              Times, Times New Roman or Arial. Top margin at least 1.5 inches, bottom at least 1 inch.
              Caption in a 2-cell table. No page numbers, headers, images or drawn lines.
            </td>
          </tr>
          <tr>
            <td>
              Every paper (<a href={`${RULES}?type=urcp&rule=10`}>URCP 10</a>)
            </td>
            <td>Either</td>
            <td>
              8½ x 11, white background, 1-inch margins, double spaced, 12-point minimum. Caption with
              court, title of the action, case number, document name, assigned judge, and (for a
              claim) discovery tier.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        A scanned PDF is an image of the page. The court’s <a href={FAQ}>e-filing FAQ</a> is blunt:
        “An image-only PDF is not searchable.” Color documents also “do not meet the efiling
        specifications.”
      </p>

      <h2>What the system rejects outright</h2>
      <p>
        These are hard rejections. The filing never posts, and your service provider relays the
        reason.
      </p>
      <table>
        <thead>
          <tr>
            <th>Rejection</th>
            <th>Cause</th>
            <th>Fix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>RTF file is invalid / PDF file is invalid</td>
            <td>A .doc or .wpd renamed with a new extension</td>
            <td>Open the file and “Save As” RTF or PDF</td>
          </tr>
          <tr>
            <td>Only RTF and PDF are accepted</td>
            <td>Any other file type</td>
            <td>Convert, then refile</td>
          </tr>
          <tr>
            <td>Form fields must be converted to plain text</td>
            <td>Data typed into a fillable form</td>
            <td>Word RTF: Ctrl+A, then Ctrl+Shift+F9, then resave. PDF: print to a new PDF</td>
          </tr>
          <tr>
            <td>PDF file properties/security cannot be protected</td>
            <td>Password, certification or other security on the PDF</td>
            <td>Remove security, resave, refile</td>
          </tr>
          <tr>
            <td>
              RTF with a populated header, drawing object or image (rejection criteria since March
              31, 2015)
            </td>
            <td>Text in the header; drawn lines or shapes; logos, scanned signatures, screenshots</td>
            <td>Clear the header; rebuild lines with tables; remove images</td>
          </tr>
        </tbody>
      </table>
      <p>
        The FAQ adds that a filing “may be rejected if required data is missing, if there is a
        problem with payment information, if the case has been transferred.”
      </p>

      <h2>Proposed orders: where most RTF trouble starts</h2>
      <ul>
        <li>
          <strong>No signature line.</strong> End the order with a note that the signature appears at
          the top of the first page (URCP 10(e)). The court’s e-signature lands in the upper right
          corner.
        </li>
        <li>
          <strong>Never type “Proposed.”</strong> Use the document type “Order.” The system stamps
          “Proposed” on it automatically, and if you type the word yourself “there is no way to
          remove it once the judge has approved the order.”
        </li>
        <li>
          <strong>No exhibits.</strong> Put the substance in the order itself. Do not incorporate by
          reference.
        </li>
        <li>
          <strong>File it separately.</strong> A motion with an embedded order is on the court’s list
          of most common problems.{" "}
          <a href={`${RULES}?type=urcp&rule=7`}>URCP 7(j)(6)</a> also bars filing a proposed order
          with a motion, except for stipulated, ex parte and similar motions. More in our{" "}
          <PostLink slug="utah-rule-7-motions">Rule 7 motions guide</PostLink>.
        </li>
        <li>
          <strong>Start from a clean template.</strong> Reused documents carry old metadata and
          revision tracking, which the court says can make a document that “fails to file or
          displays badly upon filing.”
        </li>
      </ul>

      <h2>Clerk-level problems: holds, wrong routing, data errors</h2>
      <ul>
        <li>
          <strong>Wrong document type.</strong> The type you pick decides where the filing goes. A
          Notice of Withdrawal filed under the wrong type is not routed for clerk review, and a
          Request to Submit filed as “Other” may not be reviewed in a timely manner. An appearance
          filed under the wrong type may leave you unattached and getting no notices. See{" "}
          <PostLink slug="notice-of-appearance-utah">notice of appearance in Utah</PostLink>.
        </li>
        <li>
          <strong>Payment.</strong> An expired or declined card puts the filing on hold. The{" "}
          <a href={COMMON_MISTAKES}>training materials</a> warn the court may decline to proceed.
          Fees are listed in our{" "}
          <PostLink slug="utah-court-filing-fees">Utah filing fees guide</PostLink>.
        </li>
        <li>
          <strong>Missing judgment amount.</strong> A default judgment without the principal amount
          on the details page “may cause the filing to go on hold.” See{" "}
          <PostLink slug="utah-default-judgment">Utah default judgment</PostLink>.
        </li>
        <li>
          <strong>Party data.</strong> No punctuation except a hyphen, no titles like “Dr.”, and
          business names only in the last-name field. A misspelled party means filing a Request for
          Data Correction before the court will fix it.
        </li>
        <li>
          <strong>Wrong courthouse.</strong> Some locations take no new cases. Under the court’s{" "}
          <a href={BUSINESS_RULES}>February 2026 business rules</a>, American Fork and Salem take
          none; Spanish Fork takes no new domestic, eviction or debt collection cases; Bountiful and
          Layton cases open in Farmington; and Salt Lake County cases open in Salt Lake, not West
          Jordan. Opening a case? See{" "}
          <PostLink slug="how-to-efile-new-civil-case-utah-district-court">
            how to e-file a new civil case
          </PostLink>
          .
        </li>
        <li>
          <strong>Summons returns.</strong> File a separate summons and return of service for each
          defendant, with each summons and its return together in a single PDF.
        </li>
        <li>
          <strong>Courtesy copies.</strong> Never e-file them. The court lists e-filed courtesy
          copies among its most common problems.
        </li>
      </ul>

      <h2>Format flaws are not rejections</h2>
      <p>
        <a href={`${RULES}?type=urcp&rule=10`}>URCP 10(f)</a> says the clerk “must accept the
        filing” even if the caption, paper format or signature block is off. The clerk “may require
        counsel to substitute properly prepared papers.” So a 10-point font will not bounce your
        motion, but you may be told to refile it.
      </p>
      <p>
        Signatures are different. Type “/s/ Your Name” and never paste a signature image. Under{" "}
        <a href={`${RULES}?type=urcp&rule=11`}>URCP 11(a)(3)</a>, an unsigned paper “will be stricken
        unless omission of the signature is corrected promptly.”
      </p>

      <h2>Redaction is your job, not the clerk’s</h2>
      <p>
        <a href={`${RULES}?type=ucja&rule=4-202.09`}>UCJA 4-202.09(10)(A)</a> requires the filer to
        “omit or redact non-public information.” If the information is needed, include only:
      </p>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>What may appear</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Social Security number</td>
            <td>Last four digits</td>
          </tr>
          <tr>
            <td>Financial or other account number</td>
            <td>Last four digits</td>
          </tr>
          <tr>
            <td>Driver’s license number</td>
            <td>State and last four digits</td>
          </tr>
          <tr>
            <td>Non-party address</td>
            <td>City, state and ZIP</td>
          </tr>
          <tr>
            <td>Non-party email or phone</td>
            <td>Omit</td>
          </tr>
          <tr>
            <td>Minor’s name</td>
            <td>Initials</td>
          </tr>
        </tbody>
      </table>
      <p>
        Full identifiers the court needs go on a separate private cover sheet. The FAQ says clerks
        “will not review any efiled document” for personal information. If you missed something,
        file a Motion to Classify. Filed together with the document, it keeps the document private
        until the judge rules.
      </p>

      <h2>Large files and exhibits</h2>
      <p>
        The system accepts documents up to 7 MB. Over that, split the file. Use the exact document
        name for part one. File the rest as “Other” with docket text such as “Part 2 of 3,
        Memorandum in Opposition to Plaintiff’s Motion for Summary Judgment.” Attach exhibits to the
        document where you can. If you file them separately, use “Other” and a full title like
        “Exhibit to Complaint, 1 of 4.” Oversize items such as plat maps and discs go to the front
        counter, and documents in sealed cases are filed over the counter or by mail.
      </p>

      <h2>Fixing and refiling: what happens to your date</h2>
      <table>
        <thead>
          <tr>
            <th>Situation</th>
            <th>Filed date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Signed PDF accepted</td>
            <td>Date and time the court received it</td>
          </tr>
          <tr>
            <td>Order or judgment</td>
            <td>Date and time the judge signs it</td>
          </tr>
          <tr>
            <td>Rejected, then resubmitted</td>
            <td>Day the document is resubmitted, if approved</td>
          </tr>
        </tbody>
      </table>
      <p>
        <a href={`${RULES}?type=urcp&rule=5`}>URCP 5(e)</a> says filing “is complete upon the
        earliest of acceptance by the electronic filing system or by the court.” Submitting to your
        provider is not filing. Nothing we found lets a rejected filing relate back.
      </p>
      <p>If you are near a deadline:</p>
      <ol>
        <li>
          Read the rejection reason, fix only that, and refile the same day. Electronic filing is
          timely before midnight on the last day (
          <a href={`${RULES}?type=urcp&rule=6`}>URCP 6(a)(4)(A)</a>).
        </li>
        <li>
          If the system itself failed, the FAQ says “the filer is responsible for a timely filing”
          and suggests a stipulation or motion. Call the court’s eFiling Specialist.
        </li>
        <li>
          If the deadline passed, URCP 6(b) allows an extension for good cause, after expiration only
          for excusable neglect. It does not reach Rules 50(b) and (d), 52(b), 59(b), (d) and (e), or
          60(c).
        </li>
      </ol>
      <p>
        For a document that posted with an error, do not just refile it. Add “Corrected” to the
        title, for example “Corrected Motion to Continue.” The court cannot delete an approved
        filing. Our{" "}
        <PostLink slug="utah-court-holidays-deadlines">court holidays and deadlines guide</PostLink>{" "}
        covers day counting.
      </p>

      <h2>File with Courtpath</h2>
      <p>
        Courtpath is a certified e-filing service provider for Utah district and justice courts. You
        choose document types, upload PDF and RTF files, and get the court’s acceptance or rejection
        notices in one place. The Basic plan is $10 a month with 3 filings included, every new
        account gets its first 30 days free, and court filing fees still apply.{" "}
        <Link href="/signup/basic">Start your free month</Link> or watch the{" "}
        <Link href="/tutorials">filing tutorials</Link>.
      </p>
    </>
  );
}
