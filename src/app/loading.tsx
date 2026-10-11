"use client";

import { useState } from "react";
import { SplashLogo } from "@/components/splash/logos";

// Route-level loading state for client navigations. Reuses whichever logo the
// splash screen picked for this visit, so the brand mark stays consistent.
export default function Loading() {
  const [index] = useState(() =>
    typeof document === "undefined" ? 0 : Number(document.getElementById("splash")?.getAttribute("data-logo") ?? 0),
  );

  return (
    <div className="grid min-h-[70vh] place-items-center text-muted" role="status" aria-label="Loading">
      <div className="animate-pulse">
        <SplashLogo index={index} size={44} />
      </div>
    </div>
  );
}
