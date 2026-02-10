import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CaseAccess from "@/components/CaseAccess";
import AppShowcase from "@/components/AppShowcase";
import StepByStep from "@/components/StepByStep";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <CaseAccess />
      <AppShowcase />
      <StepByStep />
      <Footer />
    </main>
  );
}
