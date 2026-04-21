"use client";

import { useEffect } from "react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useGsapScrollFade } from "@/hooks/useGsapAnimation";
import { useRouter } from "next/navigation"; 
import { projectsData, Project } from "@/data/projectsData"; 
import { cn } from "@/lib/utils"; 

interface ProjectsSectionProps {
  isFullList?: boolean; 
}

const ProjectsSection = ({ isFullList = false }: ProjectsSectionProps) => {
  const titleRef = useGsapScrollFade();
  const router = useRouter();
  
  const displayedProjects = isFullList ? projectsData : projectsData.slice(0, 4);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    if (isFullList && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [isFullList]);

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        
        <div ref={titleRef} className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-primary text-4xl font-bold uppercase tracking-wider mb-2">
            {isFullList ? "Some Projects" : "Featured Projects"}
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {isFullList ? "" : ""}
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our successful projects across various industries
          </p>
        </div>

        {/* --- MAIN LAYOUT SWITCH --- */}
        <div className={cn(
          isFullList 
            ? "flex flex-col gap-8 max-w-5xl mx-auto" 
            : "grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"              
        )}>
          {displayedProjects.map((project: Project, index: number) => {
            
            const projectId = project.id || `project-${index}`;

            return (
              <Card
                key={index}
                id={projectId} 
                onClick={() => {
                   if (!isFullList) {
                      router.push(`/projects#${projectId}`);
                   }
                }}
                className={cn(
                  "bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-pointer",
                  isFullList 
                    ? "flex flex-col md:flex-row h-full scroll-mt-32" 
                    : "flex flex-col h-full"
                )}
              >
                {/* --- IMAGE CONTAINER --- */}
                <div className={cn(
                  "relative shrink-0 overflow-hidden",
                  isFullList 
                    ? "w-full h-56 md:h-auto md:w-[40%]" 
                    : "w-full h-72"
                )}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-top absolute inset-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/10" />
                  
                  {!isFullList && (
                      <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-xs font-semibold text-white bg-primary/10 px-3 py-1 rounded-full backdrop-blur-md">
                          {project.category}
                      </span>
                      </div>
                  )}
                </div>

                {/* --- TEXT CONTENT --- */}
                <CardContent className={cn(
                  "flex flex-col",
                  isFullList 
                    ? "justify-center p-6 md:p-10 w-full md:w-[60%]" 
                    : "p-6 justify-between grow" /* ✅ Changed from flex-grow to grow */
                )}>
                  <div>
                    <h3 className={cn(
                      "font-bold text-white group-hover:text-blue-400 transition-colors",
                      isFullList ? "text-2xl mb-3" : "text-xl mb-2"
                    )}>
                      {project.title}
                    </h3>

                    <p className={cn(
                      "text-white/80 leading-relaxed",
                      isFullList ? "text-sm" : "text-sm text-white line-clamp-3 mb-4"
                    )}>
                        {isFullList ? project.fullDescription : project.description}
                    </p>

                    {isFullList && (
                      <p className="text-white font-medium mt-4">
                          {project.category} - {project.stats}
                      </p>
                    )}
                  </div>

                  {!isFullList && (
                      <div className="flex items-center justify-between pt-4 mt-auto">
                      <span className="text-xs text-white font-medium">{project.stats}</span>
                      <Button 
                        variant="outline"
                        className="mt-6 w-fit gap-2 border-blue-600/50 text-blue-500 bg-transparent
                                  hover:bg-transparent hover:text-blue-500
                                  group-hover:bg-blue-600 group-hover:border-blue-600 group-hover:text-white
                                  transition-all duration-300 font-semibold"
                      >
                        Learn More 
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                      </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!isFullList && (
          <div className="text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                window.scrollTo(0, 0);
                router.push("/projects");
              }}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View More Projects
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;