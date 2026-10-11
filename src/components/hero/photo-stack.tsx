"use client";

import { useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { PhotoFrame } from "@/components/photo-frame";
import type { Photo } from "@/data/photos";
import { cn } from "@/lib/utils";

const VISIBLE = 4;
const tilt = [-2, 5, -6, 3];

// A deck of photos: swipe or tap the top card to send it to the back.
export function PhotoStack({ photos }: { photos: Photo[] }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [exitDir, setExitDir] = useState(1);

  const advance = (dir: number) => {
    setExitDir(dir);
    setOrder((o) => [...o.slice(1), o[0]]);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 450) advance(Math.sign(info.offset.x) || 1);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative aspect-[4/5] w-[min(78vw,300px)] sm:w-[320px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="Photos"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") advance(1);
          if (e.key === "ArrowLeft") advance(-1);
        }}
      >
        <AnimatePresence initial={false} custom={exitDir}>
          {order.slice(0, VISIBLE).map((idx, pos) => (
            <motion.div
              key={idx}
              custom={exitDir}
              className={cn(
                "absolute inset-0 rounded-[28px] border border-line bg-elevated p-2 shadow-2xl shadow-black/25",
                pos === 0 ? "cursor-grab touch-pan-y active:cursor-grabbing" : "pointer-events-none",
              )}
              style={{ zIndex: VISIBLE - pos }}
              initial={{ scale: 0.86, y: 30, opacity: 0, rotate: tilt[VISIBLE - 1] }}
              animate={{ scale: 1 - pos * 0.045, y: pos * -12, opacity: 1, rotate: tilt[pos], x: 0 }}
              exit={{ x: exitDir * 420, rotate: exitDir * 18, opacity: 0, transition: { duration: 0.35 } }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
              drag={pos === 0 ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={pos === 0 ? onDragEnd : undefined}
              onTap={pos === 0 ? () => advance(1) : undefined}
            >
              <PhotoFrame photo={photos[idx]} className="size-full rounded-[20px]" eager={pos === 0} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-1.5" aria-hidden>
        {photos.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 rounded-full bg-fg transition-all duration-300",
              order[0] === i ? "w-4 opacity-80" : "w-1.5 opacity-20",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-subtle">Tap or swipe for more</p>
    </div>
  );
}
