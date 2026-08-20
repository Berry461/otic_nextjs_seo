// src/app/page.tsx

import { Metadata } from "next"; // Import Next.js metadata type
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ClientsSection from "@/components/ClientsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

// 1. Add Next.js SEO Metadata
export const metadata: Metadata = {
  title: "OTIC Surveys | Geospatial Surveying & Mapping Solutions",
  description: "Advanced geospatial surveying, 3D laser scanning, and mapping solutions.",
};

// 2. You can rename 'Index' to 'HomePage' (optional, but standard practice)
export default function HomePage() {
  return (
    // 3. Changed the outer div to a <main> tag for better SEO/Accessibility
    <main className="min-h-screen bg-background relative">
      
      <div className="relative z-10">
        <Navigation />
        <HeroSection />
        <AboutSection />
        <ClientsSection />
        <ServicesSection />
        <ProjectsSection />
        <Footer />
      </div>
    </main>
  );
}
