import { NextRequest, NextResponse } from "next/server";
import { finishCheckout } from "@/lib/billing";
import { sendSignupEmail } from "@/lib/signupEmail";

/**
 * The success page lands here with Checkout's session id: verify the card is on file, then create
 * (or link) the Courtpath account. The Stripe webhook does the same thing, so closing the tab early
 * loses nothing; whichever runs second reuses the recorded outcome.
 */
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();
    if (typeof sessionId !== "string" || !sessionId.startsWith("cs_")) {
      return NextResponse.json({ error: "Missing checkout session." }, { status: 400 });
    }
    const r = await finishCheckout(sessionId, sendSignupEmail);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
    return NextResponse.json({ account: r.account, plan: r.plan, kind: r.kind });
  } catch (error) {
    console.error("Finishing checkout failed:", error);
    return NextResponse.json({ error: "We could not confirm your signup yet. Please contact support." }, { status: 500 });
  }
}
