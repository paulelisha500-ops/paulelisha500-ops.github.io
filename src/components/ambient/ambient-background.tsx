"use client";

import { useEffect, useRef } from "react";
import { useSettings } from "@/lib/settings";

// The neutral spotlight is plain CSS and paints immediately. The Three.js
// colour layer is loaded only once the browser is idle, so it never competes
// with the first render, and is torn down when the viewer switches it off.
export function AmbientBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { ambient } = useSettings();

  useEffect(() => {
    if (!ambient || !ref.current) return;
    let handle: { dispose: () => void } | undefined;
    let cancelled = false;
    const el = ref.current;

    const load = () =>
      import("./ambient-scene")
        .then(({ createAmbient }) => {
          if (cancelled) return;
          handle = createAmbient(el);
          requestAnimationFrame(() => el.classList.add("opacity-100"));
        })
        .catch(() => {
          // No WebGL: the CSS spotlight alone still looks right.
        });

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const id = idle(load, { timeout: 2000 } as IdleRequestOptions);

    return () => {
      cancelled = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
      el.classList.remove("opacity-100");
      handle?.dispose();
    };
  }, [ambient]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[30vh] -left-[20vw] h-[90vh] w-[90vw] rounded-full opacity-90"
        style={{ background: "radial-gradient(closest-side, var(--spot), transparent)" }}
      />
      <div ref={ref} className="absolute inset-0 opacity-0 transition-opacity duration-[1500ms]" />
    </div>
  );
}
