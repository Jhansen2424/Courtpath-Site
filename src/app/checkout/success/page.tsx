import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckoutSuccessContent from "./CheckoutSuccessContent";

export const metadata = {
  title: "Payment Successful | Courtpath E-Filing",
  description: "Your payment was processed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <main>
      <Navbar />
      <Suspense fallback={<LoadingState />}>
        <CheckoutSuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}

function LoadingState() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 rounded-full border-4 border-accent border-t-transparent animate-spin mb-6" />
        <p className="text-gray-600 text-lg">Setting up your account&hellip;</p>
      </div>
    </section>
  );
}
