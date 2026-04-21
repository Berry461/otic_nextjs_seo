'use client';

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NotFound() {
  // Next.js uses usePathname instead of react-router's useLocation
  const pathname = usePathname();

  useEffect(() => {
    // Only log if we actually have a pathname (avoids hydration mismatch warnings)
    if (pathname) {
      console.error("404 Error: User attempted to access non-existent route:", pathname);
    }
  }, [pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-extrabold text-gray-900">404</h1>
        <p className="mb-6 text-xl text-gray-600">Oops! Page not found</p>
        
        {/* Next.js optimized Link component instead of standard <a> tag */}
        <Link 
          href="/" 
          className="text-blue-600 font-medium hover:text-blue-800 transition-colors underline underline-offset-4"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}