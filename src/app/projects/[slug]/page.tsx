import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, GitMerge } from "lucide-react";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ProjectCover } from "@/components/projects/project-cover";
import { ProjectLinks } from "@/components/projects/project-links";
import { Container } from "@/components/section-heading";
import { getProject, projects } from "@/data/projects";
import { live } from "@/lib/live";
import { formatDay } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.lead } : {};
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const prs = live.mergedPullRequests.filter((pr) => pr.repo === `paulelisha500-ops/${project.repo}`);

  return (
    <Container className="max-w-4xl pt-24">
      <Link
        href="/projects/"
        className="inline-flex h-9 items-center gap-1.5 rounded-full pr-4 pl-3 text-sm font-medium text-muted transition-colors hover:bg-surface-strong hover:text-fg"
      >
        <ArrowLeft className="size-4" strokeWidth={2} /> All projects
      </Link>

      <BlurFade className="mt-8">
        <p className="text-sm font-medium text-muted">{project.category}</p>
        <h1 className="mt-2 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">{project.title}</h1>
        <p className="mt-6 text-xl leading-snug font-medium text-pretty sm:text-2xl">{project.lead}</p>
        <ProjectLinks links={project.links} className="mt-8" />
      </BlurFade>

      <BlurFade delay={0.08} className="card relative mt-12 overflow-hidden">
        <ProjectCover project={project} className="aspect-[16/9]" large />
        <BorderBeam size={160} duration={12} colorFrom={project.accent} colorTo="#ffffff" />
      </BlurFade>

      {project.metrics && (
        <BlurFade className="mt-5 grid grid-cols-3 gap-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="card px-5 py-4">
              <p className="text-xs text-muted">{m.label}</p>
              <p className="text-2xl font-semibold tracking-tight">{m.value}</p>
            </div>
          ))}
        </BlurFade>
      )}

      <div className="mt-16 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <BlurFade>
          <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
          <p className="mt-4 text-lg leading-relaxed text-pretty text-muted">{project.description}</p>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight">Highlights</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 leading-relaxed">
                <Check className="mt-1 size-4 shrink-0 text-[#34c759]" strokeWidth={2.6} aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </BlurFade>

        <BlurFade delay={0.08} className="space-y-8">
          <div>
            <h2 className="eyebrow">Stack</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="eyebrow">Role</dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">Year</dt>
              <dd className="mt-1">{project.year}</dd>
            </div>
            <div>
              <dt className="eyebrow">Language</dt>
              <dd className="mt-1">{project.language}</dd>
            </div>
            <div>
              <dt className="eyebrow">Stars</dt>
              <dd className="mt-1">{live.repos[project.repo]?.stars ?? 0}</dd>
            </div>
          </dl>
        </BlurFade>
      </div>

      {prs.length > 0 && (
        <BlurFade className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Merged pull requests</h2>
          <ul className="card mt-5 divide-y divide-line">
            {prs.map((pr) => (
              <li key={pr.number}>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-surface"
                >
                  <GitMerge className="mt-0.5 size-4 shrink-0 text-[#8957e5]" strokeWidth={2.2} aria-hidden />
                  <span className="flex-1 text-sm leading-snug">
                    {pr.title} <span className="text-subtle">#{pr.number}</span>
                  </span>
                  <span className="text-xs whitespace-nowrap text-muted">{formatDay(pr.mergedAt)}</span>
                </a>
              </li>
            ))}
          </ul>
        </BlurFade>
      )}

      <Link
        href={`/projects/${next.slug}/`}
        className="card group mt-20 flex items-center justify-between p-6 transition-colors hover:bg-surface-strong"
      >
        <span>
          <span className="eyebrow">Next project</span>
          <span className="mt-1 block text-2xl font-semibold tracking-tight">{next.title}</span>
        </span>
        <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" strokeWidth={2} />
      </Link>
    </Container>
  );
}
