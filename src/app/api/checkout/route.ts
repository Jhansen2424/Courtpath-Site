import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { APP_LOGIN_URL } from "@/lib/site";
// import { createCipheriv, randomBytes } from "crypto";
// import { getStripe } from "@/lib/stripe";

// --- Stripe integration temporarily disabled. All plans are free for now. ---
// const PLAN_CONFIG: Record<
//   string,
//   { priceEnvVar: string; mode: "payment" | "subscription" }
// > = {
//   bronze: { priceEnvVar: "STRIPE_PRICE_BRONZE", mode: "payment" },
//   silver: { priceEnvVar: "STRIPE_PRICE_SILVER", mode: "subscription" },
//   gold:   { priceEnvVar: "STRIPE_PRICE_GOLD",   mode: "subscription" },
//   platinum: { priceEnvVar: "STRIPE_PRICE_PLATINUM", mode: "subscription" },
// };
//
// function encryptPassword(password: string): string {
//   const key = Buffer.from(process.env.SIGNUP_ENCRYPTION_KEY ?? "", "hex");
//   const iv = randomBytes(16);
//   const cipher = createCipheriv("aes-256-cbc", key, iv);
//   const encrypted = Buffer.concat([
//     cipher.update(password, "utf8"),
//     cipher.final(),
//   ]);
//   return iv.toString("hex") + ":" + encrypted.toString("hex");
// }

// Account creation in the app hashes the password (a few seconds), so allow more than the default.
export const maxDuration = 60;

const VALID_PLANS = new Set(["bronze", "bronze-plus", "silver", "gold", "platinum"]);

const escapeHtml = (v: unknown) =>
  String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

type AccountResult = { status: "created" | "exists" | "failed"; detail?: string; firm?: string };

/**
 * Create the account in the Courtpath app right away (POST /pub/signup, server to server).
 * Needs COURTPATH_SIGNUP_KEY (same value as SIGNUP_API_KEY on the app; COURTPATH_API_URL is optional).
 * Without the key, or if the app is down,
 * the signup still goes through and the email says to create the account by hand.
 */
