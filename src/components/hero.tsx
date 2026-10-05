'use client';

import Image from 'next/image';
import { ArrowDown, ArrowDownToLine, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { profile } from '@/data/profile';

export function Hero() {
  const scene = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      if (reduced.matches || frame) return;
      frame = window.requestAnimationFrame(() => {
        if (scene.current) scene.current.style.setProperty('--parallax', `${Math.min(window.scrollY * 0.09, 48)}px`);
        frame = 0;
      });
    };
    const reset = () => { scene.current?.style.setProperty('--parallax', '0px'); };
    window.addEventListener('scroll', update, { passive: true });
    reduced.addEventListener('change', reset);
    return () => { window.removeEventListener('scroll', update); reduced.removeEventListener('change', reset); window.cancelAnimationFrame(frame); };
  }, []);
  return (
    <section className="hero" aria-labelledby="hero-title" id="home">
      <div className="hero-scene" ref={scene} aria-hidden="true">
        <Image src="/images/night-city.webp" alt="" fill priority sizes="100vw" className="city-image" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="stars" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i key={index} style={{ left: `${6 + ((index * 31) % 88)}%`, top: `${7 + ((index * 13) % 35)}%`, animationDelay: `${index * 0.6}s` }} />)}</div>
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="line" /> ENGINEERING ACROSS BOUNDARIES</p>
          <h1 id="hero-title">Azhar Abdool<span className="name-period">.</span></h1>
          <p className="hero-role">Software &amp; Computer Engineer</p>
          <p className="hero-description">{profile.intro}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">Explore my work <ArrowRight size={17} /></a>
            <a href={profile.cv} className="button button-quiet" aria-label="View general engineering CV">View CV<ArrowDownToLine size={17} /></a>
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub <span className="sr-only">(opens in new tab)</span></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn <span className="sr-only">(opens in new tab)</span></a>
            <a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a>
          </div>
        </div>
        <div className="hero-coordinate" aria-hidden="true"><span>SOFTWARE</span><span>DATA</span><span>HARDWARE</span><i /></div>
        <a className="scroll-cue" href="#about" aria-label="Read about Azhar"><ArrowDown size={17} /><span>Beyond the code</span></a>
      </div>
    </section>
  );
}
