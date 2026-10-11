// Finishes the static export in out/:
//  - stamps the service worker with a unique build id so caches roll over
//  - adds .nojekyll so GitHub Pages serves the _next/ folder
//  - writes the Hugging Face Space README (static SDK) for the HF mirror

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const out = fileURLToPath(new URL("../out/", import.meta.url));
const buildId = process.env.GITHUB_SHA?.slice(0, 12) || Date.now().toString(36);

const sw = await readFile(`${out}sw.js`, "utf8");
await writeFile(`${out}sw.js`, sw.replaceAll("__BUILD_ID__", buildId));

await writeFile(`${out}.nojekyll`, "");

await writeFile(
  `${out}README.md`,
  `---
title: Elisha Paul
emoji: ✨
colorFrom: gray
colorTo: indigo
sdk: static
app_file: index.html
pinned: true
short_description: Portfolio of Elisha Paul, AI/ML engineer
---

# Elisha Paul · Portfolio

Static build of [paulelisha500-ops.github.io](https://paulelisha500-ops.github.io), published here
automatically by GitHub Actions. Source: https://github.com/paulelisha500-ops/paulelisha500-ops.github.io
`,
);

console.log(`postbuild: sw.js stamped (${buildId}), .nojekyll and Space README written`);
