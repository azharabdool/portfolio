# A Continuous Night-City Journey

This is a presentation enhancement to the existing engineering portfolio, not a replacement website or an astronomical simulation.

## Scene And Scroll

`MoonJourney` mounts once inside the clipped `.cinematic-zone`, covering only Hero, discipline band and the network transition. Its viewport-height stage is sticky inside an absolute backdrop bounded by that wrapper, never fixed to the whole page. Progress uses wrapper top/height minus the viewport; monotonic smoothstep interpolation joins the art-directed stops in `src/lib/moon-journey.ts`.

- High starting position:progress0.
- Gradual descent:progress0-.65.
- Horizon approach:.65-.9.
- Setting and scene termination before Featured Work:.9-1.

The skyline fades between progress.35 and.8; the remaining moon/sky fades between.88 and1. Boundary visibility is independent of the moon pause/reduced-motion setting, so even a paused moon cannot leave a background behind later content. The duplicated sticky bitmap backdrop in the network transition is removed. Featured Work is opaque; all subsequent content is outside the cinematic wrapper.

Transforms, opacity, star intensity, cloud drift, a restrained night tint and a lightweight reflection respond to this progress. Altitude is bounded away from the navigation. Mobile uses a shorter horizontal path and a stable small-viewport scene.

The original generated `night-city.webp` supplies all raster imagery. CSS crops its existing moon texture; a skyline-contour clipping polygon and softer rear layer occlude it. The original baked-in moon is excluded from those skyline/sky crops. The contour is an art-directed approximation, not a computer-vision segmentation result. No additional large scene image or animation library is required.

## Content And Access

The decorative scene is `aria-hidden` and pointer-transparent. Its motion control is a separate, bounded foreground button. All headings, career evidence, project links, education and contact remain semantic HTML in normal flow. Six featured projects and four engineering spotlights introduce the44-route collection; no case studies were removed.

`prefers-reduced-motion` fixes the moon and disables decorative transitions. Explicitly requested demo playback remains functional, with manual steps and Pause always available. Native cursors, focus indicators, menu/Escape behavior and links remain intact.

## Engineering Evidence

MNIST comparison bars, loss points and matrix tooltips use the existing real experiment JSON. Exact numeric tables and historical-result limitations remain. Prediction confidence was not recorded and is not fabricated.

RL playback follows existing source-executed trajectories. Package/reward states come from those records; its Q-update equation is explanatory, not invented numeric training telemetry. The embedded instrument uses the submitted integer ADC mapping. Its ideal PWM is explicitly not hardware output, and the separate LUT/timer/DMA practical is not conflated with ADC.

UCT context is maintained in `src/data/education.ts`. The restrained Africa ranking statement links to [UCT's official rankings page](https://uct.ac.za/research-innovation/rankings), reviewed2026-10-07. It says four major systems, not every ranking, and contains no quickly ageing global-rank number. Academic journey links come from the recovered project evidence, not syllabus inference.

## Verification

Use Node24 and run `npm test`, typecheck, lint, build and link checks. Tests cover trajectory phases, continuity, clamping, mobile bounds, real accuracy/count consistency, valid recorded RL steps, and the existing scheduling/ADC contracts.

The default respects the actual system/browser reduced-motion preference. A small labelled play/pause control lets a visitor explicitly enable or pause moon movement without changing system settings. This controls the moon only; other reduced-motion safeguards remain. There is no query-string override. Test native static fallback and explicit motion separately.

The controller batches scroll work into requestAnimationFrame, caches wrapper geometry with ResizeObserver, skips hidden documents, and cleans up on navigation. There is no continuously running scene loop, WebGL, external telemetry or claimed field Web Vitals pass.
