'use client'

import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image" // Better for Next.js
import logo from "@/assets/otic-logo.png" // Move logo to /public/otic-logo.png for static import

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname() // Replaces useLocation()

  const navItems = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "SERVICES", href: "/services" },
    { name: "PROJECTS", href: "/projects" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border h-[140px] flex items-center">
      <div className="w-full pl-0 pr-8 h-full">
        <div className="flex items-center justify-between h-full">

          {/* LOGO SECTION */}
          <Link href="/" className="flex items-center">
            {/* Use /otic-logo.png if you moved it to /public */}
            <img
              src="/otic-logo.png"
              alt="OTIC Survey Tech Logo"
              className="h-[400px] w-auto object-contain -ml-14 md:-ml-12 lg:ml-5"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href} // 'to' becomes 'href'
                  className={`text-sm font-medium transition-colors ${
                    isActive
                    ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden absolute top-[140px] left-0 right-0 bg-background border-b border-border py-4 px-4 shadow-lg">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href} // 'to' becomes 'href'
                  className={`block py-3 text-sm font-medium border-b border-border/50 last:border-0 ${
                    isActive
                    ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation