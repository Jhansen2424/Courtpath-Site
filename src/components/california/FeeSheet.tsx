// The California page's hero: an example filing's fees, set on California pleading paper (numbered
// lines down the left margin), with Courtpath's own line marked: $0.00. The amounts are what Tyler's
// California test system quoted for a new unlimited civil complaint (Nov 2026): court fee 435.00,
// Tyler's "Total Service Fees" 4.95 and "Total Court Service Fees" 2.05, convenience (card) fee 12.16.

const LINES = 13;
const money = (n: number) => `$${n.toFixed(2)}`;

const FEES = [
  { label: "Court filing fee (complaint)", amount: 435 },
  // Tyler's "Total Service Fees" 4.95 + "Total Court Service Fees" 2.05: Tyler's and the court's, so a neutral name
  { label: "E-filing and service fees", amount: 7 },
  { label: "Card convenience fee", amount: 12.16 },
];

export default function FeeSheet({ serifClass = "" }: { serifClass?: string }) {
  const total = FEES.reduce((t, f) => t + f.amount, 0);
  return (
    <figure className="w-full max-w-[30rem] mx-auto lg:mx-0">
      <div className="relative overflow-hidden rounded-[6px] bg-white text-slate-800 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.6)]">
        {/* Line numbers and the double margin rule of California pleading paper */}
        <ol aria-hidden="true" className="absolute inset-y-0 left-0 w-9 pt-5 pr-2 text-right text-[11px] leading-7 text-slate-400 tabular-nums select-none">
          {Array.from({ length: LINES }, (_, i) => <li key={i}>{i + 1}</li>)}
        </ol>
        <div aria-hidden="true" className="absolute inset-y-0 left-10 w-[5px] border-x border-slate-300" />
        <div className="pl-[3.75rem] pr-5 sm:pr-7 pt-5 pb-6 text-[14px] sm:text-[15px] leading-7">
          <p className={`${serifClass} text-[16px] sm:text-[17px] text-slate-900`}>Doe v. Acme Builders, Inc.</p>
          <p className="text-slate-500">Fees shown before you submit</p>
          <dl className="mt-7 tabular-nums">
            {FEES.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4">
                <dt>{f.label}</dt>
                <dd>{money(f.amount)}</dd>
              </div>
            ))}
            <div className="flex items-baseline justify-between gap-4 font-semibold text-primary-dark">
              <dt>Courtpath fee</dt>
              <dd className="relative px-1">
                {/* a highlighter stroke, the one mark on the page */}
                <span aria-hidden="true" className="absolute -inset-x-0.5 inset-y-[3px] -skew-x-6 rounded-[3px] bg-accent/45" />
                <span className="relative">$0.00</span>
              </dd>
            </div>
            {/* The rule is an inset shadow so the total stays on the paper's 28px lines */}
            <div className="flex items-baseline justify-between gap-4 font-semibold text-slate-900 shadow-[inset_0_1px_0_#cbd5e1]">
              <dt>Total due on acceptance</dt>
              <dd>{money(total)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <figcaption className="mt-3 text-sm text-white/70">
        Example fees from Tyler&apos;s California test system. Court and Tyler fees vary by court and document.
      </figcaption>
    </figure>
  );
}
