import Link from "next/link";
import Callout from "@/components/blog/Callout";
import PostLink from "@/components/blog/PostLink";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const CODE_301 = "https://le.utah.gov/xcode/Title78A/Chapter2/C78A-2-S301_2026050620260506.html";
const CODE_301_5 = "https://le.utah.gov/xcode/Title78A/Chapter2/C78A-2-S301.5_2026050620260506.html";
const CODE_302 = "https://le.utah.gov/xcode/Title78A/Chapter2/78A-2-S302.html";
const CODE_304 = "https://le.utah.gov/xcode/Title78A/Chapter2/78A-2-S304.html";
const CODE_8_102 = "https://le.utah.gov/xcode/Title78A/Chapter8/78A-8-S102.html";
const SB_283 = "https://le.utah.gov/~2026/bills/static/SB0283.html";

export const meta: PostMeta = {
  slug: "utah-court-filing-fees",
  title: "Utah Court Filing Fees in 2026: The Full Table After SB 283",
  seoTitle: "Utah Court Filing Fees 2026: Full Fee Table",
  description:
    "Utah court filing fees after SB 283 (May 6, 2026): complaints $105-$375, divorce $350, writs $75, jury demand $250, small claims, waivers and e-filing.",
  category: "Rules and fees",
  status: "draft",
  updatedAt: "2026-11-03",
  author: "Courtpath",
  faqs: [
    {
      question: "How much does it cost to file a lawsuit in Utah district court?",
      answer:
        "It depends on the claim amount. It’s $105 for $2,000 or less, $215 for more than $2,000 and less than $10,000, and $375 for $10,000 or more. Court costs, interest and attorney fees don’t count toward the claim amount.",
    },
    {
      question: "What is the Utah divorce filing fee in 2026?",
      answer:
        "$350 for a petition for divorce, up from $325 before May 6, 2026. A counterclaim in a divorce case is $130. A petition to modify a decree is $100.",
    },
    {
      question: "What is the Utah small claims filing fee?",
      answer:
        "$60 for claims of $2,000 or less, $100 for more than $2,000 and less than $7,500, and $185 for $7,500 or more. SB 283 did not change these fees.",
    },
    {
      question: "Is there a fee to file an answer in Utah?",
      answer:
        "No. Utah Code 78A-2-301(2) charges no fee for documents not listed in that section or otherwise provided by law, and an answer isn’t listed. A counterclaim filed with the answer does have its own fee.",
    },
    {
      question: "How much is a writ of garnishment in Utah?",
      answer:
        "$75 in district court since May 6, 2026, and $50 in justice court. The writ fee is in addition to the fee for the complaint.",
    },
    {
      question: "What is the Utah jury demand fee?",
      answer: "$250 for a demand for a civil jury in district court. SB 283 did not change it.",
    },
    {
      question: "How do I get Utah court filing fees waived?",
      answer:
        "File an affidavit of indigency under Utah Code 78A-2-302. Qualifying grounds include income at or below 150% of the federal poverty guidelines or means-tested benefits like SNAP or Medicaid. The judge can still order a partial fee.",
    },
  ],
  sources: [
    { title: "Utah Code 78A-2-301 (eff. 5/6/2026)", url: CODE_301 },
    { title: "Utah Code 78A-2-301.5", url: CODE_301_5 },
    { title: "S.B. 283 (2026)", url: SB_283 },
    { title: "Utah Code 78A-2-302", url: CODE_302 },
    { title: "Utah Code 78A-2-304", url: CODE_304 },
    { title: "Utah Code 78A-8-102", url: CODE_8_102 },
    { title: "Utah Courts: Filing Fees", url: "https://www.utcourts.gov/en/legal-help/legal-help/procedures/fees.html" },
    { title: "UCJA 4-503", url: `${RULES}?type=ucja&rule=4-503` },
    {
      title: "Certified E-Filing Service Providers",
      url: "https://www.utcourts.gov/en/self-help/legal-help/procedures/filing/efiling/providers.html",
    },
  ],
  related: [
    "how-to-efile-new-civil-case-utah-district-court",
    "utah-court-holidays-deadlines",
    "utah-default-judgment",
    "utah-efiling-rejected",
  ],
};

