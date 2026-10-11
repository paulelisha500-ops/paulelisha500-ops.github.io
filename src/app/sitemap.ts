import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/projects/", "/about/", "/shipped/", "/photos/", ...projects.map((p) => `/projects/${p.slug}/`)];
  return pages.map((path) => ({ url: `${profile.siteUrl}${path}`, changeFrequency: "weekly" }));
}
