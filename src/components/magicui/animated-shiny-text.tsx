// Adapted from Magic UI's AnimatedShinyText (MIT, https://magicui.design/docs/components/animated-shiny-text).

import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 120,
}: {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}) {
  return (
    <span
      style={{ "--shiny-width": `${shimmerWidth}px` } as CSSProperties}
      className={cn(
        "text-muted",
        "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%]",
        "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",
        className,
      )}
    >
      {children}
    </span>
  );
}
