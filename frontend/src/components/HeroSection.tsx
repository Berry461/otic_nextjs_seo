import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react"; 

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[120vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-[140px] left-0 right-0 h-full w-full object-cover object-top opacity-100"
      >
        {/* NEXT.JS FIX: Move your video to the 'public' folder and reference it like this */}
        <source src="/hero-survey.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-[140px] left-0 right-0 h-full bg-black/60" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl pt-20">
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Mapping Your World{" "}
          <span className="text-white font-bold">
            with Accuracy & Precision
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          From land, hydrographic, pipeline, and as-built surveys to 3D laser
          scanning, drone mapping, and GIS solutions, we deliver accurate 
          spatial data and 3D models to drive smarter design, construction,
          and infrastructure decisions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
  
          {/* PRIMARY BUTTON */}
          <Button
            asChild
            size="lg"
            className="relative overflow-hidden bg-primary text-primary-foreground px-8 py-6 rounded-full group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            <Link href="/contact">
              <div className="absolute inset-0 bg-white/20 -translate-x-full translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative flex items-center gap-2 font-semibold tracking-wide uppercase text-sm">
                Contact Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
          </Button>

          {/* SECONDARY BUTTON */}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group px-8 py-6 rounded-full border border-white/30 text-white bg-transparent hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            <Link href="/projects">
              <span className="flex items-center gap-2 font-semibold tracking-wide uppercase text-sm">
                View Projects
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
            </Link>
          </Button>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;