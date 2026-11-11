"use client";

import { useState } from "react";
import { CA_RATE } from "@/lib/plans";

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (v: string, min: number, max: number) => Math.min(max, Math.max(min, Math.floor(Number(v) || 0)));

/**
 * California savings: Courtpath's flat price per attorney against a provider that charges on every
 * filing. The visitor types their own provider's fee, so the page makes no claim about anyone's
 * prices. Court fees, Tyler's e-filing fee and card fees are the same with any provider, so both
 * sides leave them out.
 */
export default function CaliforniaSavings() {
  const [attorneys, setAttorneys] = useState("1");
  const [filings, setFilings] = useState("40");
  const [fee, setFee] = useState("14.99");

  const a = whole(attorneys, 1, 500);
  const f = whole(filings, 0, 100000);
  const p = Math.max(0, Number(fee.replace(/[$,\s]/g, "")) || 0);
  const courtpath = CA_RATE * a;
  const perFiling = Math.round(p * f * 100) / 100;
  const saving = Math.round((perFiling - courtpath) * 100) / 100;
  const breakEven = p > 0 ? Math.ceil(courtpath / p) : null;

  const input = "w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";
  const label = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2 space-y-5">
        <div>
          <label className={label} htmlFor="ca-attorneys">Attorneys who file in California</label>
          <input id="ca-attorneys" type="number" min={1} max={500} inputMode="numeric" value={attorneys} onChange={(e) => setAttorneys(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ca-filings">California filings a month, all attorneys</label>
          <input id="ca-filings" type="number" min={0} inputMode="numeric" value={filings} onChange={(e) => setFilings(e.target.value)} className={input} />
        </div>
        <div>
          <label className={label} htmlFor="ca-fee">Your provider&apos;s fee per filing</label>
          <input id="ca-fee" type="text" inputMode="decimal" value={fee} onChange={(e) => setFee(e.target.value)} className={input} />
          <p className="text-xs text-gray-500 mt-1">What your current e-filing service charges on each filing, before court fees.</p>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4" aria-live="polite">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-accent bg-white p-6">
            <p className="text-sm font-semibold text-accent-text uppercase tracking-wide mb-2">Courtpath</p>
            <p className="text-3xl font-bold text-gray-900">{money(courtpath)}</p>
            <p className="text-sm text-gray-600 mt-1">a month for {a} attorney{a === 1 ? "" : "s"}, unlimited filings</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Per-filing provider</p>
            <p className="text-3xl font-bold text-gray-900">{money(perFiling)}</p>
            <p className="text-sm text-gray-600 mt-1">a month for {f} filing{f === 1 ? "" : "s"} at {money(p)}</p>
          </div>
        </div>
        <div className={`rounded-2xl p-6 ${saving > 0 ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"}`}>
          {saving > 0 ? (
            <p className="text-lg text-gray-900">
              You&apos;d save <span className="font-bold text-green-700">{money(saving)} a month</span>, {money(saving * 12)} a year.
            </p>
          ) : (
            <p className="text-lg text-gray-900">At {f} filings a month, paying per filing costs {saving === 0 ? "the same" : `${money(-saving)} less`}.</p>
          )}
          {breakEven !== null && (
            <p className="text-sm text-gray-600 mt-2">
              Courtpath costs less from {breakEven} filings a month{a > 1 ? ` across your ${a} attorneys` : ""}.
            </p>
          )}
        </div>
        <p className="text-xs text-gray-500">
          Court filing fees, Tyler&apos;s e-filing fee and card fees are paid at cost whichever provider you use, so both sides leave them out.
        </p>
      </div>
    </div>
  );
}
