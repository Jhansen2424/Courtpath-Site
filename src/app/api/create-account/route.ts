import { NextRequest, NextResponse } from "next/server";
import { createDecipheriv } from "crypto";
import { getStripe } from "@/lib/stripe";

function decryptPassword(encrypted: string): string {
  const [ivHex, dataHex] = encrypted.split(":");
  const key = Buffer.from(process.env.SIGNUP_ENCRYPTION_KEY ?? "", "hex");
  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  return (
    decipher.update(Buffer.from(dataHex, "hex")).toString("utf8") +
    decipher.final("utf8")
  );
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    // 1. Verify payment with Stripe — never trust the client
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    const isPaid =
      session.payment_status === "paid" || session.status === "complete";

    if (!isPaid) {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // 2. Extract metadata
    const m = session.metadata;
    if (!m || !m.firstName || !m.email || !m.encryptedPassword) {
      return NextResponse.json(
        { error: "Signup data missing from session" },
        { status: 400 }
      );
    }

    // 3. Decrypt the password
    const password = decryptPassword(m.encryptedPassword);

    // 4. Build Courtpath payload
    const payload = {
      firstName: m.firstName,
      lastName: m.lastName,
      middleName: m.middleName ?? "",
      email: m.email,
      password,
      bar: m.bar,
      plan: m.plan,
      role: "attorney",
      phone: m.phone ?? "",
      fax: "",
      address: {
        address1: m.address1 ?? "",
        address2: m.address2 ?? "",
        city: m.city ?? "",
        state: m.state ?? "",
        zip: m.zip ?? "",
      },
      wp: "",
      stripeId:
        typeof session.customer === "string"
          ? session.customer
          : (session.customer as { id: string } | null)?.id ?? "",
    };

    const apiUrl = process.env.COURTPATH_API_URL;
    const companyId = process.env.COURTPATH_COMPANY_ID;

    if (!apiUrl || !companyId) {
      console.error("Missing COURTPATH_API_URL or COURTPATH_COMPANY_ID");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // 5. POST to Courtpath API
    const cpRes = await fetch(`${apiUrl}/pub/users/court/user/${companyId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const cpData = await cpRes.json();

    // Treat "already exists" as success to handle page refreshes gracefully
    if (cpData.user === "created" || cpRes.status === 409) {
      return NextResponse.json({ success: true });
    }

    console.error("Courtpath API error:", cpRes.status, cpData);
    return NextResponse.json(
      { error: cpData.error ?? "Account creation failed" },
      { status: 502 }
    );
  } catch (error) {
    console.error("create-account error:", error);
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}
