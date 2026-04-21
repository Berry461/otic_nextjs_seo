"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import defaultBanner from "@/assets/IMG_7264.jpg";

// Register GSAP plugin only on the client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Define Props Interface
interface BusinessStatsProps {
  backgroundImage?: any; // Accepting any to handle both strings and Next.js StaticImageData
}

const BusinessStats = ({ backgroundImage }: BusinessStatsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 2. Logic to handle Next.js Image Objects or Strings
  const getImageUrl = (img: any) => {
    if (!img) return "";
    return typeof img === "string" ? img : img.src;
  };

  const finalImage = getImageUrl(backgroundImage || defaultBanner);

  const stats = [
    { label: "Years Experience", value: 10, suffix: "+" },
    { label: "Projects Completed", value: 100, suffix: "+" },
    { label: "Expert Surveyors", value: 10, suffix: "+" },
  ];

  useEffect(() => {
    // GSAP Context is great for cleanup in React
    const ctx = gsap.context(() => {
      stats.forEach((_, index) => {
        const element = document.getElementById(`stat-${index}`);
        if (element) {
          gsap.from(element, {
            innerText: 0,
            duration: 2,
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            onUpdate: function () {
              // Ensure we formatting as a number during the animation
              const val = Math.ceil(Number(this.targets()[0].innerText));
              element.innerText = val.toLocaleString();
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-16 overflow-hidden flex items-center"
    >
      {/* --- BACKGROUND IMAGE --- */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={finalImage} 
          alt="Business Background" 
          className="w-full h-full object-cover fixed-bg-effect"
        />
        <div className="absolute inset-0 bg-black/70" /> 
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center w-full md:w-auto group">
              <div className="flex items-baseline mb-1">
                <span 
                  id={`stat-${index}`}
                  className="text-5xl md:text-7xl font-extrabold text-white tracking-tight"
                >
                  {stat.value.toLocaleString()}
                </span>
                <span className="text-4xl md:text-5xl font-bold text-primary ml-1">
                  {stat.suffix}
                </span>
              </div>
              <p className="text-sm md:text-lg text-white/90 font-semibold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessStats;