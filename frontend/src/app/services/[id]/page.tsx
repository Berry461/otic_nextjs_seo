import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Target, Users, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { servicesData } from "@/data/services";

// --- Import your Sections ---
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ServiceDetail from "@/components/ServiceDetail";
import BusinessStats from "@/components/BusinessStats";
import Testimonials from "@/components/ClientTestimonials"; // (Assuming you still have this one!)
import FAQ from "@/components/FAQ";

// --- WHY CHOOSE US DATA ---
const whyChooseUs = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: "Precision Accuracy",
    text: "We utilize state-of-the-art geospatial technology to ensure every measurement is exact to the millimeter."
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Expert Team",
    text: "Our certified engineers and surveyors bring decades of combined field experience to your project."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Timely Delivery",
    text: "We understand the value of time in construction and strictly adhere to project timelines."
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Proven Reliability",
    text: "With over many projects completed, our reputation for safety and quality is well-established."
  }
];

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);
  
  if (!service) return { title: "Service Not Found | Otic Surveys" };

  return {
    title: `${service.title} | Otic Surveys`,
    description: service.description,
  };
}

export function generateStaticParams() {
  return servicesData.map((service) => ({ id: service.id }));
}

export default async function SingleServicePage({ params }: Props) {
  const { id } = await params;
  const service = servicesData.find((s) => s.id === id);

  if (!service) notFound(); 

  const getSrc = (img: any) => (typeof img === "string" ? img : img?.src || "");
  const heroImage = getSrc(service.heroBannerImg || service.image);
  const statsImage = getSrc(service.statsImg || service.image);

  const otherServices = service.relatedServiceIds?.length 
    ? servicesData.filter(s => service.relatedServiceIds?.includes(s.id))
    : servicesData.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <main className="min-h-screen bg-background relative">
      <Navigation />

      {/* --- 1. HERO BANNER --- */}
      <div className="relative h-[50vh] md:h-[60vh] w-full mt-20 lg:mt-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImage}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="container mx-auto px-4">
            <Button
              asChild
              variant="ghost"
              className="text-white mb-6 hover:bg-white/20 hover:text-white"
            >
              <Link href="/services">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
              </Link>
            </Button>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-background">
        
        {/* --- 2. SERVICE DETAILS --- */}
        <ServiceDetail service={service} />

        {/* --- 3. BUSINESS STATS --- */}
        <BusinessStats backgroundImage={statsImage} />

        {/* --- 4. RELATED SERVICES --- */}
        {otherServices.length > 0 && (
          <div className="container mx-auto px-4 py-24">
            <h3 className="text-3xl font-bold mb-12 text-primary uppercase tracking-wider text-center">
              Related Services
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.map((relatedService) => (
                <Card 
                  key={relatedService.id} 
                  className="group overflow-hidden border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={getSrc(relatedService.image)}
                      alt={relatedService.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white z-10">
                      {relatedService.title}
                    </h3>
                  </div>

                  <CardContent className="p-6">
                    <p className="text-muted-foreground line-clamp-2 mb-6 text-sm">
                      {relatedService.description}
                    </p>
                    <Link 
                      href={`/services/${relatedService.id}`}
                      className="inline-flex items-center text-primary font-semibold hover:text-primary/80 transition-colors"
                    >
                      View Service
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* --- 5. WHY CHOOSE US (INLINE) --- */}
        <div className="bg-muted/30 py-24 border-y border-border/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary uppercase tracking-wider mb-4">
                Why Choose Us
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Delivering excellence through innovation, experience, and dedication.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {whyChooseUs.map((feature, index) => (
                <Card 
                  key={index} 
                  className="bg-card border-border hover:border-primary/50 transition-colors shadow-sm text-center flex flex-col items-center justify-center p-8 aspect-square"
                >
                  <div className="mb-6 p-4 rounded-full bg-primary/10 inline-block">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.text}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* --- 6. CLIENT STORIES / TESTIMONIES --- */}
        <Testimonials />

        {/* --- 7. FAQS --- */}
        <div className="py-12">
          <FAQ />
        </div>

        <Footer />
      </div>
    </main>
  );
}