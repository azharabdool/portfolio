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

The collection has **10 major projects**, **17 historical engineering studies** and **10 interactive browser experiences**. The demos are new views of existing work, not ten additional historical projects. `/projects/` is the complete major-project index; `/lab/` retains historical studies and four themed collections; `/playground/` is the dedicated Interactive Engineering Lab. The sitemap contains44 public routes. SEO uses one canonical host, named metadata, Person/WebSite/ProfilePage/CreativeWork and a narrowly scoped SoftwareSourceCode entity.

Browser recreations live in `src/components/demos/` and `src/lib/playground-models.ts`, separately from preserved university source. Each dedicated demo loads only after the visitor launches it; only that instrument mounts. Playback starts by explicit request and pauses offscreen/in hidden tabs. Reduced motion disables decorative transitions without disabling Start/Pause, manual steps or inputs. Loading and import failures have visible recovery states. No new simulation dependency, browser training, OS threads or hardware execution is implied.

Andre uses correct non-preemptive timing boundaries, explicitly disclosing original aggregate errors. Dijkstra final distances match all five retained Java runs. Four Rooms defaults to genuine recorded episodes, with a separately labelled clean-room manual mode. Word scores follow the original word-length rule. Image components use four-neighbour BFS over synthetic pixels, and the puzzle uses source-established legal adjacent swaps and the authored city asset. Source-derived Fourier and ADC/PWM models remain mathematical explanations. `npm test` covers33 model/evidence cases, including full-page scene progression, time damping, input boundaries, search, first-load motion preferences, district content and inventory reconciliation.

All27 major/archive case studies have an engineering perspective in `src/data/project-insights.ts`: purpose, tool roles, theory, source-derived flow and verification scope. `StudyWorkbench` offers keyboard-accessible System flow / Theory / Validation tabs and bounded manual steps. These are new portfolio explanations, not additional historical features or live backend execution. The project index searches actual tools, concepts and implementation context. Code takes precedence where historical reports overstate exploration, measurements or completion.

The city district view uses five distinct accents, keyboard-accessible tabs and visible-only CSS signal animation with an independent pause control. Its graph is a portfolio navigation visual, not live network or platform telemetry. `src/data/city-districts.ts` contains purpose, tools, theory and related evidence for every district. The header uses the same original A/moon/skyline identity as the favicon; hero copy and full-page transparency remain intact.

Current part-time Honours context appears in Education, Profile and Skills. `src/data/honours.ts` distinguishes implemented ITDAA4 Python/scikit-learn analytics, ITSMA4 architecture/report work and a bounded ITDTA4 ModSecurity configuration study. It does not claim a deployed microservices/security stack or unverified rule authorship. Original reports, identifiers and raw records remain private.

The homepage's single moon starts high and gradually descends toward the skyline over the complete page scroll, remaining visible at the bottom. One fixed city scene remains behind translucent sections through Contact and the footer, without duplicating the skyline in the network transition. Motion starts enabled on first load unless the browser requests reduced motion. Independent moon and signal controls allow explicit opt-in or pause, without changing system settings. UCT remains prominent; year-matched official handbook context is distinct from actual project implementation. See [scene architecture and evidence boundaries](MOON_EXPERIENCE.md).

## Assets And Evidence

`public/images/night-city.webp`: original generated moon/city artwork. Other imagery includes approved Foundry screenshots, source-built Swing GUI captures, retained coursework plots, documented replots and synthetic C++ input/output. New explanatory visualisations are distinguished from original execution. `public/project-notes/`: project documentation. Two selectable-text ATS CVs are included.

The credential library contains ten genuine privacy-reviewed issuer documents with rendered previews, exact recorded dates and verified public destinations where available. Professional certification, achievement and training remain distinct; SAP expiry is shown. Project scope and shared authorship are explained on detail pages. The two new WAF/architecture studies are bounded documentation, not claims of a running secure microservices stack.

## Deployment

On Vercel select Next.js, build with `npm run build` and use output directory `out`. No runtime credentials are needed. The canonical origin defaults to https://azharabdool.vercel.app and can be overridden deliberately with SITE_URL for another host. Keep .vercel and .env files untracked.

The maintained default canonical is now https://azharabdool.vercel.app; SITE_URL can override it deliberately. From the private refresh parent, tools/Deploy-Portfolio.ps1 deploys and updates both live aliases. Google-site-verification metadata is a user-supplied public ownership tag, not an account credential. A lightweight browser-local LCP/CLS diagnostic sends nothing to a server; DOM values are not field Web Vitals certification.
