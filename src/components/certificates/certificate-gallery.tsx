"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Award, BadgeCheck, ExternalLink, FileText, X } from "lucide-react";
import { MagicCard } from "@/components/magicui/magic-card";
import type { Certificate } from "@/lib/certificates";
import { cn, formatMonth } from "@/lib/utils";

const when = (c: Certificate) => (c.date ? formatMonth(c.date) : undefined);

function Preview({ cert, className }: { cert: Certificate; className?: string }) {
  const src = cert.thumb ?? cert.image;
  return (
    <div
      className={cn(
        "relative grid aspect-[1.414/1] place-items-center overflow-hidden rounded-[20px] bg-gradient-to-br from-surface-strong to-surface ring-1 ring-line ring-inset",
        className,
      )}
    >
      {src ? (
        // object-top: portrait letters show their letterhead, not a crop of the middle
        // eslint-disable-next-line @next/next/no-img-element -- static export, previews are pre-sized WebP
        <img src={src} alt="" loading="lazy" decoding="async" className="size-full object-cover object-top" />
      ) : cert.pdf ? (
        <FileText className="size-8 text-muted" strokeWidth={1.4} aria-hidden />
      ) : (
        <Award className="size-8 text-muted" strokeWidth={1.4} aria-hidden />
      )}
    </div>
  );
}

function EmptySlot() {
  return (
    <div aria-hidden className="card rounded-[28px] p-3">
      <div className="grid aspect-[1.414/1] place-items-center rounded-[20px] border border-dashed border-line-strong bg-surface">
        <Award className="size-6 text-subtle opacity-60" strokeWidth={1.5} />
      </div>
      <div className="space-y-2 px-2 pt-4 pb-2">
        <div className="h-2.5 w-20 rounded-full bg-surface-strong" />
        <div className="h-3.5 w-40 rounded-full bg-surface-strong" />
      </div>
    </div>
  );
}

export function CertificateGallery({ certificates, slots }: { certificates: Certificate[]; slots: number }) {
  const [open, setOpen] = useState<number | null>(null);

  if (certificates.length === 0) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: slots }, (_, i) => (
          <EmptySlot key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert, i) => (
          <MagicCard key={cert.slug} className="rounded-[28px]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full p-3 text-left focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={`View ${cert.title}`}
            >
              <Preview cert={cert} />
              <div className="px-2 pt-4 pb-2">
                {cert.issuer && <p className="text-[13px] font-medium text-muted">{cert.issuer}</p>}
                <h3 className="mt-0.5 font-semibold tracking-tight text-balance">{cert.title}</h3>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                  {when(cert)}
                  {cert.credentialUrl && (
                    <span className="inline-flex items-center gap-1">
                      {when(cert) && "·"}
                      <BadgeCheck className="size-3.5 text-[#34c759]" strokeWidth={2} /> Verifiable
                    </span>
                  )}
                </p>
              </div>
            </button>
          </MagicCard>
        ))}
      </div>
      <CertificateViewer certificates={certificates} index={open} onChange={setOpen} />
    </>
  );
}

function CertificateViewer({
  certificates,
  index,
  onChange,
}: {
  certificates: Certificate[];
  index: number | null;
  onChange: (i: number | null) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const cert = index === null ? null : certificates[index];
  const many = certificates.length > 1;
  const step = useCallback(
    (dir: number) => index !== null && onChange((index + dir + certificates.length) % certificates.length),
    [index, onChange, certificates.length],
  );

  useEffect(() => {
    if (index === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [index, onChange, step]);

  const pill =
    "inline-flex h-9 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-medium transition-colors hover:bg-surface-strong";

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={() => onChange(null)}
            className="fixed inset-0 bg-black/50 backdrop-blur-md"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-title"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="relative w-full max-w-4xl rounded-[32px] border border-line bg-elevated p-4 shadow-2xl sm:p-6"
          >
            <div className="overflow-hidden rounded-[22px] bg-surface ring-1 ring-line">
              {cert.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- full-size original in the viewer
                <img
                  key={cert.slug}
                  src={cert.image}
                  alt={cert.title}
                  className="mx-auto max-h-[64vh] w-full object-contain"
                />
              ) : cert.pdf ? (
                <iframe key={cert.slug} src={cert.pdf} title={cert.title} className="h-[64vh] w-full bg-white" />
              ) : (
                <div className="grid aspect-[1.414/1] place-items-center">
                  <Award className="size-12 text-muted" strokeWidth={1.2} aria-hidden />
                </div>
              )}
            </div>

            <div className="mt-5 flex flex-wrap items-start justify-between gap-4 px-1">
              <div className="min-w-0">
                {cert.issuer && <p className="text-sm font-medium text-muted">{cert.issuer}</p>}
                <h3 id="cert-title" className="text-2xl font-semibold tracking-[-0.03em] text-balance">
                  {cert.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {[when(cert), cert.credentialId && `Credential ID ${cert.credentialId}`].filter(Boolean).join(" · ")}
                </p>
                {cert.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {cert.skills.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className={pill}>
                    <BadgeCheck className="size-4 text-[#34c759]" strokeWidth={2} /> Verify
                  </a>
                )}
                {cert.pdf && (
                  <a href={cert.pdf} target="_blank" rel="noreferrer" className={pill}>
                    <FileText className="size-4" strokeWidth={2} /> Open PDF
                  </a>
                )}
                {cert.image && !cert.pdf && (
                  <a href={cert.image} target="_blank" rel="noreferrer" className={pill}>
                    <ExternalLink className="size-4" strokeWidth={2} /> Full size
                  </a>
                )}
              </div>
            </div>

            <div className="absolute -top-3 -right-3 flex gap-2 sm:top-3 sm:right-3">
              <button
                ref={closeRef}
                type="button"
                onClick={() => onChange(null)}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full bg-fg text-bg shadow-lg transition-transform hover:scale-105"
              >
                <X className="size-4" strokeWidth={2.6} />
              </button>
            </div>
            {many && (
              <div className="mt-4 flex justify-center gap-2">
                {[
                  { dir: -1, Icon: ArrowLeft, label: "Previous certificate" },
                  { dir: 1, Icon: ArrowRight, label: "Next certificate" },
                ].map(({ dir, Icon, label }) => (
                  <button
                    key={dir}
                    type="button"
                    aria-label={label}
                    onClick={() => step(dir)}
                    className="grid size-10 place-items-center rounded-full border border-line bg-surface transition-colors hover:bg-surface-strong"
                  >
                    <Icon className="size-4" strokeWidth={2} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
