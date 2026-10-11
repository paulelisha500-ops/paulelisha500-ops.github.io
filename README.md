# Elisha Paul · Portfolio

[![CI](https://github.com/paulelisha500-ops/paulelisha500-ops.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/paulelisha500-ops/paulelisha500-ops.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/paulelisha500-ops/paulelisha500-ops.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/paulelisha500-ops/paulelisha500-ops.github.io/actions/workflows/deploy.yml)
[![Live on GitHub Pages](https://img.shields.io/badge/live-GitHub%20Pages-222)](https://paulelisha500-ops.github.io)
[![Live on Hugging Face](https://img.shields.io/badge/live-Hugging%20Face-ffd21e)](https://huggingface.co/spaces/Elisha622/portfolio)

Personal site of Elisha Paul, AI/ML engineer. It's an installable app (PWA, works offline), built with
**Next.js 16**, **Tailwind CSS 4**, **Magic UI** components, **Three.js** ambient light and **Motion**, in an
Apple-inspired, mostly monochrome design.

**Open it:** [paulelisha500-ops.github.io](https://paulelisha500-ops.github.io) ·
[Hugging Face Space](https://huggingface.co/spaces/Elisha622/portfolio)

## What's on it

| Page | What it shows |
|---|---|
| **Home** | Hero with a swipeable photo stack, GitHub contribution graph, project shelf with detail sheets, the Kaggle → GitHub → Hugging Face → Docker pipeline, recent merged PRs, and a physics "stack" pile |
| **Projects** | Every project, each with a case-study page (overview, highlights, stack, merged PRs) |
| **About** | Bio, experience, skills, education, certificates, languages and every profile link |
| **Certificates** | Your certificates, filled automatically from uploaded files, with a full-screen viewer and verify links |
| **Shipped** | A changelog of merged pull requests, refreshed on every deploy |
| **Photos** | Gallery (blank frames until photos are added) |

The loading screen is a separate component ([`src/components/splash`](src/components/splash)) that draws one of
six logo marks at random on each visit, never the same one twice in a row.

## Fast by design

- Static export: every page is prerendered HTML, served from a CDN with no server.
- The splash and theme are inline HTML/CSS, so they paint before any JavaScript loads.
- Three.js is loaded only when the browser is idle, renders at 35% resolution and 30 fps, and pauses in background tabs.
- Matter.js (the badge pile) downloads only when that section scrolls into view.
- Fonts are self-hosted; SF Pro is used on Apple devices through the system stack.
- A service worker caches the app shell and hashed assets, so repeat visits open instantly and offline.

## Live data

`scripts/fetch-live-data.mjs` runs before every build and writes [`src/data/live.json`](src/data/live.json):
GitHub contributions and merged PRs, repo stars, Hugging Face Spaces and models, Docker Hub pulls and Kaggle
tier. Each source falls back to its last good value, so an API hiccup never breaks a deploy. The deploy workflow
also runs daily to keep the numbers current.

## Editing content

| What | Where |
|---|---|
| Name, bio, experience, education, links | [`src/data/profile.ts`](src/data/profile.ts) |
| Projects | [`src/data/projects.ts`](src/data/projects.ts) |
| Skills and stack badges | [`src/data/skills.ts`](src/data/skills.ts) |
| Photos | Put files in `public/media/` and set `src` in [`src/data/photos.ts`](src/data/photos.ts) |
| Certificates | Upload to [`public/media/certificates/`](public/media/certificates); details (optional) in [`src/data/certificates.ts`](src/data/certificates.ts) |
| Resume button | Add `public/resume.pdf` and set `resumeUrl: "/resume.pdf"` in `profile.ts` |
| Logo / app icons | Edit `public/icon.svg`, then `npm run icons` |

## Adding certificates

1. On GitHub, open [`public/media/certificates`](public/media/certificates) → **Add file** → **Upload files**.
2. Drop in an image (PNG, JPG, WebP) and/or a PDF per certificate, named after it, e.g. `aws-machine-learning.png`.
   An image and PDF with the same name become one certificate.
3. **Commit changes**. The deploy runs and the certificate appears on the site in a few minutes.

The title comes from the file name. To add the issuer, date, credential ID, a verification link or skills, add an
entry keyed by the file name in [`src/data/certificates.ts`](src/data/certificates.ts). Previews are resized to WebP
automatically at build time, so large scans don't slow the page down.

## CI/CD

- **CI** ([`ci.yml`](.github/workflows/ci.yml)): every pull request is linted, type-checked and built, and the export is checked for required files.
- **Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)): every push to `main` (and a daily refresh) builds once and publishes to GitHub Pages and the Hugging Face Space.
- **Dependabot**: one grouped update PR per month.

The Space step needs a repository secret `HF_TOKEN` with write access to `Elisha622/portfolio`.

## Running locally

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # static export in out/
npm start          # serve out/
```
