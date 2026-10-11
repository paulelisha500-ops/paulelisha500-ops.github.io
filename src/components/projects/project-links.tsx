import { ExternalLink } from "lucide-react";
import { BrandIcon } from "@/components/icons";
import type { ProjectLink } from "@/data/projects";
import { cn } from "@/lib/utils";

export function ProjectLinks({ links, className }: { links: ProjectLink[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-strong"
        >
          {link.kind === "github" || link.kind === "huggingface" || link.kind === "docker" ? (
            <BrandIcon name={link.kind} className="size-3.5" />
          ) : (
            <ExternalLink className="size-3.5" strokeWidth={2} />
          )}
          {link.label}
        </a>
      ))}
    </div>
  );
}
