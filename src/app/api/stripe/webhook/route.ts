import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { finishCheckout } from "@/lib/billing";
import { sendSignupEmail } from "@/lib/signupEmail";

/**
 * Stripe webhook (endpoint: https://www.courtpath.com/api/stripe/webhook, secret in
 * STRIPE_WEBHOOK_SECRET). checkout.session.completed finishes the signup even when the attorney
 * closed the tab before the success page loaded.
 */
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET is not set" }, { status: 503 });
  const raw = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, request.headers.get("stripe-signature") || "", secret);
  } catch (err) {
    console.error("Stripe webhook signature check failed:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.metadata?.courtpath) {
      try {
        const r = await finishCheckout(session.id, sendSignupEmail);
        if (!r.ok) console.error("Webhook: checkout not finished:", session.id, r.error);
      } catch (err) {
        console.error("Webhook: finishing checkout failed:", session.id, err);
        // 500 makes Stripe retry later (the app may have been down).
        return NextResponse.json({ error: "retry" }, { status: 500 });
      }
    }
  }
  return NextResponse.json({ received: true });
}
