import Link from "next/link";
import Callout from "@/components/blog/Callout";
import PostLink from "@/components/blog/PostLink";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const RULE_7 = `${RULES}?type=urcp&rule=7`;
const RULE_7A = `${RULES}?type=urcp&rule=7A`;
const STANDARDS = "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs/standards.pdf";
const FORM_1110 =
  "https://legacy.utcourts.gov/howto/filing/motions/docs/1110GE_Request_to_Submit_for_Decision.pdf";
const FORM_7101 =
  "https://legacy.utcourts.gov/RULES/docs/7101GE_Bilingual_Notice_to_Responding_Party_for_Motions.pdf";

export const meta: PostMeta = {
  slug: "utah-rule-7-motions",
  title: "Utah Rule 7 Motions: Deadlines, Page Limits and the Request to Submit for Decision",
  seoTitle: "Utah Rule 7: Motions, Deadlines, Orders",
  description:
    "Utah Rule 7 motion practice: 14-day response, 7-day reply, page limits, the Request to Submit for Decision, 7(j) proposed orders and ex parte motions.",
  category: "Rules and fees",
  status: "published",
  publishedAt: "2026-11-23",
  updatedAt: "2026-11-23",
  author: "Courtpath",
  faqs: [
    {
      question: "When is a response to a motion due in Utah?",
      answer:
        "Under URCP 7(d), the opposing memorandum is due within 14 days after the motion is filed.",
    },
    {
      question: "When is a reply memorandum due under Rule 7?",
      answer:
        "Within 7 days after the opposing memorandum is filed. It is limited to rebutting new matters (7(e)).",
    },
    {
      question: "What happens if no one files a Request to Submit for Decision?",
      answer:
        "The motion is not submitted for decision. Either party may file it once briefing is complete or its time has expired (7(g)).",
    },
    {
      question: "Can I file a proposed order with my motion?",
      answer:
        "Usually no. Rule 7(j)(6) requires one only with stipulated, no-response and ex parte motions, Rule 37(a) statements, and a Request to Submit on an unopposed motion.",
    },
    {
      question: "What is the page limit for a motion in Utah district court?",
      answer:
        "Fifteen pages or 5,400 words for most motions; 25 pages or 9,000 words for motions under Rules 12(b), 12(c), 56 and 65A (7(q)).",
    },
    {
      question: "Does Utah still use orders to show cause?",
      answer:
        "Not for a party seeking to enforce an order in a civil case. Under Rule 7A (Rule 7B in domestic relations cases), the party files an ex parte motion to enforce order, and an order to attend hearing serves as an order to show cause under Utah law. Courts can still start order to show cause proceedings on their own, for example for failure to prosecute.",
    },
  ],
  sources: [
    { title: "URCP 7", url: RULE_7 },
    { title: "URCP 7A", url: RULE_7A },
    { title: "URCP 7B", url: `${RULES}?type=urcp&rule=7B` },
    { title: "URCP 6", url: `${RULES}?type=urcp&rule=6` },
    { title: "URCP 10", url: `${RULES}?type=urcp&rule=10` },
    { title: "URCP 37", url: `${RULES}?type=urcp&rule=37` },
    { title: "URCP 101", url: `${RULES}?type=urcp&rule=101` },
    { title: "UCJA 4-503", url: `${RULES}?type=ucja&rule=4-503` },
    { title: "eFiling Standards", url: STANDARDS },
    { title: "Request to Submit for Decision (form 1110GEJ)", url: FORM_1110 },
    { title: "Bilingual Notice to Responding Party (form 7101GEJ)", url: FORM_7101 },
  ],
  related: [
    "utah-court-holidays-deadlines",
    "utah-efiling-rejected",
    "notice-of-appearance-utah",
    "utah-default-judgment",
  ],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        Utah Rule 7 (Utah Rule of Civil Procedure 7) sets the format, deadlines and paperwork for
        motions in Utah district court: the opposing memorandum is due 14 days after the motion is
        filed, and the reply is due 7 days after the opposition is filed. The motion is not decided
        until a party files a Request to Submit for Decision, and the judge’s signed order usually
        comes from a proposed order prepared under Rule 7(j).
      </p>

      <h2>What Rule 7 requires in the motion itself</h2>
      <p>
        Motions before a court commissioner follow{" "}
        <a href={`${RULES}?type=urcp&rule=101`}>Rule 101</a>. Requests to compel, for protective
        orders, for extraordinary discovery or about subpoenas are not Rule 7 motions: they use a{" "}
        <a href={`${RULES}?type=urcp&rule=37`}>Rule 37(a)</a> statement of discovery issues (four
        pages or 1,500 words as amended Nov. 1, 2026, with a meet-and-confer certification, a
        proportionality statement and a proposed order). Discovery sanctions motions still follow
        Rule 7. For a motion before a judge, <a href={RULE_7}>Rule 7</a> (amended effective Nov. 1,
        2025) requires:
      </p>
      <ul>
        <li>
          <strong>One document.</strong> The motion must include the supporting memorandum (Rule
          7(c)(6)). No separate memorandum in support.
        </li>
        <li>
          <strong>Title.</strong> “Motion [short phrase describing the relief requested]” (7(c)(5)).
        </li>
        <li>
          <strong>Bilingual Notice to Responding Party.</strong> Every motion must include or attach
          the Judicial Council’s notice (7(c)(3)). The court’s form is{" "}
          <a href={FORM_7101}>7101GEJ</a> (rev. Jan. 21, 2021).
        </li>
        <li>
          <strong>Caution language for dispositive motions.</strong> At the top right of page one, in
          bold: “This motion requires you to respond. Please see the Notice to Responding Party.”
          (7(c)(2)). Parties represented by counsel may opt out of receiving these notices (7(c)(4)).
        </li>
        <li>
          <strong>Cited discovery attached.</strong> Attach the relevant portions of anything you
          cite (7(c)(7)).
        </li>
      </ul>
      <p>
        <a href={`${RULES}?type=urcp&rule=10`}>Rule 10</a> format rules still apply: caption, bar
        number top left, double spacing, 12-point minimum.
      </p>

      <h2>Utah Rule 7 deadlines at a glance</h2>
      <table>
        <thead>
          <tr>
            <th>Filing</th>
            <th>Who</th>
            <th>Deadline</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Memorandum opposing motion</td>
            <td>Nonmoving party</td>
            <td>Within 14 days after the motion is filed</td>
            <td>7(d)(1)</td>
          </tr>
          <tr>
            <td>Reply memorandum (rebuttal of new matters only)</td>
            <td>Moving party</td>
            <td>Within 7 days after the opposition is filed</td>
            <td>7(e)(1)</td>
          </tr>
          <tr>
            <td>Response to an objection in the reply, or objection to new evidence in it</td>
            <td>Nonmoving party</td>
            <td>7 days after the reply is filed</td>
            <td>7(f)</td>
          </tr>
          <tr>
            <td>Response to an objection to new evidence in the reply</td>
            <td>Moving party</td>
            <td>Within 7 days after the objection is filed</td>
            <td>7(f)</td>
          </tr>
          <tr>
            <td>Serve proposed order for approval as to form</td>
            <td>Party directed by the court</td>
            <td>Within 14 days of the court’s direction</td>
            <td>7(j)(2)</td>
          </tr>
          <tr>
            <td>Objection to form of proposed order</td>
            <td>Any party</td>
            <td>Within 7 days after the order is served</td>
            <td>7(j)(4)</td>
          </tr>
          <tr>
            <td>File proposed order after an objection</td>
            <td>Preparing party</td>
            <td>Within 7 days after the objection</td>
            <td>7(j)(5)(C)</td>
          </tr>
        </tbody>
      </table>
      <p>
        Count days under <a href={`${RULES}?type=urcp&rule=6`}>Rule 6</a>: skip the trigger day and
        roll forward if the last day is a weekend or legal holiday. E-filing before midnight on the
        last day is timely (6(a)(4)(A)). A court order or <a href={RULE_7A}>Rule 7A</a> can set
        different times, so check the docket. See our{" "}
        <PostLink slug="utah-court-holidays-deadlines">
          Utah court holidays and deadline counting guide
        </PostLink>
        .
      </p>

      <h2>Page and word limits (Rule 7(q))</h2>
      <p>
        A filing must meet either the page limit or the word limit. If you rely on the word limit,
        include a certification stating the word count (7(q)(3)).
      </p>
      <table>
        <thead>
          <tr>
            <th>Filing</th>
            <th>Pages</th>
            <th>Words</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Motion under Rule 12(b), 12(c), 56 or 65A</td>
            <td>25</td>
            <td>9,000</td>
          </tr>
          <tr>
            <td>All other motions</td>
            <td>15</td>
            <td>5,400</td>
          </tr>
          <tr>
            <td>Opposition to a 12(b), 12(c), 56 or 65A motion</td>
            <td>25</td>
            <td>9,000</td>
          </tr>
          <tr>
            <td>Opposition to all other motions</td>
            <td>15</td>
            <td>5,400</td>
          </tr>
          <tr>
            <td>Reply supporting a 12(b), 12(c), 56 or 65A motion</td>
            <td>15</td>
            <td>5,400</td>
          </tr>
          <tr>
            <td>Reply supporting all other motions</td>
            <td>10</td>
            <td>3,600</td>
          </tr>
          <tr>
            <td>Objection and response under 7(f)</td>
            <td>3</td>
            <td>1,100</td>
          </tr>
          <tr>
            <td>Notice of supplemental authority and response under 7(i)</td>
            <td>2</td>
            <td>700</td>
          </tr>
          <tr>
            <td>Statement of discovery issues and objection under 37(a)</td>
            <td>4</td>
            <td>1,500</td>
          </tr>
        </tbody>
      </table>
      <p>
        The limits exclude the caption, tables of contents and authorities, signature block,
        certificate of service, certification, exhibits and attachments (7(q)(2)). To go longer, show
        good cause; an overlength filing needs a table of contents and a table of authorities with
        page references (7(o)).
      </p>

      <h2>Request to Submit for Decision (Rule 7(g))</h2>
      <p>
        When briefing is complete or the time for briefing has expired, either party may file a
        Request to Submit for Decision. It must state whether a hearing has been requested and the
        filing dates of the motion, the opposition (if any), the reply (if any) and any response to
        objections in the reply.
      </p>
      <p>
        The court’s free form is <a href={FORM_1110}>1110GEJ</a>, “Request to Submit for Decision”
        (rev. Sept. 17, 2019). It has no line for a 7(f) response to objections; add that date
        yourself if one was filed.
      </p>
      <p>
        Request a hearing in the motion, a memorandum or the Request to Submit, and flag it in the
        caption (7(h)). A requested hearing on a dispositive motion must be granted unless the motion
        or opposition is frivolous or the issue authoritatively decided.
      </p>

      <h2>Proposed orders under Rule 7(j)</h2>
      <p>
        <strong>When you may file one.</strong> Not with a motion, a memorandum or a Request to
        Submit (7(j)(6)), with five exceptions where a proposed order is required: a stipulated
        motion, a motion the court can act on without a response, an ex parte motion, a Rule 37(a)
        statement of discovery issues, and a Request to Submit on a motion nobody opposed.
      </p>
      <p>
        <strong>After a ruling.</strong> If directed to prepare the order, serve it within 14 days
        for approval as to form; if you miss that, any other party may. Approval as to form does not
        waive substantive objections (7(j)(3)). File the order after everyone approves (state how
        approval was received), after the 7-day objection period runs (with a certificate of
        service), or within 7 days after an objection.
      </p>
      <p>
        <strong>Format for e-filing.</strong> Under Rule 10(e), an e-filed proposed order must not
        include the judge’s signature line and must state at the end that the signature appears at
        the top of the first page. The court’s <a href={STANDARDS}>eFiling standards</a> add that
        documents requiring a court signature are filed as separate documents, saved in RTF, with a
        top margin of at least 1.5 inches, no page numbers, no embedded images, and no references to
        exhibits.
      </p>

      <h2>Stipulated, no-response and ex parte motions</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Title</th>
            <th>Also include</th>
            <th>Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Stipulated motion</td>
            <td>“Stipulated motion [relief]”</td>
            <td>Signed stipulation; proposed order approved by the other parties</td>
            <td>7(k)</td>
          </tr>
          <tr>
            <td>
              Motion decided without a response (e.g. overlength, early extension, pro hac vice)
            </td>
            <td>Regular motion title</td>
            <td>The rule or statute allowing it</td>
            <td>7(l)</td>
          </tr>
          <tr>
            <td>Ex parte motion (only where a statute or rule allows it)</td>
            <td>“Ex parte motion [relief]”</td>
            <td>The authorizing statute or rule</td>
            <td>7(m)</td>
          </tr>
        </tbody>
      </table>
      <p>
        Each must state the relief and grounds and come with a Request to Submit and a proposed
        order. An order entered under (l) or (m) can be vacated or modified by the judge who made it,
        with or without notice (7(j)(7)).
      </p>

      <h2>Motions to enforce: Rule 7A replaced the order to show cause</h2>
      <p>
        To enforce a court order or seek sanctions for violating one, file an ex parte motion to
        enforce order and for sanctions in the same case (<a href={RULE_7A}>Rule 7A</a>; current
        version effective Nov. 1, 2024). It must be verified or supported by a declaration or
        affidavit, with a Request to Submit and a proposed order to attend hearing, served at least
        28 days before the hearing if issued. Any written opposition is due within 14 days after
        service of the order, and a reply within 7 days after that, unless the court sets other
        times. Rule 7A states that this process replaces the prior order to show cause procedure. It
        does not apply to Rule 37(b) sanctions motions, criminal cases, or proceedings the court
        starts on its own. Domestic relations cases follow{" "}
        <a href={`${RULES}?type=urcp&rule=7B`}>Rule 7B</a> instead.
      </p>

      <Callout title="Common mistakes">
        <ul>
          <li>
            <strong>Filing a proposed order with an opposed motion.</strong> Rule 7(j)(6) prohibits
            it.
          </li>
          <li>
            <strong>Moving to strike evidence in a reply.</strong> Rule 7(n) bars motions inside
            memoranda; object to the evidence instead.
          </li>
          <li>
            <strong>No word-count certification</strong> when relying on word limits (7(q)(3)).
          </li>
          <li>
            <strong>Proposed orders as PDFs with a signature line.</strong> The court signs at the
            top; follow Rule 10(e) and the RTF standard. More in our{" "}
            <PostLink slug="utah-efiling-rejected">guide to rejected Utah e-filings</PostLink>.
          </li>
        </ul>
      </Callout>

      <h2>File motions with Courtpath</h2>
      <p>
        Attorneys and LPPs of record must e-file in district court civil cases (
        <a href={`${RULES}?type=ucja&rule=4-503`}>UCJA 4-503</a>). Courtpath is a certified e-filing
        service provider for Utah district and justice courts: file the motion, Request to Submit and
        proposed order in an existing case, with e-service under{" "}
        <PostLink slug="utah-rule-5-electronic-service">Rule 5</PostLink>. New to the case? File
        your <PostLink slug="notice-of-appearance-utah">notice of appearance</PostLink> first. See
        the <Link href="/tutorials">tutorials</Link>, compare{" "}
        <Link href="/pricing">plans</Link>, or{" "}
        <Link href="/signup/basic">start with 30 days free</Link>. Court filing fees still apply.
      </p>
    </>
  );
}
