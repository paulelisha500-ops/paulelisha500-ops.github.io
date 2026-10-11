import { GitMerge } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import { getProject } from "@/data/projects";
import { live, mergedByRepo } from "@/lib/live";
import { cn, formatDay } from "@/lib/utils";

// One card per repository with its merged pull requests, newest first.
export function ShippedRepos({ limit = 2, className }: { limit?: number; className?: string }) {
  const groups = mergedByRepo();

  return (
    <div className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {groups.map(([repo, prs]) => {
        const name = repo.split("/")[1];
        const project = getProject(name);
        const language = live.repos[name]?.language ?? project?.language ?? "";
        return (
          <MagicCard key={repo} className="rounded-[28px]">
            <a
              href={`https://github.com/${repo}/pulls?q=is%3Apr+is%3Amerged`}
              target="_blank"
              rel="noreferrer"
              className="flex h-full flex-col p-6"
            >
              <p className="text-[13px] font-medium text-muted">{language}</p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.02em]">{repo}</h3>
              <ul className="mt-4 flex-1 space-y-2.5">
                {prs.slice(0, limit).map((pr) => (
                  <li key={pr.number} className="flex gap-2 text-sm leading-snug">
                    <GitMerge className="mt-0.5 size-3.5 shrink-0 text-[#8957e5]" strokeWidth={2.2} aria-hidden />
                    <span className="line-clamp-2">
                      {pr.title} <span className="text-subtle">#{pr.number}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-muted">
                {prs.length} merged PR{prs.length === 1 ? "" : "s"} · last {formatDay(prs[0].mergedAt)}
              </p>
            </a>
          </MagicCard>
        );
      })}
    </div>
  );
}
