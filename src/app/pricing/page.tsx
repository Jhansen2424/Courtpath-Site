import Navbar from "@/components/Navbar";
import PricingHero from "@/components/PricingHero";
import PricingPlans from "@/components/PricingPlans";
import PricingFAQ from "@/components/PricingFAQ";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Utah E-Filing Pricing: Plans from $10 a Month | Courtpath",
  description: "Every Courtpath plan starts with a free month. Basic is $10 a month with 3 filings, Unlimited is $25 a month, and firms pay from $21 per attorney. Criminal Defense is $9.99 a month.",
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
