// src/app/services/page.tsx
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ServicesPageContent from "@/components/ServicesPageContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Our Services | Otic Surveys",
  description: "Comprehensive geospatial solutions tailored to your specific needs.",
};

export default function Services() {
  return (
    <main className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <Navigation />
        <div className="pt-20">
          <ServicesPageContent />
        </div>
        <Footer />
      </div>
    </main>
  );
}