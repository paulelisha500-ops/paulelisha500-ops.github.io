import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Brain,
  Briefcase,
  Cloud,
  Code2,
  Globe,
  GraduationCap,
  Languages,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { BrandIcon } from "@/components/icons";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Marquee } from "@/components/magicui/marquee";
import { PhotoFrame } from "@/components/photo-frame";
import { Container } from "@/components/section-heading";
import { Connect } from "@/components/sections/connect";
import { StackPile } from "@/components/sections/stack-pile";
import { aboutPhotos } from "@/data/photos";
import { profile, socials } from "@/data/profile";
import { skillGroups, stackBadges, type SkillGroup } from "@/data/skills";
import { getCertificates } from "@/lib/certificates";
import { live } from "@/lib/live";
import { formatMonth, splitBold } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: profile.summary,
};

const groupIcons: Record<SkillGroup["icon"], LucideIcon> = {
  code: Code2,
  brain: Brain,
  sparkles: Sparkles,
  cloud: Cloud,
  globe: Globe,
};

const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1", "-rotate-3", "rotate-2"];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <BlurFade className="mt-14">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </BlurFade>
  );
}

function Row({ icon: Icon, title, meta, children }: { icon: LucideIcon; title: string; meta: string; children?: React.ReactNode }) {
  return (
    <div className="card flex gap-4 p-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface-strong">
        <Icon className="size-5" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="font-semibold tracking-tight">{title}</p>
        <p className="text-sm text-muted">{meta}</p>
        {children}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const certificates = getCertificates();
  const handles: Record<string, string> = {
    kaggle: live.kaggle.tier ? `${live.kaggle.tier[0]}${live.kaggle.tier.slice(1).toLowerCase()} tier` : "",
    huggingface: `${live.huggingface.spaces.length} Spaces · ${live.huggingface.models.length} models`,
    docker: `${live.docker.reduce((n, r) => n + r.pulls, 0)} image pulls`,
    github: `${live.contributions.total} contributions this year`,
  };

  return (
    <>
      {/* Photo strip */}
      <div className="relative pt-20">
        <Marquee pauseOnHover className="py-6 [--duration:60s] [--gap:1.25rem]">
          {aboutPhotos.map((photo, i) => (
            <div
              key={i}
              className={`aspect-[4/5] w-36 rounded-[22px] border border-line bg-elevated p-1.5 shadow-xl shadow-black/20 sm:w-44 ${tilts[i % tilts.length]}`}
            >
              <PhotoFrame photo={photo} className="size-full rounded-[17px]" eager={i < 4} />
            </div>
          ))}
        </Marquee>
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg sm:w-32" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg sm:w-32" />
      </div>

      <Container className="max-w-3xl">
        <BlurFade className="card mt-10 p-7 sm:p-10">
          <h1 className="text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Hello! I&rsquo;m <span className="underline decoration-line-strong decoration-2 underline-offset-8">{profile.name}</span>.
          </h1>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-pretty text-muted">
            {profile.bio.map((para, i) => (
              <p key={i}>
                {splitBold(para).map((seg, j) =>
                  seg.bold ? (
                    <strong key={j} className="font-semibold text-fg">
                      {seg.text}
                    </strong>
                  ) : (
                    seg.text
                  ),
                )}
              </p>
            ))}
          </div>
        </BlurFade>

        <Block title="Experience">
          {profile.experience.map((job) => (
            <Row key={job.company} icon={Briefcase} title={job.company} meta={`${job.role} · ${job.place} · ${job.period}`}>
              <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-muted marker:text-subtle">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </Row>
          ))}
        </Block>

        <Block title="Skills">
          <div className="card divide-y divide-line">
            {skillGroups.map((g) => {
              const Icon = groupIcons[g.icon];
              return (
                <div key={g.title} className="p-5">
                  <p className="eyebrow flex items-center gap-2">
                    <Icon className="size-3.5" strokeWidth={2} /> {g.title}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Block>

        <BlurFade className="mt-14">
          <StackPile badges={stackBadges} />
        </BlurFade>

        <Block title="Education">
          {profile.education.map((e) => (
            <Row key={e.school} icon={GraduationCap} title={e.school} meta={`${e.degree} · ${e.period}`} />
          ))}
        </Block>

        <Block title="Certificates">
          <div className="space-y-3">
            {certificates.length === 0 ? (
              <Link href="/certificates/" className="block transition-opacity hover:opacity-80">
                <Row icon={Award} title="Certificates coming soon" meta="Courses and credentials in AI and machine learning" />
              </Link>
            ) : (
              certificates.slice(0, 4).map((c) => (
                <Link key={c.slug} href="/certificates/" className="block transition-opacity hover:opacity-80">
                  <Row
                    icon={Award}
                    title={c.title}
                    meta={[c.issuer, c.date && formatMonth(c.date)].filter(Boolean).join(" · ") || "Certificate"}
                  />
                </Link>
              ))
            )}
            {certificates.length > 4 && (
              <Link
                href="/certificates/"
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors hover:bg-surface-strong"
              >
                All {certificates.length} certificates <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            )}
          </div>
        </Block>

        <Block title="Languages">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {profile.languages.map((l) => (
              <div key={l.name} className="card flex items-center gap-3 p-4">
                <Languages className="size-4 text-muted" strokeWidth={1.8} />
                <div>
                  <p className="text-sm font-semibold">{l.name}</p>
                  <p className="text-xs text-muted">{l.level}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>

        <Block title="Find me online">
          <div className="card divide-y divide-line">
            {socials.map((s) => (
              <a
                key={s.key}
                href={s.href}
                target={s.key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-surface-strong">
                  <BrandIcon name={s.key} className="size-4" />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold">{s.label}</span>
                  <span className="block text-sm text-muted">{s.handle}</span>
                </span>
                {handles[s.key] && <span className="hidden text-xs text-muted sm:block">{handles[s.key]}</span>}
              </a>
            ))}
          </div>
        </Block>
      </Container>

      <Connect />
    </>
  );
}
