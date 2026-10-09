export type MoonState = { x: number; y: number; scale: number; light: number; stars: number; setting: number; phase: string };
export function journeyProgress(scroll: number, height: number, viewport: number) {
  const range = Number.isFinite(height - viewport) ? Math.max(1, height - viewport) : 1;
  return Math.max(0, Math.min(1, (Number.isFinite(scroll) ? scroll : 0) / range));
}
const bounded = (value: number) => Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));

export function settleJourney(current: number, target: number, elapsed: number) {
  const from = bounded(current), to = bounded(target);
  const delta = Number.isFinite(elapsed) ? Math.max(0, Math.min(64, elapsed)) : 0;
  const next = from + (to - from) * (1 - Math.exp(-delta / 120));
  return Math.abs(to - next) < .0001 ? to : next;
}
const stops = [
  { progress: 0, x: .82, y: .30, scale: 1, light: .96, stars: .62 },
  { progress: .25, x: .81, y: .37, scale: .98, light: .93, stars: .60 },
  { progress: .5, x: .79, y: .44, scale: .97, light: .86, stars: .53 },
  { progress: .75, x: .77, y: .52, scale: .98, light: .80, stars: .44 },
  { progress: 1, x: .76, y: .60, scale: 1, light: .74, stars: .28 },
];
export function moonState(progress: number, mobile = false): MoonState {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const end = stops.findIndex((stop) => stop.progress >= p);
  const a = stops[Math.max(0, end - 1)], b = stops[Math.max(0, end)];
  const fraction = a === b ? 0 : (p - a.progress) / (b.progress - a.progress);
  // The controller smooths time; linear keyframes avoid stopping at each quarter.
  const mix = (key: 'x' | 'y' | 'scale' | 'light' | 'stars') => a[key] + (b[key] - a[key]) * fraction;
  return {
    x: mobile ? .65 + (mix('x') - .82) * .4 : mix('x'),
    y: mobile ? .23 + (mix('y') - .30) * 1.04 : mix('y'),
    scale: mix('scale'), light: mix('light'), stars: mix('stars'),
    setting: Math.max(0, Math.min(1, (p - .65) / .35)),
    phase: p < .1 ? 'high' : p < .65 ? 'descending' : p < .9 ? 'horizon' : 'setting',
  };
}
