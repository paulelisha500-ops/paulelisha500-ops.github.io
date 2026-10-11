"use client";

// Adapted from Magic UI's MagicCard (MIT, https://magicui.design/docs/components/magic-card).
// The spotlight follows the pointer through CSS variables, so moving the mouse
// never re-renders React.

import { useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MagicCardProps = ComponentPropsWithoutRef<"div"> & { gradientSize?: number };

export function MagicCard({ children, className, gradientSize = 260, ...props }: MagicCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={() => ref.current?.style.setProperty("--mx", "-999px")}
      className={cn("group/magic card relative overflow-hidden", className)}
      style={{ ["--mx" as string]: "-999px", ["--my" as string]: "-999px", ["--gs" as string]: `${gradientSize}px` }}
      {...props}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/magic:opacity-100"
        style={{ background: "radial-gradient(var(--gs) circle at var(--mx) var(--my), var(--spot), transparent 70%)" }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
