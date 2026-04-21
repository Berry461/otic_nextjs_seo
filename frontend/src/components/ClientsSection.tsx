"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// IMPORT YOUR IMAGES HERE
import acmeLogo from "@/assets/channels.jpeg";
import techVisionLogo from "@/assets/chinarb.jpg";
import buildProLogo from "@/assets/craneburg.jpg";
import mapMastersLogo from "@/assets/avantline.jpg";
import surveyPlusLogo from "@/assets/EKEDC.jpeg";
import geoDataLogo from "@/assets/axxelanew.jpg";
import droneViewLogo from "@/assets/gmtnew.jpg";
import scanCoLogo from "@/assets/verdenew.jpg";
import langaNew from "@/assets/langannew.jpg";
import juliusBerger from "@/assets/ng-jberge-logo.png";
import kofoAgro from "@/assets/kogoagronew.jpg";
import platPetro from "@/assets/platformpetroleumnew.jpg";
import tranScorp from "@/assets/transcorpnew.jpg";
import treviFoundation from "@/assets/trevinew-1.jpg";
import fiSas from "@/assets/FISAS-1.jpeg";
import elalan from "@/assets/elalan.jpg";
import megamoundain from "@/assets/megamound.png";

const ClientsSection = () => {
  const slider1Ref = useRef<HTMLDivElement>(null);
  const slider2Ref = useRef<HTMLDivElement>(null); // Kept in case you add a second row later

  const clients = [
    { name: "Julius Berger", logo: juliusBerger },
    { name: "Langa New", logo: langaNew },
    { name: "Acme Corp", logo: acmeLogo },
    { name: "TechVision", logo: techVisionLogo },
    { name: "BuildPro", logo: buildProLogo },
    { name: "MapMasters", logo: mapMastersLogo },
    { name: "SurveyPlus", logo: surveyPlusLogo },
    { name: "GeoData Inc", logo: geoDataLogo },
    { name: "DroneView", logo: droneViewLogo },
    { name: "3D Scan Co", logo: scanCoLogo },
    { name: "Kofo Agro", logo: kofoAgro },
    { name: "Platform Petroleum", logo: platPetro },
    { name: "TransCorp", logo: tranScorp },
    { name: "Trevi Foundation", logo: treviFoundation },
    { name: "FiSas", logo: fiSas },
    { name: "Elalan", logo: elalan },
    { name: "MegaMoundain", logo: megamoundain },
  ];

  // Next.js Helper: Safely extracts the string URL from a Next.js image object
  const getSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (slider1Ref.current) {
        gsap.to(slider1Ref.current, {
          x: "-50%",
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }
      if (slider2Ref.current) {
        gsap.to(slider2Ref.current, {
          x: "50%",
          duration: 25,
          ease: "none",
          repeat: -1,
        });
      }
    });

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, []);

  return (
    <section className="py-20 overflow-hidden bg-blue-100 backdrop-blur-sm">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary uppercase tracking-wider">
            Our Clients
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading organizations worldwide
          </p>
        </div>

        {/* First Slider Row */}
        <div className="relative overflow-hidden py-4 mb-8">
          <div
            ref={slider1Ref}
            className="flex gap-8 items-center"
            style={{ width: "fit-content" }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`slider1-${index}`}
                className="flex justify-center items-center flex-shrink-0 w-48 h-48"
              >
                {/* Image Wrapper fills the whole 48x48 box */}
                <div className="w-full h-full flex items-center justify-center relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getSrc(client.logo)}
                    alt={`${client.name} logo`}
                    className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;