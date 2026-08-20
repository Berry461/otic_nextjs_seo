// src/app/services/page.tsx
import { Metadata } from "next";
import Navigation from "@/components/Navigation";
import ServicesPageContent from "@/components/ServicesPageContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "OTIC Surveys | Professional Surveying & Geospatial Services",
  description: "Explore OTIC SURVEYS' comprehensive range of services including Engineering Surveys, Bathymetric Mapping, Construction Layouts, and GIS Solutions in Nigeria.",
  keywords: [
    "Land Surveying Services Lagos", 
    "Bathymetric Survey Nigeria", 
    "Engineering Surveying", 
    "GIS mapping services", 
    "Construction staking Lagos"
  ],

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

  openGraph: {
    title: "Expert Geospatial Services | OTIC SURVEYS",
    description: "From boundary surveys to complex offshore mapping, see how OTIC SURVEYS provides precision and reliability.",
    url: 'https://oticsurveys.com/services',
    images: [
      {
        url: '/3dlaserscannings.jpeg', // A photo representing your equipment or team at work
        width: 1200,
        height: 630,
        alt: 'OTIC SURVEYS Field Equipment',
      },
    ],
  },
}

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
