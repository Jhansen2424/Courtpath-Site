import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PLAN_BILLING, isPlan, priceFor, quantityFor, trialEnd, accountExists, billingStart } from "@/lib/billing";
import { sendCardLinkEmail } from "@/lib/signupEmail";

/**
 * Existing accounts (everyone who signed up while plans were free): put a card on file for their
 * plan. The Checkout link is emailed to the account's address, so only its owner can use it;
 * when they finish, the Stripe customer is linked to their Courtpath account.
 */
export const maxDuration = 30;

const SENT = "If that email has a Courtpath account, we just sent it a secure link to add your card. Check your inbox (and spam folder).";

export async function POST(request: NextRequest) {
  try {
    const b = await request.json();
    const email = typeof b.email === "string" ? b.email.trim().toLowerCase().slice(0, 200) : "";
    const plan = typeof b.plan === "string" ? b.plan.toLowerCase() : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: "Enter the email you log in with." }, { status: 400 });
    if (!isPlan(plan)) return NextResponse.json({ error: "Choose your plan." }, { status: 400 });
    const config = PLAN_BILLING[plan];
    const price = priceFor(plan);
    if (config.mode === "subscription" && !price) {
      console.error(`Billing: ${config.priceEnv} is not set`);
      return NextResponse.json({ error: "This plan is not available online yet. Please contact us." }, { status: 503 });
    }

    const exists = await accountExists(email);
    if (exists === null) return NextResponse.json({ error: "We could not check your account right now. Please try again shortly." }, { status: 503 });
    // Same answer either way, so this form does not reveal who has an account.
    if (!exists) return NextResponse.json({ message: SENT });

    const stripe = getStripe();
    // Reuse this person's earlier, unfinished card request instead of piling up customers.
    const earlier = (await stripe.customers.list({ email, limit: 20 })).data.find(
      (c) => c.metadata?.courtpath === "card" && !c.metadata?.courtpath_account,
    );
    const customer = earlier
      ? await stripe.customers.update(earlier.id, { metadata: { plan, attorneyCount: config.perAttorney ? String(quantityFor(plan, b.attorneyCount)) : "" } })
      : await stripe.customers.create({ email, metadata: { courtpath: "card", plan, attorneyCount: config.perAttorney ? String(quantityFor(plan, b.attorneyCount)) : "" } });

    const end = trialEnd();
    // Shown above the button on Stripe's page, so the attorney knows exactly when the card is used.
    const firstCharge = billingStart().toLocaleDateString("en-US", { timeZone: "America/Denver", month: "long", day: "numeric", year: "numeric" });
    const note = end
      ? config.mode === "setup"
        ? `Nothing is charged today. Your card is kept on file for the $4 per-filing charge starting ${firstCharge}.`
        : `Nothing is charged today. Your ${config.name} plan bills automatically to this card starting ${firstCharge}.`
      : config.mode === "setup" ? "Your card is kept on file for the $4 per-filing charge." : "";
    const origin = new URL(request.url).origin;
    const common = {
      customer: customer.id,
      client_reference_id: customer.id,
      metadata: { courtpath: "card", plan },
      ...(note ? { custom_text: { submit: { message: note } } } : {}),
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/billing?canceled=1`,
    };
    const session =
      config.mode === "setup"
        ? await stripe.checkout.sessions.create({ ...common, mode: "setup", currency: "usd", payment_method_types: ["card"], setup_intent_data: { metadata: { plan } } })
        : await stripe.checkout.sessions.create({
            ...common,
            mode: "subscription",
            payment_method_types: ["card"],
            payment_method_collection: "always",
            line_items: [{ price: price as string, quantity: quantityFor(plan, b.attorneyCount) }],
            subscription_data: { metadata: { plan }, ...(end ? { trial_end: end, trial_settings: { end_behavior: { missing_payment_method: "cancel" } } } : {}) },
          });

    await sendCardLinkEmail(email, config.name, session.url as string, firstCharge);
    return NextResponse.json({ message: SENT });
  } catch (error) {
    console.error("Billing link error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again or contact us." }, { status: 500 });
  }
}
