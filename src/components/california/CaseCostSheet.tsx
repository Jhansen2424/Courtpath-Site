// The app's monthly "Costs by case" report, with made-up matters: the subscription split across
// cases by filing count (16 of 40 filings x $175 = $70), each case's court, Tyler and card fees,
// and the total to bill. Fee totals follow the hero's example ($454.16 for an opening complaint,
// at least $8 in Tyler and card fees on any other filing).

const RATE = 175;
const CASES = [
  { name: "Doe v. Acme Builders, Inc.", filings: 16, fees: 689.32 },
  { name: "Roe v. Example Freight LLC", filings: 12, fees: 152.4 },
  { name: "In re Marriage of Poe", filings: 8, fees: 510.16 },
  { name: "Estate of Jane Roe", filings: 4, fees: 42.3 },
];
const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function CaseCostSheet() {
  const filings = CASES.reduce((t, c) => t + c.filings, 0);
  const rows = CASES.map((c) => ({ ...c, share: (c.filings / filings) * RATE }));
  const fees = rows.reduce((t, c) => t + c.fees, 0);
  return (
    <figure className="w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-baseline justify-between gap-4 border-b border-slate-200 px-4 sm:px-5 py-3">
        <p className="font-semibold text-slate-900">Costs by case</p>
        <p className="text-sm text-slate-500">November</p>
      </div>
      <table className="w-full text-[13px] sm:text-sm tabular-nums">
        <caption className="sr-only">Example Costs by case report: each case&apos;s filings, share of the subscription, fees and total to bill</caption>
        <thead className="text-left text-slate-500">
          <tr>
            <th scope="col" className="px-4 sm:px-5 py-2 font-medium">Case</th>
            <th scope="col" className="px-2 py-2 text-right font-medium">Filings</th>
            <th scope="col" className="px-2 py-2 text-right font-medium">Share of $175</th>
            <th scope="col" className="hidden md:table-cell px-2 py-2 text-right font-medium">Court, Tyler and card fees</th>
            <th scope="col" className="px-4 sm:px-5 py-2 text-right font-medium">Total to bill</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((r) => (
            <tr key={r.name}>
              <th scope="row" className="px-4 sm:px-5 py-2.5 text-left font-normal text-slate-900">
                {r.name}
                {/* phones drop the fees column, so the fees ride under the case name */}
                <span className="block text-xs text-slate-500 md:hidden">{money(r.fees)} court, Tyler and card fees</span>
              </th>
              <td className="px-2 py-2.5 text-right text-slate-700">{r.filings}</td>
              <td className="px-2 py-2.5 text-right text-slate-700">{money(r.share)}</td>
              <td className="hidden md:table-cell px-2 py-2.5 text-right text-slate-700">{money(r.fees)}</td>
              <td className="px-4 sm:px-5 py-2.5 text-right font-semibold text-primary-dark">{money(r.share + r.fees)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="border-t border-slate-200 font-semibold text-slate-900">
          <tr>
            <th scope="row" className="px-4 sm:px-5 py-2.5 text-left">All cases</th>
            <td className="px-2 py-2.5 text-right">{filings}</td>
            <td className="px-2 py-2.5 text-right">{money(RATE)}</td>
            <td className="hidden md:table-cell px-2 py-2.5 text-right">{money(fees)}</td>
            <td className="px-4 sm:px-5 py-2.5 text-right">{money(RATE + fees)}</td>
          </tr>
        </tfoot>
      </table>
      <figcaption className="border-t border-slate-100 px-4 sm:px-5 py-2.5 text-xs text-slate-500">
        Made-up matters. The report downloads as a CSV.
      </figcaption>
    </figure>
  );
}
