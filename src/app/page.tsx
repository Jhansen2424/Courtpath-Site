import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CaseAccess from "@/components/CaseAccess";
import AppShowcase from "@/components/AppShowcase";
import StepByStep from "@/components/StepByStep";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Utah Court E-Filing for Attorneys | Courtpath",
  description:
    "Certified Utah e-filing provider since 2019. File and serve in district and justice courts from $4 a filing. User licenses are free through January 1, 2027.",
  path: "/",
});

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
