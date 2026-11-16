"use client";

import { useState } from "react";
import { CA_RATE } from "@/lib/plans";

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
/** Whole dollars, rounded down, so a saving is never overstated. */
const dollars = (n: number) => `$${Math.floor(n).toLocaleString("en-US")}`;
const whole = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Math.floor(Number(v) || 0)));
/** The fewest filings a month at which `fee` per filing costs more than `flat` (at exactly equal, neither is cheaper). */
const breakEven = (flat: number, fee: number) => Math.floor(flat / fee) + 1;
const LADDER = [5, 10, 15, 20];
const filingsText = (n: number) => `${n} filing${n === 1 ? "" : "s"}`;

/**
 * Where the fee field starts: a common California per-filing price for law firms. One Legal publishes
 * $17.95 a filing for firms (onelegal.com/pricing, checked November 2026); InfoTrack lists $16.95 and
 * GreenFiling $9.95. The page never names a provider. Re-check before changing ads.
 */
const COMMON_FEE = "17.95";

/**
 * Courtpath's flat price per attorney against a service that charges on every filing. It opens with a
 * common per-filing price filled in, so the saving shows on arrival; the visitor changes it to their
 * own. Service fees only: court, Tyler and card fees are left out of both sides. If the field is
 * cleared, a break-even table shows the arithmetic at a few example fees.
 */
export default function CaliforniaSavings({ signupHref }: { signupHref: string }) {
  const [attorneys, setAttorneys] = useState("1");
  const [filings, setFilings] = useState("40");
  const [fee, setFee] = useState(COMMON_FEE);

  const a = whole(attorneys, 1, 500);
  const f = whole(filings, 0, 100000);
  const p = Number(fee.replace(/[$,\s]/g, ""));
  // $0 is a real answer (a service that charges nothing per filing).
  const hasFee = fee.trim() !== "" && Number.isFinite(p) && p >= 0;
  const courtpath = CA_RATE * a;
  const perFiling = hasFee ? Math.round(p * f * 100) / 100 : 0;
  const difference = Math.round((perFiling - courtpath) * 100) / 100;
  const widest = Math.max(perFiling, courtpath, 1);
  const bar = (n: number) => `${Math.max(3, (n / widest) * 100)}%`;

  const input = "mt-1 w-full rounded-md border border-slate-300 bg-white px-3.5 py-2.5 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
  const label = "block text-sm font-medium text-slate-700";

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:items-start lg:gap-12">
      <div className="space-y-5">
        <div>
          <label className={label} htmlFor="ca-fee">What your e-filing service charges per filing</label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 mt-0.5 -translate-y-1/2 text-slate-500">$</span>
            <input id="ca-fee" type="text" inputMode="decimal" value={fee} onChange={(e) => setFee(e.target.value)} className={`${input} pl-7`} aria-describedby="ca-fee-help" />
          </div>
          <p id="ca-fee-help" className="mt-1 text-sm text-slate-500">Starts at a common California rate; change it to yours. Their fee only, not court, Tyler or card fees.</p>
        </div>
        <div>
          <label className={label} htmlFor="ca-filings">Filings a month, all attorneys</label>
          <input id="ca-filings" type="number" min={0} inputMode="numeric" value={filings} onChange={(e) => setFilings(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ca-attorneys">Attorneys filing in California</label>
          <input id="ca-attorneys" type="number" min={1} max={500} inputMode="numeric" value={attorneys} onChange={(e) => setAttorneys(e.target.value)} className={input} />
        </div>
      </div>

      <div className="rounded-xl bg-primary-dark p-6 text-white shadow-xl sm:p-8">
        <div aria-live="polite">
          {hasFee ? (
            <>
              {difference > 0 ? (
                <>
                  <p className="text-base font-medium text-white/80">With Courtpath you&apos;d save</p>
                  <p className="mt-1 tabular-nums">
                    <span className="text-5xl font-bold tracking-tight text-accent-light sm:text-6xl">{dollars(difference)}</span>{" "}
                    <span className="ml-1 text-xl font-semibold text-white">a month</span>
                  </p>
                  <p className="mt-2 text-lg text-white/85 tabular-nums">
                    {dollars(difference * 12)} a year · {Math.floor((difference / perFiling) * 100)}% less
                  </p>
                </>
              ) : (
                <>
                  <p className="text-base font-medium text-white/80">At {filingsText(f)} a month</p>
                  <p className="mt-1 text-2xl font-semibold">
                    {difference === 0 ? "The two cost the same." : <>Paying per filing costs {money(-difference)} less.</>}
                  </p>
                </>
              )}

              {/* Monthly service fees, side by side */}
              <dl className="mt-7 space-y-4 tabular-nums">
                <div>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <dt className="text-white/80">Paying per filing <span className="text-white/60">({filingsText(f)} × {money(p)})</span></dt>
                    <dd className="text-base font-semibold text-white">{money(perFiling)}</dd>
                  </div>
                  <div aria-hidden="true" className="mt-1.5 h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-white/45" style={{ width: bar(perFiling) }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline justify-between gap-4 text-sm">
                    <dt className="text-white/80">Courtpath <span className="text-white/60">({a} attorney{a === 1 ? "" : "s"}, unlimited filings)</span></dt>
                    <dd className="text-base font-semibold text-accent-light">{money(courtpath)}</dd>
                  </div>
                  <div aria-hidden="true" className="mt-1.5 h-3 rounded-full bg-white/10">
                    <div className="h-3 rounded-full bg-accent" style={{ width: bar(courtpath) }} />
                  </div>
                </div>
              </dl>
              {p > 0 && <p className="mt-5 text-sm text-white/70">Courtpath costs less from {filingsText(breakEven(courtpath, p))} a month{a > 1 ? ` across ${a} attorneys` : ""}.</p>}
            </>
          ) : (
            <>
              <p className="font-medium">Where a flat ${(CA_RATE * a).toLocaleString("en-US")} a month{a > 1 ? ` for ${a} attorneys` : ""} starts costing less</p>
              <table className="mt-3 w-full text-sm tabular-nums">
                <thead>
                  <tr className="text-left text-white/60">
                    <th scope="col" className="py-1.5 font-medium">Example fee per filing</th>
                    <th scope="col" className="py-1.5 text-right font-medium">Courtpath costs less from</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {LADDER.map((rate) => (
                    <tr key={rate}>
                      <td className="py-1.5 text-white/80">{money(rate)}</td>
                      <td className="py-1.5 text-right">{filingsText(breakEven(courtpath, rate))} a month</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="mt-7">
          <a href={signupHref} className="inline-block rounded-md bg-accent px-6 py-3 font-semibold text-primary-dark hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-dark">
            Start your free month
          </a>
        </div>
      </div>
    </div>
  );
}