const DISTRICT_FEES: [string, string, string][] = [
  ["Complaint, $2,000 or less", "$105", "(1)(b)(i)"],
  ["Complaint, over $2,000 and under $10,000", "$215", "(1)(b)(ii)"],
  ["Complaint, $10,000 or more", "$375", "(1)(b)(iii)"],
  [
    "Any other complaint or petition not covered elsewhere (this generally includes an opening probate petition)",
    "$375",
    "(1)(a)",
  ],
  ["Divorce petition", "$350", "(1)(b)(iv)"],
  ["Temporary separation petition", "$35", "(1)(b)(v)"],
  [
    "Counterclaim, cross-claim, third-party complaint or complaint in intervention, $2,000 or less",
    "$55",
    "(1)(d)(i)",
  ],
  ["Same, over $2,000 and under $10,000", "$165", "(1)(d)(ii)"],
  ["Same, $10,000 or more, non-monetary relief, or original filed under (1)(a)", "$170", "(1)(d)(iii)"],
  ["Counterclaim in a divorce case", "$130", "(1)(d)(iv)"],
  ["Petition or counter-petition to modify a domestic relations order", "$100", "(1)(q)"],
  ["Demand for civil jury", "$250", "(1)(s)"],
  ["Writ of replevin, attachment, execution or garnishment", "$75", "(1)(w)"],
  ["Motion to renew judgment", "50% of the original fee ($52.50 / $107.50 / $187.50)", "(1)(l)"],
  ["Foreign judgment (another state or the U.S.)", "$35", "(1)(k)"],
  ["Trial de novo of a justice court or small claims judgment", "$240", "(1)(g)(i)"],
  ["Notice of appeal, interlocutory appeal petition, or petition for writ of certiorari", "$240", "(1)(h)"],
  ["Petition for expungement", "$150", "(1)(i)"],
  ["Probate accounting", "$15 to $175, by estate value", "(1)(r)"],
];

