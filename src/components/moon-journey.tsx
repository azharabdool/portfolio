'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { moonState } from '@/lib/moon-journey';

export function MoonJourney() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = scene.current;
    if (!node) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const previewMotion = location.hostname === 'localhost' && new URLSearchParams(location.search).get('motion') === 'full';
    const isReduced = () => reduced.matches && !previewMotion;
    let frame = 0, total = 1, width = innerWidth, height = innerHeight;
    const paint = () => {
      frame = 0;
      if (document.hidden) return;
      const p = isReduced() ? .22 : Math.min(1, Math.max(0, scrollY / total));
      const state = moonState(p, width <= 640);
      if (isReduced()) state.y = width <= 640 ? .26 : .35;
      const moonWidth = width <= 640 ? 190 : Math.max(200, Math.min(310, width * .2));
      const altitude = Math.max(moonWidth * state.scale / 2 + 100, state.y * height);
      node.dataset.progress = p.toFixed(4);
      node.dataset.phase = isReduced() ? 'static' : state.phase;
      node.dataset.motion = previewMotion ? 'preview' : isReduced() ? 'reduced' : 'scroll';
      node.style.setProperty('--moon-x', `${state.x * 100}vw`);
      node.style.setProperty('--moon-y', `${altitude}px`);
      node.style.setProperty('--moon-scale', state.scale.toFixed(3));
      node.style.setProperty('--moon-light', state.light.toFixed(3));
      node.style.setProperty('--star-light', state.stars.toFixed(3));
      node.style.setProperty('--setting', state.setting.toFixed(3));
      node.style.setProperty('--cloud-shift', `${isReduced() ? 0 : p * (width <= 640 ? 18 : 70)}px`);
      node.style.setProperty('--horizon-shift', `${isReduced() ? 0 : Math.sin(p * Math.PI) * 16}px`);
    };
    const update = () => { if (!frame && !document.hidden) frame = requestAnimationFrame(paint); };
    const measure = () => {
      // Ignore small mobile browser-chrome changes; the scene uses a stable small viewport.
      if (innerWidth !== width || width > 640 || Math.abs(innerHeight - height) > 140) height = innerHeight;
      width = innerWidth;
      total = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      update();
    };
    const onScroll = () => { if (!isReduced()) update(); };
    const observer = new ResizeObserver(measure);
    observer.observe(node.parentElement!);
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    window.addEventListener('pageshow', measure);
    document.addEventListener('visibilitychange', update);
    reduced.addEventListener('change', update);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', measure);
      window.removeEventListener('pageshow', measure); document.removeEventListener('visibilitychange', update);
      reduced.removeEventListener('change', update);
    };
  }, []);
  return <div ref={scene} className='moon-journey' aria-hidden='true' data-phase='rising'>
    <div className='journey-sky' />
    <div className='journey-stars'>{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ left: `${3 + (i * 37) % 94}%`, top: `${4 + (i * 17) % 59}%`, opacity: .3 + (i % 4) * .15 }} />)}</div>
    <div className='journey-moon'><div className='moon-disc' /></div>
    <div className='journey-clouds' />
    <div className='journey-rear' />
    <div className='journey-horizon'><Image src='/images/night-city.webp' alt='' fill priority sizes='100vw' /></div>
    <div className='journey-reflection' />
    <div className='journey-foreground' />
  </div>;
}
