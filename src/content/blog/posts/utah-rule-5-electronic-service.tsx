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
    "If the other side has a lawyer, e-filing serves them. If they’re self-represented, it doesn’t. How Utah Rule 5 service works, when you need a certificate of service, and why discovery and proposed orders are different.",
  category: "Rules and fees",
  status: "draft",
  updatedAt: "2026-10-02",
  author: "Courtpath",
  faqs: [
    {
      question: "Do I need a certificate of service when I serve through e-filing in Utah?",
      answer:
        "Not under the current rule. URCP 5(d) says no certificate of service is required when a document is served through an electronic filing account. For a filed document served by email, mail or another method, you do need one.",
    },
    {
      question: "Does e-service add extra days to respond?",
      answer:
        "No. Under URCP 6(c), 7 days are added only when service is made exclusively by mail. Service by e-filing or email is complete when it’s sent and adds no time.",
    },
    {
      question: "Can e-filing serve discovery requests in Utah?",
      answer:
        "No. Under URCP 26(f), disclosures, discovery requests and responses generally aren’t filed with the court, so they never pass through the e-filing system. They have to be served another way, and you file only a certificate of service.",
    },
    {
      question: "How do I serve a self-represented party in Utah district court?",
      answer:
        "A self-represented party doesn’t have access to e-filing, so filing through your e-filing account doesn’t serve them. Email the document to the most recent email address they’ve given the court, and include a certificate of service with your document showing the date, the method and the address you used. If they haven’t provided an email, use mail or another Rule 5(b)(3)(C) method.",
    },
    {
      question: "Does e-filing serve documents in Utah juvenile court?",
      answer:
        "No. Rule 5(b)(3)(A) excludes the juvenile court. According to the rule’s advisory committee note, that’s because the juvenile court’s e-filing system (CARE) doesn’t send email alerts to parties.",
    },
  ],
  sources: [
    { title: "URCP Rule 5: Service and filing of pleadings and other papers", url: RULE_5 },
    { title: "URCP Rule 6: Time", url: `${RULES}?type=urcp&rule=6` },
    { title: "URCP Rule 7: Motions and orders", url: `${RULES}?type=urcp&rule=7` },
    { title: "URCP Rule 10: Form of pleadings", url: `${RULES}?type=urcp&rule=10` },
    { title: "URCP Rule 26: Disclosure and discovery", url: `${RULES}?type=urcp&rule=26` },
    { title: "URCP Rule 75: Limited appearance", url: `${RULES}?type=urcp&rule=75` },
    { title: "URCP Rule 76: Notice of contact information change", url: `${RULES}?type=urcp&rule=76` },
    { title: "UCJA Rule 4-503: Mandatory electronic filing", url: `${RULES}?rule=4-503&type=ucja` },
    { title: "Electronic Filing: How Will Common Mistakes Affect You as Counsel?", url: MISTAKES_PDF },
  ],
  related: ["how-to-efile-new-civil-case-utah-district-court"],
};

