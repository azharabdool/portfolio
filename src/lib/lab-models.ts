export type Job = { id:string; arrival:number; burst:number };
export function schedule(jobs:Job[], policy:'FCFS'|'SJF') {
  const pending=jobs.map(j=>({...j}));
  let clock=Math.min(...pending.map(j=>j.arrival));
  const timeline=[];
  while(pending.length) {
    if(!pending.some(j=>j.arrival<=clock))clock=Math.min(...pending.map(j=>j.arrival));
    const ready=pending.filter(j=>j.arrival<=clock).sort((a,b)=>(policy==='SJF'?a.burst-b.burst:0)||a.arrival-b.arrival||a.id.localeCompare(b.id));
    const job=ready[0]; const start=clock;clock+=job.burst;
    timeline.push({...job,start,end:clock,waiting:start-job.arrival,response:start-job.arrival,turnaround:clock-job.arrival});
    pending.splice(pending.findIndex(j=>j.id===job.id),1);
  }
  return timeline;
}
export function adcToCompare(adc:number) { return Math.floor(Math.max(0,Math.min(4095,adc))*48000/4095); }
