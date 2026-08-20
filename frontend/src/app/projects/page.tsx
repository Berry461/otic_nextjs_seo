import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/ProjectsSection"; 
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "OTIC Surveys | Geospatial Surveying & Mapping Solutions",
  description: "Explore the complete list of our projects.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="relative z-10">
        <Navigation />
        
        <main className="pt-20">
          <ProjectsSection isFullList={true} /> 
        </main>
        
        <Footer />
      </div>
    </div>
  );
}
