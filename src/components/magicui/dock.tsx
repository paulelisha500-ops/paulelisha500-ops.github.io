"use client";

// Adapted from Magic UI's Dock (MIT, https://magicui.design/docs/components/dock).
// Mouse position is shared through context instead of cloneElement, so icons
// can be wrapped in links and tooltips freely.

import { createContext, useContext, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type DockConfig = { mouseX: MotionValue<number>; size: number; magnification: number; distance: number };

const DockContext = createContext<DockConfig | null>(null);

type DockProps = {
  children: ReactNode;
  className?: string;
  iconSize?: number;
  iconMagnification?: number;
  iconDistance?: number;
};

export function Dock({ children, className, iconSize = 40, iconMagnification = 56, iconDistance = 120 }: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, size: iconSize, magnification: iconMagnification, distance: iconDistance }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn("glass flex h-[58px] w-max items-end gap-1.5 rounded-[22px] px-2 pb-[8px] shadow-lg shadow-black/10", className)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

type DockIconProps = ComponentPropsWithoutRef<typeof motion.div>;

export function DockIcon({ className, children, ...props }: DockIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(DockContext);
  const fallback = useMotionValue(Infinity);
  const size = ctx?.size ?? 40;

  const distance = useTransform(ctx?.mouseX ?? fallback, (x) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - bounds.x - bounds.width / 2;
  });
  const range = ctx?.distance ?? 120;
  const target = useTransform(distance, [-range, 0, range], [size, ctx?.magnification ?? 56, size]);
  const scaled = useSpring(target, { mass: 0.1, stiffness: 160, damping: 13 });

  return (
    <motion.div
      ref={ref}
      style={{ width: scaled, height: scaled }}
      className={cn("relative flex aspect-square shrink-0 items-center justify-center rounded-full", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function DockSeparator() {
  return <div aria-hidden className="mx-0.5 mb-1.5 h-8 w-px self-end bg-line-strong" />;
}
