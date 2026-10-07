export type MoonState = { x: number; y: number; scale: number; light: number; stars: number; setting: number; phase: string };
const stops = [
  { progress: 0, x: .82, y: .42, scale: 1, light: .96, stars: .52 },
  { progress: .16, x: .79, y: .22, scale: .94, light: 1, stars: .72 },
  { progress: .32, x: .78, y: .17, scale: .87, light: .96, stars: .82 },
  { progress: .58, x: .85, y: .23, scale: .83, light: .88, stars: .68 },
  { progress: .78, x: .88, y: .46, scale: .88, light: .78, stars: .52 },
  { progress: .92, x: .84, y: .65, scale: .94, light: .62, stars: .38 },
  { progress: 1, x: .82, y: .91, scale: 1, light: .42, stars: .28 },
];
export function moonState(progress: number, mobile = false): MoonState {
  const p = Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0));
  const end = stops.findIndex((stop) => stop.progress >= p);
  const a = stops[Math.max(0, end - 1)], b = stops[Math.max(0, end)];
  const fraction = a === b ? 0 : (p - a.progress) / (b.progress - a.progress);
  const eased = fraction * fraction * (3 - 2 * fraction);
  const mix = (key: 'x' | 'y' | 'scale' | 'light' | 'stars') => a[key] + (b[key] - a[key]) * eased;
  return {
    x: mobile ? .57 + (mix('x') - .82) * .55 : mix('x'),
    y: mobile ? .12 + mix('y') * .38 + Math.max(0, (p - .78) / .22) * .4 : mix('y'),
    scale: mix('scale'), light: mix('light'), stars: mix('stars'),
    setting: Math.max(0, Math.min(1, (p - .76) / .24)),
    phase: p < .32 ? 'rising' : p < .58 ? 'traversing' : p < .92 ? 'descending' : 'setting',
  };
}
