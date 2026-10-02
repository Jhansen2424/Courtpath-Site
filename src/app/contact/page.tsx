import Navbar from "@/components/Navbar";
import ContactHero from "@/components/ContactHero";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Courtpath | Utah E-Filing Support in Murray, UT",
  description: "Get in touch with Courtpath. We're here to help with your e-filing needs. Contact us by phone, email, or visit our office in Murray, UT.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <Footer />
    </main>
  );
}
