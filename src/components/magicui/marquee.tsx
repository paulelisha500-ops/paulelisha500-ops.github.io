// Adapted from Magic UI's Marquee (MIT, https://magicui.design/docs/components/marquee).

import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = ComponentPropsWithoutRef<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
};

export function Marquee({ className, reverse, pauseOnHover, children, repeat = 3, ...props }: MarqueeProps) {
  return (
    <div {...props} className={cn("group flex overflow-hidden [--duration:40s] [--gap:1rem] [gap:var(--gap)]", className)}>
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
