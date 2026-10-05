'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function CityTransition() {
  const section=useRef<HTMLElement>(null);
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let active=false; let frame=0;
    const update=()=>{if(!active||frame||reduced.matches)return;frame=requestAnimationFrame(()=>{const rect=section.current?.getBoundingClientRect();if(rect&&section.current){const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height)));section.current.style.setProperty('--depth',String(progress));}frame=0;});};
    const observer=new IntersectionObserver(([entry])=>{active=entry.isIntersecting;if(active)update();});
    if(section.current)observer.observe(section.current);
    const reset=()=>section.current?.style.setProperty('--depth','0.5');
    window.addEventListener('scroll',update,{passive:true});reduced.addEventListener('change',reset);
    return()=>{observer.disconnect();window.removeEventListener('scroll',update);reduced.removeEventListener('change',reset);cancelAnimationFrame(frame);};
  },[]);
  return <section className="city-transition" ref={section} aria-label="Engineering disciplines"><div className="transition-scene" aria-hidden="true"><Image src="/images/night-city.webp" alt="" fill sizes="100vw"/><svg viewBox="0 0 1200 350" preserveAspectRatio="none"><path d="M0 295 H180 L290 210 H460 L580 270 H790 L920 180 H1200"/><path d="M0 320 H260 L430 250 H690 L840 300 H1200"/></svg></div><div className="container transition-copy"><p className="eyebrow">CONNECTED BY ENGINEERING</p><h2>Software. Data.<br/>The physical world.</h2><div className="transition-nodes"><span>INTELLIGENCE</span><span>SYSTEMS</span><span>SIGNALS</span></div></div></section>;
}
