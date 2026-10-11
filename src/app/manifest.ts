import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

// Installable as an app on phones and desktops (see public/sw.js for offline).
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: `${profile.name} · ${profile.role}`,
    short_name: profile.firstName,
    description: profile.summary,
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    orientation: "portrait",
    background_color: "#000000",
    theme_color: "#000000",
    categories: ["portfolio", "personalization", "productivity"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Projects", url: "/projects/" },
      { name: "About", url: "/about/" },
      { name: "Shipped", url: "/shipped/" },
    ],
  };
}
