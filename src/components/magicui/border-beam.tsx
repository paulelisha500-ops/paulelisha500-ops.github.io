// Adapted from Magic UI's BorderBeam (MIT, https://magicui.design/docs/components/border-beam).
// Pure CSS (offset-path) so it costs no JavaScript per frame.

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type BorderBeamProps = {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  reverse?: boolean;
};

export function BorderBeam({
  className,
  size = 80,
  duration = 8,
  delay = 0,
  colorFrom = "#8e8e93",
  colorTo = "#f5f5f7",
  borderWidth = 1,
  reverse = false,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{ borderWidth, borderStyle: "solid" }}
    >
      <div
        className={cn(
          "absolute aspect-square animate-border-beam bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent [animation-delay:var(--delay)]",
          reverse && "[animation-direction:reverse]",
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            "--duration": duration,
            "--delay": `-${delay}s`,
          } as CSSProperties
        }
      />
    </div>
  );
}
