# Azhar Abdool Portfolio

General software and computer engineering portfolio spanning applied AI/data, enterprise platforms, applications, embedded systems, systems and security/networks.

Live: https://portfolio-livid-seven-890kon00eu.vercel.app

## Stack

Next.js 16 App Router, React, TypeScript, Tailwind CSS 4 and Lucide icons. Static export with generated project detail pages. Animation uses CSS and a small scroll handler with reduced-motion support.

## Run

Use Node 24, matching the production runtime and package engines.

```sh
npm ci
npm run dev -- --port 3000
```

## Verify And Export

```sh
npm run typecheck
npm run lint
npm run build
npm run check:links
npm run preview
```

On this Windows machine, a cached Turbopack child-process error can be bypassed for local verification with `npm run build -- --webpack`. Vercel's clean production Turbopack build passes.

`out/` is the deployment artifact; use static hosting with directory-index support. The preview serves http://localhost:3000. `next start` is not required for this export.

## Content

`src/data/profile.ts` is the main content registry; `project-depth.ts` adds technical case-study content and `engineering-archive.ts` contains recovered engineering history. Six featured projects demonstrate breadth. The full collection has filters and static detail routes. The default CV is General Engineering; the separate AI CV remains available. Only verified public repository URLs are shown.

## Assets And Evidence

`public/images/night-city.webp`: original generated moon/city artwork. Other imagery includes approved Foundry screenshots, source-built Swing GUI captures, retained coursework plots, documented replots and synthetic C++ input/output. New explanatory visualisations are distinguished from original execution. `public/project-notes/`: project documentation. Two selectable-text ATS CVs are included.

Credentials distinguish earned professional certification, achievement certificate and training. The supplied SAP certification's expiration is shown. Project scope and shared authorship are explained on detail pages.

## Deployment

On Vercel select Next.js, build with `npm run build` and use output directory `out`. No runtime credentials are needed. The canonical origin uses `SITE_URL` when explicitly set, otherwise Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. For another static host set `SITE_URL` to the actual HTTPS origin before building. Keep `.vercel/` and `.env` files untracked.
