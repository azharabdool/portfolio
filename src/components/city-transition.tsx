'use client';

import Link from 'next/link';
import { ArrowUpRight, BrainCircuit, Code2, Cpu, Network, Server } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const districts = [
  {name:'AI & Data', title:'From pixels to predictions', stack:'PyTorch / preprocessing / evaluation', slug:'machine-learning-mnist-classifier', Icon:BrainCircuit, x:240,y:340},
  {name:'Software', title:'Connecting students and tutors', stack:'React Native / Expo / Firebase', slug:'uct-tutor-marketplace-app', Icon:Code2, x:440,y:250},
  {name:'Embedded', title:'Signals beyond the screen', stack:'STM32 / timers / DMA / PWM', slug:'stm32-signal-generation', Icon:Cpu, x:650,y:330},
  {name:'Systems', title:'Understanding contention', stack:'Java / queues / memory translation', slug:'operating-systems-simulations', Icon:Server, x:830,y:220},
  {name:'Security & Networks', title:'Control plane. Peer data.', stack:'TCP / UDP / protocol limitations', slug:'networking-p2p-chat-prototype', Icon:Network, x:1040,y:310},
];
export function CityTransition() {
  const section=useRef<HTMLElement>(null);
  const [selected,setSelected]=useState(0);
  useEffect(()=>{
    const reduced=matchMedia('(prefers-reduced-motion: reduce)');
    let visible=false, frame=0;
    const update=()=>{
      if(frame||!visible||reduced.matches)return;
      frame=requestAnimationFrame(()=>{
        const node=section.current;
        if(node){const rect=node.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(rect.height+innerHeight*.2)));node.style.setProperty('--story',progress.toFixed(3));}
        frame=0;
      });
    };
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;update();});
    if(section.current)observer.observe(section.current);
    const reset=()=>{section.current?.style.setProperty('--story',reduced.matches?'1':'.15');update();};
    reset();
    window.addEventListener('scroll',update,{passive:true});reduced.addEventListener('change',reset);
    return()=>{observer.disconnect();window.removeEventListener('scroll',update);reduced.removeEventListener('change',reset);cancelAnimationFrame(frame);};
  },[]);
  const district=districts[selected];
  return <section className="city-story" ref={section} aria-labelledby="city-story-title">
    <div className="city-stage">
      <div className="city-story-shade" aria-hidden="true"/>
      <div className="city-introduction container"><p className="eyebrow">ONE CONNECTED FOUNDATION</p><h2 id="city-story-title">Every system.<br/><span>A different perspective.</span></h2><p>Software, intelligence and the physical world.</p></div>
      <svg className="city-network" viewBox="0 0 1200 550" role="img" aria-label={`Engineering districts connected: ${district.name} selected`}>
        {districts.slice(1).map((node,i)=><path className="network-wire" pathLength="1" key={node.name} d={`M${districts[i].x} ${districts[i].y} C${districts[i].x+70} ${districts[i].y-80},${node.x-80} ${node.y-80},${node.x} ${node.y}`}/>)}
        {districts.map((node,i)=><g key={node.name} className={selected===i?'district-node selected':'district-node'}><circle cx={node.x} cy={node.y} r="16"/><circle className="node-core" cx={node.x} cy={node.y} r="4"/><path d={`M${node.x} ${node.y+17} V${node.y+48}`}/></g>)}
      </svg>
      <div className="city-console container">
        <div className="district-tabs" role="group" aria-label="Engineering districts">{districts.map(({name,Icon},i)=><button key={name} aria-pressed={selected===i} onClick={()=>setSelected(i)}><Icon size={18}/><span>{name}</span></button>)}</div>
        <div className="district-preview" aria-live="polite"><div><span className="eyebrow">0{selected+1} / {district.name.toUpperCase()}</span><h3>{district.title}</h3><p>{district.stack}</p></div><Link href={`/projects/${district.slug}/`}>Explore project <ArrowUpRight size={20}/></Link></div>
      </div>
    </div>
  </section>;
}
