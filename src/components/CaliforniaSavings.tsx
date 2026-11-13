"use client";

import { useState } from "react";
import { CA_RATE } from "@/lib/plans";

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Math.floor(Number(v) || 0)));
/** The fewest filings a month at which `fee` per filing costs more than `flat` (at exactly equal, neither is cheaper). */
const breakEven = (flat: number, fee: number) => Math.floor(flat / fee) + 1;
const LADDER = [5, 10, 15, 20];

/**
 * Courtpath's flat price per attorney against a service that charges on every filing, in the
 * visitor's own numbers: the fee field starts empty, with no placeholder, so the page never names or
 * implies anyone's price. Until it's filled in, a break-even table shows the arithmetic at a few
 * example fees. Service fees only: court, Tyler and card fees are left out of both sides.
 */
export default function CaliforniaSavings({ signupHref }: { signupHref: string }) {
  const [attorneys, setAttorneys] = useState("1");
  const [filings, setFilings] = useState("40");
  const [fee, setFee] = useState("");

  const a = whole(attorneys, 1, 500);
  const f = whole(filings, 0, 100000);
  const p = Number(fee.replace(/[$,\s]/g, ""));
  // $0 is a real answer (a service that charges nothing per filing).
  const hasFee = fee.trim() !== "" && Number.isFinite(p) && p >= 0;
  const courtpath = CA_RATE * a;
  const perFiling = hasFee ? Math.round(p * f * 100) / 100 : 0;
  const difference = Math.round((perFiling - courtpath) * 100) / 100;

  const input = "mt-1 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
  const label = "block text-sm font-medium text-slate-700";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <div className="space-y-5">
        <div>
          <label className={label} htmlFor="ca-attorneys">Attorneys filing in California</label>
          <input id="ca-attorneys" type="number" min={1} max={500} inputMode="numeric" value={attorneys} onChange={(e) => setAttorneys(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ca-filings">Filings a month, all attorneys</label>
          <input id="ca-filings" type="number" min={0} inputMode="numeric" value={filings} onChange={(e) => setFilings(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ca-fee">What your e-filing service charges per filing</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 mt-0.5 -translate-y-1/2 text-slate-500">$</span>
            <input id="ca-fee" type="text" inputMode="decimal" value={fee} onChange={(e) => setFee(e.target.value)} className={`${input} pl-7`} aria-describedby="ca-fee-help" />
          </div>
          <p id="ca-fee-help" className="mt-1 text-sm text-slate-500">Its own fee only. Leave out court, Tyler and card fees.</p>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6 sm:p-7">
        <div aria-live="polite">
        {hasFee ? (
          <>
            <p className="font-medium text-slate-900">Monthly service fees</p>
            <dl className="mt-4 grid grid-cols-2 gap-6 tabular-nums">
              <div>
                <dt className="text-sm text-slate-500">Paying per filing</dt>
                <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-slate-900">{money(perFiling)}</dd>
                <dd className="text-sm text-slate-500">{f} filing{f === 1 ? "" : "s"} at {money(p)}</dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500">Courtpath</dt>
                <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-primary-dark">{money(courtpath)}</dd>
                <dd className="text-sm text-slate-500">{a} attorney{a === 1 ? "" : "s"}, unlimited filings</dd>
              </div>
            </dl>
            <p className="mt-6 text-lg text-slate-900">
              {difference > 0 ? (
                <>That&apos;s <strong className="font-semibold">{money(difference)} a month less</strong> in service fees, for you or your clients.</>
              ) : difference === 0 ? (
                <>At {f} filings a month the two cost the same.</>
              ) : (
                <>At {f} filings a month, paying per filing costs {money(-difference)} less.</>
              )}
            </p>
            {p > 0 && <p className="mt-1 text-sm text-slate-600">Courtpath costs less from {breakEven(courtpath, p)} filings a month{a > 1 ? ` across ${a} attorneys` : ""}.</p>}
          </>
        ) : (
          <>
            <p className="font-medium text-slate-900">Where a flat ${(CA_RATE * a).toLocaleString("en-US")} a month{a > 1 ? ` for ${a} attorneys` : ""} starts costing less</p>
            <table className="mt-3 w-full text-sm tabular-nums">
              <thead>
                <tr className="text-left text-slate-500">
                  <th scope="col" className="py-1.5 font-medium">Example fee per filing</th>
                  <th scope="col" className="py-1.5 text-right font-medium">Courtpath costs less from</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {LADDER.map((rate) => (
                  <tr key={rate}>
                    <td className="py-1.5 text-slate-700">{money(rate)}</td>
                    <td className="py-1.5 text-right text-slate-900">{breakEven(courtpath, rate)} filings a month</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {f > 0 && <p className="mt-3 text-sm text-slate-700">At {f} filings a month, {money(courtpath)} comes to {money(courtpath / f)} a filing.</p>}
            <p className="mt-2 text-sm text-slate-500">Enter what your e-filing service charges to see your own numbers.</p>
          </>
        )}
        </div>
        <div className="mt-6 border-t border-slate-100 pt-5">
          <a href={signupHref} className="inline-block rounded-md bg-accent px-6 py-3 font-semibold text-primary-dark hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
            Start your free month
          </a>
          <p className="mt-3 text-sm text-slate-500">
            A comparison of service fees only: court, Tyler and card fees are left out of both sides.
          </p>
        </div>
      </div>
    </div>
  );
}
