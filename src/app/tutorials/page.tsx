import Navbar from "@/components/Navbar";
import TutorialsHero from "@/components/TutorialsHero";
import TutorialVideos from "@/components/TutorialVideos";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Tutorial Videos | Courtpath E-Filing",
  description: "Learn how to use Courtpath with our step-by-step tutorial videos. From creating an account to filing documents, we'll guide you through every step.",
};

export default function TutorialsPage() {
  return (
    <main>
      <Navbar />
      <TutorialsHero />
      <TutorialVideos />
      <Footer />
    </main>
  );
}
