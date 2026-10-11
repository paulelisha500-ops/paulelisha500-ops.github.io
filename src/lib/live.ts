import raw from "@/data/live.json";

// Snapshot written by scripts/fetch-live-data.mjs before every build.

export type ContributionDay = [date: string, count: number];
export type MergedPR = { repo: string; number: number; title: string; url: string; mergedAt: string };

type Live = {
  fetchedAt: string;
  contributions: { total: number; weeks: ContributionDay[][] };
  mergedPullRequests: MergedPR[];
  repos: Record<string, { stars: number; language: string | null; pushedAt: string }>;
  huggingface: {
    spaces: { id: string; likes: number; downloads: number; updatedAt: string | null }[];
    models: { id: string; likes: number; downloads: number; updatedAt: string | null }[];
  };
  docker: { name: string; pulls: number; updatedAt: string }[];
  kaggle: { tier: string | null; joinedAt: string | null };
};

export const live = raw as unknown as Live;

export const mergedByRepo = () => {
  const groups = new Map<string, MergedPR[]>();
  for (const pr of live.mergedPullRequests) {
    const list = groups.get(pr.repo) ?? [];
    list.push(pr);
    groups.set(pr.repo, list);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
};

export const dockerPulls = () => live.docker.reduce((n, r) => n + r.pulls, 0);
