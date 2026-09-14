"use client";

import { useState, ChangeEvent, FormEvent } from "react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { useGsapScrollFade } from "@/hooks/useGsapAnimation";

const ContactSection = () => {
  const titleRef = useGsapScrollFade();
  const formRef = useGsapScrollFade();
  const card1Ref = useGsapScrollFade();
  const card2Ref = useGsapScrollFade();
  const card3Ref = useGsapScrollFade();
  const mapRef = useGsapScrollFade();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus(null);

    try {
      const FORM_TOKEN = "59d961f06889817fea6db551e060fce0"; 
      
      const response = await fetch(`https://formsubmit.co/ajax/${FORM_TOKEN}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email, 
          subject: formData.subject, 
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-background">
      
      {/* ▼▼▼▼▼▼▼▼ MAP SECTION (CHEVY VIEW & NEW ROAD) ▼▼▼▼▼▼▼▼ */}
      <div ref={mapRef} className="w-full h-[400px] mt-[140px] mb-16 overflow-hidden border-b border-border/50">
        <iframe
          width="100%"
          height="100%"
          title="map"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // ✅ UPDATED SRC: 
          // 1. Searches specifically for "OTIC Surveys" inside "Chevy View Estate"
          // 2. Includes "Opposite New Road" in the query so the map frames that landmark too.
          // 3. z=16 sets the zoom level to show the estate clearly.
          src="https://maps.google.com/maps?q=OTIC+Surveys%2C+Chevy+View+Estate%2C+Opposite+New+Road%2C+Lekki&t=&z=16&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </div>
      {/* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-primary uppercase tracking-wider mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground">Ready to start your project? Reach out to our team for a consultation</p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card ref={card1Ref} className="bg-card border-border hover:transition-all duration-300">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white">Email</h4>
              <p className="text-white text-sm">work@oticsurveys.com</p>
            </CardContent>
          </Card>
          <Card ref={card2Ref} className="bg-card border-border hover:transition-all duration-300">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white">Phone</h4>
              <p className="text-white text-sm">+2348100277870</p>
              <p className="text-white text-sm">+2349048332623</p>
              <p className="text-white text-sm">+2347081427221</p>
            </CardContent>
          </Card>
          <Card ref={card3Ref} className="bg-card border-border hover:transition-all duration-300">
            <CardContent className="p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white">Location</h4>
              <p className="text-white text-sm">3, Bello Close, Chevy View Estate, Opposite New Road, Lekki-Epe Expressway, Lagos</p>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card ref={formRef} className="max-w-2xl mx-auto mt-12 bg-card border-border mb-20">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Spam Honeypot */}
              <input type="text" name="_honey" style={{ display: 'none' }} />

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Name</label>
                  <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className="bg-background border-border text-foreground" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="bg-background border-border text-foreground" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Subject</label>
                <Input name="subject" value={formData.subject} onChange={handleChange} placeholder="Project inquiry" className="bg-background border-border text-foreground" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Message</label>
                <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your project..." rows={5} className="bg-background border-border text-foreground resize-none" required />
              </div>

              {status === "success" && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-600 text-sm font-medium text-center">
                  Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-600 text-sm font-medium text-center">
                  Something went wrong. Please try again.
                </div>
              )}

              <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactSection;