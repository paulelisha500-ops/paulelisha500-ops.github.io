// Makes small WebP previews of certificate images so the grid loads fast even
// when the originals are large scans. Runs before every build; previews go to
// public/media/certificates/thumbs/ (git-ignored) and are only redone when the
// original changes.

import sharp from "sharp";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("../public/media/certificates/", import.meta.url));
const thumbs = `${dir}thumbs/`;
const RASTER = /\.(png|jpe?g|webp|avif)$/i;

if (!existsSync(dir)) process.exit(0);
await mkdir(thumbs, { recursive: true });

let made = 0;
for (const file of await readdir(dir)) {
  if (!RASTER.test(file)) continue;
  const src = `${dir}${file}`;
  const out = `${thumbs}${file.replace(/\.[^.]+$/, "")}.webp`;
  if (existsSync(out) && (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs) continue;
  // Buffers in and out (not file paths) so long Windows paths work too.
  const webp = await sharp(await readFile(src))
    .rotate()
    .resize({ width: 720, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  await writeFile(out, webp);
  made++;
}
console.log(`certificate previews: ${made} made`);
