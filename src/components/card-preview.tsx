import Image from 'next/image';
import type { Project } from '@/data/profile';
import recordings from '@/data/four-rooms-replay.json';
import { schedule } from '@/lib/lab-models';
import { DemoPreview } from './demo-preview';
import { CardMotion } from './card-motion';

const jobs=[{id:'A',arrival:0,burst:7},{id:'B',arrival:0,burst:3},{id:'C',arrival:1,burst:2},{id:'D',arrival:2,burst:4}];

export function CardPreview({ project }: { project: Project }) {
  if(project.visual==='rooms') {
    const episode=recordings[0];
    const route=[episode.start,...episode.trace.map(step=>step.position)];
    const path=route.map(([x,y],i)=>`${i?'L':'M'}${87+x*11} ${29+y*9}`).join(' ');
    return <CardMotion><svg viewBox='0 0 320 180'><text x='10' y='15' className='preview-label'>Q-LEARNING / RECORDED TRAJECTORY</text>{episode.grid.flatMap((row,y)=>row.map((cell,x)=><rect key={`${x}-${y}`} x={82+x*11} y={25+y*9} width='10' height='8' fill={cell===-1?'#7895a355':'#142d38'}/>))}<path d={path} stroke='#dba9c2' strokeWidth='1.3' fill='none'/><circle r='3.5' fill='#e3b7d0' className='preview-agent' style={{offsetPath:`path('${path}')`}}/><text x='10' y='166' className='preview-label'>ORIGINAL RUN / NOT LIVE TRAINING</text></svg></CardMotion>;
  }
  if(project.visual==='vision')return <CardMotion><DemoPreview kind='image'/></CardMotion>;
  if(project.visual==='neural')return <CardMotion><Image src='/images/mnist-predictions.webp' alt='' fill sizes='400px' className='preview-predictions'/><span className='preview-caption'>Held-out predictions / 2026 subset experiment</span></CardMotion>;
  if(project.visual==='embedded')return <CardMotion><svg viewBox='0 0 320 180'><text x='12' y='22' className='preview-label'>ADC → CCR3 → IDEAL PWM</text><path d='M15 130H305 M15 62H305' stroke='#385661'/><path className='preview-duty low' d='M15 62H35V130H85V62H105V130H155V62H175V130H225V62H245V130H295'/><path className='preview-duty high' d='M15 62H65V130H85V62H135V130H155V62H205V130H225V62H275V130H295'/><text x='12' y='162' className='preview-label'>IDEAL DUTY CHANGE / NOT A MEASUREMENT</text></svg></CardMotion>;
  if(project.visual==='systems')return <CardMotion><svg viewBox='0 0 320 180'><text x='10' y='24' className='preview-label'>SAME WORKLOAD / DIFFERENT POLICY</text>{(['FCFS','SJF'] as const).map((policy,index)=><g key={policy} className={`preview-schedule ${index?'alternate':'initial'}`}><text x='10' y='48' className='preview-label'>{policy}</text>{schedule(jobs,policy).map((job)=><g key={job.id}><rect x={10+job.start*18} y='62' width={(job.end-job.start)*18-2} height='38' fill='#abcbd5'/><text x={10+(job.start+job.end)*9} y='87' textAnchor='middle' fill='#12262c' fontSize='14'>{job.id}</text></g>)}</g>)}<text x='10' y='157' className='preview-label'>SYNTHETIC ILLUSTRATION / NON-PREEMPTIVE</text></svg></CardMotion>;
  if(project.visual==='foundry')return <CardMotion><Image src={project.image!} alt='' fill sizes='400px'/><svg viewBox='0 0 320 180' className='preview-foundry-flow'><path className='preview-trace' d='M40 130H160V105H280'/>{[40,160,280].map((x,i)=><circle key={x} className={`preview-flow-node step-${i}`} cx={x} cy={x===160?105:130} r='7' fill='#cce1d1'/>)}<text x='16' y='160' className='preview-label'>DATA / ANALYSIS / INFOGRAPHIC WORKFLOW</text></svg></CardMotion>;
  if(project.visual==='mobile')return <CardMotion><svg viewBox='0 0 320 180'><text x='10' y='24' className='preview-label'>COLLABORATIVE / SOURCE-DERIVED FLOW</text><path className='preview-trace' d='M45 79H270'/>{['AUTH','PROFILE','SESSIONS'].map((label,i)=><g key={label} className={`preview-flow-node step-${i}`}><rect x={10+i*106} y='57' width='89' height='43' fill='#152d36' stroke='#85a7b4'/><text x={54+i*106} y='84' className='preview-label' textAnchor='middle'>{label}</text></g>)}<text x='10' y='158' className='preview-label'>NAVIGATION DIAGRAM / NOT AN APP SCREEN</text></svg></CardMotion>;
  return null;
}
