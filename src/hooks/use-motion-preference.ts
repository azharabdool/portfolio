'use client';

import { useState, useSyncExternalStore } from 'react';
import { motionEnabled } from '@/lib/motion-preference';

function subscribe(callback: () => void) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function useMotionPreference() {
  const reduced = useSyncExternalStore(subscribe, () => matchMedia('(prefers-reduced-motion: reduce)').matches, () => false);
  const [preference, setPreference] = useState<boolean | null>(null);
  const enabled = motionEnabled(preference, reduced);
  return { enabled, explicit: preference === true, toggle: () => setPreference(!enabled) };
}
