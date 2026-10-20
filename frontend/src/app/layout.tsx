import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import GaOnInteraction from "@/components/GaOnInteraction";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Chatbot from "@/components/Chatbot";
import PageViewTracker from "@/components/PageViewTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- METADATA CONFIGURATION ---
export const metadata: Metadata = {
  title: {
    default: "OTIC SURVEYS | Geospatial Surveying & Mapping Solutions",
    template: "%s | OTIC SURVEYS"
  },
  description: "Licensed Land Surveyors in Nigeria providing Boundary Surveys, Topographic Mapping, and Drone Surveying services.",
  keywords: ["Land Surveyors in Lagos", "Geospatial Company Nigeria", "OTIC SURVEYS", "Topographic Mapping", "Bathymetric Surveys Nigeria"],
  metadataBase: new URL('https://oticsurveys.com'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/otic-logo.png?v=2',
  },
  verification: {
    google: "_GzvMgIPoBlke7-qzqR-6AS6CjfZiH-IDsQn4EVMrKg",
  },
  openGraph: {
    title: "OTIC SURVEYS | Geospatial Surveying & Mapping Solutions",
    description: "Licensed Land Surveyors providing precision mapping and surveying services across Nigeria.",
    url: 'https://oticsurveys.com',
    siteName: 'OTIC SURVEYS',
    locale: 'en_NG',
    type: 'website',
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // --- JSON-LD STRUCTURED DATA ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "OTIC SURVEYS",
    "image": "https://oticsurveys.com/otic-logo.png",
    "description": "Licensed Land Surveyors in Nigeria specializing in Topographic, Hydrographic, and Engineering Surveys.",
    "url": "https://oticsurveys.com",
    "telephone": "+2348100277870",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "3, Bello Close, Chevy View Estate, Opposite New Road, Lekki-Epe Expressway, Lagos",
      "addressCountry": "NG"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 6.5244,
      "longitude": 3.3792
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <PageViewTracker />
        <Providers>
          {children}
        </Providers>
        <GaOnInteraction gaId="G-2ZDPTVCZHC" />
        <WhatsAppFloat />
        <Chatbot />
      </body>
    </html>
  );
}