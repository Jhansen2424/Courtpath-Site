import Navbar from "@/components/Navbar";
import PricingPlans from "@/components/PricingPlans";
import PricingFAQ from "@/components/PricingFAQ";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";
import { CALIFORNIA_SIGNUP_OPEN } from "@/lib/plans";

export const metadata = pageMetadata({
  title: "Utah E-Filing Pricing: Plans from $10 a Month | Courtpath",
  description: "Every Courtpath plan starts with a free month. Basic is $10 a month with 3 filings, Unlimited is $25 a month, and firms pay $21 per attorney. Criminal Defense is $9.99 a month.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="main-content">
      <Navbar />
      <PricingPlans pageTitle />
      {CALIFORNIA_SIGNUP_OPEN && (
        <p className="text-center text-gray-600 -mt-6 mb-12 px-4">
          Filing in California?{" "}
          <a href="/california" className="font-semibold text-accent-text underline underline-offset-2">See California pricing: $175 per attorney, unlimited filings</a>
        </p>
      )}
      <PricingFAQ />
      <Footer />
    </main>
  );
}
