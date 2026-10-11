import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { BrandIcon } from "@/components/icons";
import { Container } from "@/components/section-heading";
import { InstallAppButton } from "@/components/pwa/pwa";
import { profile, socials } from "@/data/profile";

export function Connect() {
  return (
    <Container className="mt-32">
      <div className="card relative overflow-hidden p-7 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full"
          style={{ background: "radial-gradient(closest-side, var(--spot), transparent)" }}
        />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">Let&rsquo;s connect</h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-pretty text-muted">
              I&rsquo;m open to AI/ML roles, collaborations and interesting problems. The fastest way to reach me is
              email or LinkedIn.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-85"
              >
                <Mail className="size-4" strokeWidth={2} /> Contact
              </a>
              <Link
                href="/projects/"
                className="inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors hover:bg-surface-strong"
              >
                See projects <ArrowRight className="size-4" strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-surface p-6 text-center">
            <ul className="mx-auto flex max-w-xs flex-wrap justify-center gap-2.5">
              {socials.map((s) => (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target={s.key === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={`${s.label}: ${s.handle}`}
                    title={`${s.label} · ${s.handle}`}
                    className="grid size-11 place-items-center rounded-2xl border border-line bg-surface-strong text-fg transition-transform duration-300 ease-(--ease-spring) hover:-translate-y-0.5 hover:scale-105"
                  >
                    <BrandIcon name={s.key} className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
            <InstallAppButton className="mt-5" />
            <p className="mt-5 text-sm text-muted">
              &copy; {new Date().getFullYear()} {profile.name}{" "}
              <a href="https://www.instagram.com/elizha_pl/" target="_blank" rel="noreferrer" className="text-subtle hover:text-fg">
                (@elizha_pl)
              </a>
            </p>
            <p className="text-sm text-subtle">{profile.location}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
