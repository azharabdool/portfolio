'use client';

import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { journeyProgress, moonState, settleJourney } from '@/lib/moon-journey';
import { CityLighting } from './city-lighting';

function subscribeMotion(callback: () => void) {
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

export function MoonJourney() {
  const scene = useRef<HTMLDivElement>(null);
  const lastProgress = useRef(0);
  const initialised = useRef(false);
  const reduced = useSyncExternalStore(subscribeMotion, () => matchMedia('(prefers-reduced-motion: reduce)').matches, () => false);
  const [preference, setPreference] = useState<boolean | null>(null);
  const enabled = preference ?? !reduced;
  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    let frame = 0, target = lastProgress.current, timestamp = 0;
    let pageHeight = 1, width = innerWidth, height = innerHeight;
    const values = new Map<string, string>();
    const write = (key: string, value: string) => {
      if (values.get(key) === value) return;
      node.style.setProperty(key, value);
      values.set(key, value);
    };
    const paint = (time: number) => {
      frame = 0;
      if (document.hidden) return;
      node.dataset.active = enabled ? 'true' : 'false';
      const p = enabled ? settleJourney(lastProgress.current, target, timestamp ? time - timestamp : 16) : lastProgress.current;
      timestamp = time;
      if (enabled) lastProgress.current = p;
      const state = moonState(p, width <= 640);
      const moonWidth = width <= 640 ? 190 : Math.max(200, Math.min(310, width * .2));
      const altitude = Math.max(moonWidth * state.scale / 2 + 70, state.y * height);
      node.dataset.progress = p.toFixed(4);
      node.dataset.phase = enabled ? state.phase : 'static';
      node.dataset.motion = enabled ? 'scroll' : 'reduced';
      write('--moon-x', `${(state.x * 100).toFixed(3)}vw`);
      write('--moon-y', `${altitude.toFixed(2)}px`);
      write('--moon-scale', state.scale.toFixed(3));
      write('--moon-light', state.light.toFixed(3));
      write('--star-light', state.stars.toFixed(3));
      write('--setting', state.setting.toFixed(3));
      write('--cloud-shift', `${(p * (width <= 640 ? 14 : 45)).toFixed(2)}px`);
      write('--horizon-shift', `${(p * 6).toFixed(2)}px`);
      const settling = enabled && p !== target;
      node.dataset.settling = String(settling);
      if (settling) frame = requestAnimationFrame(paint);
      else timestamp = 0;
    };
    const update = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); };
    const measure = () => {
      // Keep one viewport scene while its journey spans the complete homepage.
      height = node.clientHeight;
      width = node.clientWidth;
      pageHeight = document.documentElement.scrollHeight;
      target = journeyProgress(scrollY, pageHeight, height);
      if (!initialised.current) {
        lastProgress.current = enabled ? target : 0;
        initialised.current = true;
      }
      update();
    };
    const onScroll = () => {
      target = journeyProgress(scrollY, pageHeight, height);
      if (enabled) update();
    };
    const visibility = () => {
      if (document.hidden) {
        node.dataset.active = 'false';
        cancelAnimationFrame(frame); frame = 0; timestamp = 0;
      } else measure();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('pageshow', measure);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure);
      window.removeEventListener('pageshow', measure); document.removeEventListener('visibilitychange', visibility);
    };
  }, [enabled]);
  return <><div className='cinematic-backdrop'><div className='moon-stage'><div ref={scene} className='moon-journey' aria-hidden='true' data-phase='high'>
    <div className='journey-sky' />
    <div className='journey-stars'>{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${3 + (i * 37) % 94}%`, top: `${4 + (i * 17) % 59}%`, opacity: .3 + (i % 4) * .15 }} />)}</div>
    <div className='journey-moon'><div className='moon-disc' /></div>
    <div className='journey-clouds' />
    <div className='journey-rear' />
    <div className='journey-horizon'><Image src='/images/night-city.webp' alt='' fill priority sizes='100vw' /><CityLighting/></div>
    <div className='journey-reflection' />
    <div className='journey-foreground' />
  </div></div></div><button type='button' className='motion-toggle' aria-label={enabled ? 'Pause moon motion' : 'Enable moon motion'} title={enabled ? 'Pause moon motion' : 'Enable moon motion'} aria-pressed={enabled} onClick={() => setPreference(!enabled)}>{enabled ? <Pause size={16} /> : <Play size={16} />}</button></>;
}
