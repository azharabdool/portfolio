'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Network, Server, Zap } from 'lucide-react';
import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { disciplines, engineeringNodes, hubPosition, networkPosition, type Discipline } from '@/data/engineering-network';
import { useVisibleWork } from '@/hooks/use-visible-work';
import { useNetworkMorph } from '@/hooks/use-network-morph';

const icons=[BrainCircuit,Code2,Server,Cpu,Zap,Network];
const labelled=new Set(['machine-learning-mnist-classifier','reinforcement-learning-four-rooms','foundry-ai-infographic-dashboard','stm32-signal-generation','uct-tutor-marketplace-app','operating-systems-simulations','transformer-build','dijkstra-experiment','networking-p2p-chat-prototype']);

export default function EngineeringMap() {
  const [discipline,setDiscipline]=useState<Discipline>('ai');
  const [selected,setSelected]=useState(engineeringNodes[0].slug);
  const tabs=useRef<(HTMLButtonElement|null)[]>([]);
  const id=useId();
  const {ref,active,enabled,animate}=useVisibleWork();
  useNetworkMorph(ref,active,enabled);
  const node=engineeringNodes.find(item=>item.slug===selected)!;
  const selectedHub=disciplines.find(item=>item.id===node.primary)!;
  const Icon=icons[disciplines.findIndex(item=>item.id===node.primary)];
  const connected=engineeringNodes.filter(item=>item.links.some(link=>link.discipline===discipline)).sort((a,b)=>Number(b.primary===discipline)-Number(a.primary===discipline));
  useEffect(()=>{document.dispatchEvent(new CustomEvent('engineering-district',{detail:node.primary}));},[node.primary]);
  function choose(value:Discipline){setDiscipline(value);setSelected(value==='electrical'?'transformer-build':engineeringNodes.find(item=>item.primary===value)!.slug);}
  function keys(event:KeyboardEvent,index:number){
    const next=event.key==='ArrowRight'?(index+1)%6:event.key==='ArrowLeft'?(index+5)%6:event.key==='Home'?0:event.key==='End'?5:null;
    if(next===null)return;
    event.preventDefault();choose(disciplines[next].id);tabs.current[next]?.focus();
  }
  return <div className='engineering-network' data-animate={animate} style={{'--network-accent':selectedHub.color} as CSSProperties}>
    <div className='network-heading'><h2>Engineering map</h2><span>27 projects / studies</span></div>
    <div className='network-districts' role='tablist' aria-label='Engineering disciplines'>{disciplines.map((item,index)=>{const HubIcon=icons[index];return <button type='button' role='tab' id={`${id}-discipline-${index}`} aria-selected={discipline===item.id} aria-controls={`${id}-network-panel`} tabIndex={discipline===item.id?0:-1} ref={element=>{tabs.current[index]=element;}} key={item.id} onClick={()=>choose(item.id)} onKeyDown={event=>keys(event,index)} style={{'--tab-accent':item.color} as CSSProperties}><HubIcon size={16}/>{item.label}</button>;})}</div>
    <div className='network-workspace' role='tabpanel' id={`${id}-network-panel`} aria-labelledby={`${id}-discipline-${disciplines.findIndex(item=>item.id===discipline)}`}>
      <div className='network-plot' ref={ref}>
        <svg viewBox='0 0 680 640' preserveAspectRatio='none' aria-hidden='true' className='network-lines'>
          <circle cx='340' cy='320' r='170' className='network-orbit'/><circle cx='340' cy='320' r='300' className='network-orbit outer'/>
          {engineeringNodes.flatMap((item,index)=>item.links.map(link=>{const hub=disciplines.findIndex(d=>d.id===link.discipline),a=networkPosition(index),b=hubPosition(hub);return <path key={`${item.slug}-${link.discipline}`} data-edge-from={hub} data-edge-to={index} className={item.slug===selected?'map-edge selected':link.discipline===discipline?'map-edge connected':'map-edge'} style={item.slug===selected?{stroke:disciplines[hub].color}:undefined} d={`M${b.x} ${b.y} Q340 320 ${a.x} ${a.y}`}/>;}))}
          {disciplines.map((item,index)=>{const p=hubPosition(index),related=node.links.some(link=>link.discipline===item.id);return <g data-hub-index={index} transform={`translate(${p.x} ${p.y})`} key={item.id} className={`map-hub ${related?'related':''}`} style={{'--hub-accent':item.color} as CSSProperties}><circle r='28'/><text y='4' textAnchor='middle'>{item.code}</text></g>;})}
          <g className='network-mobile-dots'>{engineeringNodes.map((item,index)=>{const p=networkPosition(index);return <circle data-dot-index={index} key={item.slug} cx={p.x} cy={p.y} r={item.slug===selected?6:3.5} className={item.slug===selected?'selected':item.primary===discipline?'connected':''}/>;})}</g>
          <path className='map-city' d='M295 342V315H306V299H319V325H328V280H344V324H354V305H370V342M286 343H390'/>
        </svg>
        {engineeringNodes.map((item,index)=>{const p=networkPosition(index),related=item.links.some(link=>link.discipline===discipline);return <Link key={item.slug} href={item.href} prefetch={false} data-node-index={index} aria-label={`Open ${item.label}`} title={item.title} className={`map-project ${related?'connected':''} ${item.slug===selected?'selected':''} ${labelled.has(item.slug)?'labelled':''} ${index%2?'label-above':''}`} style={{left:`${p.x/6.8}%`,top:`${p.y/6.4}%`}} onPointerEnter={()=>setSelected(item.slug)} onFocus={()=>setSelected(item.slug)}><span/><span className='map-project-label'>{item.label}</span></Link>;})}
      </div>
      <div className='network-inspector'>
        <div className='network-preview-head'><div className='network-preview-media'>{node.image?<Image src={node.image} alt={node.imageAlt} fill sizes='(max-width:700px) 100px, 330px' loading='lazy'/>:node.previewStages?<svg className='network-flow-preview' viewBox='0 0 300 145' role='img' aria-label={`${node.label}: ${node.previewStages.join(' to ')}`}><path d='M28 38V117' stroke='#7194a3' fill='none'/>{node.previewStages.map((stage,index)=><g key={stage}><circle cx='28' cy={38+index*36} r='4' fill='#b2cdda'/><text x='45' y={42+index*36}>{stage}</text></g>)}<text x='20' y='18' className='flow-caption'>WORKFLOW</text></svg>:<div className='network-preview-symbol'><Icon size={40} strokeWidth={1}/><span>{node.tags.slice(0,2).join(' / ')}</span></div>}</div><div><p className='network-record-meta'>{node.year}{node.credit?` / ${node.credit}`:''}</p><h3>{node.label}</h3></div></div>
        <p className='network-preview-summary'>{node.summary}</p>
        <div className='network-connections'>{node.links.map(link=><button key={link.discipline} type='button' onClick={()=>setDiscipline(link.discipline)} title={link.reason}>{disciplines.find(item=>item.id===link.discipline)!.label}</button>)}</div>
        <Link href={node.href} prefetch={false} className='network-explore'>View project <ArrowUpRight size={16}/></Link>
        <details className='network-reasons' key={node.slug}><summary>Connections</summary><ul>{node.links.map(link=><li key={link.discipline}><strong>{disciplines.find(item=>item.id===link.discipline)!.label}</strong>{link.reason}</li>)}</ul><p>{node.scope}</p></details>
        <div className='network-project-list' aria-label={`${disciplines.find(item=>item.id===discipline)!.label} projects`}>{connected.map(item=><Link href={item.href} prefetch={false} key={item.slug} aria-current={selected===item.slug?'true':undefined} onPointerEnter={()=>setSelected(item.slug)} onFocus={()=>setSelected(item.slug)}>{item.label}<ArrowUpRight size={12}/></Link>)}</div>
      </div>
    </div>
  </div>;
}