export default function Body() {
  return (
    <>
      <p className="lead">
        Utah court filing fees went up on May 6, 2026, under SB 283. A district court complaint now
        costs $105 for claims of $2,000 or less, $215 for claims over $2,000 and under $10,000, and
        $375 for $10,000 or more. A divorce petition costs $350 and a writ of garnishment or
        execution costs $75.
      </p>
      <p>
        SB 283 raised district court fees for complaints under $10,000, divorce petitions and writs;
        small claims, jury demands, counterclaims, appeals and the $375 complaint fee did not change.
      </p>

      <h2>What changed on May 6, 2026</h2>
      <p>
        <a href={SB_283}>SB 283</a> (“Court Fees and Administration Amendments”, 2026 General
        Session) amended <a href={CODE_301}>Utah Code 78A-2-301</a>. These are the fee changes for
        courts of record:
      </p>
      <table>
        <thead>
          <tr>
            <th>Filing</th>
            <th>Before May 6, 2026</th>
            <th>Now</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Complaint, claim of $2,000 or less</td>
            <td>$90</td>
            <td>$105</td>
          </tr>
          <tr>
            <td>Complaint, claim over $2,000 and under $10,000</td>
            <td>$200</td>
            <td>$215</td>
          </tr>
          <tr>
            <td>Divorce petition</td>
            <td>$325</td>
            <td>$350</td>
          </tr>
          <tr>
            <td>Writ of replevin, attachment, execution or garnishment</td>
            <td>$50</td>
            <td>$75</td>
          </tr>
        </tbody>
      </table>
      <p>
        Two fees rise with the complaint tiers: a motion to renew judgment (50% of the original fee)
        and depositing funds under Section 57-1-29.
      </p>
      <p>
        SB 283 also raised the Online Court Assistance Program (OCAP) surcharge from $20 to $60
        (Utah Code 78A-2-501(4)). It is added when a complaint, petition, counterclaim or
        counterpetition is prepared through OCAP. Answers prepared through OCAP no longer carry the
        surcharge, and neither do later papers or requests for protective orders.
      </p>

      <h2>Utah court filing fees: the full district court table</h2>
      <p>
        Claim amounts exclude court costs, interest and attorney fees. Watch the boundaries: a claim
        of exactly $2,000 is in the lowest tier, and a claim of exactly $10,000 is $375.
      </p>
      <table>
        <thead>
          <tr>
            <th>Filing</th>
            <th>Fee</th>
            <th>Utah Code 78A-2-301</th>
          </tr>
        </thead>
        <tbody>
          {DISTRICT_FEES.map(([filing, fee, cite]) => (
            <tr key={cite}>
              <td>{filing}</td>
              <td>{fee}</td>
              <td>{cite}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        The writ fee is charged “in addition to any fee for a complaint or petition.” If you are
        collecting on a default judgment, budget for both. See{" "}
        <PostLink slug="utah-default-judgment">Utah default judgment</PostLink> for the steps before
        the writ.
      </p>

      <h2>Small claims filing fees</h2>
      <p>
        Small claims fees did not change. They are the same in district court and justice court.
        Small claims covers claims up to $20,000, including attorney fees but excluding court costs
        and interest, through Dec. 31, 2029. The limit rises to $25,000 on Jan. 1, 2030{" "}
        (<a href={CODE_8_102}>Utah Code 78A-8-102</a>).
      </p>
      <table>
        <thead>
          <tr>
            <th>Claim amount</th>
            <th>Small claims affidavit</th>
            <th>Counter affidavit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$2,000 or less</td>
            <td>$60</td>
            <td>$50</td>
          </tr>
          <tr>
            <td>Over $2,000 and under $7,500</td>
            <td>$100</td>
            <td>$70</td>
          </tr>
          <tr>
            <td>$7,500 or more</td>
            <td>$185</td>
            <td>$120</td>
          </tr>
        </tbody>
      </table>

      <h2>Filings with no fee</h2>
      <p>
        Utah Code 78A-2-301(2) says there is no fee for filing documents “not listed in this section
        or otherwise provided by law.” The list has no answer, motion or notice of appearance. So an
        answer is free to file, and so is a{" "}
        <PostLink slug="notice-of-appearance-utah">notice of appearance</PostLink>. A motion under{" "}
        <PostLink slug="utah-rule-7-motions">URCP 7</PostLink> is free too, unless a statute sets a
        fee for it, like a motion to renew judgment. The state, its agencies and political
        subdivisions pay no fees under this section at all.
      </p>

      <h2>Justice court fees that differ</h2>
      <p>
        Justice court civil fees are in <a href={CODE_301_5}>Utah Code 78A-2-301.5</a>. SB 283 did
        not raise them.
      </p>
      <table>
        <thead>
          <tr>
            <th>Filing</th>
            <th>Justice court</th>
            <th>District court</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Writ of replevin, attachment, execution or garnishment</td>
            <td>$50</td>
            <td>$75</td>
          </tr>
          <tr>
            <td>Petition for expungement</td>
            <td>$135</td>
            <td>$150</td>
          </tr>
          <tr>
            <td>Notice of appeal to a court of record</td>
            <td>$10</td>
            <td>n/a</td>
          </tr>
        </tbody>
      </table>
      <p>
        The $10 justice court appeal fee does not cover the $240 trial de novo fee in district court.
        Plan for both.
      </p>

      <h2>Fee waivers: the affidavit of indigency</h2>
      <p>
        <a href={CODE_302}>Utah Code 78A-2-302</a> lets a person file, defend or appeal without
        prepaying fees by submitting an affidavit showing they are indigent. The statute calls this
        an “affidavit of indigency” (78A-2-302(6)). A court must find the person indigent if the
        affidavit shows any of these:
      </p>
      <ul>
        <li>
          income at or below 150% of the federal poverty guidelines (expungement petitions use a
          modified household-size test)
        </li>
        <li>benefits from a means-tested program such as TANF, SSI, SNAP or Medicaid</li>
        <li>legal services from a nonprofit provider or a pro bono attorney through the Utah State Bar</li>
        <li>
          not enough income to pay without going without food, shelter, clothing or other necessities
        </li>
      </ul>
      <p>
        The judge still decides. Under <a href={CODE_304}>78A-2-304</a>, the court must require a
        partial or full fee if the financial information shows an ability to pay. The court can also
        hold entry of judgment until costs are paid.
      </p>

      <h2>How fees are paid when you e-file</h2>
      <p>
        Under <a href={`${RULES}?type=ucja&rule=4-503`}>UCJA 4-503</a>, attorneys and LPPs must
        e-file civil and probate papers in district court through a certified e-filing service
        provider. Under 78A-2-301(3), fees are paid at the time the clerk accepts the pleading for
        filing. When you e-file, you pay the court fee at submission through your provider. For the
        full filing walkthrough, see{" "}
        <PostLink slug="how-to-efile-new-civil-case-utah-district-court">
          how to e-file a new civil case in Utah district court
        </PostLink>
        .
      </p>
      <p>
        If a filing comes back rejected, see{" "}
        <PostLink slug="utah-efiling-rejected">why Utah e-filings get rejected</PostLink>. Filing
        near a deadline? Check{" "}
        <PostLink slug="utah-court-holidays-deadlines">Utah court holidays and deadlines</PostLink>.
      </p>

      <Callout title="Common mistakes">
        <ul>
          <li>
            <strong>Using pre-May 2026 numbers.</strong> Old fee charts still say $90, $200, $325
            and $50.
          </li>
          <li>
            <strong>Mixing up small claims and complaint fees.</strong> A $1,500 small claims
            affidavit is $60. A $1,500 district court complaint is $105.
          </li>
          <li>
            <strong>Counting interest and fees in the claim amount.</strong> The tiers exclude court
            costs, interest and attorney fees.
          </li>
          <li>
            <strong>Assuming the writ fee is the same everywhere.</strong> It is $75 in district
            court and $50 in justice court.
          </li>
          <li>
            <strong>Forgetting the jury demand.</strong> It is a separate $250 fee.
          </li>
          <li>
            <strong>Paying full price to renew a judgment.</strong> Renewal is 50% of the original
            filing fee.
          </li>
        </ul>
      </Callout>

      <h2>What Courtpath costs (separate from court fees)</h2>
      <p>
        Courtpath is a certified e-filing service provider for Utah district and justice courts. Its
        plan prices are separate from the court fees above, which you pay on top. Basic is $10 a
        month with 3 filings included, then $4 a filing. Unlimited is $25 a month or $240 a year. The
        Firm plan is $21 per attorney per month for firms with 2 or more attorneys. Criminal Defense
        is $9.99 a month. Every new account gets its first 30 days free. See{" "}
        <Link href="/pricing">pricing</Link> or <Link href="/signup/basic">sign up</Link> with your
        name, email, Utah bar number and a card.
      </p>
    </>
  );
}
