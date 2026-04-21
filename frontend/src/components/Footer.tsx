'use client'

import { useState, FormEvent } from "react"
import { Send, Loader2, LogIn } from "lucide-react"
import Link from "next/link" // Replaces react-router-dom Link

// --- Custom Social Icons - unchanged ---
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
)
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
)
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
)
const XIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
)
const TiktokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
)

const Footer = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const FORM_TOKEN = "59d961f06889817fea6db551e060fce0"

      const response = await fetch(`https://formsubmit.co/ajax/${FORM_TOKEN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: email,
          _subject: "New Newsletter Subscriber",
          _template: "table"
        }),
      })

      if (response.ok) {
        alert("Thank you! You have been subscribed.")
        setEmail("")
      } else {
        alert("Something went wrong. Please try again later.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Network error. Please check your connection.")
    } finally {
      setIsLoading(false)
    }
  }

  const socialLinks = [
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "https://www.linkedin.com/company/oticsurveys/posts/?feedView=all", label: "LinkedIn" },
    { icon: <FacebookIcon className="w-5 h-5" />, href: "https://www.facebook.com/share/1DrvsjiSmZ/?mibextid=wwXIfr", label: "Facebook" },
    { icon: <InstagramIcon className="w-5 h-5" />, href: "https://www.instagram.com/oticsurveys?igsh=MWYxb2wyMHJ5dzNkag", label: "Instagram" },
    { icon: <YoutubeIcon className="w-5 h-5" />, href: "https://https://www.youtube.com/@oticgeosystems/shorts", label: "YouTube" },
    { icon: <XIcon className="w-5 h-5" />, href: "https://x.com/oticsurveys", label: "X" },
    { icon: <TiktokIcon className="w-5 h-5" />, href: "https://www.tiktok.com/@oticsurveys?_r=1&_t=ZS-9379WMtLlS9", label: "TikTok" },
  ]

  const servicesListOne = [
    { name: "Equipment Sales", link: "https://oticgs.com" },
    { name: "Land/Cadastral Survey", link: "/services/land-survey" },
    { name: "Drone / Aerial Survey", link: "/services/aerial-survey" },
    { name: "Remote Sensing & Mapping", link: "/services/remote-sensing" },
    { name: "Topographic Survey", link: "/services/topographic-survey" },
    { name: "Hydrograpic Survey", link: "/services/hydrographic-survey" },
    { name: "Professional Surveying & Geospatial Training", link: "https://oticgs.com/training" }
  ]

  const servicesListTwo = [
    { name: "GIS & Spatial Analysis", link: "/services/gis-and-spatial-survey" },
    { name: "Pipeline Surveys", link: "/services/pipeline-survey" },
    { name: "As-Built Surveys", link: "/services/as-built-survey" },
    { name: "Route Surveys", link: "/services/route-survey" },
    { name: "Setting-Out Surveys", link: "/services/setting-out-survey" },
    { name: "3D Laser Scanning", link: "/services/3d-laser-scanning" }
  ]

  const renderLink = (item: { name?: string; link?: string; label?: string; href?: string }, text: string) => {
    const isExternal = item.link?.startsWith('http') || item.href?.startsWith('http')
    const destination = item.link || item.href || "/"

    const commonClasses = "text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"

    if (isExternal) {
      return (
        <a href={destination} target="_blank" rel="noopener noreferrer" className={commonClasses}>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{text}
        </a>
      )
    }

    return (
      <Link href={destination} className={commonClasses}> {/* Changed to= to href= */}
         <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{text}
      </Link>
    )
  }

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="w-full max-w-full pl-6 pr-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12 items-start">

         {/* COLUMN 1: Brand */}
<div className="pl-0 md:pl-1">
  <div className="relative h-0 mb-6">
    <img
      src="/otic-logo.png" // Move logo to /public/otic-logo.png
      alt="OTIC Survey"
      className="absolute -top-40 -left-20 md:-left-20 lg:left-4 h-[500px] w-auto object-contain"
    />
  </div>
  <div className="mt-[170px] ml-0 md:ml-0 lg:ml-20">
    <p className="text-sm text-gray-400 leading-relaxed mb-4">
      Mapping Your World with Accuracy & Precision.
    </p>
    <div className="space-y-2">
      <p className="text-sm text-white font-medium">Contact Us</p>
      <ul className="space-y-1 text-sm text-gray-400">
        <li>work@oticsurveys.com</li>
        <li>+2348100277870</li>
        <li>+2349048332623</li>
        <li>+2347081427221</li>
      </ul>
    </div>
  </div>
</div>

          {/* COLUMN 2: Quick Links */}
          <div className="pl-2 md:pl-1">
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Services", "Projects", "About", "Contact"].map((item) => (
                <li key={item}>
                   <Link
                      href={`/${item.toLowerCase() === 'home'? '' : item.toLowerCase()}`} // Changed to= to href=
                      className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>{item}
                   </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: Core Services */}
          <div className="pl-2 md:pl-1">
            <h4 className="font-bold text-white mb-6">Core Services</h4>
            <ul className="space-y-3">
              {servicesListOne.map((service) => (
                <li key={service.name}>
                  {renderLink(service, service.name)}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: Specialized */}
          <div className="pl-2 md:pl-1">
            <h4 className="font-bold text-white mb-6">Specialized</h4>
            <ul className="space-y-3">
              {servicesListTwo.map((service) => (
                <li key={service.name}>
                  {renderLink(service, service.name)}
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 5: Newsletter & Socials */}
          <div className="lg:col-span-1 pl-0 pr-4 md:pl-1">
            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe for the latest industry updates.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-8">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-background border border-input rounded-md px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  disabled={isLoading}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              >
                {isLoading? (
                  <>Subscribing <Loader2 className="w-3 h-3 animate-spin" /></>
                ) : (
                  <>Subscribe <Send className="w-3 h-3" /></>
                )}
              </button>
            </form>

            <Link
              href="/login" // Changed to= to href=
              className="w-full border border-gray-600 hover:border-blue-400 text-gray-400 hover:text-blue-400 bg-transparent font-medium py-2 px-4 rounded-md text-sm transition-all duration-200 flex items-center justify-center gap-2 mb-8"
            >
               Admin Login <LogIn className="w-3 h-3" />
            </Link>

            <div>
              <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Follow Us</h5>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/10 text-gray-400 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left pl-2 md:pl-1">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} OTIC Survey. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer