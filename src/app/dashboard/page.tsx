import { stats } from "@/data/stats";
import DashboardContent from "./DashboardContent";

export const metadata = {
  title: "Dashboard | Courtpath",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <DashboardContent stats={stats} />;
}
