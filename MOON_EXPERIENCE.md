# A Continuous Night-City Journey

This is a presentation enhancement to the existing engineering portfolio, not a replacement website or an astronomical simulation.

## Scene And Scroll

`MoonJourney` mounts once on the homepage. One textured moon rises, traverses, descends and sets behind the skyline. Global progress is the current page scroll divided by its scrollable height; smoothstep interpolation joins the art-directed stops in `src/lib/moon-journey.ts`.

- Rising: progress0-.32.
- High traversal: .32-.58.
- Descent: .58-.92.
- Setting: .92-1.

Transforms, opacity, star intensity, cloud drift, a restrained night tint and a lightweight reflection respond to this progress. Altitude is bounded away from the navigation. Mobile uses a shorter horizontal path and a stable small-viewport scene.

The original generated `night-city.webp` supplies all raster imagery. CSS crops its existing moon texture; a skyline-contour clipping polygon and softer rear layer occlude it. The original baked-in moon is excluded from those skyline/sky crops. The contour is an art-directed approximation, not a computer-vision segmentation result. No additional large scene image or animation library is required.

## Content And Access

The decorative scene is `aria-hidden` and pointer-transparent. All headings, career evidence, project links, education and contact remain semantic HTML in normal flow. Six featured projects and four Lab teasers introduce the deeper29-route collection; no case studies were removed.

`prefers-reduced-motion` fixes the moon in an attractive position and disables major movement. RL replay retains manual steps. Native cursors, focus indicators, menu/Escape behavior and links remain intact.

## Engineering Evidence

MNIST comparison bars, loss points and matrix tooltips use the existing real experiment JSON. Exact numeric tables and historical-result limitations remain. Prediction confidence was not recorded and is not fabricated.

RL playback follows existing source-executed trajectories. Package/reward states come from those records; its Q-update equation is explanatory, not invented numeric training telemetry. The embedded instrument uses the submitted integer ADC mapping. Its ideal PWM is explicitly not hardware output, and the separate LUT/timer/DMA practical is not conflated with ADC.

UCT context is maintained in `src/data/education.ts`. The restrained Africa ranking statement links to [UCT's official rankings page](https://uct.ac.za/research-innovation/rankings), reviewed2026-10-07. It says four major systems, not every ranking, and contains no quickly ageing global-rank number. Academic journey links come from the recovered project evidence, not syllabus inference.

## Verification

Use Node24 and run `npm test`, typecheck, lint, build and link checks. Tests cover trajectory phases, continuity, clamping, mobile bounds, real accuracy/count consistency, valid recorded RL steps, and the existing scheduling/ADC contracts.

For local moon inspection only, `http://localhost:3000/?motion=full` exercises scroll transforms even when the QA browser prefers reduced motion. This override is restricted to localhost and ignored on the public site. It does not override other CSS media preferences; motion tests and native reduced-motion checks must be reported separately.

The controller batches scroll work into requestAnimationFrame, caches page geometry with ResizeObserver, skips hidden documents, and cleans up on navigation. There is no continuously running scene loop, WebGL, external telemetry or claimed field Web Vitals pass.
