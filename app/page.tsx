import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { ProjectsSection } from "@/components/projects-section";
import { HotTakesSection } from "@/components/hot-takes-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <HotTakesSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
