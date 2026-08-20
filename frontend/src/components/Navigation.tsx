'use client'
import { Menu, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
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
      <div className="w-full ml-[-20] pl-4 pr-8 md:pl-3 lg:pl-0 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center">
            <img
              src="/otic-logo.png"
              alt="OTIC Survey Tech Logo"
              className="h-[180px] w-auto object-contain lg:h-[400px] lg:ml-5"
            />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
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
          <button
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-[140px] left-0 right-0 bg-background border-b border-border py-4 px-4 shadow-lg">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
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
