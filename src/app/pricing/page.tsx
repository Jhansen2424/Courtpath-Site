import Navbar from "@/components/Navbar";
import PricingHero from "@/components/PricingHero";
import PricingPlans from "@/components/PricingPlans";
import PricingFAQ from "@/components/PricingFAQ";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pricing | Courtpath E-Filing",
  description: "Transparent pricing for legal professionals. Choose from Bronze, Silver, Gold, or Platinum plans. No hidden fees, cancel anytime.",
};

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
