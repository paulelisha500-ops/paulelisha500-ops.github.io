import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { certificateDetails } from "@/data/certificates";

// Build-time scan of public/media/certificates/. Runs only in Server
// Components, so the folder listing never ships to the browser.

export type Certificate = {
  slug: string;
  title: string;
  issuer?: string;
  date?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  /** Full-size image, shown in the viewer. */
  image?: string;
  /** Small WebP made by scripts/certificate-thumbs.mjs, shown in the grid. */
  thumb?: string;
  pdf?: string;
};

const DIR = path.join(process.cwd(), "public", "media", "certificates");
const URL_BASE = "/media/certificates";
const IMAGE = /\.(png|jpe?g|webp|avif|gif|svg)$/i;
const PDF = /\.pdf$/i;

const titleFromSlug = (slug: string) =>
  slug.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());

const url = (...parts: string[]) => [URL_BASE, ...parts.map(encodeURIComponent)].join("/");

export function getCertificates(): Certificate[] {
  const found = new Map<string, Omit<Certificate, "title" | "skills">>();

  if (existsSync(DIR)) {
    for (const file of readdirSync(DIR)) {
      if (!IMAGE.test(file) && !PDF.test(file)) continue;
      const slug = file.replace(/\.[^.]+$/, "");
      const entry = found.get(slug) ?? { slug };
      if (PDF.test(file)) {
        entry.pdf = url(file);
      } else {
        entry.image = url(file);
        if (existsSync(path.join(DIR, "thumbs", `${slug}.webp`))) entry.thumb = url("thumbs", `${slug}.webp`);
      }
      found.set(slug, entry);
    }
  }

  for (const slug of Object.keys(certificateDetails)) {
    if (!found.has(slug)) found.set(slug, { slug });
  }

  return [...found.values()]
    .map((entry) => {
      const details = certificateDetails[entry.slug] ?? {};
      return { ...entry, ...details, title: details.title ?? titleFromSlug(entry.slug), skills: details.skills ?? [] };
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || a.title.localeCompare(b.title));
}
