import { createHmac, timingSafeEqual } from "crypto";

// ─────────────────────────────────────────────────────────────────────────────
//  Lightweight password gate for /dashboard.
//
//  Set two env vars in Vercel (Project → Settings → Environment Variables):
//    DASHBOARD_PASSWORD  — the shared password you give yourself + the client
//    DASHBOARD_SECRET    — any long random string (used to sign the auth cookie)
//
//  No accounts, no database. Enter the password once → a signed cookie keeps
//  you logged in until it expires.
// ─────────────────────────────────────────────────────────────────────────────

export const DASHBOARD_COOKIE = "cp_dash";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  return process.env.DASHBOARD_SECRET || "";
}

/** Constant-time string comparison to avoid timing attacks. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

/** Check a submitted password against DASHBOARD_PASSWORD. */
export function isPasswordValid(submitted: string): boolean {
  const expected = process.env.DASHBOARD_PASSWORD || "";
  if (!expected) return false;
  return safeEqual(submitted, expected);
}

/** The value we store in the auth cookie — an HMAC of a fixed marker. */
export function makeCookieValue(): string {
  return createHmac("sha256", secret()).update("dashboard-ok").digest("hex");
}

/** Verify a cookie value we previously issued. */
export function isCookieValid(value: string | undefined): boolean {
  if (!value || !secret()) return false;
  return safeEqual(value, makeCookieValue());
}

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
