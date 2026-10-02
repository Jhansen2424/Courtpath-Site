import Navbar from "@/components/Navbar";
import AboutHero from "@/components/AboutHero";
import WhyWeBuilt from "@/components/WhyWeBuilt";
import ExclusiveFeatures from "@/components/ExclusiveFeatures";
import Testimonials from "@/components/Testimonials";
import LeaderSection from "@/components/LeaderSection";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Courtpath | Utah E-Filing Built by Attorneys",
  description: "E-Filing designed by attorneys for attorneys. Learn about Courtpath's mission to simplify legal document filing.",
  path: "/about",
});

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
