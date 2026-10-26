"use client";

import { useEffect, useState } from "react";

const PLANS = [
  { id: "bronze", label: "Bronze: $4 per filing" },
  { id: "bronze-plus", label: "Bronze +: $9.99 per month" },
  { id: "silver", label: "Silver: $25 per month" },
  { id: "gold", label: "Gold: $21 per attorney per month" },
  { id: "platinum", label: "Platinum: from $240 per year" },
];
const PER_ATTORNEY = new Set(["gold", "platinum"]);

export default function BillingForm() {
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState("silver");
  const [attorneyCount, setAttorneyCount] = useState("2");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const p = new URL(window.location.href).searchParams;
    const want = p.get("plan");
    if (want && PLANS.some((x) => x.id === want)) setPlan(want);
    if (p.get("email")) setEmail(p.get("email") as string);
    if (p.get("canceled")) setError("No card was added. You can try again below.");
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null); setMessage(null);
    try {
      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, plan, attorneyCount }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Something went wrong. Please try again.");
      else setMessage(data.message);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const input = "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent";
  const label = "block text-sm font-medium text-gray-700 mb-1";

  if (message) {
    return <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg px-4 py-4">{message}</div>;
  }
  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 space-y-5">
      <div>
        <label className={label}>Email you log in with <span className="text-red-500">*</span></label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      </div>
      <div>
        <label className={label}>Your plan <span className="text-red-500">*</span></label>
        <select value={plan} onChange={(e) => setPlan(e.target.value)} className={input}>
          {PLANS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
      </div>
      {PER_ATTORNEY.has(plan) && (
        <div>
          <label className={label}>Number of attorneys <span className="text-red-500">*</span></label>
          <input type="number" min={1} required value={attorneyCount} onChange={(e) => setAttorneyCount(e.target.value)} className={input} />
        </div>
      )}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">{error}</div>}
      <button type="submit" disabled={busy} className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-bold rounded-lg transition-all disabled:opacity-60">
        {busy ? "Sending…" : "Email me a secure link"}
      </button>
      <p className="text-xs text-gray-500 text-center">Cards are handled by Stripe. Courtpath never sees your card number.</p>
    </form>
  );
}
