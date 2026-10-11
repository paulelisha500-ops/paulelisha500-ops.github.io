import { Map as MapIcon, Scale, ScanFace, Sparkles, Stethoscope, Store, Workflow, type LucideIcon } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export const projectIcons: Record<Project["icon"], LucideIcon> = {
  scan: ScanFace,
  stethoscope: Stethoscope,
  store: Store,
  map: MapIcon,
  scale: Scale,
  sparkles: Sparkles,
  workflow: Workflow,
};

// Abstract cover art: a neutral grid, one muted accent glow and the project's
// mark. Kept in code so covers stay crisp and weigh nothing.
export function ProjectCover({ project, className, large }: { project: Project; className?: string; large?: boolean }) {
  const Icon = projectIcons[project.icon];
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55] dark:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-35 blur-3xl dark:opacity-30"
        style={{ background: project.accent }}
      />
      <div className="absolute inset-0 grid place-items-center">
        <div
          className={cn(
            "glass grid place-items-center rounded-[22%] shadow-xl shadow-black/15",
            large ? "size-28" : "size-[72px]",
          )}
        >
          <Icon className={cn(large ? "size-12" : "size-8")} strokeWidth={1.5} aria-hidden />
        </div>
      </div>
    </div>
  );
}
