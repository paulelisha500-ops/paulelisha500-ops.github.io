import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { ProjectCover } from "./project-cover";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const footer = (p: Project) => `${p.role}, ${p.year} · ${p.language}`;

type ProjectCardProps = { project: Project; className?: string } & (
  | { onOpen: () => void; href?: never }
  | { href: string; onOpen?: never }
);

// Tall card in the style of Apple's editorial tiles. Opens the detail sheet on
// the home page, or links straight to the case study elsewhere.
export function ProjectCard({ project, className, onOpen, href }: ProjectCardProps) {
  const body = (
    <>
      <ProjectCover project={project} className="absolute inset-0" />
      <div className="relative flex h-full flex-col justify-between p-6">
        <div>
          <p className="text-[13px] font-medium text-muted">{project.category}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{project.title}</h3>
          <p className="mt-2 max-w-[24ch] text-sm leading-snug text-muted">{project.hook}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="text-xs text-muted">{footer(project)}</p>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fg text-bg shadow-lg transition-transform duration-300 group-hover/magic:scale-110">
            {href ? <ArrowUpRight className="size-4" strokeWidth={2.4} /> : <Plus className="size-4" strokeWidth={2.6} />}
          </span>
        </div>
      </div>
    </>
  );

  const shell = cn("relative block aspect-[4/5] h-full w-full text-left", "focus-visible:outline-2 focus-visible:outline-accent");

  return (
    <MagicCard className={cn("rounded-[28px]", className)}>
      {href ? (
        <Link href={href} className={shell} aria-label={`${project.title}: ${project.hook}`}>
          {body}
        </Link>
      ) : (
        <button type="button" onClick={onOpen} className={shell} aria-label={`Open ${project.title} details`}>
          {body}
        </button>
      )}
    </MagicCard>
  );
}
