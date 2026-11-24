import Link from "next/link";
import PostLink from "@/components/blog/PostLink";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const RULE_55 = `${RULES}?type=urcp&rule=55`;
const DJ_DOCS = "https://legacy.utcourts.gov/howto/filing/default_judgment/docs";
const USC_3931 = "https://www.law.cornell.edu/uscode/text/50/3931";

export const meta: PostMeta = {
  slug: "utah-default-judgment",
  title: "Default Judgment in Utah: How URCP 55 Works in District Court",
  seoTitle: "Default Judgment in Utah: URCP 55 Steps",
  description:
    "How to get a default judgment in Utah under URCP 55: default certificate, clerk vs. court judgment, SCRA declaration, proposed judgment, and setting aside.",
  category: "How-to filing",
  status: "published",
  publishedAt: "2026-11-23",
  updatedAt: "2026-11-23",
  author: "Courtpath",
  faqs: [
    {
      question: "How long does a defendant have to answer before I can seek default in Utah?",
      answer:
        "Under URCP 12(a), 21 days after service within Utah and 30 days after service outside Utah, unless a statute or court order sets a different time.",
    },
    {
      question: "Can the clerk enter a default judgment without a judge?",
      answer:
        "Yes, if the claim is for a sum certain, the default is for failure to appear, the defendant is not an infant or incompetent person, the defendant was personally served under Rule 4(d)(1), and a verified complaint, affidavit, or unsworn declaration establishes the amount after credits.",
    },
    {
      question: "Do I need a military service declaration for a Utah default judgment?",
      answer:
        "Yes. The federal Servicemembers Civil Relief Act, 50 U.S.C. 3931(b), requires an affidavit, or a declaration under penalty of perjury, on the defendant’s military status before the court enters judgment against a defendant who has not appeared. Utah’s form is the Military Service Declaration (1352GEJ).",
    },
    {
      question: "Do I have to serve the motion for default judgment on the defaulted defendant?",
      answer:
        "Under the current rule, generally no. URCP 5(a)(2) excuses service on a party in default for failure to appear, except for service the court orders, notice of any damages hearing, notice of entry of judgment, and new claims (served under Rule 4). A proposed amendment may change this.",
    },
    {
      question: "How do I set aside a default judgment in Utah?",
      answer:
        "File a motion under URCP 60(b), as Rule 55(c) directs. For mistake, excusable neglect, newly discovered evidence, or fraud, the motion must be filed within 90 days after entry of judgment; other grounds, such as a void judgment, require a reasonable time.",
    },
  ],
  sources: [
    { title: "URCP 55, Default", url: RULE_55 },
    { title: "URCP 12", url: `${RULES}?type=urcp&rule=12` },
    { title: "URCP 60", url: `${RULES}?type=urcp&rule=60` },
    { title: "URCP 58A", url: `${RULES}?type=urcp&rule=58A` },
    { title: "URCP 54", url: `${RULES}?type=urcp&rule=54` },
    { title: "URCP 5", url: `${RULES}?type=urcp&rule=5` },
    { title: "URCP 4", url: `${RULES}?type=urcp&rule=4` },
    { title: "URCP 7", url: `${RULES}?type=urcp&rule=7` },
    { title: "URCP 10", url: `${RULES}?type=urcp&rule=10` },
    { title: "UCJA 4-503", url: `${RULES}?type=ucja&rule=4-503` },
    { title: "Default Certificate (form 1350GEJ)", url: `${DJ_DOCS}/1350GE_Default_Certificate.pdf` },
    {
      title: "Motion for Default Judgment (form 1351GEJ)",
      url: `${DJ_DOCS}/1351GE_Motion_for_Default_Judgment.pdf`,
    },
    {
      title: "Military Service Declaration (form 1352GEJ)",
      url: `${DJ_DOCS}/1352GE_Military_Service_Declaration.pdf`,
    },
    { title: "Checklist for Default Judgment (2014)", url: `${DJ_DOCS}/00_Checklist.pdf` },
    { title: "50 U.S.C. 3931", url: USC_3931 },
  ],
  related: [
    "utah-court-holidays-deadlines",
    "utah-rule-7-motions",
    "notice-of-appearance-utah",
    "utah-court-filing-fees",
  ],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        A default judgment in Utah district court is a two-step process under URCP 55: first the
        clerk enters the defendant’s default, then either the clerk (for a sum-certain claim against
        a personally served defendant) or the judge enters judgment. You can ask once the answer
        deadline has run: 21 days after service in Utah, or 30 days after service outside Utah.
      </p>

      <h2>Step 1: Wait out the answer deadline</h2>
      <p>
        <a href={`${RULES}?type=urcp&rule=12`}>URCP 12(a)(1)</a> sets those 21- and 30-day periods
        unless a statute or court order says otherwise, and a Rule 12 motion changes them. Count
        with <a href={`${RULES}?type=urcp&rule=6`}>Rule 6</a>, and remember that court holidays move
        deadlines (see{" "}
        <PostLink slug="utah-court-holidays-deadlines">Utah court holidays and deadlines</PostLink>).
      </p>
      <p>
        Make sure proof of service is on the docket first. The courts’ default forms recite that
        “proof of service or an acceptance of service has been filed or is attached.”
      </p>

      <h2>Step 2: Get the default entered (the default certificate)</h2>
      <p>
        <a href={RULE_55}>URCP 55(a)</a> says that when a party “has failed to plead or otherwise
        defend,” and “that fact is made to appear,” the clerk “shall enter the default of that
        party.” In practice, the clerk signs a <strong>Default Certificate</strong> (court form
        1350GEJ) stating:
      </p>
      <ul>
        <li>what was served and when,</li>
        <li>
          that the time to answer has passed and the party “has not answered or otherwise
          appeared,” and
        </li>
        <li>that the clerk enters the default.</li>
      </ul>

      <h2>Step 3: Clerk judgment or court judgment</h2>
      <table>
        <thead>
          <tr>
            <th>Factor</th>
            <th>Clerk judgment, Rule 55(b)(1)</th>
            <th>Court judgment, Rule 55(b)(2)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Claim type</td>
            <td>Sum certain only</td>
            <td>Everything else</td>
          </tr>
          <tr>
            <td>Default type</td>
            <td>Failure to appear</td>
            <td>Any default</td>
          </tr>
          <tr>
            <td>Defendant</td>
            <td>Not an infant or incompetent person</td>
            <td>Any (limits still apply)</td>
          </tr>
          <tr>
            <td>Service</td>
            <td>Personal service under Rule 4(d)(1)</td>
            <td>Any valid service</td>
          </tr>
          <tr>
            <td>Proof of amount</td>
            <td>
              Verified complaint, affidavit, or unsworn declaration showing the amount after all
              credits
            </td>
            <td>Whatever the court requires; it may hold hearings or order references</td>
          </tr>
          <tr>
            <td>Who signs</td>
            <td>Clerk (Rule 58A(d) carves this out)</td>
            <td>Judge</td>
          </tr>
        </tbody>
      </table>
      <p>
        The service condition trips people up.{" "}
        <a href={`${RULES}?type=urcp&rule=4`}>Rule 4(d)(1)</a> is personal service, including leaving
        papers at the defendant’s home with a resident “of suitable age and discretion.” Service by
        mail or commercial courier under Rule 4(d)(2), acceptance of service under Rule 4(d)(3), and
        court-ordered alternative service under Rule 4(d)(5) are not Rule 4(d)(1) service, so on the
        rule’s text those cases go to the judge.
      </p>
      <p>
        Two limits apply to both paths. Under{" "}
        <a href={`${RULES}?type=urcp&rule=54`}>Rule 54(c)</a>, which Rule 55(d) applies to every
        default, a default judgment “must not differ in kind from, or exceed in amount, what is
        demanded in the pleadings.” Under Rule 55(e), no default judgment enters against the State of
        Utah or its officers or agencies unless the claimant proves the claim “by evidence
        satisfactory to the court.”
      </p>

      <h2>Step 4: What to file</h2>
      <p>A typical district court packet:</p>
      <table>
        <thead>
          <tr>
            <th>Document</th>
            <th>Purpose</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Proof of service</td>
            <td>Shows service was complete</td>
            <td>If not already filed</td>
          </tr>
          <tr>
            <td>Default Certificate (1350GEJ)</td>
            <td>Clerk enters default</td>
            <td>Clerk signs</td>
          </tr>
          <tr>
            <td>Military Service Declaration (1352GEJ)</td>
            <td>Satisfies the SCRA affidavit requirement</td>
            <td>States in service, not in service, or unknown, and the basis</td>
          </tr>
          <tr>
            <td>Motion for Default Judgment (1351GEJ)</td>
            <td>Asks for judgment as requested in the complaint</td>
            <td>States the default certificate has been submitted</td>
          </tr>
          <tr>
            <td>Affidavit or declaration of amount</td>
            <td>Proves the sum certain after credits</td>
            <td>Required for a clerk judgment under 55(b)(1)(D)</td>
          </tr>
          <tr>
            <td>Proposed judgment</td>
            <td>The order you want signed</td>
            <td>
              Separate document titled “Judgment”;{" "}
              <a href={`${RULES}?type=urcp&rule=7`}>Rule 7(j)(6)</a> controls when it is filed
            </td>
          </tr>
          <tr>
            <td>Request to submit for decision</td>
            <td>Puts the motion before the judge</td>
            <td>For court judgments</td>
          </tr>
        </tbody>
      </table>
      <p>
        Under Rule 55(b)(1)(D), the verified complaint, affidavit, or unsworn declaration (Title 78B,
        Chapter 18a, Uniform Unsworn Declarations Act) must set out “facts necessary to establish the
        amount of the claim, after deducting all credits to which the defendant is entitled,” and
        verify the amount “is warranted by information in the plaintiff’s possession.”
      </p>

      <h2>The Servicemembers Civil Relief Act declaration</h2>
      <p>
        Federal law applies whenever the defendant has not appeared (
        <a href={USC_3931}>50 U.S.C. 3931(a)</a>). Under 3931(b)(1), before entering judgment for the
        plaintiff, the court “shall require” an affidavit stating whether the defendant is in
        military service, with supporting facts, or stating that the plaintiff cannot determine it. A
        declaration under penalty of perjury satisfies this (3931(b)(4)). Knowingly filing a false
        one is a federal crime (3931(c)).
      </p>
      <p>
        If the defendant is in military service, the court cannot enter judgment until it appoints an
        attorney for the defendant (3931(b)(2)) and, on counsel’s application or its own motion, must
        stay the case at least 90 days if a defense may need the defendant or counsel cannot reach
        them (3931(d)); the Utah form says to submit a Military Service Order. If status cannot be
        determined, the court may require a bond (3931(b)(3)).
      </p>

      <h2>Filing the proposed judgment electronically</h2>
      <p>
        Attorneys and LPPs must e-file in district court civil cases under{" "}
        <a href={`${RULES}?type=ucja&rule=4-503`}>UCJA 4-503</a>. Two rules shape the proposed
        judgment:
      </p>
      <ul>
        <li>
          <strong>
            <a href={`${RULES}?type=urcp&rule=58A`}>URCP 58A(a)</a>:
          </strong>{" "}
          every judgment must be “set out in a separate document ordinarily titled ‘Judgment.’” File
          it as its own document, not as an exhibit to the motion.
        </li>
        <li>
          <strong>
            <a href={`${RULES}?type=urcp&rule=10`}>URCP 10(e)</a>:
          </strong>{" "}
          an e-filed proposed document for a court official’s signature “must not include the
          official’s signature line” and must state at the end that the signature appears at the top
          of the first page.
        </li>
      </ul>
      <p>
        A bottom signature block can get a proposed order sent back (see{" "}
        <PostLink slug="utah-efiling-rejected">why Utah e-filings get rejected</PostLink>).
      </p>

      <h2>Notice: who gets served</h2>
      <p>
        <PostLink slug="utah-rule-5-electronic-service">URCP 5(a)(2)</PostLink> says no service is
        required on a party in default, with exceptions. You must serve a defaulted party:
      </p>
      <ul>
        <li>as the court orders;</li>
        <li>with notice of any hearing to set damages;</li>
        <li>with notice of entry of judgment under Rule 58A; and</li>
        <li>under Rule 4, with any pleading asserting new or additional claims.</li>
      </ul>
      <p>
        A party in default for some reason other than failing to respond must be served normally.
        Utah’s Rule 55 has no equivalent of the federal rule’s 7-day notice to a party who has
        appeared. But a defendant who has filed a notice of appearance or a motion has likely
        “otherwise defend[ed],” and is not in default in the first place (see{" "}
        <PostLink slug="notice-of-appearance-utah">notice of appearance in Utah</PostLink>).
      </p>
      <p>
        After the judgment is signed, Rule 58A(g) requires the party who prepared it to serve a copy
        on the other parties under Rule 5 and file proof of service. Rule 5(a)(2)(D) makes that
        include the defaulted party.
      </p>
      <p>
        A proposed Rule 5 amendment (comment period closed Sept. 8, 2026) would also require serving
        the proposed default judgment and supporting papers on the defaulting party, and notice on a
        known attorney. It was not adopted effective Nov. 1, 2026, so check the current rule before
        you file.
      </p>

      <h2>Setting aside a default judgment in Utah</h2>
      <ul>
        <li>
          <strong>Entry of default only:</strong> Rule 55(c) lets the court set it aside “for good
          cause shown.”
        </li>
        <li>
          <strong>Default judgment:</strong> set aside under{" "}
          <a href={`${RULES}?type=urcp&rule=60`}>Rule 60(b)</a>. Grounds include mistake,
          inadvertence, surprise, or excusable neglect; fraud; and a void judgment (for example,
          defective service).
        </li>
        <li>
          <strong>Timing:</strong> Rule 60(c) requires a motion “within a reasonable time,” and for
          grounds (b)(1) through (3), “not more than 90 days after entry of the judgment.”
        </li>
        <li>
          <strong>Servicemembers:</strong> under 50 U.S.C. 3931(g), a servicemember may apply to
          reopen a default judgment entered during service or within 60 days after it, within 90 days
          after release, if service materially affected the defense and there is a meritorious
          defense.
        </li>
      </ul>
      <p>
        A motion to set aside follows{" "}
        <PostLink slug="utah-rule-7-motions">URCP 7 motion practice</PostLink>.
      </p>

      <h2>Debt collection defaults</h2>
      <p>
        Rule 55 has no separate debt-collection provision. In collection cases, the “after deducting
        all credits” language in 55(b)(1)(D) is where principal, payments, interest, and fees must
        reconcile with the complaint. Any amount that is not a sum certain goes to the judge.
      </p>

      <h2>File defaults with Courtpath</h2>
      <p>
        Courtpath is a certified e-filing service provider for Utah district and justice courts. You
        can file the default certificate, motion, declarations, and proposed judgment from one
        account. Every new account gets its first 30 days free, and court filing fees still apply
        (see <PostLink slug="utah-court-filing-fees">Utah court filing fees</PostLink> and{" "}
        <Link href="/pricing">Courtpath pricing</Link>).{" "}
        <Link href="/signup/basic">Start your free month</Link>.
      </p>
    </>
  );
}
