"use client";

import { ServiceItem } from "@/data/services";
import { Layers } from "lucide-react";

const ServiceDetail = ({ service }: { service: ServiceItem }) => {
  const getSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-6 text-primary uppercase tracking-wider">Overview</h2>
          <p className="text-xl text-foreground mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="bg-secondary/5 border-l-4 border-primary pl-6 py-4 my-10">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> Details & Methodology
            </h3>
            <div 
              className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: service.methodology || service.details || "" }} 
            />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <div className="rounded-lg overflow-hidden border border-border shadow-lg h-[400px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getSrc(service.sidebarImg || service.image)}
                alt={`${service.title} visual`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;