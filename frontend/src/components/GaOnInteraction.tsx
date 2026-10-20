"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { onHuman } from "@/lib/humanGate";

export default function GaOnInteraction({ gaId }: { gaId: string }) {
  const [active, setActive] = useState(false);

  useEffect(() => onHuman(() => setActive(true)), []);

  return active ? <GoogleAnalytics gaId={gaId} /> : null;
}