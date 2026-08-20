import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

// Add Next.js SEO Metadata for the About page
export const metadata: Metadata = {
  title: {
    default: "OTIC SURVEYS | Geospatial Surveying & Mapping Solutions", 
    template: "%s | OTIC SURVEYS" 
  },
  description: "Licensed Land Surveyors in Nigeria providing Boundary Surveys, Topographic Mapping, and Drone Surveying services.",
  keywords: ["Land Surveyors in Lagos", "Geospatial Company Nigeria", "OTIC SURVEYS", "Topographic Mapping"],
  metadataBase: new URL('https://oticsurveys.com'),
  
  // ROBOTS
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // OPEN GRAPH
  openGraph: {
    title: "OTIC SURVEYS | Geospatial Surveying & Mapping Solutions",
    description: "Licensed Land Surveyors in Nigeria providing professional Boundary Surveys and Drone Mapping.",
    url: 'https://oticsurveys.com',
    siteName: 'OTIC SURVEYS',
    images: [
      {
        url: '/assets/drone_about.jpeg',
        width: 1200,
        height: 630,
        alt: 'OTIC SURVEYS Equipment and Team',
      },
    ],
  },

  // CANONICAL
  alternates: {
    canonical: '/',
  },
}


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
