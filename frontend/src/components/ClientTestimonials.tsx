import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

// Typescript interface for better code safety
interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

const ClientTestimonials = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Mr Karim Said, Ikoyi, Lagos.",
      role: "Managing Director",
      company: "GMT Nigeria Ltd",
      quote: "You are the man!",
    },
    {
      name: "Mr Adeleke, Atan-Ota, Ogun State",
      role: "Private Client",
      company: "",
      quote: "Although you delayed a bit, nevertheless, you have delivered a good job.",
    },
    {
      name: "Mr. Jide Williams. UK",
      role: "Private Client",
      company: "",
      quote: "Thanks a million again for a wonderful service",
    },
  ];

  return (
    <section className="py-20 border-t border-border/50">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-primary text-4xl font-bold uppercase tracking-wider mb-2">
            Client Stories
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Card 
              key={index} 
              className="bg-card border-border hover:border-primary/40 transition-all duration-300 relative group h-full"
            >
              <CardContent className="p-8 pt-12 flex flex-col h-full">
                
                {/* Decoration: Quote Icon */}
                <div className="absolute top-6 left-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-white fill-white" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6 text-white">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-white text-lg leading-relaxed italic mb-8 flex-grow relative z-10">
                  &quot;{item.quote}&quot;
                </p>

                {/* Author Info */}
                <div className="mt-auto border-t border-border pt-4">
                  <h4 className="font-bold text-white text-base">
                    {item.name}
                  </h4>
                  <p className="text-sm text-blue-400 font-medium">
                    {item.role}
                  </p>
                  {item.company && (
                    <p className="text-xs text-white uppercase tracking-wide mt-1">
                      {item.company}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ClientTestimonials;