'use client';

import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { moonState } from '@/lib/moon-journey';

function subscribeMotion(callback: () => void) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function MoonJourney() {
  const scene = useRef<HTMLDivElement>(null);
  const lastProgress = useRef(0);
  const reduced = useSyncExternalStore(subscribeMotion, () => matchMedia('(prefers-reduced-motion: reduce)').matches, () => false);
  const [preference, setPreference] = useState<boolean | null>(null);
  const enabled = preference ?? !reduced;
  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    let frame = 0, total = 1, width = innerWidth, height = innerHeight;
    const paint = () => {
      frame = 0;
      if (document.hidden) return;
      const p = enabled ? Math.min(1, Math.max(0, scrollY / total)) : lastProgress.current;
      if (enabled) lastProgress.current = p;
      const state = moonState(p, width <= 640);
      const moonWidth = width <= 640 ? 190 : Math.max(200, Math.min(310, width * .2));
      const altitude = Math.max(moonWidth * state.scale / 2 + 70, state.y * height);
      node.dataset.progress = p.toFixed(4);
      node.dataset.phase = enabled ? state.phase : 'static';
      node.dataset.motion = enabled ? 'scroll' : 'reduced';
      node.style.setProperty('--moon-x', `${state.x * 100}vw`);
      node.style.setProperty('--moon-y', `${altitude}px`);
      node.style.setProperty('--moon-scale', state.scale.toFixed(3));
      node.style.setProperty('--moon-light', state.light.toFixed(3));
      node.style.setProperty('--star-light', state.stars.toFixed(3));
      node.style.setProperty('--setting', state.setting.toFixed(3));
      node.style.setProperty('--cloud-shift', `${p * (width <= 640 ? 14 : 45)}px`);
      node.style.setProperty('--horizon-shift', `${p * 6}px`);
    };
    const update = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); };
    const measure = () => {
      // The fixed scene uses svh, so mobile browser chrome cannot shift its geometry.
      height = node.clientHeight;
      width = node.clientWidth;
      total = Math.max(1, document.documentElement.scrollHeight - height);
      update();
    };
    const onScroll = () => { if (enabled) update(); };
    const observer = new ResizeObserver(measure);
    observer.observe(node.parentElement!);
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('pageshow', measure);
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure);
      window.removeEventListener('pageshow', measure); document.removeEventListener('visibilitychange', update);
    };
  }, [enabled]);
  return <><div ref={scene} className='moon-journey' aria-hidden='true' data-phase='high'>
    <div className='journey-sky' />
    <div className='journey-stars'>{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${3 + (i * 37) % 94}%`, top: `${4 + (i * 17) % 59}%`, opacity: .3 + (i % 4) * .15 }} />)}</div>
    <div className='journey-moon'><div className='moon-disc' /></div>
    <div className='journey-clouds' />
    <div className='journey-rear' />
    <div className='journey-horizon'><Image src='/images/night-city.webp' alt='' fill priority sizes='100vw' /><div className='journey-city-lights'>{[[8,74],[26,70],[46,68],[59,67],[68,65],[74,51],[81,69],[85,60]].map(([x,y]) => <i key={x} style={{ left: `${x}%`, top: `${y}%` }} />)}</div></div>
    <div className='journey-reflection' />
    <div className='journey-foreground' />
  </div><button type='button' className='motion-toggle' aria-label={enabled ? 'Pause moon motion' : 'Enable moon motion'} title={enabled ? 'Pause moon motion' : 'Enable moon motion'} aria-pressed={enabled} onClick={() => setPreference(!enabled)}>{enabled ? <Pause size={16} /> : <Play size={16} />}</button></>;
}