export default function Body() {
  return (
    <>
      <p className="lead">
        In Utah district court, the question that decides how you serve a document is whether the
        other side has a lawyer. If they do, filing through your e-filing account serves their
        attorney, and no additional service is needed. If they’re self-represented, they don’t have
        access to e-filing. You have to send them the document yourself, usually by email, and
        include a certificate of service showing how you sent it.
      </p>

      <p>
        The rule is <a href={RULE_5}>URCP 5</a>, as amended effective November 1, 2024. Below is how
        it works day to day. It also covers three situations where e-filing can’t serve even a
        represented party: discovery, proposed orders sent for approval, and juvenile court.
      </p>

      <h2>Represented or self-represented: how each is served</h2>
      <table>
        <thead>
          <tr>
            <th>The other side is…</th>
            <th>How they’re served</th>
            <th>Certificate of service?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Represented by a lawyer</td>
            <td>
              Filing the document through your e-filing account serves their attorney (Rule
              5(b)(3)(A)). No additional service is needed.
            </td>
            <td>Not required</td>
          </tr>
          <tr>
            <td>Self-represented</td>
            <td>
              They don’t have access to e-filing. Email the document to the most recent email
              address they’ve given the court (Rule 5(b)(3)(B)).
            </td>
            <td>Required. Include it with your document.</td>
          </tr>
          <tr>
            <td>Self-represented, with no email on file</td>
            <td>
              Mail it to the most recent address they’ve given the court, or their last known
              address. You can also hand it to them, leave it at their office with the person in
              charge, or leave it at their home with a resident of suitable age and discretion. The parties can agree in writing to any other method
              (Rule 5(b)(3)(C)).
            </td>
            <td>Required. Include it with your document.</td>
          </tr>
        </tbody>
      </table>
      <p>
        E-filing reaches opposing counsel because{" "}
        <a href={`${RULES}?rule=4-503&type=ucja`}>UCJA 4-503</a> requires attorneys to e-file in
        district court civil (including domestic) and probate cases. Self-represented parties file
        by email, mail, MyCase or in person, so the e-filing system has no way to deliver to them.
        Since <a href={`${RULES}?type=urcp&rule=10`}>URCP 10(a)(3)</a> requires every filing to list
        the filer’s email in the top-left corner, you’ll usually have an address for them. Under
        Rule 5(b)(4), service by mail or electronic means is complete when it’s sent.
      </p>
      <p>
        One more detail: when you email an attorney who isn’t on e-filing, you can use the address on
        their latest filing or the one on file with the Utah State Bar (or their home state’s
        licensing body if they aren’t licensed in Utah).
      </p>

      <h2>What Rule 5 covers</h2>
      <p>
        Rule 5(a)(1) requires that every document filed after the original complaint be served on
        every party, unless a statute, rule or court order says otherwise. An ex parte motion can
        skip service only where a statute or rule authorizes it, and the motion must cite that
        authority (<a href={`${RULES}?type=urcp&rule=7`}>Rule 7(m)</a>). The complaint and summons
        are served under URCP 4, not Rule 5.
      </p>
      <p>
        Parties in default get less. Under Rule 5(a)(2), a party in default for failing to respond
        needs to be served only:
      </p>
      <ul>
        <li>as the court orders;</li>
        <li>with notice of a hearing to set damages;</li>
        <li>with notice of entry of judgment;</li>
        <li>under Rule 4, with any new or additional claims against them.</li>
      </ul>
      <p>A party in default for any other reason is served normally.</p>

      <h2>Who you serve</h2>
      <p>
        Under Rule 5(b)(1), you serve a represented party’s attorney, unless the court orders service
        on the party, and you serve a self-represented party directly. Two situations require serving{" "}
        <em>both</em> the attorney and the party:
      </p>
      <ul>
        <li>
          The attorney filed a Notice of Limited Appearance under{" "}
          <a href={`${RULES}?type=urcp&rule=75`}>Rule 75</a>, and the document relates to a matter
          within its scope.
        </li>
        <li>
          A final judgment has been entered, and more than 90 days have passed since a document was
          last served on the attorney.
        </li>
      </ul>
      <p>
        Both are easy to miss when you rely on e-filing. It reaches the attorney, but not the party,
        so the party needs separate service and a certificate.
      </p>

      <h2>Discovery: e-filing can’t serve it</h2>
      <p>
        Under <a href={`${RULES}?type=urcp&rule=26`}>URCP 26(f)</a>, unless a rule or court order
        requires otherwise, you don’t file disclosures, discovery requests or discovery responses
        with the court. You file only a certificate of service stating what was served and when.
        Because the discovery itself never passes through the e-filing system, e-filing can’t serve
        it.
      </p>
      <p>
        Rule 5’s text doesn’t squarely address this. Email service under Rule 5(b)(3)(B) is tied to
        one side lacking an e-filing account, and most attorneys have one. Rule 5(b)(3)(C)(v) allows
        any method the parties agree to in writing, so the cleanest approach is to settle the
        discovery service method with opposing counsel in writing early, for example in the
        discovery plan. Then serve on that basis and e-file the certificate of service.
      </p>

      <h2>Proposed orders and signed orders</h2>
      <p>
        When the court directs you to prepare an order, <a href={`${RULES}?type=urcp&rule=7`}>Rule
        7(j)</a> requires you to serve the proposed order on the other parties for approval as to
        form within 14 days, <em>before</em> you file it. That service happens outside e-filing, so
        the same written-agreement point applies. The other parties have 7 days to object. If you
        file after that period runs without approval, you must also file a certificate of service
        of the proposed order.
      </p>
      <p>
        Once the judge signs it, Rule 5(b)(5) puts the job of serving the order on whoever prepared
        it. Documents the court prepares itself are served by the court. When the court submits a
        signed order to the e-filing system, that counts as service on every party with an e-filing
        account (Rule 5(b)(3)(A)). If a self-represented party is in the case and you drafted the
        order, you still owe that party service.
      </p>

      <h2>Timing</h2>
      <ul>
        <li>
          <strong>Serve no later than you file.</strong> A filed document must be served before or
          on the same day it’s filed (Rule 5(b)(2)). With e-filing parties, filing and service
          happen together.
        </li>
        <li>
          <strong>Hearing within 7 days?</strong> Serve any document related to the hearing by the
          method most likely to be received promptly. Mail may not meet that standard.
        </li>
        <li>
          <strong>Only mail adds time.</strong> Under{" "}
          <a href={`${RULES}?type=urcp&rule=6`}>URCP 6(c)</a>, 7 days are added to a response period
          only when service is made exclusively by mail. E-service and email add nothing.
        </li>
        <li>
          <strong>Unrepresented parties count from service.</strong> If a party has no attorney and
          no e-filing account, their deadline runs from the date they were served, not the filing
          date (Rule 6(d)).
        </li>
      </ul>

      <h2>Certificates of service</h2>
      <p>
        The practical rule follows the same line:
      </p>
      <ul>
        <li>
          <strong>Served through e-filing</strong> (represented parties): no certificate needed.
          Rule 5(d) says, “No certificate of service is required when a document is served through
          an electronic filing account.”
        </li>
        <li>
          <strong>Served any other way</strong> (self-represented parties, and anyone else outside
          e-filing): include a certificate of service with your document. It shows the date, the
          method and the email or mailing address you used, unless that address is safeguarded.
          Rule 5(d) also allows filing it within a reasonable time after service, but including it
          with the document is simplest.
        </li>
      </ul>
      <p>
        A document that isn’t filed needs a certificate only when a rule or court order requires
        one, as Rule 26(f) does for discovery.
      </p>
      <p>
        You may see older guidance saying otherwise. The courts’ attorney training guide,{" "}
        <a href={MISTAKES_PDF}>“How Will Common Mistakes Affect You as Counsel?”</a>, still says
        e-service “does not replace the requirement for filing a certificate of service.” The current
        text of Rule 5(d) says no certificate is required for e-served parties.
      </p>

      <h2>Proof that e-service went through</h2>
      <p>
        Under Rule 5(b)(4), e-service is complete when sent. When you file, the court’s system sends
        a service message to each recipient’s e-filing provider, and the provider confirms delivery.
        The courts’ training guide treats that recorded receipt as valid service. Keep the receipts,
        since they’re your proof if service is ever questioned. The system also tells you which
        parties aren’t participating electronically, so you can serve them another way.
      </p>
      <p>
        Service only works if contact details are current. Under{" "}
        <a href={`${RULES}?type=urcp&rule=76`}>URCP 76</a>, as amended effective May 1, 2026,
        attorneys and self-represented parties must promptly notify the court and the other parties
        in writing when their address, email or phone number changes. The exception is where
        disclosure is barred by a protective order, a stalking injunction, a rule, a statute or
        another court order.
      </p>

      <Callout title="Common e-service mistakes">
        <ul>
          <li>
            Assuming a self-represented party was served because the filing was accepted. They don’t
            have access to e-filing, so they need separate service and a certificate.
          </li>
          <li>Relying on e-filing to serve discovery or proposed orders sent for approval.</li>
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
        e-filing accounts are served through the court’s system, and the filing stays in your case
        history. Courtpath is a certified Utah e-filing provider, and user licenses are free until
        January 1, 2027. <Link href="/pricing">See plans</Link>, or read our step-by-step guide to{" "}
        <Link href="/blog/how-to-efile-new-civil-case-utah-district-court">
          e-filing a new civil case
        </Link>
        .
      </p>
    </>
  );
}
