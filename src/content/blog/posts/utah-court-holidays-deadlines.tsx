import Link from "next/link";
import Callout from "@/components/blog/Callout";
import PostLink from "@/components/blog/PostLink";
import type { PostMeta } from "../types";

const RULES = "https://legacy.utcourts.gov/rules/view.php";
const RULE_6 = `${RULES}?type=urcp&rule=6`;
const HOLIDAYS_PAGE = "https://www.utcourts.gov/en/about/miscellaneous/law-library/holidays.html";
const CODE_2026 = "https://le.utah.gov/xcode/Title63G/Chapter1/C63G-1-S301_2026050620260506.html";
const CODE_2027 = "https://le.utah.gov/xcode/Title63G/Chapter1/C63G-1-S301_2026050620270101.html";

export const meta: PostMeta = {
  slug: "utah-court-holidays-deadlines",
  title: "Utah Court Holidays 2026–2027 and How to Count Filing Deadlines",
  seoTitle: "Utah Court Holidays 2026–2027 and Deadlines",
  description:
    "Utah court holidays for late 2026 and 2027 with observed dates, plus how URCP 6 counts filing deadlines, the before-midnight e-filing rule and mail time.",
  category: "Rules and fees",
  status: "draft",
  updatedAt: "2026-11-03",
  author: "Courtpath",
  faqs: [
    {
      question: "Are Utah courts closed the day after Thanksgiving?",
      answer:
        "The day after Thanksgiving is not a legal holiday under Utah Code 63G-1-301 or URCP 6(a)(6), and it is not on the courts’ closure list. Treat Friday, November 27, 2026 as a normal filing day.",
    },
    {
      question: "What happens if my Utah filing deadline falls on a holiday?",
      answer:
        "Under URCP 6(a)(1)(C), the period runs until the end of the next day that is not a Saturday, Sunday or legal holiday. For e-filing, the end of that day is midnight.",
    },
    {
      question: "What time is the e-filing deadline in Utah state court?",
      answer:
        "Unless a statute or court order sets another time, an electronic filing on the last day is timely if made before midnight (URCP 6(a)(4)(A)).",
    },
    {
      question: "Is Pioneer Day a court holiday in Utah?",
      answer:
        "Yes. Pioneer Day, July 24, is a Utah legal holiday and a court closure day. In 2027, July 24 falls on a Saturday, so it is observed on Friday, July 23.",
    },
    {
      question: "Does service by email or e-filing add 3 or 7 days in Utah?",
      answer:
        "No. URCP 6(c) adds 7 days only when service was made exclusively by mail under Rule 5(b)(3)(C)(i).",
    },
    {
      question: "Is Good Friday a Utah court holiday?",
      answer:
        "Good Friday became a Utah legal holiday on May 6, 2026, but the Utah State Courts holidays page does not list it as a closure day. Confirm with the court before relying on it to extend a deadline on March 26, 2027.",
    },
    {
      question: "When is Juneteenth observed by Utah courts in 2027?",
      answer:
        "The statute effective January 1, 2027 points to Friday, June 18, while URCP 6 and the courts’ page describe the Monday rule (June 21). File by the earlier date until the courts clarify.",
    },
  ],
  sources: [
    { title: "URCP 6. Time", url: RULE_6 },
    { title: "Utah Code 63G-1-301 (effective May 6, 2026)", url: CODE_2026 },
    { title: "Utah Code 63G-1-301 (effective Jan. 1, 2027)", url: CODE_2027 },
    { title: "Utah State Courts holidays", url: HOLIDAYS_PAGE },
    { title: "URCP 7", url: `${RULES}?type=urcp&rule=7` },
    { title: "URCP 12", url: `${RULES}?type=urcp&rule=12` },
    { title: "UCJA 4-503", url: `${RULES}?type=ucja&rule=4-503` },
  ],
  related: [
    "utah-court-filing-fees",
    "utah-rule-5-electronic-service",
    "utah-efiling-rejected",
    "utah-rule-7-motions",
  ],
};

