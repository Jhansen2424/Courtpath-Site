import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BillingForm from "./BillingForm";

export const metadata = {
  title: { absolute: "Add Your Card | Courtpath" },
  description: "Put a card on file for your Courtpath plan. You will not be charged before January 1, 2027.",
  robots: { index: false, follow: false },
};

export default function BillingPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-gradient-to-b from-white to-gray-50 min-h-[70vh] pt-32 pb-16">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Add your card</h1>
          <p className="text-gray-600 mb-8">
            Free launch pricing ends January 1, 2027. Put a card on file for your plan now so your
            account keeps working. You will not be charged before January 1, 2027.
          </p>
          <BillingForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}
