'use client';
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
const subscribe = (callback:()=>void) => { const q=matchMedia('(prefers-reduced-motion: reduce)');q.addEventListener('change',callback);return()=>q.removeEventListener('change',callback); };
export function useDemoClock(running: boolean, interval: number, tick: ()=>void) {
  const [node,setNode]=useState<HTMLDivElement|null>(null), callback=useRef(tick);
  const [visible,setVisible]=useState(false), [foreground,setForeground]=useState(true);
  const ref=useCallback((element:HTMLDivElement|null)=>{setNode(element);setForeground(!document.hidden);},[]);
  const reduced=useSyncExternalStore(subscribe,()=>matchMedia('(prefers-reduced-motion: reduce)').matches,()=>true);
  useEffect(()=>{callback.current=tick;},[tick]);
  useEffect(()=>{
    if(!node)return;
    const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.05});observer.observe(node);
    const visibility=()=>setForeground(!document.hidden);document.addEventListener('visibilitychange',visibility);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
  },[node]);
  useEffect(()=>{if(!running||!visible||!foreground||reduced)return;const timer=setInterval(()=>callback.current(),interval);return()=>clearInterval(timer);},[running,interval,visible,foreground,reduced]);
  return {ref,reduced,active:running&&visible&&foreground&&!reduced};
}
