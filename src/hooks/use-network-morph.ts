'use client';
import { useLayoutEffect, type RefObject } from 'react';
import { disciplines, engineeringNodes, hubPosition, networkPosition } from '@/data/engineering-network';
import { lightOrigin, mapReveal, mixPoint } from '@/lib/engineering-map-motion';

export function useNetworkMorph(ref:RefObject<HTMLDivElement|null>,active:boolean,enabled:boolean) {
  useLayoutEffect(()=>{
    const plot=ref.current;
    if(!plot)return;
    const world=plot.closest<HTMLElement>('.homepage-world');
    const skyline=document.querySelector<HTMLElement>('.journey-horizon');
    const anchors=Array.from(plot.querySelectorAll<HTMLElement>('[data-node-index]'));
    const hubs=Array.from(plot.querySelectorAll<SVGGElement>('[data-hub-index]'));
    const dots=Array.from(plot.querySelectorAll<SVGCircleElement>('[data-dot-index]'));
    const paths=Array.from(plot.querySelectorAll<SVGPathElement>('[data-edge-to]'));
    let frame=0;
    // Project the actual skyline-light coordinates into the map's local SVG space.
    const paint=()=>{
      frame=0;
      if(document.hidden)return;
      const bounds=plot.getBoundingClientRect();
      const horizon=skyline?.getBoundingClientRect()??bounds;
      const progress=mapReveal(bounds.top,bounds.height,innerHeight,!enabled);
      const nodes=engineeringNodes.map((_,i)=>mixPoint(lightOrigin(i,horizon,bounds),networkPosition(i),progress));
      const hubPoints=disciplines.map((_,i)=>mixPoint(lightOrigin(i*2,horizon,bounds),hubPosition(i),progress));
      for(const anchor of anchors){const p=nodes[Number(anchor.dataset.nodeIndex)];anchor.style.left=`${p.x/6.8}%`;anchor.style.top=`${p.y/6.4}%`;}
      for(const hub of hubs){const p=hubPoints[Number(hub.dataset.hubIndex)];hub.setAttribute('transform',`translate(${p.x} ${p.y})`);}
      for(const dot of dots){const p=nodes[Number(dot.dataset.dotIndex)];dot.setAttribute('cx',String(p.x));dot.setAttribute('cy',String(p.y));}
      for(const path of paths){const a=hubPoints[Number(path.dataset.edgeFrom)],b=nodes[Number(path.dataset.edgeTo)];path.setAttribute('d',`M${a.x} ${a.y} Q340 320 ${b.x} ${b.y}`);}
      plot.dataset.reveal=progress.toFixed(3);
      plot.style.setProperty('--map-reveal',String(progress));
      const presence=enabled?progress*Math.max(0,Math.min(1,(bounds.bottom+innerHeight*.2)/(innerHeight*.7))):0;
      world?.style.setProperty('--map-presence',String(presence));
    };
    const update=()=>{if(!frame)frame=requestAnimationFrame(paint);};
    paint();
    if(active&&enabled){window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update,{passive:true});}
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update);world?.style.removeProperty('--map-presence');};
  },[ref,active,enabled]);
}
