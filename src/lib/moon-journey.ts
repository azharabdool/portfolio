export type MoonState = { x: number; y: number; scale: number; light: number; stars: number; setting: number; phase: string };
export function journeyProgress(scroll: number, height: number, viewport: number) {
  return Math.max(0, Math.min(1, (Number.isFinite(scroll) ? scroll : 0) / Math.max(1, height - viewport)));
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
  const eased = fraction * fraction * (3 - 2 * fraction);
  const mix = (key: 'x' | 'y' | 'scale' | 'light' | 'stars') => a[key] + (b[key] - a[key]) * eased;
  return {
    x: mobile ? .65 + (mix('x') - .82) * .4 : mix('x'),
    y: mobile ? .23 + (mix('y') - .30) * 1.04 : mix('y'),
    scale: mix('scale'), light: mix('light'), stars: mix('stars'),
    setting: Math.max(0, Math.min(1, (p - .65) / .35)),
    phase: p < .1 ? 'high' : p < .65 ? 'descending' : p < .9 ? 'horizon' : 'setting',
  };
}
