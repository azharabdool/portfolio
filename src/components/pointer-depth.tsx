'use client';
import { useEffect } from 'react';
export function PointerDepth() {
  useEffect(()=>{
    const media=matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let card:HTMLElement|null=null,frame=0,x=0,y=0;
    const clear=()=>{card?.style.removeProperty('--tilt-x');card?.style.removeProperty('--tilt-y');card=null;};
    const paint=()=>{frame=0;if(!card||!media.matches||document.hidden)return;const r=card.getBoundingClientRect();card.style.setProperty('--tilt-x',`${((x-r.left)/r.width-.5)*3}deg`);card.style.setProperty('--tilt-y',`${((y-r.top)/r.height-.5)*-3}deg`);};
    const move=(e:PointerEvent)=>{if(!media.matches)return;const target=(e.target as Element).closest<HTMLElement>('.project-card');if(target!==card){clear();card=target;}x=e.clientX;y=e.clientY;if(card&&!frame)frame=requestAnimationFrame(paint);};
    const leave=(e:PointerEvent)=>{if(!e.relatedTarget)clear();};
    document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerout',leave);media.addEventListener('change',clear);
    return()=>{clear();cancelAnimationFrame(frame);document.removeEventListener('pointermove',move);document.removeEventListener('pointerout',leave);media.removeEventListener('change',clear);};
  },[]);
  return null;
}
