import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

// Add Next.js SEO Metadata for the About page
export const metadata: Metadata = {
  title: "About Us | Otic Surveys",
  description: "Learn about Otic Surveys, a leading geospatial surveying and mapping company delivering reliable solutions across Africa.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-20">
          <AboutSection />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}