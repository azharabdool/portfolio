'use client';
import { useState } from 'react';
import { UserRound } from 'lucide-react';
import { clubState } from '@/lib/playground-models';
import { useDemoClock } from './use-demo-clock';
import { DemoControls } from './controls';
export default function ConcurrentClub() {
  const [time,setTime]=useState(0),[capacity,setCapacity]=useState(4),[count,setCount]=useState(12),[running,setRunning]=useState(false);
  const patrons=clubState(time,capacity,count),end=Math.max(...patrons.map(p=>p.leave));
  const {ref:demoRef,reduced,active}=useDemoClock(running&&time<end,250,()=>setTime(t=>Math.min(end,t+.5)));
  const reset=()=>{setTime(0);setRunning(false);};
  return <div ref={demoRef} className='demo-instrument'><div className='demo-toolbar'><div><p className='eyebrow'>CAPACITY / ADMISSION / RELEASE</p><h2>The concurrent club.</h2></div><span>t = {time.toFixed(1)}</span></div><div className='demo-sliders'><label>Capacity <strong>{capacity}</strong><input aria-label='Club capacity' type='range' min='1' max='8' value={capacity} onChange={e=>{setCapacity(Number(e.target.value));reset();}}/></label><label>Patrons <strong>{count}</strong><input aria-label='Club patron count' type='range' min='4' max='20' value={count} onChange={e=>{setCount(Number(e.target.value));reset();}}/></label></div><div className='club-scene'><div className='club-bar'>BAR / SHARED SPACE</div><div className='club-grid'>{patrons.filter(p=>p.status==='inside').map(p=><div className='club-patron' key={p.id} style={{gridColumn:1+(p.id%4),gridRow:1+Math.floor((p.id%8)/4)}}><UserRound size={22}/><span>{p.id}</span></div>)}</div><div className='club-door'>ENTRANCE <span>{patrons.filter(p=>p.status==='waiting').map(p=>`#${p.id}`).join(' · ')||'Queue empty'}</span></div></div><div className='lab-readouts'>{['waiting','inside','left'].map(status=><div key={status}>{status.toUpperCase()}<strong>{patrons.filter(p=>p.status===status).length}</strong></div>)}</div><DemoControls running={active} reduced={reduced} done={time>=end} toggle={()=>setRunning(!running)} step={()=>{setRunning(false);setTime(t=>Math.min(end,t+1));}} reset={reset}/><div className='demo-comparison'><div><strong>ORIGINAL JAVA</strong><p>Threads, synchronisation, atomic counters and Swing grid rendering.</p></div><div><strong>BROWSER RECREATION</strong><p>Single-threaded event schedule. Synthetic arrival every 2 units; stays of 8, 10 or 12 units. Capacity constrains admission.</p></div></div></div>;
}
