import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PLAN_CONFIG: Record<
  string,
  { priceEnvVar: string; mode: "payment" | "subscription" }
> = {
  bronze: {
    priceEnvVar: "STRIPE_PRICE_BRONZE",
    mode: "payment",
  },
  silver: {
    priceEnvVar: "STRIPE_PRICE_SILVER",
    mode: "subscription",
  },
  gold: {
    priceEnvVar: "STRIPE_PRICE_GOLD",
    mode: "subscription",
  },
  platinum: {
    priceEnvVar: "STRIPE_PRICE_PLATINUM",
    mode: "subscription",
  },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan } = body;

    const planKey = (plan as string)?.toLowerCase();
    if (!planKey || !PLAN_CONFIG[planKey]) {
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

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: config.mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
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
