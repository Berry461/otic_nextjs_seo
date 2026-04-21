"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGsapScrollFade } from "@/hooks/useGsapAnimation";
import { useRouter } from "next/navigation"; // Next.js Router
import { servicesData } from "@/data/services"; 

const ServicesSection = () => {
  // ANIMATION HOOK
  const titleRef = useGsapScrollFade();
  const router = useRouter();
  
  // 1. LIMIT TO FIRST 6 SERVICES
  const displayedServices = servicesData.slice(0, 6);
  const getSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");

  return (
    <section id="services" className="py-36 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* 2. TEXT ANIMATION ON DISPLAY */}
        {/* GSAP hook is attached via ref, but we also add a Tailwind fallback just in case */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-primary text-4xl font-bold uppercase tracking-wider mb-2">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive geospatial solutions tailored to your specific needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedServices.map((service, index) => (
            <Card
              key={index}
              onClick={() => {
                const title = service.title.toLowerCase();

                if (index === 0 || title.includes("equipment")) {
                  window.open("https://oticgs.com/buynow?category=survey-equipment", "_blank", "noopener,noreferrer");
                } 
                else if (title.includes("training")) {
                  window.open("https://oticgs.com/training", "_blank", "noopener,noreferrer");
                } 
                else {
                  // Next.js Navigation
                  router.push(`/services/${service.id}`);
                }
              }}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer group animate-fade-in-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-72 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={getSrc(service.image)} 
                  alt={service.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-white line-clamp-3 group-hover:text-white transition-opacity duration-300">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 3. VIEW MORE BUTTON */}
        <div 
          className="mt-16 text-center animate-fade-in-up" 
          style={{ animationDelay: `${displayedServices.length * 0.1}s` }} // Staggers right after the last card
        >
          <Button 
            onClick={() => router.push("/services")} 
            size="lg"
            className="text-lg px-8 py-6 uppercase tracking-wide font-bold group"
          >
            View More Services 
            {/* Added group-hover effect to make the arrow slide right slightly */}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;