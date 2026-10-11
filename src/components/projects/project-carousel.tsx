"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectCard } from "./project-card";
import { ProjectSheet } from "./project-sheet";
import type { Project } from "@/data/projects";

// Horizontal, scroll-snapped shelf of project cards (native scrolling, so it's
// smooth on touch and trackpads), with arrow buttons for mouse users.
export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | null>(null);
  const track = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(null), []);

  const scroll = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 300) + 20), behavior: "smooth" });
  };

  return (
    <>
      <div
        ref={track}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8"
      >
        {projects.map((p) => (
          <div key={p.slug} data-card className="w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[300px]">
            <ProjectCard project={p} onOpen={() => setOpen(p)} />
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-end gap-2">
        {[
          { dir: -1, Icon: ArrowLeft, label: "Previous projects" },
          { dir: 1, Icon: ArrowRight, label: "Next projects" },
        ].map(({ dir, Icon, label }) => (
          <button
            key={dir}
            type="button"
            aria-label={label}
            onClick={() => scroll(dir)}
            className="grid size-10 place-items-center rounded-full border border-line bg-surface transition-colors hover:bg-surface-strong"
          >
            <Icon className="size-4" strokeWidth={2} />
          </button>
        ))}
      </div>
      <ProjectSheet project={open} onClose={close} />
    </>
  );
}
