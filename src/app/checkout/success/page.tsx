import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Payment Successful | Courtpath E-Filing",
  description: "Your payment was processed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <main>
      <Navbar />
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Payment{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Successful!
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Thank you for choosing Courtpath. You will receive a confirmation
            email shortly with your account details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Go to Homepage
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all hover:scale-105"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
