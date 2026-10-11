"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw, Wrench } from "lucide-react";
import { SvgPath } from "@/components/icons";
import type { StackBadge } from "@/data/skills";
import { cn } from "@/lib/utils";

type Engine = { reset: () => void; dispose: () => void; setRunning: (on: boolean) => void };

// Tech badges that tumble into a pile you can grab and throw. Matter.js is
// only downloaded once the section scrolls into view. Without JS, or with
// reduced motion, the badges simply sit in a tidy wrap.
export function StackPile({ badges, className }: { badges: StackBadge[]; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const engine = useRef<Engine | null>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) {
          engine.current?.setRunning(false);
          return;
        }
        if (engine.current) {
          engine.current.setRunning(true);
          return;
        }
        const sizes = els.current.map((b) => ({ w: b?.offsetWidth ?? 80, h: b?.offsetHeight ?? 32 }));
        const Matter = (await import("matter-js")).default;
        if (disposed) return;
        engine.current = startPhysics(Matter, el, els.current, sizes);
        setLive(true);
      },
      { rootMargin: "100px" },
    );
    io.observe(el);

    return () => {
      disposed = true;
      io.disconnect();
      engine.current?.dispose();
      engine.current = null;
    };
  }, []);

  return (
    <div className={cn("card relative overflow-hidden", className)}>
      <div className="flex items-center justify-between px-6 pt-5">
        <p className="flex items-center gap-2 font-medium">
          <Wrench className="size-4" strokeWidth={2} /> Stack
        </p>
        <button
          type="button"
          onClick={() => engine.current?.reset()}
          aria-label="Drop the badges again"
          className={cn(
            "grid size-8 place-items-center rounded-full bg-surface-strong transition-opacity hover:opacity-80",
            !live && "invisible",
          )}
        >
          <RotateCcw className="size-3.5" strokeWidth={2.2} />
        </button>
      </div>
      <div
        ref={box}
        className={cn("relative h-[340px] sm:h-[300px]", live ? "touch-pan-y select-none" : "flex flex-wrap content-end gap-2 p-6")}
      >
        {badges.map((b, i) => (
          <span
            key={b.name}
            ref={(node) => {
              els.current[i] = node;
            }}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-xl px-3 text-sm font-semibold whitespace-nowrap text-white shadow-md shadow-black/20",
              live && "absolute top-0 left-0 cursor-grab will-change-transform active:cursor-grabbing",
            )}
            style={{ background: b.hex, ...(live ? { transform: "translate(-999px,-999px)" } : null) }}
          >
            <span className="grid size-5 place-items-center rounded-md bg-white/95 p-[3px]" style={{ color: b.hex }}>
              <SvgPath path={b.path} className="size-full" />
            </span>
            {b.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function startPhysics(
  Matter: typeof import("matter-js"),
  container: HTMLDivElement,
  nodes: (HTMLSpanElement | null)[],
  sizes: { w: number; h: number }[],
): Engine {
  const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Body, Events } = Matter;
  const engine = Engine.create({ gravity: { y: 1.1 } });
  const runner = Runner.create();
  let width = container.clientWidth;
  let height = container.clientHeight;

  const wall = (x: number, y: number, w: number, h: number) => Bodies.rectangle(x, y, w, h, { isStatic: true });
  let walls = [wall(width / 2, height + 30, width * 3, 60), wall(-30, height / 2, 60, height * 4), wall(width + 30, height / 2, 60, height * 4)];

  const bodies = sizes.map(({ w, h }) =>
    Bodies.rectangle(0, 0, w, h, { chamfer: { radius: 10 }, restitution: 0.25, friction: 0.4, density: 0.002 }),
  );

  const drop = () => {
    bodies.forEach((b, i) => {
      Body.setPosition(b, { x: 60 + Math.random() * Math.max(1, width - 120), y: -60 - i * 38 });
      Body.setAngle(b, (Math.random() - 0.5) * 1.2);
      Body.setVelocity(b, { x: 0, y: 0 });
      Body.setAngularVelocity(b, 0);
    });
  };
  drop();
  Composite.add(engine.world, [...walls, ...bodies]);

  // Drag with a mouse only: on touch screens the pile must not trap page scrolling.
  let mouseConstraint: Matter.MouseConstraint | null = null;
  if (window.matchMedia("(pointer: fine)").matches) {
    const mouse = Mouse.create(container);
    const m = mouse as unknown as { mousewheel: EventListener };
    container.removeEventListener("wheel", m.mousewheel);
    container.removeEventListener("mousewheel", m.mousewheel);
    container.removeEventListener("DOMMouseScroll", m.mousewheel);
    mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    Composite.add(engine.world, mouseConstraint);
  }

  Events.on(engine, "afterUpdate", () => {
    bodies.forEach((b, i) => {
      const node = nodes[i];
      if (!node) return;
      node.style.transform = `translate(${b.position.x - sizes[i].w / 2}px, ${b.position.y - sizes[i].h / 2}px) rotate(${b.angle}rad)`;
    });
  });

  const onResize = () => {
    width = container.clientWidth;
    height = container.clientHeight;
    Composite.remove(engine.world, walls);
    walls = [wall(width / 2, height + 30, width * 3, 60), wall(-30, height / 2, 60, height * 4), wall(width + 30, height / 2, 60, height * 4)];
    Composite.add(engine.world, walls);
  };
  window.addEventListener("resize", onResize);

  let running = false;
  const setRunning = (on: boolean) => {
    if (on === running) return;
    running = on;
    if (on) Runner.run(runner, engine);
    else Runner.stop(runner);
  };
  setRunning(true);

  return {
    reset: drop,
    setRunning,
    dispose() {
      setRunning(false);
      window.removeEventListener("resize", onResize);
      Events.off(engine, "afterUpdate", undefined as never);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    },
  };
}
