"use client";

// Adapted from Magic UI's NumberTicker (MIT, https://magicui.design/docs/components/number-ticker).
// The final value is server-rendered, so the number is correct without JS.

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type NumberTickerProps = { value: number; decimalPlaces?: number; className?: string };

export function NumberTicker({ value, decimalPlaces = 0, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: "0px" });
  const format = (n: number) =>
    new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(Number(n.toFixed(decimalPlaces)));

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (ref.current) ref.current.textContent = format(0);
    motionValue.set(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, motionValue]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (ref.current) ref.current.textContent = format(latest);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spring],
  );

  return (
    <span ref={ref} className={cn("inline-block tabular-nums tracking-tight", className)}>
      {format(value)}
    </span>
  );
}
