import nodemailer from "nodemailer";
import type Stripe from "stripe";
import { APP_PLAN, openPassword, PLAN_BILLING, type FinishResult } from "@/lib/billing";

const escapeHtml = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

type Mail = { from: string; to: string; replyTo?: string; subject: string; text: string; html: string };

/** Gmail in production. Local testing without mail settings writes the message to the server log instead. */
const transporter = () => {
  if (!process.env.MAILER_AUTH_USER && process.env.NODE_ENV !== "production") {
    return { sendMail: async (m: Mail) => { console.log(`[mail not sent: no MAILER_AUTH_USER] to=${m.to} subject=${m.subject}
${m.text}`); return {}; } };
  }
  return nodemailer.createTransport({ service: "gmail", auth: { user: process.env.MAILER_AUTH_USER, pass: process.env.MAILER_AUTH_PASS } });
};

/** Tell joshua@webaholics.co what happened to a signup or card, in the same shape as before payments. */
export async function sendSignupEmail(r: FinishResult, customer: Stripe.Customer, detail?: string) {
  const m = customer.metadata || {};
  // The website name plus the app plan, which is what staff set up by hand.
  const planName = r.plan ? `${PLAN_BILLING[r.plan].name} (app plan: ${APP_PLAN[r.plan]})` : "unknown plan";
  const accountLine =
    r.account === "ready" ? "Account created automatically. Nothing to do."
    : r.account === "exists" ? "An account with this email already existed; the card was put on it. No new account was made."
    : r.account === "linked" ? "Card added to the existing account. Nothing to do."
    : `Automatic account ${r.kind === "card" ? "linking" : "creation"} FAILED (${detail || "unknown error"}). ${r.kind === "card" ? "Set users.stripeId by hand." : "Create this account by hand."}`;
  const needsHand = r.account === "pending";
  let password = "";
  if (needsHand && r.kind === "signup" && m.pw) { try { password = openPassword(m.pw); } catch { password = "(could not be read)"; } }

  const rows: Array<[string, string]> = [
    ["Account", accountLine],
    ["Plan", planName],
    ["Stripe customer", customer.id],
    ["First Name", m.firstName ?? ""],
    ["Middle Name", m.middleName ?? ""],
    ["Last Name", m.lastName ?? ""],
    ["Email", customer.email ?? ""],
    ["Bar Number", m.bar ?? ""],
    ["Phone", m.phone ?? ""],
    ["Address 1", m.address1 ?? ""],
    ["Address 2", m.address2 ?? ""],
    ["City", m.city ?? ""],
    ["State", m.state ?? ""],
    ["ZIP", m.zip ?? ""],
    ["Team Name", m.teamName ?? ""],
    ["Attorney Count", m.attorneyCount ?? ""],
  ];
  const kindWord = r.kind === "card" ? "Card added" : "Signup";
  await transporter().sendMail({
    from: `"Courtpath Website" <${process.env.MAILER_AUTH_USER}>`,
    to: "joshua@webaholics.co",
    replyTo: customer.email ?? undefined,
    subject: `[Courtpath ${kindWord}] ${planName.toUpperCase()} — ${[m.firstName, m.lastName].filter(Boolean).join(" ") || customer.email}${needsHand ? " — DO BY HAND" : ""}`,
    text: rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).concat(password ? ["", `Password: ${password}`] : []).join("\n"),
    html: `
      <h2>${escapeHtml(kindWord)}: ${escapeHtml(planName)}</h2>
      <table style="border-collapse:collapse;width:100%;max-width:600px;">
        ${rows.filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:8px;font-weight:bold;">${k}</td><td style="padding:8px;">${escapeHtml(v)}</td></tr>`).join("")}
        ${password ? `<tr><td style="padding:8px;font-weight:bold;">Password</td><td style="padding:8px;">${escapeHtml(password)}</td></tr>` : ""}
      </table>`,
  });
}

/** Email an existing customer the secure Stripe link to put their card on file. */
export async function sendCardLinkEmail(to: string, planName: string, url: string, firstCharge: string) {
  await transporter().sendMail({
    from: `"Courtpath" <${process.env.MAILER_AUTH_USER}>`,
    to,
    subject: "Add your card for Courtpath",
    text: [
      `Here is your secure link to put a card on file for your Courtpath ${planName} plan:`,
      "",
      url,
      "",
      `You will not be charged before ${firstCharge}. The link expires in 24 hours; request a new one at https://www.courtpath.com/billing if it does.`,
    ].join("\n"),
    html: `<p>Here is your secure link to put a card on file for your Courtpath ${escapeHtml(planName)} plan:</p>
      <p><a href="${escapeHtml(url)}">Add my card</a></p>
      <p>You will not be charged before ${escapeHtml(firstCharge)}. The link expires in 24 hours; request a new one at <a href="https://www.courtpath.com/billing">courtpath.com/billing</a> if it does.</p>`,
  });
}
