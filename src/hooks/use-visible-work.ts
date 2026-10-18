'use client';
import { useEffect, useRef, useState } from 'react';
import { useMotionPreference } from './use-motion-preference';

export function useVisibleWork<T extends HTMLElement = HTMLDivElement>(margin = '100px') {
  const ref = useRef<T>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(false);
  const { enabled } = useMotionPreference();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const nearby = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setNear(true); nearby.disconnect(); } }, { rootMargin: margin });
    const viewport = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    const visibility = () => setForeground(!document.hidden);
    visibility(); nearby.observe(node); viewport.observe(node);
    document.addEventListener('visibilitychange', visibility);
    return () => { nearby.disconnect(); viewport.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, [margin]);
  return { ref, near, visible, enabled, active: visible && foreground, animate: visible && foreground && enabled };
}
