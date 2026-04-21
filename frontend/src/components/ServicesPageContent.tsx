"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useGsapScrollFade } from "@/hooks/useGsapAnimation";
import { servicesData } from "@/data/services";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const ServicesPageContent = () => {
  const titleRef = useGsapScrollFade();

  const getSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const scrollToElement = (retryCount = 0) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (retryCount < 10) {
          setTimeout(() => scrollToElement(retryCount + 1), 100);
        }
      };
      scrollToElement();
    }
  }, []);

  return (
    <section className="py-24 bg-background animate-fade-in">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="text-primary text-4xl font-bold uppercase tracking-wider mb-2">
            Our Services
          </h3>
          <p className="text-lg text-muted-foreground">
            Comprehensive geospatial solutions tailored to your specific needs
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {servicesData.map((service, index) => {
            const isExternal = index === 0 || index === 12;
            let externalLink = "#";
            if (index === 0) externalLink = "https://oticgs.com/buynow?category=survey-equipment";
            else if (index === 12) externalLink = "https://oticgs.com/training";

            return isExternal ? (
              <a key={index} href={externalLink} target="_blank" rel="noopener noreferrer" className="block no-underline group cursor-default">
                <Card id={service.id} className="bg-card border-border overflow-hidden animate-fade-in-up hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative z-10">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full h-56 md:h-auto md:w-[40%] relative shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getSrc(service.image)} alt={service.title} className="w-full h-full object-cover object-top absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <CardContent className="flex flex-col justify-center p-6 md:p-10 w-full md:w-[60%]">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                      <p className="text-white font-medium mb-4">{service.description}</p>
                      <p className="text-white text-sm leading-relaxed">{service.details}</p>
                      <Button variant="outline" className="mt-6 w-fit gap-2 border-primary/50 text-primary bg-transparent hover:bg-transparent hover:text-blue-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 font-semibold cursor-pointer">
                        {index === 12 ? "Learn More" : "Visit Store"}
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </a>
            ) : (
              <Link key={index} href={`/services/${service.id}`} className="block no-underline group cursor-default">
                <Card id={service.id} className="bg-card border-border overflow-hidden animate-fade-in-up hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative z-10">
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full h-56 md:h-auto md:w-[40%] relative shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={getSrc(service.image)} alt={service.title} className="w-full h-full object-cover object-top absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                    </div>
                    <CardContent className="flex flex-col justify-center p-6 md:p-10 w-full md:w-[60%]">
                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{service.title}</h3>
                      <p className="text-white font-medium mb-4">{service.description}</p>
                      <p className="text-white text-sm leading-relaxed">{service.details}</p>
                      <Button variant="outline" className="mt-6 w-fit gap-2 border-primary/50 text-primary bg-transparent hover:bg-transparent hover:text-blue-400 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300 font-semibold cursor-pointer">
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesPageContent;