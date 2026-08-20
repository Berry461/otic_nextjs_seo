import { Metadata } from 'next';
import Navigation from "@/components/Navigation"; 
import Footer from "@/components/Footer"; 

// 👉 NEXT.JS WORTHY: Built-in SEO Metadata
export const metadata: Metadata = {
  title: 'Privacy Policy | OTIC Surveys',
  description: 'Learn how OTIC Surveys collects, uses, and protects your personal information.',
  alternates: {
    canonical: 'https://oticsurveys.com/privacy-policy' // Update to your actual domain
  }
};

// 👉 NEXT.JS WORTHY: Server Component (No 'use client' needed for static text!)
export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <Navigation />

      <main className="flex-grow pt-32 pb-16 px-4 text-black mt-10">
        <div className="container mx-auto max-w-4xl">
        
          {/* Header */}
          <h1 className="text-4xl font-bold mb-4 text-primary">Privacy Policy</h1>
          <p className="text-gray-500 mb-12 border-b border-gray-200 pb-8">
            Effective Date: January 16, 2026
          </p>

          {/* Content */}
          <div className="space-y-10 text-gray-800 font-medium leading-relaxed">
            
            <p className="text-lg">
              OTIC Surveys is committed to protecting the privacy and personal information of visitors, clients, and users of our website. This Privacy Policy explains how information is collected, used, stored, and protected when you interact with our website or engage our services.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
              <p>
                We may collect personal information that you voluntarily provide, such as your name, email address, phone number, company name, location, and any other details submitted through contact forms, quotation requests, or direct communication. We also collect non-personal information automatically, including IP addresses, browser type, device information, pages visited, and usage patterns, to help us understand how our website is used and how it can be improved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. How We Use Your Information</h2>
              <p>
                Information collected by OTIC Surveys is used to respond to inquiries, deliver surveying and geospatial services, prepare quotations and project documentation, improve website performance, and communicate relevant service-related updates. Your information may also be used to meet legal, regulatory, and contractual obligations. OTIC Surveys does not sell, rent, or trade personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Cookies and Website Analytics</h2>
              <p>
                Our website may use cookies and similar technologies to enhance functionality, analyze traffic, and improve user experience. Cookies help us understand user behavior and optimize content delivery. You may disable cookies through your browser settings, although doing so may limit certain website features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. Data Sharing and Disclosure</h2>
              <p>
                Personal information may be shared only with trusted service providers who assist with website hosting, analytics, communication, or service delivery, and only under strict confidentiality obligations. Information may also be disclosed when required by law or to protect the rights, safety, and property of OTIC Surveys, our clients, or the public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Security</h2>
              <p>
                OTIC Surveys applies appropriate administrative, technical, and organizational measures to protect personal information against unauthorized access, misuse, alteration, or disclosure. While reasonable safeguards are in place, no internet-based system can be guaranteed to be completely secure, and information is provided at the user’s own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Data Retention</h2>
              <p>
                Personal information is retained only for as long as necessary to fulfill the purposes for which it was collected or to comply with applicable legal and regulatory requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Your Rights</h2>
              <p>
                You have the right to request access to your personal information, request corrections to inaccurate data, request deletion where legally permissible, and withdraw consent for data processing where applicable. Requests can be made by contacting OTIC Surveys using the details provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Third-Party Websites</h2>
              <p>
                Our website may contain links to external websites. OTIC Surveys is not responsible for the privacy practices or content of third-party websites, and users are encouraged to review their respective privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Legal Compliance</h2>
              <p>
                OTIC Surveys processes personal information in accordance with applicable data protection laws and regulations in Nigeria, including the Nigeria Data Protection Act (NDPA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Updates to This Policy</h2>
              <p>
                This Privacy Policy may be updated periodically to reflect changes in legal requirements, business operations, or website functionality. Any updates will be published on this page with a revised effective date.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