async function createAppAccount(payload: Record<string, unknown>): Promise<AccountResult> {
  const apiUrl = process.env.COURTPATH_API_URL || APP_LOGIN_URL;
  const key = process.env.COURTPATH_SIGNUP_KEY;
  if (!key) return { status: "failed", detail: "COURTPATH_SIGNUP_KEY is not set on the website" };
  try {
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/pub/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-courtpath-signup-key": key },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.user === "created") return { status: "created", firm: data.firm };
    if (res.status === 409) return { status: "exists" };
    return { status: "failed", detail: `${res.status} ${data.error ?? ""}`.trim() };
  } catch (err) {
    return { status: "failed", detail: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      plan,
      firstName,
      lastName,
      middleName,
      email,
      password,
      bar,
      phone,
      address1,
      address2,
      city,
      state,
      zip,
      teamName,
      attorneyCount,
    } = body;

    if (!firstName || !lastName || !email || !password || !bar || !plan) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const planKey = (plan as string).toLowerCase();
    if (!VALID_PLANS.has(planKey)) {
      return NextResponse.json(
        { error: "Invalid plan. Must be one of: bronze, bronze-plus, silver, gold, platinum" },
        { status: 400 }
      );
    }

    const account = await createAppAccount({
      plan: planKey, firstName, middleName, lastName, email, password, bar, phone,
      address1, address2, city, state, zip, teamName, attorneyCount,
    });
    if (account.status !== "created") console.error("Courtpath account not created automatically:", account);

    const accountLine =
      account.status === "created"
        ? `Account created automatically${account.firm ? ` (firm: ${account.firm})` : ""}. Nothing to do.`
        : account.status === "exists"
        ? "An account with this email already exists in the app. No new account was made."
        : `Automatic account creation FAILED (${account.detail ?? "unknown error"}). Create this account by hand.`;

    // Email the signup submission to joshua@webaholics.co
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS,
      },
    });

    const rows: Array<[string, string]> = [
      ["Account", accountLine],
      ["Plan", planKey],
      ["First Name", firstName],
      ["Middle Name", middleName ?? ""],
      ["Last Name", lastName],
      ["Email", email],
      ["Bar Number", bar],
      ["Phone", phone ?? ""],
      ["Address 1", address1 ?? ""],
      ["Address 2", address2 ?? ""],
      ["City", city ?? ""],
      ["State", state ?? ""],
      ["ZIP", zip ?? ""],
      ["Team Name", teamName ?? ""],
      ["Attorney Count", attorneyCount ? String(attorneyCount) : ""],
    ];

    const mail = transporter.sendMail({
      from: `"Courtpath Website" <${process.env.MAILER_AUTH_USER}>`,
      to: "joshua@webaholics.co",
      replyTo: email,
      subject: `[Courtpath Signup] ${planKey.toUpperCase()} — ${firstName} ${lastName}${account.status === "failed" ? " — CREATE BY HAND" : ""}`,
      text: rows
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        // The password is only sent when the account still has to be made by hand.
        .concat(account.status === "failed" ? ["", `Password: ${password}`] : [])
        .join("\n"),
      html: `
        <h2>New Courtpath Signup (${escapeHtml(planKey.toUpperCase())})</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          ${rows
            .filter(([, v]) => v)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:8px;font-weight:bold;">${k}</td><td style="padding:8px;">${escapeHtml(v)}</td></tr>`
            )
            .join("")}
          ${account.status === "failed" ? `<tr><td style="padding:8px;font-weight:bold;">Password</td><td style="padding:8px;">${escapeHtml(password)}</td></tr>` : ""}
        </table>
      `,
    });

    try {
      await mail;
    } catch (mailErr) {
      // With the account already made, a mail hiccup should not tell the attorney the signup failed.
      if (account.status !== "created") throw mailErr;
      console.error("Signup notification email failed:", mailErr);
    }

    // Relative URL keeps the redirect on whatever domain the site is served
    // from, instead of relying on NEXT_PUBLIC_APP_URL (which can point at a
    // wrong/dead host on the deploy).
    return NextResponse.json({
      url: `/checkout/success?plan=${planKey}&account=${account.status === "created" ? "ready" : account.status === "exists" ? "exists" : "pending"}`,
    });

    // --- Original Stripe flow (disabled) ---
    // const config = PLAN_CONFIG[planKey];
    // const priceId = process.env[config.priceEnvVar];
    //
    // if (!priceId || priceId === "price_REPLACE_ME") {
    //   return NextResponse.json(
    //     { error: "This plan is not configured yet. Please contact support." },
    //     { status: 500 }
    //   );
    // }
    //
    // if (!process.env.SIGNUP_ENCRYPTION_KEY) {
    //   return NextResponse.json(
    //     { error: "Server configuration error. Please contact support." },
    //     { status: 500 }
    //   );
    // }
    //
    // const encryptedPassword = encryptPassword(password);
    //
    // const metadata: Record<string, string> = {
    //   firstName,
    //   lastName,
    //   email,
    //   bar,
    //   plan: planKey,
    //   encryptedPassword,
    //   ...(middleName   && { middleName }),
    //   ...(phone        && { phone }),
    //   ...(address1     && { address1 }),
    //   ...(address2     && { address2 }),
    //   ...(city         && { city }),
    //   ...(state        && { state }),
    //   ...(zip          && { zip }),
    //   ...(teamName     && { teamName }),
    //   ...(attorneyCount && { attorneyCount: String(attorneyCount) }),
    // };
    //
    // const quantity =
    //   (planKey === "gold" || planKey === "platinum") && attorneyCount
    //     ? Math.max(1, Number(attorneyCount))
    //     : 1;
    //
    // const session = await getStripe().checkout.sessions.create({
    //   mode: config.mode,
    //   line_items: [{ price: priceId, quantity }],
    //   customer_email: email,
    //   metadata,
    //   success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${appUrl}/signup/${planKey}`,
    // });
    //
    // return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Signup submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit signup. Please try again later." },
      { status: 500 }
    );
  }
}
