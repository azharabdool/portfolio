'use client';

import Link from 'next/link';
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Pause, Play, Server, ShieldCheck } from 'lucide-react';
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { cityDistricts, cityWirePath } from '@/data/city-districts';
import { useMotionPreference } from '@/hooks/use-motion-preference';

const icons = [BrainCircuit, Code2, Cpu, Server, ShieldCheck];

export function CityTransition() {
  const section = useRef<HTMLElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const id = useId();
  const { enabled, explicit, toggle } = useMotionPreference();
  useEffect(() => {
    const node = section.current;
    if (!node) return;
    let visible = false, frame = 0;
    const update = () => {
      node.dataset.active = String(visible && !document.hidden);
      if (frame || !visible || document.hidden) return;
      frame = requestAnimationFrame(() => {
        const rect = node.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, (innerHeight - rect.top) / (rect.height + innerHeight)));
        node.style.setProperty('--story', progress.toFixed(3));
        frame = 0;
      });
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(node);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    document.addEventListener('visibilitychange', update);
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      document.removeEventListener('visibilitychange', update);
    };
  }, []);
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % cityDistricts.length : event.key === 'ArrowLeft' ? (index + cityDistricts.length - 1) % cityDistricts.length : event.key === 'Home' ? 0 : event.key === 'End' ? cityDistricts.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
  };
  const district = cityDistricts[selected];
  return <section className='city-story' ref={section} aria-labelledby='city-story-title' data-motion={enabled ? 'play' : 'paused'} data-explicit-motion={explicit} style={{ '--district-accent': district.color } as CSSProperties}>
    <div className='city-stage'>
      <div className='city-story-shade' aria-hidden='true'/>
      <div className='city-introduction container'><p className='eyebrow'>ONE CONNECTED FOUNDATION</p><h2 id='city-story-title'>Every system.<br/><span>A different perspective.</span></h2><p>Software, intelligence and the physical world.</p></div>
      <div className='city-map container'>
        <svg className='city-network' viewBox='0 0 1000 160' role='img' aria-label={`Engineering districts connected: ${district.name} selected`}>
          {cityDistricts.slice(0, -1).map((node, index) => <g key={node.code} style={{ '--wire-accent': node.color } as CSSProperties}><path className='network-wire' d={cityWirePath(index)}/>{(selected === index || selected === index + 1) && <path key={`${selected}-${index}`} className='network-signal' pathLength='1' d={cityWirePath(index)}/>}</g>)}
          {cityDistricts.map((node, index) => <g key={node.name} className={selected === index ? 'district-node selected' : 'district-node'} style={{ '--node-accent': node.color } as CSSProperties}><title>{`${node.name}${selected === index ? ': selected' : ''}`}</title><circle cx={node.x} cy={node.y} r='16'/><circle className='node-core' cx={node.x} cy={node.y} r='4'/><path d={`M${node.x} ${node.y + 17} V${node.y + 33}`}/><text x={node.x} y={node.y + 49} textAnchor='middle'>{node.code}</text></g>)}
        </svg>
        <button className='signal-toggle' type='button' aria-pressed={enabled} aria-label={enabled ? 'Pause city signals' : 'Play city signals'} title={enabled ? 'Pause city signals' : 'Play city signals'} onClick={toggle}>{enabled ? <Pause size={15}/> : <Play size={15}/>}</button>
      </div>
      <div className='city-console container'>
        <div className='district-tabs' role='tablist' aria-label='Engineering districts'>{cityDistricts.map((item, index) => { const Icon = icons[index]; return <button type='button' key={item.name} ref={node => { tabs.current[index] = node; }} role='tab' id={`${id}-district-${index}`} aria-controls={`${id}-district-panel`} aria-selected={selected === index} tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => onKey(event, index)} style={{ '--tab-accent': item.color } as CSSProperties}><Icon size={18}/><span>{item.name}</span></button>; })}</div>
        <div className='district-preview' role='tabpanel' id={`${id}-district-panel`} aria-labelledby={`${id}-district-${selected}`} tabIndex={0}>
          <div className='district-overview'><span className='eyebrow'>{String(selected + 1).padStart(2, '0')} / {district.name.toUpperCase()}</span><h3>{district.title}</h3><p>{district.summary}</p><Link className='district-primary-link' href={district.href}>Explore project <ArrowUpRight size={18}/></Link></div>
          <div className='district-details'><dl><div><dt>Tools & methods</dt><dd>{district.tools.join(' / ')}</dd></div><div><dt>Engineering foundations</dt><dd>{district.theory.join(' / ')}</dd></div></dl><p className='district-evidence'>{district.evidence}</p><div className='district-related'>{district.related.map(item => <Link href={item.href} key={item.href}>{item.label}<ArrowUpRight size={14}/></Link>)}</div></div>
        </div>
      </div>
    </div>
  </section>;
}
