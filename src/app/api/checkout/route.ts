import { NextRequest, NextResponse } from "next/server";
import { createCipheriv, randomBytes } from "crypto";
import { getStripe } from "@/lib/stripe";

const PLAN_CONFIG: Record<
  string,
  { priceEnvVar: string; mode: "payment" | "subscription" }
> = {
  bronze: { priceEnvVar: "STRIPE_PRICE_BRONZE", mode: "payment" },
  silver: { priceEnvVar: "STRIPE_PRICE_SILVER", mode: "subscription" },
  gold:   { priceEnvVar: "STRIPE_PRICE_GOLD",   mode: "subscription" },
  platinum: { priceEnvVar: "STRIPE_PRICE_PLATINUM", mode: "subscription" },
};

function encryptPassword(password: string): string {
  const key = Buffer.from(process.env.SIGNUP_ENCRYPTION_KEY ?? "", "hex");
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(password, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
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

    // Validate required fields
    if (!firstName || !lastName || !email || !password || !bar || !plan) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const planKey = (plan as string).toLowerCase();
    if (!PLAN_CONFIG[planKey]) {
      return NextResponse.json(
        { error: "Invalid plan. Must be one of: bronze, silver, gold, platinum" },
        { status: 400 }
      );
    }

    const config = PLAN_CONFIG[planKey];
    const priceId = process.env[config.priceEnvVar];

    if (!priceId || priceId === "price_REPLACE_ME") {
      return NextResponse.json(
        { error: "This plan is not configured yet. Please contact support." },
        { status: 500 }
      );
    }

    if (!process.env.SIGNUP_ENCRYPTION_KEY) {
      return NextResponse.json(
        { error: "Server configuration error. Please contact support." },
        { status: 500 }
      );
    }

    const encryptedPassword = encryptPassword(password);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Build metadata — all values must be strings, max 500 chars each
    const metadata: Record<string, string> = {
      firstName,
      lastName,
      email,
      bar,
      plan: planKey,
      encryptedPassword,
      ...(middleName   && { middleName }),
      ...(phone        && { phone }),
      ...(address1     && { address1 }),
      ...(address2     && { address2 }),
      ...(city         && { city }),
      ...(state        && { state }),
      ...(zip          && { zip }),
      ...(teamName     && { teamName }),
      ...(attorneyCount && { attorneyCount: String(attorneyCount) }),
    };

    // For team plans, use attorney count as quantity
    const quantity =
      (planKey === "gold" || planKey === "platinum") && attorneyCount
        ? Math.max(1, Number(attorneyCount))
        : 1;

    const session = await getStripe().checkout.sessions.create({
      mode: config.mode,
      line_items: [{ price: priceId, quantity }],
      customer_email: email,
      metadata,
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/signup/${planKey}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
