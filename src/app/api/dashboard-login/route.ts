import { NextRequest, NextResponse } from "next/server";
import {
  isPasswordValid,
  makeCookieValue,
  DASHBOARD_COOKIE,
  COOKIE_OPTIONS,
} from "@/lib/dashboardAuth";

export async function POST(request: NextRequest) {
  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!process.env.DASHBOARD_PASSWORD || !process.env.DASHBOARD_SECRET) {
    return NextResponse.json(
      { error: "Dashboard is not configured. Set DASHBOARD_PASSWORD and DASHBOARD_SECRET." },
      { status: 500 }
    );
  }

  if (!isPasswordValid(password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(DASHBOARD_COOKIE, makeCookieValue(), COOKIE_OPTIONS);
  return res;
}
