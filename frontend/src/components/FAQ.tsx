"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the typical turnaround time for a survey project?",
    answer:
      "Turnaround times vary by project scope. For standard residential topographic surveys, we typically deliver within 3-5 business days. Larger infrastructure projects are scheduled according to the project master plan.",
  },
  {
    question: "Are your surveyors licensed and insured?",
    answer:
      "Yes, absolutely. All our lead surveyors and engineers are fully licensed, and our firm carries comprehensive liability insurance to ensure complete peace of mind for our clients.",
  },
  {
    question: "Do you use modern geospatial technology?",
    answer:
      "Yes. We utilize modern geospatial and survey technologies including RTK GNSS systems, total stations, terrestrial laser scanners, LiDAR-equipped drones, echo sounders, side scan sonars, and unmanned surface vessels (USVs). These tools allow us to collect reliable spatial and hydrographic data for land, aerial, and water-based survey applications in line with project and regulatory requirements.",
  },
  {
    question: "Can you handle projects in remote or difficult terrains?",
    answer:
      "Yes. Our field teams are trained for challenging environments, from dense swamp forests to rugged rocky terrains. We have the specialized equipment to access and survey hard-to-reach locations.",
  },
  {
    question: "How do I request a quote?",
    answer:
      "You can request a quote by going to our 'Contact' page or emailing us directly with your project details and requirements. We typically respond with a preliminary estimate within 24 hours.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold uppercase tracking-wider text-primary">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`overflow-hidden rounded-lg border transition-colors duration-300 ${
                  isOpen
                    ? "border-primary/30 bg-card"
                    : "border-border bg-card hover:border-border/60"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <span
                    className={`text-lg font-semibold ${
                      isOpen ? "text-blue-400" : "text-white"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <span className="ml-4 shrink-0">
                    {isOpen ? (
                      <Minus className="h-5 w-5 text-white" />
                    ) : (
                      <Plus className="h-5 w-5 text-white" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-6 leading-relaxed text-white">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}