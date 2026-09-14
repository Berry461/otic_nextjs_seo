import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Add Next.js SEO Metadata for the Contact page
export const metadata: Metadata = {
  title: "OTIC Surveys | Geospatial Surveying & Mapping Solutions",
  description: "Get in touch with Otic Surveys for your geospatial surveying, 3D laser scanning, and mapping needs.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <Navigation />
        
        <div>
          <ContactSection />
        </div>
        
        <Footer />
      </div>
    </main>
  );
}
