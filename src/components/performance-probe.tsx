'use client';
import { useEffect } from 'react';

export function PerformanceProbe() {
  useEffect(()=>{
    if(typeof PerformanceObserver==='undefined')return;
    let cls=0,sessionScore=0,sessionStart=0,lastShift=0;let longTasks=0;
    if(PerformanceObserver.supportedEntryTypes.includes('layout-shift'))document.documentElement.dataset.cls='0.0000';
    const observers:PerformanceObserver[]=[];
    const observe=(type:string,callback:PerformanceObserverCallback)=>{
      if(!PerformanceObserver.supportedEntryTypes.includes(type))return;
      const observer=new PerformanceObserver(callback);observer.observe({type,buffered:true});observers.push(observer);
    };
    observe('largest-contentful-paint',list=>{
      const entry=list.getEntries().at(-1);if(entry)document.documentElement.dataset.lcpMs=entry.startTime.toFixed(1);
    });
    observe('layout-shift',list=>{
      for(const entry of list.getEntries() as (PerformanceEntry&{hadRecentInput:boolean;value:number})[])if(!entry.hadRecentInput){
        if(!sessionStart||entry.startTime-lastShift>1000||entry.startTime-sessionStart>5000){sessionScore=entry.value;sessionStart=entry.startTime;}else sessionScore+=entry.value;
        lastShift=entry.startTime;cls=Math.max(cls,sessionScore);
      }
      document.documentElement.dataset.cls=cls.toFixed(4);
    });
    observe('longtask',list=>{longTasks+=list.getEntries().length;document.documentElement.dataset.longTasks=String(longTasks);});
    return()=>observers.forEach(o=>o.disconnect());
  },[]);
  return null;
}
