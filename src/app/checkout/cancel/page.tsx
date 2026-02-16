import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Checkout Cancelled | Courtpath E-Filing",
  description: "Your checkout was cancelled. No charges were made.",
};

export default function CheckoutCancelPage() {
  return (
    <main>
      <Navbar />
      <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="mx-auto w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Checkout{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Cancelled
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-4">
            No worries! Your payment was not processed and no charges were made.
          </p>

          <p className="text-gray-500 mb-8">
            If you have any questions about our plans, feel free to reach out to
            our team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              View Plans
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all hover:scale-105"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
