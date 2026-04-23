import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

const VALID_PLANS = new Set(["bronze", "silver", "gold", "platinum"]);

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
        { error: "Invalid plan. Must be one of: bronze, silver, gold, platinum" },
        { status: 400 }
      );
    }

    // Email the signup submission to joshua@webaholics.co
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILER_AUTH_USER,
        pass: process.env.MAILER_AUTH_PASS,
      },
    });

    const rows: Array<[string, string]> = [
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

    await transporter.sendMail({
      from: `"Courtpath Website" <${process.env.MAILER_AUTH_USER}>`,
      to: "joshua@webaholics.co",
      replyTo: email,
      subject: `[Courtpath Signup] ${planKey.toUpperCase()} — ${firstName} ${lastName}`,
      text: rows
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .concat(["", `Password: ${password}`])
        .join("\n"),
      html: `
        <h2>New Courtpath Signup (${planKey.toUpperCase()})</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;">
          ${rows
            .filter(([, v]) => v)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:8px;font-weight:bold;">${k}</td><td style="padding:8px;">${v}</td></tr>`
            )
            .join("")}
          <tr><td style="padding:8px;font-weight:bold;">Password</td><td style="padding:8px;">${password}</td></tr>
        </table>
      `,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    return NextResponse.json({
      url: `${appUrl}/checkout/success?plan=${planKey}`,
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
