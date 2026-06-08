"use client";

import { useEffect, useRef, useState } from "react";
import type { Stats } from "@/data/stats";

// Animated count-up that runs once on mount.
function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutExpo for a snappy, premium feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, durationMs]);

  return value;
}

type CardDef = {
  label: string;
  value: number;
  sublabel: string;
  icon: React.ReactNode;
  accent: string; // tailwind gradient classes
};

function StatCard({ card, delay }: { card: CardDef; delay: number }) {
  const animated = useCountUp(card.value);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-100 p-7 transition-all duration-700 ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Decorative gradient glow */}
      <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${card.accent} opacity-10 blur-2xl`} />

      <div className="relative flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center text-white shadow-md`}>
          {card.icon}
        </div>
      </div>

      <div className="relative">
        <div className="text-4xl font-bold text-gray-900 tabular-nums tracking-tight">
          {animated.toLocaleString()}
        </div>
        <div className="text-sm font-semibold text-gray-700 mt-1">{card.label}</div>
        <div className="text-xs text-gray-400 mt-0.5">{card.sublabel}</div>
      </div>
    </div>
  );
}

export default function DashboardContent({ stats }: { stats: Stats }) {
  const cards: CardDef[] = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      sublabel: "All-time signups",
      accent: "from-primary to-primary-light",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-3-6.65" />
        </svg>
      ),
    },
    {
      label: "Active Filers",
      value: stats.activeUsers,
      sublabel: "Last 30 days",
      accent: "from-accent to-accent-light",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: "Weekly Signups",
      value: stats.weeklyUsers,
      sublabel: "This week (since Mon)",
      accent: "from-primary-light to-accent",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Monthly Signups",
      value: stats.monthlyUsers,
      sublabel: "This month",
      accent: "from-accent-dark to-primary",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4 4 4 7-7m0 0v5m0-5h-5" />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-medium mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Live Metrics
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Signup Dashboard</h1>
          <p className="text-white/60 text-sm mt-1">Courtpath user growth at a glance</p>
        </div>
      </header>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <StatCard key={card.label} card={card} delay={i * 120} />
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          Last updated {stats.lastUpdated}
        </p>
      </section>
    </main>
  );
}
