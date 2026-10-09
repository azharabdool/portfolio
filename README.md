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

Andre uses correct non-preemptive timing boundaries, explicitly disclosing original aggregate errors. Dijkstra final distances match all five retained Java runs. Four Rooms defaults to genuine recorded episodes, with a separately labelled clean-room manual mode. Word scores follow the original word-length rule. Image components use four-neighbour BFS over synthetic pixels, and the puzzle uses source-established legal adjacent swaps and the authored city asset. Source-derived Fourier and ADC/PWM models remain mathematical explanations. `npm test` covers23 model/evidence cases, including scene boundaries, input boundaries and inventory reconciliation.

The homepage's single moon starts high and only sets during forward scroll inside a clipped hero-transition zone. The skyline fades within this bounded opening, the duplicated sticky city backdrop is removed, and Featured Work begins on an opaque dark background. Scene progress never depends on the full document height. Native reduced motion is respected, with an explicit moon play/pause control. UCT remains prominent; year-matched official handbook context is distinct from actual project implementation. See [scene architecture and evidence boundaries](MOON_EXPERIENCE.md).

## Assets And Evidence

`public/images/night-city.webp`: original generated moon/city artwork. Other imagery includes approved Foundry screenshots, source-built Swing GUI captures, retained coursework plots, documented replots and synthetic C++ input/output. New explanatory visualisations are distinguished from original execution. `public/project-notes/`: project documentation. Two selectable-text ATS CVs are included.

The credential library contains ten genuine privacy-reviewed issuer documents with rendered previews, exact recorded dates and verified public destinations where available. Professional certification, achievement and training remain distinct; SAP expiry is shown. Project scope and shared authorship are explained on detail pages. The two new WAF/architecture studies are bounded documentation, not claims of a running secure microservices stack.

## Deployment

On Vercel select Next.js, build with `npm run build` and use output directory `out`. No runtime credentials are needed. The canonical origin defaults to https://azharabdool.vercel.app and can be overridden deliberately with SITE_URL for another host. Keep .vercel and .env files untracked.

The maintained default canonical is now https://azharabdool.vercel.app; SITE_URL can override it deliberately. From the private refresh parent, tools/Deploy-Portfolio.ps1 deploys and updates both live aliases. Google-site-verification metadata is a user-supplied public ownership tag, not an account credential. A lightweight browser-local LCP/CLS diagnostic sends nothing to a server; DOM values are not field Web Vitals certification.
