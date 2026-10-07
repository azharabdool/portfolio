# Azhar Abdool Portfolio

General software and computer engineering portfolio spanning applied AI/data, enterprise platforms, applications, embedded systems, systems and security/networks.

Primary URL: https://azharabdool.vercel.app. The original generated alias remains functional.

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
npm test
npm run build
npm run check:links
npm run preview
```

On this Windows machine, a cached Turbopack child-process error can be bypassed for local verification with `npm run build -- --webpack`. Vercel's clean production Turbopack build passes.

`out/` is the deployment artifact; use static hosting with directory-index support. The preview serves http://localhost:3000. `next start` is not required for this export.

## Content

`src/data/profile.ts` is the main content registry; `project-depth.ts` adds technical case-study content and `engineering-archive.ts` contains recovered engineering history. Six featured projects demonstrate breadth. The full collection has filters and static detail routes. The default CV is General Engineering; the separate AI CV remains available. Only verified public repository URLs are shown.

The enhanced collection includes25 technical case studies, a Profile page, CV context and an interactive Engineering Lab. Source-traced graph/RL replays, source-equation embedded and Fourier tools, synthetic scheduling, and real MNIST comparison outputs are explicitly distinguished from historical submissions. SEO uses one canonical host, named metadata, Person/WebSite/ProfilePage/CreativeWork and a narrowly scoped SoftwareSourceCode entity.

The homepage's single moon rises and sets through the continuous night-city scene. UCT is highlighted in the hero, education feature and source context, with a restrained official ranking link. Four engineering teasers lead to the complete Lab rather than repeating the entire archive on the homepage. See [scene architecture and evidence boundaries](MOON_EXPERIENCE.md).

## Assets And Evidence

`public/images/night-city.webp`: original generated moon/city artwork. Other imagery includes approved Foundry screenshots, source-built Swing GUI captures, retained coursework plots, documented replots and synthetic C++ input/output. New explanatory visualisations are distinguished from original execution. `public/project-notes/`: project documentation. Two selectable-text ATS CVs are included.

Credentials distinguish earned professional certification, achievement certificate and training. The supplied SAP certification's expiration is shown. Project scope and shared authorship are explained on detail pages.

## Deployment

On Vercel select Next.js, build with `npm run build` and use output directory `out`. No runtime credentials are needed. The canonical origin defaults to https://azharabdool.vercel.app and can be overridden deliberately with SITE_URL for another host. Keep .vercel and .env files untracked.

The maintained default canonical is now https://azharabdool.vercel.app; SITE_URL can override it deliberately. From the private refresh parent, tools/Deploy-Portfolio.ps1 deploys and updates both live aliases. Google-site-verification metadata is a user-supplied public ownership tag, not an account credential. A lightweight browser-local LCP/CLS diagnostic sends nothing to a server; DOM values are not field Web Vitals certification.