const HOLIDAYS: [string, string, string, string][] = [
  ["Veterans Day", "November 11", "November 11, 2026", "Wednesday"],
  ["Thanksgiving Day", "4th Thursday of November", "November 26, 2026", "Thursday"],
  ["Christmas Day", "December 25", "December 25, 2026", "Friday"],
  ["New Year’s Day", "January 1", "January 1, 2027", "Friday"],
  ["Dr. Martin Luther King, Jr. Day", "3rd Monday of January", "January 18, 2027", "Monday"],
  ["Washington and Lincoln Day (Presidents’ Day)", "3rd Monday of February", "February 15, 2027", "Monday"],
  ["Good Friday (see note)", "Friday before Easter", "March 26, 2027", "Friday"],
  ["Memorial Day", "Last Monday of May", "May 31, 2027", "Monday"],
  [
    "Juneteenth (see note)",
    "June 19 (falls on Saturday)",
    "June 18, 2027 under the statute; June 21, 2027 under the courts’ page",
    "Friday / Monday",
  ],
  ["Independence Day", "July 4 (falls on Sunday)", "July 5, 2027", "Monday"],
  ["Pioneer Day", "July 24 (falls on Saturday)", "July 23, 2027", "Friday"],
  ["Labor Day", "1st Monday of September", "September 6, 2027", "Monday"],
  ["Columbus Day", "2nd Monday of October", "October 11, 2027", "Monday"],
  ["Veterans Day", "November 11", "November 11, 2027", "Thursday"],
  ["Thanksgiving Day", "4th Thursday of November", "November 25, 2027", "Thursday"],
  ["Christmas Day", "December 25 (falls on Saturday)", "December 24, 2027", "Friday"],
  ["New Year’s Day 2028", "January 1 (falls on Saturday)", "December 31, 2027", "Friday"],
];

