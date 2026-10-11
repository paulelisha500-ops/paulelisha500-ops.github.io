"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectLinks } from "./project-links";
import type { Project } from "@/data/projects";

// Detail sheet for a project: scales up from the card like an iOS sheet.
export function ProjectSheet({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-line bg-elevated p-7 shadow-2xl sm:p-9"
          >
            <BorderBeam size={120} duration={10} colorFrom={project.accent} colorTo="#ffffff" />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-5 grid size-9 place-items-center rounded-full bg-fg text-bg transition-transform hover:scale-105"
            >
              <X className="size-4" strokeWidth={2.6} />
            </button>

            <p className="text-sm font-medium text-muted">{project.category}</p>
            <h3 id="sheet-title" className="mt-1 pr-10 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-5 text-lg leading-snug font-medium text-pretty">{project.lead}</p>
            <p className="mt-3 leading-relaxed text-pretty text-muted">{project.description}</p>

            {project.metrics && (
              <dl className="mt-6 grid grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl bg-surface-strong px-4 py-3">
                    <dt className="text-xs text-muted">{m.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">
              {project.role}, {project.year} · {project.language}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <ProjectLinks links={project.links} />
              <Link
                href={`/projects/${project.slug}/`}
                className="inline-flex h-9 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                View full case study
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
