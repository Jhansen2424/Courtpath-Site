import Link from "next/link";
import Callout from "@/components/blog/Callout";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const RULE_5 = `${RULES}?type=urcp&rule=5`;
const MISTAKES_PDF =
  "https://www.utcourts.gov/content/dam/howto/filing/efiling/district/docs/Attorney_eFiling_Training_Common_Mistakes.pdf";

export const meta: PostMeta = {
  slug: "utah-rule-5-electronic-service",
  title: "E-Service Under URCP 5: When E-Filing Counts as Service in Utah",
  description:
    "When filing through your e-filing account serves the other side, when you still need email or mail, whether you need a certificate of service, and how timing works under Utah Rule 5.",
  category: "Rules and fees",
  status: "draft",
  updatedAt: "2026-10-02",
  author: "Courtpath",
  faqs: [
    {
      question: "Do I need a certificate of service when I serve through e-filing in Utah?",
      answer:
        "Not under the current rule. URCP 5(d) says no certificate of service is required when a document is served through an electronic filing account. You still need one for any party you serve by email, mail or another method.",
    },
    {
      question: "Does e-service add extra days to respond?",
      answer:
        "No. Under URCP 6(c), 7 days are added only when service is made exclusively by mail. Service by e-filing or email is complete when it’s sent and adds no time.",
    },
    {
      question: "How do I serve a self-represented party in Utah district court?",
      answer:
        "Most self-represented parties don’t have e-filing accounts, so e-filing won’t reach them. Email the document to the most recent email address they’ve given the court, or mail it to their address, and file a certificate of service.",
    },
    {
      question: "Does e-filing serve documents in Utah juvenile court?",
      answer:
        "No. Rule 5(b)(3)(A) excludes the juvenile court, because its system doesn’t send email alerts to parties.",
    },
    {
      question: "Can I serve the complaint by e-filing?",
      answer:
        "No. Rule 5 covers documents filed after the original complaint. The summons and complaint are served under URCP 4.",
    },
  ],
  sources: [
    { title: "URCP Rule 5: Service and filing of pleadings and other documents", url: RULE_5 },
    { title: "URCP Rule 6: Time", url: `${RULES}?type=urcp&rule=6` },
    { title: "URCP Rule 10: Form of pleadings", url: `${RULES}?type=urcp&rule=10` },
    { title: "URCP Rule 5 amendment history", url: "https://legacy.utcourts.gov/utc/rules-approved/category/urcp005/" },
    { title: "Electronic Filing: How Will Common Mistakes Affect You as Counsel?", url: MISTAKES_PDF },
  ],
  related: ["how-to-efile-new-civil-case-utah-district-court"],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        In Utah district court, filing a document through your e-filing account also serves it on
        every party who has an e-filing account, and service is complete the moment you send it. You
        don’t need a certificate of service for those parties. Anyone without an account still has
        to be served by email or mail, with a certificate.
      </p>

      <p>
        The rule is <a href={RULE_5}>URCP 5</a>, last amended effective November 1, 2024. Here’s
        how it works in practice, and where attorneys most often slip.
      </p>

      <h2>What Rule 5 covers</h2>
      <p>
        Rule 5(a)(1) requires that every document filed after the original complaint be served on
        every party, unless a statute, rule or court order says otherwise. The complaint and summons
        themselves are served under URCP 4, and the courts are explicit that original service can’t
        be done through e-filing.
      </p>

      <h2>The three ways to serve, and when each applies</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>When you can use it</th>
            <th>Certificate of service?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>E-filing (Rule 5(b)(3)(A))</td>
            <td>The person being served has an e-filing account. Not available in juvenile court.</td>
            <td>Not required</td>
          </tr>
          <tr>
            <td>Email (Rule 5(b)(3)(B))</td>
            <td>
              Either you or the person being served doesn’t have an e-filing account. Use the most
              recent email they gave the court, or for a Utah attorney, the email on their latest
              filing or on file with the Utah State Bar.
            </td>
            <td>Required</td>
          </tr>
          <tr>
            <td>Mail, hand delivery or another method (Rule 5(b)(3)(C))</td>
            <td>
              Mail to the last known address, hand delivery, leaving it at their office or home, or
              any method the parties agree to in writing.
            </td>
            <td>Required</td>
          </tr>
        </tbody>
      </table>
      <p>
        Under Rule 5(b)(4), service by mail or electronic means is complete when it’s sent.
      </p>

      <h2>Who you serve</h2>
      <p>
        Under Rule 5(b)(1), you serve a represented party’s attorney, and you serve a
        self-represented party directly. Two situations require serving <em>both</em> the attorney
        and the party:
      </p>
      <ul>
        <li>
          The attorney filed a Notice of Limited Appearance under Rule 75, and the document relates
          to a matter within its scope.
        </li>
        <li>
          A final judgment has been entered, and more than 90 days have passed since a document was
          last served on the attorney.
        </li>
      </ul>
      <p>
        Both are easy to miss when you rely on e-filing. E-filing reaches the attorney, but the party
        usually has no account, so you’ll need to email or mail the party separately.
      </p>

      <h2>Timing: same day, and faster when a hearing is close</h2>
      <ul>
        <li>
          <strong>Serve no later than you file.</strong> A filed document must be served before or
          on the same day it’s filed (Rule 5(b)(2)). E-filing takes care of this for e-filing
          parties, because filing and service happen together.
        </li>
        <li>
          <strong>Hearing within 7 days?</strong> Serve any document related to the hearing by the
          method most likely to be received promptly. Mail rarely qualifies.
        </li>
        <li>
          <strong>Only mail adds time.</strong> Under{" "}
          <a href={`${RULES}?type=urcp&rule=6`}>URCP 6(c)</a>, 7 days are added to a response period
          only when service is made exclusively by mail. E-service and email add nothing.
        </li>
      </ul>

      <h2>Certificates of service: what the rule says, and a wrinkle</h2>
      <p>
        Rule 5(d) is direct: “No certificate of service is required when a document is served
        through an electronic filing account.” When you serve by email, mail or another method, a
        certificate showing the date, the method and the email or mailing address used must be
        filed with the document or within a reasonable time after service.
      </p>
      <p>
        The wrinkle: the courts’ attorney training guide,{" "}
        <a href={MISTAKES_PDF}>“How Will Common Mistakes Affect You as Counsel?”</a>, still says
        e-service “does not replace the requirement for filing a certificate of service.” That
        conflicts with the current text of Rule 5(d). Two practical points follow:
      </p>
      <ul>
        <li>
          In any case with a party who isn’t on e-filing, you need a certificate for that party
          anyway.
        </li>
        <li>
          Many attorneys include a short certificate on every filing as a matter of habit. Nothing in
          the rule prohibits it.
        </li>
      </ul>

      <h2>How you know e-service went through</h2>
      <p>
        When you file, the court’s system sends a service message to each recipient’s e-filing
        provider, and the provider confirms delivery. According to the courts’ training guide,
        recording and storing that receipt is what constitutes valid service. The system also tells
        you which parties aren’t participating electronically, so you can serve them another way.
        Keep those receipts. They’re your proof if service is ever questioned.
      </p>

      <Callout title="Common e-service mistakes">
        <ul>
          <li>
            Assuming a self-represented party was served because the filing was accepted. Most
            don’t have e-filing accounts.
          </li>
          <li>
            Filing your appearance under the wrong document type. If you don’t use “Appearance of
            Counsel/Notice of Limited Appearance” (or file an answer for the party), you may not be
            attached to the party, and you may not receive notifications.
          </li>
          <li>Forgetting to serve the party as well as the attorney after a limited appearance.</li>
          <li>Counting an extra 7 days for e-service. That applies only to mail.</li>
          <li>Relying on e-filing in juvenile court, where it doesn’t count as service.</li>
        </ul>
      </Callout>

      <h2>E-service in Courtpath</h2>
      <p>
        Every Courtpath plan includes electronic service. When you file, opposing counsel with
        e-filing accounts are served automatically, and you can see the history in the case.
        Courtpath is a certified Utah e-filing provider, and user licenses are free through January
        1, 2027. <Link href="/pricing">See plans</Link>, or read our step-by-step guide to{" "}
        <Link href="/blog/how-to-efile-new-civil-case-utah-district-court">
          e-filing a new civil case
        </Link>
        .
      </p>
    </>
  );
}