export default function Body() {
  return (
    <>
      <p className="lead">
        Utah court holidays 2026: for the rest of the year, the state courts are closed on Veterans
        Day (Wednesday, November 11), Thanksgiving (Thursday, November 26) and Christmas (Friday,
        December 25). Under URCP 6, a deadline that lands on a Saturday, Sunday or legal holiday
        moves to the next day that is none of those, and an e-filing made before midnight on that
        last day is on time.
      </p>

      <h2>Utah court holidays 2026 and 2027</h2>
      <p>
        The dates below apply <a href={CODE_2026}>Utah Code 63G-1-301</a>, including its Saturday and
        Sunday rules, and the closure list on the{" "}
        <a href={HOLIDAYS_PAGE}>Utah State Courts holidays page</a>. This covers the state district
        and justice courts. Federal court in Utah keeps its own calendar.
      </p>
      <table>
        <thead>
          <tr>
            <th>Holiday</th>
            <th>Fixed or floating</th>
            <th>Date observed</th>
            <th>Weekday</th>
          </tr>
        </thead>
        <tbody>
          {HOLIDAYS.map(([holiday, rule, date, weekday]) => (
            <tr key={date}>
              <td>{holiday}</td>
              <td>{rule}</td>
              <td>{date}</td>
              <td>{weekday}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Five fixed-date holidays fall on a weekend in 2027. Under 63G-1-301(2), a fixed-date holiday
        that falls on a Saturday is observed the Friday before, and one that falls on a Sunday is
        observed the Monday after. That moves Juneteenth to Friday, June 18 (under the statute),
        Independence Day to Monday, July 5, Pioneer Day to Friday, July 23, Christmas to Friday,
        December 24, and New Year’s Day 2028 to Friday, December 31, 2027.
      </p>
      <p>
        The day after Thanksgiving and Christmas Eve 2026 are not on the legal holiday list. Treat
        them as ordinary court days.
      </p>

      <h2>Two 2026 law changes to watch</h2>
      <p>
        <strong>Good Friday.</strong> The 2026 Legislature added Good Friday to Utah’s legal
        holidays, effective May 6, 2026, so it first applies on March 26, 2027. URCP 6(a)(6)(M)
        counts “any day designated by the Governor or Legislature as a legal holiday.” But the
        statute gives state employees only four hours of paid time off that day, and the Utah State
        Courts holidays page does not list Good Friday as a closure day. Until the courts say
        otherwise, do not plan on a deadline that falls on March 26, 2027 rolling to Monday.
      </p>
      <p>
        <strong>Juneteenth.</strong> Through 2026, Utah observed Juneteenth on a Monday. Starting{" "}
        <a href={CODE_2027}>January 1, 2027</a>, the statute makes it June 19, with the normal
        weekend rules. June 19, 2027 is a Saturday, so the statute observes it on Friday, June 18.
        URCP 6(a)(6)(E) and the courts’ holidays page still describe the Monday rule, which points to
        Monday, June 21. If a deadline falls on either day, file by the earlier date.
      </p>

      <h2>How to count a deadline under URCP 6</h2>
      <p>
        <a href={RULE_6}>Rule 6(a)(1)</a> covers any period stated in days:
      </p>
      <ol>
        <li>Skip the day of the triggering event.</li>
        <li>Count every day after it, including weekends and holidays in the middle.</li>
        <li>
          Land on the last day. If it is a Saturday, Sunday or legal holiday, keep going to the next
          day that is not.
        </li>
      </ol>
      <p>
        Example: a 14-day period starts with service on Thursday, November 12, 2026. Day 14 is
        Thanksgiving, November 26. The deadline moves to Friday, November 27.
      </p>
      <p>
        Example: a complaint is served in Utah on Friday, December 4, 2026.{" "}
        <a href={`${RULES}?type=urcp&rule=12`}>URCP 12(a)</a> gives 21 days to answer. Day 21 is
        Christmas, a Friday. Saturday and Sunday are skipped, so the answer is due Monday, December
        28. Missing it opens the door to{" "}
        <PostLink slug="utah-default-judgment">default judgment in Utah</PostLink>.
      </p>
      <p>
        Periods stated in hours (Rule 6(a)(2)) start counting immediately and end at the same time on
        the next non-holiday weekday if they would end on a weekend or holiday.
      </p>

      <h2>The before-midnight rule for e-filing</h2>
      <p>
        Rule 6(a)(4) says that unless a statute or court order sets a different time, filing on the
        last day means:
      </p>
      <ul>
        <li>for electronic filing, before midnight; and</li>
        <li>for other filing, before the clerk’s office is scheduled to close.</li>
      </ul>
      <p>
        Attorneys and Licensed Paralegal Practitioners must e-file in district court civil and
        probate cases under <a href={`${RULES}?type=ucja&rule=4-503`}>UCJA 4-503</a>, so the
        midnight rule is the one that applies to you. Watch for orders that set an earlier time. They
        override the default.
      </p>
      <p>
        Before midnight is a timestamp, not a promise of acceptance. If the clerk rejects the filing,
        see{" "}
        <PostLink slug="utah-efiling-rejected">what to do when a Utah e-filing is rejected</PostLink>.
      </p>

      <h2>Counting backward, and “the next day”</h2>
      <p>
        Some deadlines run before an event, such as a paper due a set number of days before a
        hearing. Rule 6(a)(5) says the “next day” is found by counting forward for periods after an
        event and backward for periods before one. If a backward count lands on a Saturday, the next
        day is Friday, not Monday. You file earlier, not later.
      </p>

      <h2>Mail adds 7 days, nothing else does</h2>
      <p>
        Rule 6(c) adds 7 days only when service was made exclusively by mail under Rule
        5(b)(3)(C)(i). Compute the period under Rule 6(a) first, then add 7 days. E-service through
        the filing system gets no extra days. See{" "}
        <PostLink slug="utah-rule-5-electronic-service">e-service under URCP 5</PostLink>.
      </p>
      <p>
        Some periods run from filing, not service. A memorandum opposing a motion is due 14 days
        after the motion is filed (<a href={`${RULES}?type=urcp&rule=7`}>URCP 7(d)(1)</a>), so mail
        time does not change it. More in our guide to{" "}
        <PostLink slug="utah-rule-7-motions">Rule 7 motions in Utah</PostLink>.
      </p>
      <p>
        Rule 6(d) covers parties who have no attorney and no e-filing account. When their period
        runs from the filing of a paper, it is counted from the service date instead.
      </p>

      <h2>When the court is closed or the system is down</h2>
      <p>
        Rule 6(a)(3) says that unless the court orders otherwise, if the clerk’s office is
        inaccessible on the last day, the deadline moves to the first accessible day that is not a
        weekend or holiday. The rule does not say whether an e-filing system outage makes the
        clerk’s office “inaccessible,” and we did not find a Utah State Courts policy on outages.
      </p>
      <p>If you cannot file on the last day:</p>
      <ul>
        <li>Save proof: screenshots with the time, error messages and any outage notice.</li>
        <li>Try again before midnight, and file as soon as you can.</li>
        <li>
          Ask for relief. Rule 6(b)(1) lets the court extend time for good cause. After the deadline
          has passed, that takes a motion showing excusable neglect.
        </li>
      </ul>
      <p>
        Rule 6(b)(2) bars the court from extending the time to act under Rules 50(b) and (d), 52(b),
        59(b), (d) and (e), and 60(c). Do not cut those close.
      </p>

      <Callout title="Common mistakes">
        <ul>
          <li>Counting the trigger day as day 1.</li>
          <li>Counting a backward deadline forward to Monday.</li>
          <li>
            Waiting until 11:55 p.m. Rule 6(a)(4) protects a filing made before midnight, not one
            that fails to go through.
          </li>
        </ul>
      </Callout>

      <h2>File on Courtpath</h2>
      <p>
        Courtpath is a certified e-filing service provider for Utah district and justice courts. You
        can file a new case,{" "}
        <PostLink slug="notice-of-appearance-utah">enter an appearance</PostLink> or file in an
        existing case from the same account.{" "}
        <PostLink slug="utah-court-filing-fees">Court filing fees</PostLink> still apply. Every new
        account gets its first 30 days free; see <Link href="/pricing">pricing</Link> or{" "}
        <Link href="/signup/basic">sign up</Link>.
      </p>
    </>
  );
}
