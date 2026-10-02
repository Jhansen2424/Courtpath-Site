import Navbar from "@/components/Navbar";
import PricingHero from "@/components/PricingHero";
import PricingPlans from "@/components/PricingPlans";
import PricingFAQ from "@/components/PricingFAQ";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Utah E-Filing Pricing: Plans from $4 a Filing | Courtpath",
  description: "Pay per filing or file unlimited from $240 a year. Compare Bronze, Silver, Gold, and Platinum plans for solo attorneys and firms. Free through January 1, 2027.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <PricingHero />
      <PricingPlans />
      <PricingFAQ />
      <Footer />
    </main>
  );
}
