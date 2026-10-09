# A Continuous Night-City Journey

This is a presentation enhancement to the existing engineering portfolio, not a replacement website or an astronomical simulation.

## Scene And Scroll

`MoonJourney` mounts once inside `.homepage-world`. Its fixed viewport-height backdrop remains behind all homepage sections, with translucent dark surfaces preserving both the city and text readability. Progress uses the complete document height minus the viewport. Linear art-directed stops avoid quarter-journey plateaus; frame-rate-independent exponential damping smooths the actual movement in `src/lib/moon-journey.ts`.

- High starting position:progress0.
- Gradual descent:progress0-.65.
- Horizon approach:.65-.9.
- Low, still-visible moon above the skyline near the bottom of the complete page:.9-1.

The city and sky do not fade out when Featured Work begins. Projects, About, Experience, Skills, Education, Credentials, Contact and the homepage footer let the same scene show through. The moon's final altitude and light keep it visible rather than letting it disappear completely behind the skyline. The duplicated sticky bitmap backdrop in the network transition stays removed. Pausing holds the moon's pose without hiding the city.

Transforms, opacity, star intensity, cloud drift, a restrained night tint and a lightweight reflection respond to this progress. Altitude is bounded away from the navigation. Mobile uses a shorter horizontal path and a stable small-viewport scene.

The original generated `night-city.webp` supplies all raster imagery. CSS crops its existing moon texture; a skyline-contour clipping polygon and softer rear layer occlude it. The original baked-in moon is excluded from those skyline/sky crops. The contour is an art-directed approximation, not a computer-vision segmentation result. No additional large scene image or animation library is required.

## Content And Access

The decorative scene is `aria-hidden` and pointer-transparent. Its motion control is a separate fixed foreground button. All headings, career evidence, project links, education and contact remain semantic HTML in normal flow. Six featured projects and four engineering spotlights introduce the44-route collection; no case studies were removed.

`prefers-reduced-motion` fixes the moon and disables decorative transitions. Explicitly requested demo playback remains functional, with manual steps and Pause always available. Native cursors, focus indicators, menu/Escape behavior and links remain intact.

## Engineering Evidence

MNIST comparison bars, loss points and matrix tooltips use the existing real experiment JSON. Exact numeric tables and historical-result limitations remain. Prediction confidence was not recorded and is not fabricated.

RL playback follows existing source-executed trajectories. Package/reward states come from those records; its Q-update equation is explanatory, not invented numeric training telemetry. The embedded instrument uses the submitted integer ADC mapping. Its ideal PWM is explicitly not hardware output, and the separate LUT/timer/DMA practical is not conflated with ADC.

UCT context is maintained in `src/data/education.ts`. The restrained Africa ranking statement links to [UCT's official rankings page](https://uct.ac.za/research-innovation/rankings), reviewed2026-10-07. It says four major systems, not every ranking, and contains no quickly ageing global-rank number. Academic journey links come from the recovered project evidence, not syllabus inference.

## Verification

Use Node24 and run `npm test`, typecheck, lint, build and link checks. Tests cover trajectory phases, continuity, clamping, mobile bounds, real accuracy/count consistency, valid recorded RL steps, and the existing scheduling/ADC contracts.

On first load, motion is enabled unless the actual system/browser requests reduced motion. A small labelled play/pause control lets a visitor explicitly enable or pause moon movement without changing system settings. This controls the moon only. The city district graph has its own independent signal play/pause control; under reduced motion only an explicit signal opt-in enables that narrow CSS animation. Other reduced-motion safeguards remain. There is no query-string override. Test normal first load, native static fallback and explicit motion separately.

The controller batches scroll work into requestAnimationFrame, caches document geometry with ResizeObserver, suppresses unchanged CSS writes, skips hidden documents, and cleans up on navigation. A short settling loop runs only until progress meets the latest scroll target; it then stops completely. Pause freezes the current pose and resume catches up smoothly rather than jumping. Long frame delays are bounded. There is no continuously running JavaScript scene loop, WebGL, external telemetry or claimed field Web Vitals pass.
