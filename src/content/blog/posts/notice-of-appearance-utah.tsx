import Link from "next/link";
import Callout from "@/components/blog/Callout";
import PostLink from "@/components/blog/PostLink";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const RULE_74 = `${RULES}?type=urcp&rule=74`;
const RULE_75 = `${RULES}?type=urcp&rule=75`;
const EFILING_DOCS = "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs";
const FAQ = `${EFILING_DOCS}/eFiling_FAQ-Attorneys.pdf`;
const COMMON_MISTAKES = `${EFILING_DOCS}/Attorney_eFiling_Training_Common_Mistakes.pdf`;
const FORMS = "https://legacy.utcourts.gov/howto/changing_lawyers/docs";
const FORM_1124FA = `${FORMS}/1124FA_Substitution_of_Counsel.pdf`;
const FORM_1121GE = `${FORMS}/1121GE_Notice_of_Withdrawal_of_Counsel.pdf`;
const FORM_1123FA = `${FORMS}/1123FA_Notice_of_Personal_Appearance_or_Appointment_of_Counsel.pdf`;

export const meta: PostMeta = {
  slug: "notice-of-appearance-utah",
  title: "Notice of Appearance in Utah: How to Enter, Limit, Substitute and Withdraw",
  seoTitle: "Notice of Appearance in Utah: Rules and E-Filing",
  description:
    "How to enter, limit, substitute and withdraw an appearance in Utah state court: URCP 74, 75 and 86, plus how e-filing attaches you for e-service.",
  category: "How-to filing",
  status: "draft",
  updatedAt: "2026-11-13",
  author: "Courtpath",
  faqs: [
    {
      question: "Is there a Utah rule that requires a notice of appearance?",
      answer:
        "No URCP rule sets out a form or procedure for a general notice of appearance. Rule 75 covers limited appearances and Rule 74 covers withdrawal and substitution. In e-filing, an appearance of counsel, answer or motion attaches you to the party.",
    },
    {
      question: "Does filing an answer count as entering an appearance in Utah e-filing?",
      answer:
        "Yes. The court’s e-filing FAQ says filing an appearance of counsel, answer or motion for a party attaches you to that party automatically.",
    },
    {
      question: "Why am I not getting e-filing notices on a Utah case?",
      answer:
        "You are probably not attached to a party. File an Appearance of Counsel using the “Appearance of Counsel/Notice of Limited Appearance” document type.",
    },
    {
      question: "What must a Utah Notice of Limited Appearance include?",
      answer:
        "Signatures of the attorney and the client, a specific description of the purpose and scope, and a statement that the client remains responsible for everything not described. It must be filed before the limited appearance begins, unless the judge permits announcing the limited appearance on the record.",
    },
    {
      question: "Does former counsel have to sign a substitution of counsel in Utah?",
      answer:
        "Not since Nov. 1, 2026. URCP 74(e) now requires signatures from new counsel and the client. Court approval is not needed if new counsel certifies compliance with the existing schedule.",
    },
    {
      question: "When can a Utah attorney withdraw by notice instead of motion?",
      answer:
        "Under URCP 74(a), only if no motion is pending, no hearing or trial is set, and the attorney has no outstanding court-ordered obligations. Otherwise a motion and order are required.",
    },
  ],
  sources: [
    { title: "URCP 74", url: RULE_74 },
    { title: "URCP 75", url: RULE_75 },
    { title: "URCP 86", url: `${RULES}?type=urcp&rule=86` },
    { title: "URCP 5", url: `${RULES}?type=urcp&rule=5` },
    { title: "URCP 10", url: `${RULES}?type=urcp&rule=10` },
    { title: "URCrP 36", url: `${RULES}?type=urcrp&rule=36` },
    { title: "UCJA 4-503", url: `${RULES}?type=ucja&rule=4-503` },
    {
      title: "Approved amendments to URCP 74",
      url: "https://legacy.utcourts.gov/utc/rules-approved/category/urcp074/",
    },
    {
      title: "eFiling in District and Justice Courts",
      url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/district.html",
    },
    { title: "eFiling FAQ for Attorneys (April 2026)", url: FAQ },
    { title: "Attorney eFiling Training: Common Mistakes", url: COMMON_MISTAKES },
    { title: "Civil Case eFiling Document Types", url: `${EFILING_DOCS}/Civil_Case_eFiling_Document_Types.pdf` },
    { title: "Criminal eFiling Document Reference", url: `${EFILING_DOCS}/Efiling_Reference-Criminal_Docs.pdf` },
    { title: "Form 1124FA", url: FORM_1124FA },
    { title: "Form 1121GE", url: FORM_1121GE },
    { title: "Form 1123FA", url: FORM_1123FA },
  ],
  related: [
    "utah-rule-5-electronic-service",
    "utah-efiling-rejected",
    "utah-default-judgment",
    "utah-rule-7-motions",
  ],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        In Utah state court, an attorney enters an appearance by filing a notice of appearance
        (Appearance of Counsel), or the party’s answer or a motion, which in e-filing attaches the
        attorney to that party so notices and URCP 5 e-service reach them. Limited appearances follow
        URCP 75, and substitution and withdrawal follow URCP 74, which was amended on May 1 and again
        on Nov. 1, 2026.
      </p>

      <Callout title="Changed Nov. 1, 2026">
        <p>
          Since Nov. 1, 2026, a substitution of counsel under URCP 74(e) needs only new counsel’s and
          the client’s signatures. Former counsel no longer signs.
        </p>
      </Callout>

      <h2>What goes in a Utah notice of appearance</h2>
      <p>
        Use the standard first-page format.{" "}
        <a href={`${RULES}?type=urcp&rule=10`}>URCP 10(a)(3)</a> requires the filer’s name, address,
        email address, phone number, and, for an attorney, bar number, plus the party the paper is
        filed for. Under URCP 10(a)(1), the caption needs the court, case title, case number, the
        name of the paper and the assigned judge (and commissioner, if any).
      </p>
      <p>
        The body can be one sentence naming the party you represent. The courts’ domestic{" "}
        <a href={FORM_1123FA}>form 1123FA</a> is meant for appearing after former counsel withdraws.
        Per the court’s <a href={FAQ}>e-filing FAQ</a>, e-filing the paper certifies under URCP 11
        that you are an attorney of record. An entity must be represented by an attorney admitted in
        Utah who files a notice of appearance; URCP 74(b)(3) requires withdrawal orders to say so.
      </p>

      <h2>How entering an appearance works in e-filing</h2>
      <p>
        The court’s attorney e-filing FAQ (updated April 2026) says you must be attached to a party
        to receive e-filing notices. Filing an appearance of counsel, an answer, or a motion for a
        party attaches you automatically. If you have nothing substantive to file yet, file the
        appearance now.
      </p>
      <p>Three rules from the court’s materials:</p>
      <ul>
        <li>
          <strong>Use the right document type.</strong> Select “Appearance of Counsel/Notice of
          Limited Appearance.” The court’s <a href={COMMON_MISTAKES}>Common Mistakes training</a>{" "}
          warns that with the wrong type, you may not receive notifications.
        </li>
        <li>
          <strong>Add co-counsel first.</strong> Enter every attorney for the party before you submit
          the appearance or other first document.
        </li>
        <li>
          <strong>File only as counsel of record.</strong> You cannot file through the account of an
          attorney who is not counsel of record. Pro hac vice counsel e-file through local counsel.
        </li>
      </ul>
      <p>
        Once you are attached, <a href={`${RULES}?type=urcp&rule=5`}>URCP 5(b)(3)(A)</a> treats
        submitting a document for e-filing as service on anyone with an e-filing account. See our
        guide to{" "}
        <PostLink slug="utah-rule-5-electronic-service">e-service under URCP 5</PostLink>. Courtpath
        has a short video on{" "}
        <Link href="/tutorials">entering an appearance in an existing case</Link>.
      </p>

      <h2>Limited appearances under URCP 75</h2>
      <p>
        An attorney with a limited-representation agreement may appear only for one or more of these
        purposes: filing a pleading or other paper; a specific motion; a specific discovery
        procedure; a specific hearing, including trial, a pretrial conference or ADR; or any other
        purpose with leave of court (<a href={RULE_75}>URCP 75(a)</a>).
      </p>
      <p>
        Before it starts, file a Notice of Limited Appearance signed by you and the client, or
        announce it on the record if the judge permits. The notice must describe the purpose and
        scope and state that the client remains responsible for everything else. Any party may move
        to clarify the scope.
      </p>
      <p>
        URCP 5(b)(1)(A) requires service on both you and the client for documents within the
        notice’s scope. When the purpose is complete, <a href={RULE_74}>URCP 74(c)</a> requires you
        to withdraw by filing a notice of withdrawal, or orally on the record if the court permits.
        Leaving before the purpose is complete puts you back under 74(a) or (b).
      </p>

      <h2>Substitution of counsel under URCP 74(e)</h2>
      <p>
        New counsel files and serves a notice of substitution signed by new counsel and the client.
        Court approval is not needed if new counsel certifies they will comply with the existing
        hearing schedule and deadlines. The Nov. 1, 2026 amendment removed the requirement that
        former counsel sign.
      </p>
      <p>
        The courts’ domestic <a href={FORM_1124FA}>form 1124FA</a> (revised May 1, 2022) still has a
        former-counsel signature line; the rule controls. In e-filing, use the “Substitution of
        Counsel” type. Clerks review it, attach the new attorney and detach the old one.
      </p>

      <h2>Withdrawal of counsel under URCP 74</h2>
      <table>
        <thead>
          <tr>
            <th>Route</th>
            <th>When it applies</th>
            <th>What you file</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Notice, 74(a)</td>
            <td>
              No motion pending, no hearing or trial set, no outstanding court-ordered obligations for
              you
            </td>
            <td>
              Notice stating all three, plus the client’s last known mailing address, email and phone
            </td>
          </tr>
          <tr>
            <td>Motion, 74(b)</td>
            <td>Any of those exist</td>
            <td>
              Motion describing case status, a certificate of Rule 5 service, client contact
              information, and a proposed order
            </td>
          </tr>
          <tr>
            <td>Co-counsel remains, 74(f)</td>
            <td>Other counsel who has already appeared stays in</td>
            <td>Notice stating the party is still represented</td>
          </tr>
          <tr>
            <td>Limited appearance done, 74(c)</td>
            <td>Purpose of the URCP 75 appearance is finished</td>
            <td>Notice of withdrawal, or oral withdrawal if permitted</td>
          </tr>
        </tbody>
      </table>
      <p>The 74(b) proposed order must tell the client four things:</p>
      <ol>
        <li>
          Within 21 days of the order, retain an attorney or file a notice of personal appearance.
        </li>
        <li>
          Proceedings are continued and deadlines stayed until 21 days after the court grants the
          motion, unless waived or ordered otherwise.
        </li>
        <li>An entity must be represented by an attorney admitted in Utah.</li>
        <li>
          Missing the deadline may mean missed notices, sanctions, default judgment or dismissal.
        </li>
      </ol>
      <p>
        A motion to withdraw follows normal{" "}
        <PostLink slug="utah-rule-7-motions">URCP 7 motion practice</PostLink>.
      </p>
      <p>
        If an attorney withdraws by notice under 74(a), dies, is suspended, disbarred or removed, URCP
        74(d) requires the opposing party to serve and file a notice to appear or appoint counsel.
        Proceedings are stayed until 21 days after filing. See{" "}
        <PostLink slug="utah-court-holidays-deadlines">how Utah deadlines are counted</PostLink>.
      </p>
      <p>
        In e-filing, select “Notice of Withdrawal” so it routes to clerk review. The courts’{" "}
        <a href={FORM_1121GE}>form 1121GE</a> (revised Dec. 24, 2019) predates the May 2026
        amendments. It lacks the statement that there are no outstanding court-ordered obligations,
        and it does not ask for the client’s email and phone. Add both.
      </p>

      <h2>Licensed Paralegal Practitioners</h2>
      <p>
        Under <a href={`${RULES}?type=urcp&rule=86`}>URCP 86(b)</a>, “attorney” and “counsel”
        include LPPs in their authorized practice areas, so Rules 74 and 75 apply to them. Under
        86(e), an LPP hired only to prepare, not file, a paper need not enter an appearance. An LPP
        with a general appearance must tell the client about every paper filed.{" "}
        <a href={`${RULES}?type=ucja&rule=4-503`}>UCJA 4-503</a> requires district court civil and
        probate filings to be e-filed by an attorney or LPP of record.
      </p>

      <h2>Criminal cases</h2>
      <p>
        The criminal e-filing list uses the same appearance and substitution document types.
        Withdrawal is stricter: before judgment,{" "}
        <a href={`${RULES}?type=urcrp&rule=36`}>URCrP 36(a)</a> requires court approval, on a motion
        made in open court with the defendant present unless the court orders otherwise.
      </p>

      <h2>What happens if you don’t enter an appearance</h2>
      <p>
        You are not attached, so e-filing notices and e-service do not reach you, and only counsel of
        record may e-file in the case. For a client who has been served, not appearing creates{" "}
        <PostLink slug="utah-default-judgment">default judgment</PostLink> risk.
      </p>

      <Callout title="Common mistakes">
        <ul>
          <li>Filing the appearance as “Other” or a similar type, so you are never attached.</li>
          <li>
            Waiting on former counsel to sign a substitution. Since Nov. 1, 2026, the rule does not
            require it.
          </li>
          <li>
            Filing a notice of withdrawal when a hearing is set or a motion is pending. That requires
            a motion and order.
          </li>
          <li>Opposing counsel pressing deadlines during the 21-day stay under 74(b) or 74(d).</li>
          <li>
            Leaving the “client remains responsible” statement out of a Notice of Limited Appearance.
          </li>
        </ul>
      </Callout>
      <p>
        If a filing comes back rejected, see{" "}
        <PostLink slug="utah-efiling-rejected">why Utah e-filings get rejected</PostLink>.
      </p>

      <h2>Entering appearances with Courtpath</h2>
      <p>
        Courtpath is a certified e-filing service provider for Utah district and justice courts.
        Enter appearances, file substitutions and withdrawals, and receive e-service on your cases.
        Every new account gets its first 30 days free, and court filing fees still apply. See{" "}
        <Link href="/pricing">plans and pricing</Link> or{" "}
        <Link href="/signup/basic">start an account</Link>.
      </p>
    </>
  );
}
