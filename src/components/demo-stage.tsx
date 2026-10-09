'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import type { DemoSlug } from '@/data/demos';
const loading=()=> <p role='status' className='demo-loading'>Loading instrument…</p>;
const Andre=dynamic(()=>import('./demos/andre'),{loading,ssr:false});
const Words=dynamic(()=>import('./demos/falling-words'),{loading,ssr:false});
const Components=dynamic(()=>import('./demos/connected-components'),{loading,ssr:false});
const Puzzle=dynamic(()=>import('./demos/image-puzzle'),{loading,ssr:false});
const Club=dynamic(()=>import('./demos/concurrent-club'),{loading,ssr:false});
const Rooms=dynamic(()=>import('./four-rooms-replay').then(m=>m.FourRoomsReplay),{loading,ssr:false});
const Algorithm=dynamic(()=>import('./algorithm-explorer').then(m=>m.AlgorithmExplorer),{loading,ssr:false});
const Fourier=dynamic(()=>import('./signal-lab').then(m=>m.FourierLab),{loading,ssr:false});
const Embedded=dynamic(()=>import('./systems-lab').then(m=>m.EmbeddedLab),{loading,ssr:false});
export function DemoStage({slug}:{slug:DemoSlug}) {
  const [open,setOpen]=useState(false);
  const stage=useRef<HTMLElement>(null),interacted=useRef(false);
  useEffect(()=>{if(interacted.current)stage.current?.focus({preventScroll:true});},[open]);
  const toggle=(value:boolean)=>{interacted.current=true;setOpen(value);};
  return <section ref={stage} tabIndex={-1} className='demo-stage' aria-label='Live portfolio demo'><div className='demo-stage-heading'><span className='provenance-badge'>2026 PORTFOLIO RECREATION</span>{open&&<button className='icon-button' aria-label='Close demo' title='Close demo' onClick={()=>toggle(false)}><X size={19}/></button>}</div>{!open?<div className='demo-ready'><span className='eyebrow'>LIVE DEMO</span><button className='button button-primary' onClick={()=>toggle(true)}><Play size={19}/>Open interactive demo</button></div>:slug==='andre'?<Andre/>:slug==='falling-words'?<Words/>:slug==='connected-components'?<Components/>:slug==='image-puzzle'?<Puzzle/>:slug==='concurrent-club'?<Club/>:slug==='four-rooms'?<Rooms/>:slug==='dijkstra'?<Algorithm mode='graph'/>:slug==='virtual-memory'?<Algorithm mode='memory'/>:slug==='fourier'?<Fourier/>:<Embedded/>}</section>;
}
