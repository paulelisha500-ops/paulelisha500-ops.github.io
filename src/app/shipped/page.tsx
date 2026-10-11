import type { Metadata } from "next";
import { GitMerge } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Container, SectionHeading } from "@/components/section-heading";
import { Connect } from "@/components/sections/connect";
import { ContributionGraph } from "@/components/sections/contribution-graph";
import { Pipeline } from "@/components/sections/pipeline";
import { dockerPulls, live, mergedByRepo, type MergedPR } from "@/lib/live";
import { formatDay, formatMonth } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shipped",
  description: "Every merged pull request across Elisha Paul's repositories, plus the Kaggle → GitHub → Hugging Face → Docker pipeline.",
};

export default function ShippedPage() {
  const months = new Map<string, MergedPR[]>();
  for (const pr of live.mergedPullRequests) {
    const key = formatMonth(pr.mergedAt);
    months.set(key, [...(months.get(key) ?? []), pr]);
  }

  const stats = [
    { label: "Merged pull requests", value: live.mergedPullRequests.length },
    { label: "Repositories", value: mergedByRepo().length },
    { label: "Contributions this year", value: live.contributions.total },
    { label: "Docker image pulls", value: dockerPulls() },
  ];

  return (
    <>
      <Container className="pt-28">
        <BlurFade>
          <SectionHeading
            as="h1"
            title="Shipped"
            subtitle="A changelog of merged pull requests across my projects, refreshed from GitHub on every deploy."
          />
        </BlurFade>

        <BlurFade className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4" delay={0.06}>
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <NumberTicker value={s.value} className="text-4xl font-semibold" />
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </BlurFade>

        <BlurFade className="mt-5">
          <ContributionGraph />
        </BlurFade>

        <BlurFade className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">The pipeline</h2>
          <p className="mt-2 text-muted">How Kaggle, GitHub, Hugging Face and Docker Hub connect in ml-pipeline.</p>
          <Pipeline className="mt-6" />
        </BlurFade>

        <div className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight">Changelog</h2>
          {[...months.entries()].map(([month, prs]) => (
            <BlurFade key={month} className="mt-8">
              <h3 className="eyebrow">{month}</h3>
              <ul className="card mt-3 divide-y divide-line">
                {prs.map((pr) => (
                  <li key={pr.url}>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-surface sm:flex-row sm:items-start sm:gap-4"
                    >
                      <span className="flex flex-1 items-start gap-3">
                        <GitMerge className="mt-0.5 size-4 shrink-0 text-[#8957e5]" strokeWidth={2.2} aria-hidden />
                        <span className="text-sm leading-snug">
                          {pr.title}
                          <span className="mt-0.5 block text-xs text-muted">
                            {pr.repo.split("/")[1]} #{pr.number}
                          </span>
                        </span>
                      </span>
                      <span className="pl-7 text-xs whitespace-nowrap text-muted sm:pl-0">{formatDay(pr.mergedAt)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </BlurFade>
          ))}
          <p className="mt-6 text-xs text-subtle">Last refreshed {formatDay(live.fetchedAt)}.</p>
        </div>
      </Container>
      <Connect />
    </>
  );
}
