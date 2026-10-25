import Link from "next/link";
import { ArrowRight, Download, Mail } from "lucide-react";
import { PhotoStack } from "@/components/hero/photo-stack";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ProjectCarousel } from "@/components/projects/project-carousel";
import { Container, SectionHeading } from "@/components/section-heading";
import { Connect } from "@/components/sections/connect";
import { ContributionGraph } from "@/components/sections/contribution-graph";
import { Pipeline } from "@/components/sections/pipeline";
import { ShippedRepos } from "@/components/sections/shipped-repos";
import { StackPile } from "@/components/sections/stack-pile";
import { heroPhotos } from "@/data/photos";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { stackBadges } from "@/data/skills";

const button =
  "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-[opacity,background-color] duration-200";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 pt-24 pb-10 lg:grid-cols-[1.15fr_1fr] lg:pt-16">
        <div>
          <p className="reveal text-lg font-medium" style={{ ["--d" as string]: "0ms" }}>
            Hey <span className="inline-block origin-[70%_70%] animate-[wave_2.4s_ease-in-out_1s_2]">👋</span>, I&rsquo;m{" "}
            {profile.name}
          </p>
          <h1
            className="reveal mt-4 bg-[linear-gradient(135deg,var(--fg)_45%,var(--coat-ink))] bg-clip-text text-5xl leading-[1.03] font-semibold tracking-[-0.045em] text-balance text-transparent sm:text-6xl lg:text-7xl"
            style={{ ["--d" as string]: "80ms" }}
          >
            AI/ML engineer building{" "}
            <span className="bg-[linear-gradient(90deg,var(--muted),var(--coat-ink))] bg-clip-text text-transparent">
              applied AI products
            </span>
          </h1>
          <p
            className="reveal mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted sm:text-xl"
            style={{ ["--d" as string]: "160ms" }}
          >
            {profile.tagline}
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: "240ms" }}>
            {profile.resumeUrl ? (
              <a href={profile.resumeUrl} download className={`${button} bg-fg text-bg hover:opacity-85`}>
                <Download className="size-4" strokeWidth={2} /> Download Resume
              </a>
            ) : (
              <a href={`mailto:${profile.email}`} className={`${button} bg-fg text-bg hover:opacity-85`}>
                <Mail className="size-4" strokeWidth={2} /> Get in touch
              </a>
            )}
            <Link href="/projects/" className={`${button} hover:bg-surface-strong`}>
              View my work <ArrowRight className="size-4" strokeWidth={2} />
            </Link>
          </div>
        </div>
        <div className="reveal flex justify-center lg:justify-end" style={{ ["--d" as string]: "200ms" }}>
          <div className="relative isolate">
            <div
              aria-hidden
              className="absolute top-1/2 left-1/2 -z-10 size-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
              style={{ background: "radial-gradient(closest-side, var(--coat-glow), transparent)" }}
            />
            <PhotoStack photos={heroPhotos} />
          </div>
        </div>
      </Container>

      {/* Intro */}
      <Container className="mt-10">
        <BlurFade className="card grid gap-6 p-7 sm:p-9 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="chip mb-5 gap-2 bg-surface-strong">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#34c759] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#34c759]" />
              </span>
              <AnimatedShinyText className="font-medium">{profile.availability}</AnimatedShinyText>
            </span>
            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted">
              <strong className="font-semibold text-fg">{profile.name}</strong> is an AI/ML engineer and B.Tech CSE
              (AI &amp; ML) graduate from <strong className="font-semibold text-fg">VELS University</strong>, working
              across LLMs, RAG, NLP and computer vision, and shipping models as apps on Hugging Face, GitHub Pages and
              Docker Hub.
            </p>
          </div>
          <Link
            href="/about/"
            className="inline-flex h-11 items-center gap-1.5 self-start rounded-full px-4 text-sm font-medium transition-colors hover:bg-surface-strong md:self-center"
          >
            More about me <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </BlurFade>

        <BlurFade className="mt-5">
          <ContributionGraph />
        </BlurFade>
      </Container>

      {/* Projects */}
      <Container className="mt-32">
        <BlurFade>
          <SectionHeading
            title="My projects"
            subtitle="Applied AI products in healthcare, retail, cities, law and MLOps. Each one shipped end to end, with code on GitHub and a live demo."
          />
        </BlurFade>
        <BlurFade className="mt-10" delay={0.08}>
          <ProjectCarousel projects={projects} />
        </BlurFade>
        <div className="mt-6 flex justify-center">
          <Link
            href="/projects/"
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium transition-colors hover:bg-surface-strong"
          >
            View all projects <ArrowRight className="size-4" strokeWidth={2} />
          </Link>
        </div>
      </Container>

      {/* Pipeline */}
      <Container className="mt-32">
        <BlurFade>
          <SectionHeading
            title="One pipeline, four platforms"
            subtitle="Kaggle, GitHub, Hugging Face and Docker Hub, wired together: data in, model trained and tested, model and image published on every push."
          />
        </BlurFade>
        <BlurFade className="mt-10" delay={0.08}>
          <Pipeline />
        </BlurFade>
      </Container>

      {/* Shipped */}
      <Container className="mt-32">
        <BlurFade>
          <SectionHeading
            title="Recently shipped"
            subtitle="Merged pull requests across my repositories: features, fixes and deployments."
            action={
              <Link
                href="/shipped/"
                className="inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors hover:bg-surface-strong"
              >
                Full changelog <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            }
          />
        </BlurFade>
        <BlurFade className="mt-10" delay={0.08}>
          <ShippedRepos />
        </BlurFade>
      </Container>

      {/* Stack */}
      <Container className="mt-32">
        <BlurFade>
          <SectionHeading title="Tools I reach for" subtitle="Grab a badge and throw it around." />
        </BlurFade>
        <BlurFade className="mt-10" delay={0.08}>
          <StackPile badges={stackBadges} />
        </BlurFade>
      </Container>

      <Connect />
    </>
  );
}
