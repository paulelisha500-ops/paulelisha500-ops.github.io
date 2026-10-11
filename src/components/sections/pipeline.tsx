import { siDocker, siGithubactions, siHuggingface, siKaggle } from "simple-icons";
import { ChevronRight } from "lucide-react";
import { SvgPath } from "@/components/icons";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { dockerPulls, live } from "@/lib/live";
import { cn } from "@/lib/utils";

// The four accounts, wired together the way ml-pipeline actually runs them.
export function Pipeline({ className }: { className?: string }) {
  const hf = live.huggingface;
  const steps = [
    {
      name: "Kaggle",
      role: "Data",
      icon: siKaggle,
      href: "https://www.kaggle.com/elishapaul",
      stat: live.kaggle.tier ? `${live.kaggle.tier[0]}${live.kaggle.tier.slice(1).toLowerCase()} tier` : "elishapaul",
      detail: "Dataset pulled by the Kaggle API",
    },
    {
      name: "GitHub Actions",
      role: "Train & test",
      icon: siGithubactions,
      href: "https://github.com/paulelisha500-ops/ml-pipeline/actions",
      stat: `${live.mergedPullRequests.length} merged PRs`,
      detail: "Every push to main runs the chain",
    },
    {
      name: "Hugging Face",
      role: "Models & apps",
      icon: siHuggingface,
      href: "https://huggingface.co/Elisha622",
      stat: `${hf.spaces.length} Spaces · ${hf.models.length} models`,
      detail: "Model card and live demos",
    },
    {
      name: "Docker Hub",
      role: "Image",
      icon: siDocker,
      href: "https://hub.docker.com/r/elisha622/ml-pipeline",
      pulls: dockerPulls(),
      detail: "elisha622/ml-pipeline:latest",
    },
  ];

  return (
    <div className={cn("grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]", className)}>
      {steps.map((s, i) => (
        <div key={s.name} className="contents">
          {i > 0 && (
            <div aria-hidden className="hidden items-center justify-center text-subtle md:flex">
              <ChevronRight className="size-5" />
            </div>
          )}
          <a
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="card group flex flex-col p-5 transition-colors hover:bg-surface-strong"
          >
            <span className="flex items-center justify-between">
              <span
                className="grid size-11 place-items-center rounded-2xl"
                style={{ background: `#${s.icon.hex}1f`, color: `#${s.icon.hex === "FFD21E" ? "E8A90C" : s.icon.hex}` }}
              >
                <SvgPath path={s.icon.path} className="size-5" />
              </span>
              <span className="text-xs text-subtle">0{i + 1}</span>
            </span>
            <span className="mt-4 text-xs font-medium tracking-wide text-muted uppercase">{s.role}</span>
            <span className="text-lg font-semibold tracking-tight">{s.name}</span>
            <span className="mt-2 text-sm font-medium">
              {"pulls" in s ? (
                <>
                  <NumberTicker value={s.pulls ?? 0} /> pulls
                </>
              ) : (
                s.stat
              )}
            </span>
            <span className="mt-1 text-xs text-muted">{s.detail}</span>
          </a>
        </div>
      ))}
    </div>
  );
}
