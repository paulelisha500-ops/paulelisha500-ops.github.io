// Renders the PWA / Apple touch icons from public/icon.svg.
// Run after changing the logo: node scripts/generate-icons.mjs

import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../public/", import.meta.url));
const svg = await readFile(`${root}icon.svg`);

// Maskable icons need the mark inside the central 80% safe zone on a full-bleed background.
const maskable = Buffer.from(
  svg
    .toString()
    .replace('<rect width="64" height="64" rx="15" fill="#0a0a0b"/>', '<rect width="64" height="64" fill="#0a0a0b"/>')
    .replace(/<rect x="0.5"[^>]*\/>/, "")
    .replace("<g ", '<g transform="translate(6.4 6.4) scale(0.8)" '),
);

const jobs = [
  { src: svg, size: 192, out: "icons/icon-192.png" },
  { src: svg, size: 512, out: "icons/icon-512.png" },
  { src: maskable, size: 512, out: "icons/maskable-512.png" },
  { src: maskable, size: 180, out: "icons/apple-touch-icon.png" },
];

for (const { src, size, out } of jobs) {
  await sharp(src, { density: 600 }).resize(size, size).png({ compressionLevel: 9 }).toFile(`${root}${out}`);
  console.log(`  ✓ ${out}`);
}
