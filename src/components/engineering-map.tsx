'use client';
import Link from 'next/link';
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Network, Server, Zap } from 'lucide-react';
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { disciplines, engineeringNodes, hubPosition, networkPosition, type Discipline } from '@/data/engineering-network';
import { useVisibleWork } from '@/hooks/use-visible-work';

const icons = [BrainCircuit, Code2, Server, Cpu, Zap, Network];
export default function EngineeringMap() {
  const [discipline, setDiscipline] = useState<Discipline>('ai');
  const [selected, setSelected] = useState(engineeringNodes[0].slug);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const { ref, animate } = useVisibleWork();
  const hub = disciplines.find(item => item.id === discipline)!;
  const node = engineeringNodes.find(item => item.slug === selected)!;
  const connected = engineeringNodes.filter(item => item.links.some(link => link.discipline === discipline)).sort((a,b)=>Number(b.primary===discipline)-Number(a.primary===discipline));
  function choose(value: Discipline) {
    setDiscipline(value);
    setSelected(engineeringNodes.find(item => item.primary === value)!.slug);
    document.dispatchEvent(new CustomEvent('engineering-district', {detail:value}));
  }
  function keys(event: KeyboardEvent, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 6 : event.key === 'ArrowLeft' ? (index + 5) % 6 : event.key === 'Home' ? 0 : event.key === 'End' ? 5 : null;
    if (next === null) return;
    event.preventDefault(); choose(disciplines[next].id); tabs.current[next]?.focus();
  }
  return <div className='engineering-network' data-animate={animate} style={{'--network-accent':hub.color} as CSSProperties}>
    <div className='network-heading'><div><p className='eyebrow'>THE ENGINEERING MAP / 27 CONNECTED STUDIES</p><h2>Different disciplines.<br/><span>Shared foundations.</span></h2></div><p>One system. Six ways into the work.</p></div>
    <div className='network-districts' role='tablist' aria-label='Engineering disciplines'>{disciplines.map((item,index)=>{const Icon=icons[index];return <button type='button' role='tab' id={`${id}-discipline-${index}`} aria-selected={discipline===item.id} aria-controls={`${id}-network-panel`} tabIndex={discipline===item.id?0:-1} ref={element=>{tabs.current[index]=element;}} key={item.id} onClick={()=>choose(item.id)} onKeyDown={event=>keys(event,index)}><Icon size={17}/>{item.label}</button>;})}</div>
    <div className='network-workspace' role='tabpanel' id={`${id}-network-panel`} aria-labelledby={`${id}-discipline-${disciplines.findIndex(item=>item.id===discipline)}`}>
      <div className='network-plot' ref={ref}>
        <svg viewBox='0 0 680 640' preserveAspectRatio='none' aria-hidden='true' className='network-lines'>
          <circle cx='340' cy='320' r='170' className='network-orbit'/><circle cx='340' cy='320' r='300' className='network-orbit outer'/>
          {engineeringNodes.flatMap((item,index)=>item.links.map(link=>{const a=networkPosition(index),b=hubPosition(disciplines.findIndex(d=>d.id===link.discipline));return <path key={`${item.slug}-${link.discipline}`} className={item.slug===selected?'map-edge selected':link.discipline===discipline?'map-edge connected':'map-edge'} d={`M${b.x} ${b.y} Q340 320 ${a.x} ${a.y}`}/>;}))}
          {disciplines.map((item,index)=>{const p=hubPosition(index);return <g key={item.id} className={item.id===discipline?'map-hub selected':'map-hub'}><path d={`M340 320 L${p.x} ${p.y}`}/><circle cx={p.x} cy={p.y} r='28'/><text x={p.x} y={p.y+4} textAnchor='middle'>{item.code}</text></g>;})}
          <path className='map-city' d='M295 342V315H306V299H319V325H328V280H344V324H354V305H370V342M286 343H390'/><text x='340' y='370' textAnchor='middle' className='map-centre-label'>ONE FOUNDATION</text>
        </svg>
        {engineeringNodes.map((item,index)=>{const p=networkPosition(index);const related=item.links.some(link=>link.discipline===discipline);return <button type='button' key={item.slug} title={item.title} aria-label={`Inspect ${item.label}`} aria-pressed={item.slug===selected} className={`map-project ${related?'connected':''} ${item.slug===selected?'selected':''}`} style={{left:`${p.x/6.8}%`,top:`${p.y/6.4}%`}} onClick={()=>{setSelected(item.slug);if(!related)setDiscipline(item.primary);}}><span/><span className='map-project-label'>{item.label}</span></button>;})}
        <span className='network-coordinate'>SOURCE / CONCEPT / CONNECTION</span>
      </div>
      <div className='network-inspector'><p className='eyebrow'>{hub.label.toUpperCase()}</p><p className='network-statement'>{hub.statement}</p><div className='network-project-list' aria-label={`${hub.label} projects`}>{connected.map(item=><button type='button' key={item.slug} aria-pressed={selected===item.slug} onClick={()=>setSelected(item.slug)}>{item.label}<span>{item.links.length>1?'↗':'·'}</span></button>)}</div>
        <div className='network-evidence' key={node.slug}><h3>{node.title}</h3><p>{node.summary}</p><ul>{node.links.map(link=><li key={link.discipline}><button className='connection-jump' type='button' aria-label={`Follow connection to ${disciplines.find(item=>item.id===link.discipline)!.label}`} onClick={()=>{setDiscipline(link.discipline);document.dispatchEvent(new CustomEvent('engineering-district',{detail:link.discipline}));}}>{disciplines.find(item=>item.id===link.discipline)!.label}<ArrowUpRight size={13}/></button>{link.reason}</li>)}</ul><Link href={node.href} className='network-explore'>Explore the work <ArrowUpRight size={17}/></Link></div>
      </div>
    </div>
    <div className='network-bottom'><span>10 major projects · 17 engineering studies</span><Link href='/lab/'>The full engineering archive <ArrowUpRight size={15}/></Link></div>
  </div>;
}
