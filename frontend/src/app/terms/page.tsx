import { Metadata } from 'next';
import Navigation from "@/components/Navigation"; 
import Footer from "@/components/Footer"; 

// 👉 NEXT.JS WORTHY: Built-in SEO Metadata
export const metadata: Metadata = {
  title: 'Terms of Service | OTIC Surveys',
  description: 'Read the Terms of Service governing the use of the OTIC Surveys website and our professional geospatial services.',
  alternates: {
    canonical: 'https://oticsurveys.com/terms-of-service' // Update to your actual domain
  }
};

// 👉 NEXT.JS WORTHY: Server Component (Zero JavaScript sent to the browser!)
export default function TermsOfService() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      
      <Navigation /> 

      <main className="flex-grow pt-32 pb-16 px-4 text-black mt-10">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <h1 className="text-4xl font-bold mb-4 text-primary">Terms of Service</h1>
          <p className="text-gray-500 mb-12 border-b border-gray-200 pb-8">
            Effective Date: January 16, 2026
          </p>

          {/* Content */}
          <div className="space-y-10 text-gray-800 font-medium leading-relaxed">
            
            {/* Introduction */}
            <p className="text-lg">
              These Terms of Service govern access to and use of the OTIC Surveys website and services. By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree, please discontinue use of the website and services.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">1. Use of the Website</h2>
              <p>
                The OTIC Surveys website is provided for general information about our surveying, mapping, and geospatial services. You agree to use the website only for lawful purposes and in a manner that does not infringe on the rights of OTIC Surveys or any third party, disrupt website functionality, or attempt unauthorized access to any part of the website or its systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">2. Services and Engagement</h2>
              <p>
                OTIC Surveys provides professional surveying and geospatial services based on agreed scopes, proposals, contracts, and project-specific terms. Information on the website does not constitute a binding offer and may be updated or modified without notice. Service delivery timelines, fees, and outputs are subject to formal agreement between OTIC Surveys and the client.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">3. Intellectual Property</h2>
              <p>
                All content on this website, including text, graphics, logos, images, layouts, and technical materials, is the property of OTIC Surveys or its licensors and is protected by applicable intellectual property laws. Content may not be copied, reproduced, distributed, modified, or used for commercial purposes without prior written consent from OTIC Surveys.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">4. User-Submitted Information</h2>
              <p>
                Any information submitted through the website, including inquiries, documents, or contact details, must be accurate and lawful. You grant OTIC Surveys the right to use such information for the purpose of responding to requests, providing services, and maintaining business records, in accordance with our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">5. Professional Disclaimer</h2>
              <p>
                Survey results, maps, plans, reports, and data produced by OTIC Surveys are prepared for specific projects, locations, and purposes as agreed with the client. Such outputs should not be relied upon for purposes beyond the agreed scope without written confirmation. OTIC Surveys is not responsible for decisions made using information outside its intended use.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">6. Limitation of Liability</h2>
              <p>
                OTIC Surveys shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on its content. While reasonable care is taken to ensure accuracy, information on the website is provided on an “as is” basis without warranties of any kind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">7. Third-Party Links</h2>
              <p>
                The website may contain links to third-party websites for convenience or reference. OTIC Surveys does not control and is not responsible for the content, availability, or practices of such websites. Access to third-party sites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">8. Suspension or Termination</h2>
              <p>
                OTIC Surveys reserves the right to suspend or terminate access to the website, without notice, if these Terms are violated or if continued access poses a risk to our operations, security, or reputation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">9. Governing Law</h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms shall be subject to the jurisdiction of Nigerian courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">10. Changes to These Terms</h2>
              <p>
                OTIC Surveys may revise these Terms of Service at any time. Updated terms will be posted on this page with a revised effective date. Continued use of the website after changes indicates acceptance of the updated Terms.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer /> 
    </div>
  );
}
