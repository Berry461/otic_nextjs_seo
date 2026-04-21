"use client";

import { CheckCircle2, Eye, Target } from "lucide-react"; 
import { useGsapScrollFade } from "@/hooks/useGsapAnimation";

// IMPORT YOUR IMAGES HERE
import droneImg from "@/assets/drone_about.jpeg"; 
import mapImg from "@/assets/IMG_7772.jpg"; 
import scanImg from "@/assets/3d_scanner.jpeg"; 
import siteImg from "@/assets/IMG_7814.jpg"; 

const AboutSection = () => {
  const leftRef = useGsapScrollFade();
  const rightRef = useGsapScrollFade();
  
  // ADDED 6 NEW SERVICES HERE
  const features = [
    "Equipment Sales",
    "Land / Cadastal Survey",
    "Drone / Aerial Survey",
    "Remote Sensing & Mapping Services",
    "Topographic Survey",
    "Hydrographic / Bathymetric Survey",
    "Professional Surveying & Geospatial Training",
    // New additions:
    "GIS & Spatial Data Analysis",
    "Pipeline Survey",
    "As-Built Survey",
    "Route Survey",
    "Setting Out Surveys",
    "3D Laser Scanning",
  ];

  // Helper to safely extract the string URL from Next.js image objects
  const getSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      
      {/* --- PART 1: TOP SECTION (White Background) --- */}
      <div className="container mx-auto px-4 pt-24 pb-32 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div ref={leftRef} className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-primary text-4xl font-bold uppercase tracking-wider">
                About Us
              </h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              OTIC Surveys is a geospatial surveying and mapping company delivering reliable
              survey services for land, infrastructure, and environmental projects. We combine
              experienced survey professionals with modern equipment and digital workflows to 
              support accurate planning, construction, and development.
            </p>
            
            {/* UPDATED LAYOUT: 
               Changed 'grid-cols-1' to 'grid-cols-1 sm:grid-cols-2'
               This splits the 12 items into two columns side-by-side.
            */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image Grid (Straight Line) */}
          <div ref={rightRef} className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square bg-secondary rounded-2xl border border-border overflow-hidden soft-shadow animate-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getSrc(droneImg)} 
                  alt="Drone Surveying" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square bg-secondary rounded-2xl border border-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getSrc(mapImg)} 
                  alt="Mapping Service" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            <div className="space-y-4"> 
              <div className="aspect-square bg-secondary rounded-2xl border border-border overflow-hidden soft-shadow animate-float" style={{ animationDelay: '2s' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getSrc(scanImg)} 
                  alt="3D Scanning" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="aspect-square bg-secondary rounded-2xl border border-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getSrc(siteImg)} 
                  alt="Construction Site" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PART 2: BOTTOM SECTION (Slanted Background) --- */}
      <div className="relative pt-24 pb-24 mt-[-4rem]"> {/* Negative margin pulls it up slightly */}
        
        {/* THE DIAGONAL SHAPE */}
        <div className="absolute inset-0 bg-blue-100 -skew-y-3 origin-top-left z-0 transform scale-[1.1]" />

        {/* Content Container */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 text-center">
            
            {/* Vision Block */}
            <div className="group space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300 shadow-sm">
                  <Eye className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-primary">
                  Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  To be the No.1 Geospatial Solutions Company in Africa
                </p>
              </div>
            </div>

            {/* Mission Block */}
            <div className="group space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300 shadow-sm">
                  <Target className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold uppercase tracking-wider text-primary">
                  Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto">
                  To provide solutions to the problems of our customers everyday by being reliable and knowledgeable
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;