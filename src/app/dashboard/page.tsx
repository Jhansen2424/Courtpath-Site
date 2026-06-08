import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isCookieValid, DASHBOARD_COOKIE } from "@/lib/dashboardAuth";
import { stats } from "@/data/stats";
import DashboardContent from "./DashboardContent";

export const metadata = {
  title: "Dashboard | Courtpath",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const authed = isCookieValid(cookieStore.get(DASHBOARD_COOKIE)?.value);

  if (!authed) {
    redirect("/dashboard/login");
  }

  return <DashboardContent stats={stats} />;
}
