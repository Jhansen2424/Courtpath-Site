// The California landing page's hero: Courtpath's filing window at the last step, Review & Submit, as
// the app lays it out (the five wizard steps down the side). A new unlimited civil case: the complaint
// and the civil case cover sheet (CM-010) California requires with it; no e-service, since a summons
// and complaint aren't e-served. The case is made up; the fees are what Tyler's California test system
// quoted for that envelope (court fee 435.00; Tyler's and the court's e-filing fees, 4.95 + 2.05; card convenience fee 12.16).

const STEPS = ["Court & case", "Parties", "Documents", "Payment & service", "Review & submit"];
const DOCUMENTS = ["Complaint.pdf", "Cover Sheet (CM-010).pdf"];
const FEES: [string, number][] = [
  ["Court filing fee (complaint)", 435],
  ["E-filing fees", 7],
  ["Card convenience fee", 12.16],
];
const money = (n: number) => `$${n.toFixed(2)}`;

function Tick() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function FilingWindow() {
  const total = FEES.reduce((t, [, n]) => t + n, 0);
  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-xl bg-white text-slate-800 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10">
        {/* window bar */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
          <div aria-hidden="true" className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <p className="text-xs text-slate-500">Courtpath: new California filing</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[11rem_minmax(0,1fr)]">
          {/* the wizard's steps, all done but the last */}
          <ol className="hidden sm:block border-r border-slate-200 bg-slate-50/60 p-4 text-[13px]">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              return (
                <li key={s} className={`flex items-center gap-2 py-1.5 ${last ? "font-semibold text-primary-dark" : "text-slate-500"}`}>
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full ${last ? "bg-primary-dark text-white text-[11px]" : "bg-emerald-100 text-emerald-700"}`}>
                    {last ? i + 1 : <Tick />}
                  </span>
                  {s}
                </li>
              );
            })}
          </ol>
          <div className="p-5 text-[13px] sm:text-sm">
            <p className="text-xs font-medium text-slate-500">Review &amp; submit</p>
            <p className="mt-1 text-base font-semibold text-slate-900">Doe v. Acme Builders, Inc.</p>
            <p className="text-slate-500">Superior Court of California, County of Santa Cruz: unlimited civil, new case</p>
            <ul className="mt-4 space-y-2">
              {DOCUMENTS.map((d) => (
                <li key={d} className="flex items-center justify-between gap-3 rounded-md border border-slate-200 px-3 py-2">
                  <span className="truncate">{d}</span>
                  <span className="flex shrink-0 items-center gap-1 text-emerald-700"><Tick />Checked</span>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-1 tabular-nums">
              {FEES.map(([label, n]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-slate-600">{label}</dt>
                  <dd>{money(n)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 font-semibold text-primary-dark">
                <dt>Courtpath fee</dt>
                <dd className="relative px-1">
                  <span aria-hidden="true" className="absolute -inset-x-0.5 inset-y-0 -skew-x-6 rounded-[3px] bg-accent/45" />
                  <span className="relative">$0.00</span>
                </dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-slate-200 pt-1.5 font-semibold text-slate-900">
                <dt>Total due on acceptance</dt>
                <dd>{money(total)}</dd>
              </div>
            </dl>
            {/* a quiet stand-in for the app's button, so the page's gold button stays the only solid one */}
            <div aria-hidden="true" className="mt-4 rounded-md border border-emerald-600/30 bg-emerald-50 px-4 py-2 text-center text-sm font-semibold text-emerald-800">
              Submit to the court
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-white/70">Example filing. Fees vary by court and document.</figcaption>
    </figure>
  );
}
