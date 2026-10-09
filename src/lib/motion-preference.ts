export function motionEnabled(preference: boolean | null, reduced: boolean) {
  return preference ?? !reduced;
}
