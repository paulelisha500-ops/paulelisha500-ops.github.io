// Pulls public profile data at build time and writes src/data/live.json.
// Each source is fetched independently: if one fails, its previous value is
// kept, so a flaky API never breaks the build or blanks a section.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../src/data/live.json", import.meta.url));

const GITHUB = "paulelisha500-ops";
const HUGGINGFACE = "Elisha622";
const DOCKER = "elisha622";
const KAGGLE = "elishapaul";

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "";
const ghHeaders = {
  accept: "application/vnd.github+json",
  "user-agent": "portfolio-build",
  ...(token ? { authorization: `Bearer ${token}` } : {}),
};

async function json(url, init = {}) {
  const res = await fetch(url, { ...init, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.json();
}

async function contributions() {
  if (!token) throw new Error("no GITHUB_TOKEN; keeping previous calendar");
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}`;
  const data = await json("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...ghHeaders, "content-type": "application/json" },
    body: JSON.stringify({ query, variables: { login: GITHUB } }),
  });
  const cal = data.data.user.contributionsCollection.contributionCalendar;
  return {
    total: cal.totalContributions,
    weeks: cal.weeks.map((w) => w.contributionDays.map((d) => [d.date, d.contributionCount])),
  };
}

async function mergedPullRequests() {
  const q = encodeURIComponent(`author:${GITHUB} is:pr is:merged`);
  const data = await json(
    `https://api.github.com/search/issues?q=${q}&sort=updated&order=desc&per_page=100`,
    { headers: ghHeaders },
  );
  return data.items
    .map((pr) => ({
      repo: pr.repository_url.split("/repos/")[1],
      number: pr.number,
      title: pr.title,
      url: pr.html_url,
      mergedAt: pr.pull_request?.merged_at ?? pr.closed_at,
    }))
    .sort((a, b) => b.mergedAt.localeCompare(a.mergedAt));
}

async function repos() {
  const data = await json(`https://api.github.com/users/${GITHUB}/repos?per_page=100&sort=updated`, {
    headers: ghHeaders,
  });
  return Object.fromEntries(
    data
      .filter((r) => !r.fork)
      .map((r) => [r.name, { stars: r.stargazers_count, language: r.language, pushedAt: r.pushed_at }]),
  );
}

async function huggingface() {
  const [spaces, models] = await Promise.all([
    json(`https://huggingface.co/api/spaces?author=${HUGGINGFACE}&limit=100&expand[]=lastModified&expand[]=likes`),
    json(
      `https://huggingface.co/api/models?author=${HUGGINGFACE}&limit=100&expand[]=lastModified&expand[]=likes&expand[]=downloads`,
    ),
  ]);
  const pick = (r) => ({ id: r.id, likes: r.likes ?? 0, downloads: r.downloads ?? 0, updatedAt: r.lastModified ?? null });
  return { spaces: spaces.map(pick), models: models.map(pick) };
}

async function docker() {
  const data = await json(`https://hub.docker.com/v2/repositories/${DOCKER}/?page_size=100`);
  return data.results.map((r) => ({ name: `${r.namespace}/${r.name}`, pulls: r.pull_count, updatedAt: r.last_updated }));
}

async function kaggle() {
  const data = await json("https://www.kaggle.com/api/i/users.ProfileService/GetProfile", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ userName: KAGGLE }),
  });
  return { tier: data.performanceTier ?? null, joinedAt: data.userJoinDate ?? null };
}

let previous = {};
try {
  previous = JSON.parse(await readFile(OUT, "utf8"));
} catch {
  // First run: nothing to fall back on.
}

const sources = { contributions, mergedPullRequests, repos, huggingface, docker, kaggle };
const next = { ...previous };
const results = await Promise.allSettled(Object.values(sources).map((fn) => fn()));

Object.keys(sources).forEach((key, i) => {
  const r = results[i];
  if (r.status === "fulfilled") {
    next[key] = r.value;
    console.log(`  ✓ ${key}`);
  } else {
    console.warn(`  ! ${key}: ${r.reason?.message ?? r.reason} (kept previous value)`);
  }
});

next.fetchedAt = new Date().toISOString();
await writeFile(OUT, JSON.stringify(next, null, 2) + "\n");
console.log(`live data → ${OUT}`);
