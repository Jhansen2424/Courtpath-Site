import { NextResponse } from "next/server";
import { DASHBOARD_COOKIE } from "@/lib/dashboardAuth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(DASHBOARD_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
