import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PLAN_BILLING, isPlan, priceFor, quantityFor, sealPassword, trialEnd, accountExists } from "@/lib/billing";
import { formatDate } from "@/lib/plans";

/**
 * Signup: check the form, then send the attorney to Stripe Checkout to put a card on file.
 * The Courtpath account is created only after Checkout completes (/api/create-account from the
 * success page, or the Stripe webhook), so every account has a card and the right plan behind it.
 */
export const maxDuration = 30;

const text = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: NextRequest) {
  try {
    const b = await request.json();
    const plan = text(b.plan, 30).toLowerCase();
    if (!isPlan(plan)) {
      return NextResponse.json({ error: "Pick a plan on the pricing page first." }, { status: 400 });
    }
    const f = {
      firstName: text(b.firstName, 100), middleName: text(b.middleName, 100), lastName: text(b.lastName, 100),
      email: text(b.email, 200).toLowerCase(), bar: text(b.bar, 12), phone: text(b.phone, 30),
      address1: text(b.address1), address2: text(b.address2), city: text(b.city, 100), state: text(b.state, 30), zip: text(b.zip, 15),
      teamName: text(b.teamName, 120),
    };
    const password = typeof b.password === "string" ? b.password : "";
    // The same rules the app applies when it creates the account, checked before any card is taken.
    const problems: string[] = [];
    if (!f.firstName) problems.push("first name");
    if (!f.lastName) problems.push("last name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) problems.push("email");
    if (password.length < 8 || password.length > 200) problems.push("password (8 or more characters)");
    if (!/^\d{1,10}$/.test(f.bar)) problems.push("bar number (digits only)");
    // Firm is the only plan that needs a firm name; Unlimited yearly is per attorney but one attorney.
    if (plan === "gold" && !f.teamName) problems.push("firm name");
    if (problems.length) return NextResponse.json({ error: `Check these fields: ${problems.join(", ")}` }, { status: 400 });

    const config = PLAN_BILLING[plan];
    const price = priceFor(plan);
    if (config.mode === "subscription" && !price) {
      console.error(`Signup: ${config.priceEnv} is not set`);
      return NextResponse.json({ error: "This plan is not available online yet. Please call or contact us to sign up." }, { status: 503 });
    }

    if ((await accountExists(f.email)) === true) {
      return NextResponse.json({
        error: "There is already a Courtpath account with this email. Log in to the app, or add a card to your account at courtpath.com/billing.",
        code: "exists",
      }, { status: 409 });
    }

    const attorneyCount = config.perAttorney ? String(quantityFor(plan, b.attorneyCount)) : "";
    const end = trialEnd();
    const stripe = getStripe();
    // Signup details ride on the customer until the account exists; the password only sealed.
    // freeUntil records when this account's free period ends, for the app's per-filing charges.
    const metadata: Record<string, string> = {
      courtpath: "signup", plan, pw: sealPassword(password), attorneyCount, freeUntil: new Date(end * 1000).toISOString(),
      ...Object.fromEntries(Object.entries(f).filter(([k, v]) => v && k !== "email")),
    };
    const customer = await stripe.customers.create({
      email: f.email,
      name: `${f.firstName} ${f.lastName}`,
      phone: f.phone || undefined,
      address: f.address1 ? { line1: f.address1, line2: f.address2 || undefined, city: f.city || undefined, state: f.state || undefined, postal_code: f.zip || undefined, country: "US" } : undefined,
      metadata,
    });

    // Shown above the button on Stripe's page, so the attorney knows exactly when the card is used.
    const firstCharge = formatDate(new Date(end * 1000));
    const note = config.mode === "setup"
      ? `Nothing is charged today. Your card is kept on file for the $4 per-filing charge, which starts ${firstCharge}.`
      : `Nothing is charged today. Your ${config.name} plan${config.detail ? ` (${config.detail})` : ""} starts on this card ${firstCharge}. Cancel before then and you won't be charged.`;
    const origin = new URL(request.url).origin;
    const common = {
      customer: customer.id,
      client_reference_id: customer.id,
      metadata: { courtpath: "signup", plan },
      custom_text: { submit: { message: note } },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}`,
      cancel_url: `${origin}/signup/${plan}?canceled=1`,
    };
    const session =
      config.mode === "setup"
        ? await stripe.checkout.sessions.create({
            ...common,
            mode: "setup",
            currency: "usd",
            payment_method_types: ["card"],
            setup_intent_data: { metadata: { plan }, description: "Courtpath Bronze: card on file for per-filing charges" },
          })
        : await stripe.checkout.sessions.create({
            ...common,
            mode: "subscription",
            payment_method_types: ["card"],
            payment_method_collection: "always",
            line_items: [{ price: price as string, quantity: quantityFor(plan, b.attorneyCount) }],
            subscription_data: {
              metadata: { plan },
              trial_end: end,
              trial_settings: { end_behavior: { missing_payment_method: "cancel" } },
            },
          });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Signup checkout error:", error);
    return NextResponse.json({ error: "Could not start checkout. Please try again later." }, { status: 500 });
  }
}
