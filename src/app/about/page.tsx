import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import WhyWeBuilt from "@/components/WhyWeBuilt";
import ExclusiveFeatures from "@/components/ExclusiveFeatures";
import Testimonials from "@/components/Testimonials";
import LeaderSection from "@/components/LeaderSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | Courtpath E-Filing",
  description: "E-Filing designed by attorneys for attorneys. Learn about Courtpath's mission to simplify legal document filing.",
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <AboutHero />
      <WhyWeBuilt />
      <ExclusiveFeatures />
      <Testimonials />
      <LeaderSection />
      <Footer />
    </main>
  );
}
