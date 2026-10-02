import Navbar from "@/components/Navbar";
import TutorialsHero from "@/components/TutorialsHero";
import TutorialVideos from "@/components/TutorialVideos";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How to E-File in Utah: Video Tutorials | Courtpath",
  description: "Four short videos: create an account, file a new case, enter an appearance, and file documents in an existing Utah case.",
  path: "/tutorials",
});

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
