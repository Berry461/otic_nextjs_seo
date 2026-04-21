"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactGA from "react-ga4";

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize GA4
    ReactGA.initialize("G-2ZDPTVCZHC");
  }, []);

  useEffect(() => {
    if (pathname) {
      // Combine pathname and search params to get the full URL
      const url = searchParams.toString() 
        ? `${pathname}?${searchParams.toString()}` 
        : pathname;

      // Track page views on route change
      ReactGA.send({ hitType: "pageview", page: url });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function Analytics() {
  return (
    // Suspense is required by Next.js App Router when using useSearchParams
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}