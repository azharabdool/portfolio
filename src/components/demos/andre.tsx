'use client';
import { useState } from 'react';
import { Martini, UserRound } from 'lucide-react';
import { schedule, type Job } from '@/lib/lab-models';
import { useDemoClock } from './use-demo-clock';
import { DemoControls } from './controls';
const initial:Job[]=[{id:'A',arrival:0,burst:7},{id:'B',arrival:0,burst:3},{id:'C',arrival:1,burst:2},{id:'D',arrival:2,burst:4}];
export default function Andre() {
  const [jobs,setJobs]=useState(initial),[policy,setPolicy]=useState<'FCFS'|'SJF'>('FCFS'),[time,setTime]=useState(0),[running,setRunning]=useState(false);
  const timeline=schedule(jobs,policy),end=timeline.at(-1)!.end;
  const serving=timeline.find(j=>time>=j.start&&time<j.end),done=timeline.filter(j=>j.end<=time),begun=timeline.filter(j=>j.start<=time);
  const queue=timeline.filter(j=>j.arrival<=time&&j.start>time);
  const reset=()=>{setTime(0);setRunning(false);};
  const advance=()=>setTime(t=>Math.min(end,t+.25));
  const {ref:demoRef,reduced,active}=useDemoClock(running&&time<end,200,advance);
  const mean=(list:typeof timeline,key:'waiting'|'response'|'turnaround')=>list.length?(list.reduce((s,j)=>s+j[key],0)/list.length).toFixed(2):'—';
  const edit=(index:number,key:'arrival'|'burst',value:number)=>{reset();setJobs(jobs.map((j,i)=>i===index?{...j,[key]:Math.max(key==='burst'?1:0,Math.min(16,Math.round(value)||0))}:j));};
  return <div ref={demoRef} className='demo-instrument andre-demo'>
    <div className='demo-toolbar'><div><p className='eyebrow'>ANDRE&apos;S BAR</p><h2>Scheduling under contention.</h2></div><div className='segmented' aria-label='Scheduling policy'>{(['FCFS','SJF'] as const).map(p=><button key={p} aria-pressed={policy===p} onClick={()=>{setPolicy(p);reset();}}>{p}</button>)}</div></div>
    <div className='bar-scene'><div className='bar-sign'>ANDRE&apos;S <span>NON-PREEMPTIVE SERVICE</span></div><div className='bar-counter'><div className='bartender'><UserRound size={35}/><span>BARMAN</span></div><div className='active-order'><Martini size={30}/><strong>{serving?`Order ${serving.id}`:time>=end?'All served':'Counter idle'}</strong><progress aria-label='Current service progress' max={serving?.burst??1} value={serving?time-serving.start:0}/><span>{serving?`${(time-serving.start).toFixed(2)} / ${serving.burst} time units`:'—'}</span></div></div><div className='patron-lanes'>{jobs.map(j=>{const row=timeline.find(x=>x.id===j.id)!;const status=time<j.arrival?'incoming':time<row.start?'waiting':time<row.end?'serving':'left';return <div key={j.id} className={`patron ${status}`}><UserRound size={25}/><strong>Patron {j.id}</strong><span>{status}</span><small>{j.burst}u order</small></div>;})}</div><div className='queue-strip'><span>QUEUE</span>{queue.length?queue.map(j=><span className='order-ticket' key={j.id}>{j.id} · {j.burst}u</span>):<span>Empty</span>}</div></div>
    <div className='demo-status' role='status'>Time {time.toFixed(2)} · {done.length}/{jobs.length} completed · {serving?`Serving ${serving.id}`:'No active order'}</div>
    <DemoControls running={active} reduced={reduced} done={time>=end} toggle={()=>setRunning(!running)} step={()=>{setRunning(false);setTime(t=>Math.min(end,t+1));}} reset={reset}/>
    <label className='demo-range'>Patrons <strong>{jobs.length}</strong><input aria-label='Patron count' type='range' min='2' max='6' value={jobs.length} onChange={e=>{reset();const count=Number(e.target.value);setJobs(Array.from({length:count},(_,i)=>jobs[i]??{id:String.fromCharCode(65+i),arrival:i,burst:3}));}}/></label>
    <div className='job-inputs'>{jobs.map((j,i)=><div key={j.id}><strong>Order {j.id}</strong><label>Arrival<input aria-label={`Arrival ${j.id}`} type='number' min='0' max='16' value={j.arrival} onChange={e=>edit(i,'arrival',Number(e.target.value))}/></label><label>Service<input aria-label={`Service ${j.id}`} type='number' min='1' max='16' value={j.burst} onChange={e=>edit(i,'burst',Number(e.target.value))}/></label></div>)}</div>
    <svg viewBox='0 0 600 85' className='gantt-chart' role='img' aria-label={`${policy} service order ${timeline.map(j=>j.id).join(', ')}`}>{timeline.map((j,i)=><g key={j.id}><rect x={j.start/end*580+10} y='15' width={j.burst/end*580-2} height='35' fill={['#00d9ff','#ff719f','#97dab3','#b3a1ff','#e6c8a8','#83b7f2'][i]}/><text x={(j.start+j.burst/2)/end*580+10} y='38' textAnchor='middle' fill='#06111a'>{j.id}</text><text x={j.start/end*580+10} y='73' fill='#c6d8e2' fontSize='12'>{j.start}</text></g>)}<line x1={time/end*580+10} x2={time/end*580+10} y1='5' y2='57' stroke='#fff' strokeWidth='2'/></svg>
    <div className='lab-readouts'><div>MEAN WAIT / STARTED<strong>{mean(begun,'waiting')}</strong></div><div>MEAN RESPONSE / STARTED<strong>{mean(begun,'response')}</strong></div><div>MEAN TURNAROUND / DONE<strong>{mean(done,'turnaround')}</strong></div><div>THROUGHPUT / ELAPSED<strong>{time>Math.min(...jobs.map(j=>j.arrival))?(done.length/(time-Math.min(...jobs.map(j=>j.arrival)))).toFixed(3):'—'}</strong></div></div>
    <p className='evidence-caption'>Synthetic inputs, arbitrary time units. Means use started or completed orders as labelled; throughput is completions per elapsed unit since first arrival. Response equals waiting for this non-preemptive model. The original submission exposed timing-accounting issues during the 2026 recovery. This browser recreation uses corrected metric boundaries.</p>
  </div>;
}
