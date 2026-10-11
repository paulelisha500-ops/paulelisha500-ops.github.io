"use client";

// Adapted from Magic UI's BlurFade (MIT, https://magicui.design/docs/components/blur-fade).

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

type BlurFadeProps = {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: "up" | "down" | "left" | "right";
  inView?: boolean;
  blur?: string;
  as?: "div" | "section" | "li" | "article";
};

export function BlurFade({
  children,
  className,
  duration = 0.5,
  delay = 0,
  offset = 10,
  direction = "up",
  inView = true,
  blur = "8px",
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const visible = !inView || seen;

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const from = direction === "right" || direction === "down" ? -offset : offset;
  const Component = motion[as] as typeof motion.div;

  // Same markup on server and client; reduced motion just snaps to the end state.
  return (
    <Component
      ref={ref}
      data-blurfade
      className={className}
      initial={{ opacity: 0, filter: `blur(${blur})`, [axis]: from }}
      animate={visible ? { opacity: 1, filter: "blur(0px)", [axis]: 0 } : undefined}
      transition={reduce ? { duration: 0 } : { delay: 0.04 + delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </Component>
  );
}
