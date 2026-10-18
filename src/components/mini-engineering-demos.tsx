'use client';
import Link from 'next/link';
import { ArrowRight, Pause, Play, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import replay from '@/data/four-rooms-replay.json';
import { adcToCompare, schedule } from '@/lib/lab-models';
import { useVisibleWork } from '@/hooks/use-visible-work';

const episode = replay[0];
const jobs = [{id:'A',arrival:0,burst:7},{id:'B',arrival:0,burst:3},{id:'C',arrival:1,burst:2},{id:'D',arrival:2,burst:4}];
export default function MiniEngineeringDemos() {
  const { ref, active, enabled } = useVisibleWork<HTMLElement>();
  const [playback, setPlaying] = useState<boolean|null>(null);
  const playing = playback ?? enabled;
  const [step, setStep] = useState(0);
  const [policy, setPolicy] = useState<'FCFS'|'SJF'>('FCFS');
  const [adc, setAdc] = useState(2048);
  useEffect(()=>{if(!active||!playing)return;const timer=setInterval(()=>setStep(value=>(value+1)%episode.trace.length),220);return()=>clearInterval(timer);},[active,playing]);
  const position = episode.trace[step].position;
  const timeline = schedule(jobs,policy);
  const duty = adcToCompare(adc)/48000;
  const pwm = Array.from({length:5},(_,i)=>`M${10+i*58} 110 V45 H${10+i*58+58*duty} V110 H${10+(i+1)*58}`).join(' ');
  return <div className='mini-demos' data-animate={active&&playing}>
    <div className='motion-heading'><div><p className='eyebrow'>ENGINEERING, IN MOTION</p><h2>Take the controls.</h2></div><p>Models. Queues. Signals.</p></div>
    <div className='mini-demo-grid'>
      <article className='mini-demo' ref={ref}><div className='mini-demo-title'><h3>Learn a route.</h3><span>01 / Q-LEARNING</span></div><div className='mini-instrument room-instrument'><svg viewBox='0 0 300 160' role='img' aria-label={`Recorded Four Rooms agent at ${position.join(', ')}`}><g transform='translate(85 4)'>{episode.grid.flatMap((row,y)=>row.map((cell,x)=><rect key={`${x}-${y}`} x={x*12} y={y*12} width='11' height='11' rx='1' fill={cell===-1?'#647d85':'#14272d'}/>))}{episode.packages.map((p,i)=><rect key={i} x={p[0]*12+3} y={p[1]*12+3} width='5' height='5' fill='#df9dbd'/>)}<circle cx={position[0]*12+5.5} cy={position[1]*12+5.5} r='4.5' fill='#eff5f3'/></g></svg></div><div className='mini-controls'><button type='button' className='icon-button' aria-label={playing?'Pause recorded route':'Play recorded route'} onClick={()=>setPlaying(!playing)}>{playing?<Pause size={15}/>:<Play size={15}/>}</button><button type='button' className='icon-button' aria-label='Restart recorded route' onClick={()=>setStep(0)}><RotateCcw size={15}/></button><span>RECORDED STEP {step+1}</span></div><p className='mini-provenance'>Original agent trajectory. Not live training.</p><Link href='/playground/four-rooms/'>Play Four Rooms <ArrowRight size={16}/></Link></article>
      <article className='mini-demo'><div className='mini-demo-title'><h3>Change the order.</h3><span>02 / SCHEDULING</span></div><div className='mini-instrument'><svg viewBox='0 0 300 160' role='img' aria-label={`${policy} service order ${timeline.map(job=>job.id).join(', ')}`}><path d='M12 115H290' stroke='#506671'/>{timeline.map((job,index)=><g className='mini-job' key={job.id} style={{transform:`translateX(${12+job.start*17}px)`}}><rect y='53' width={job.burst*17-3} height='44' fill={['#b4d7e4','#8aa6c1','#c6b6bf','#acc6c4'][index]}/><text x={job.burst*8.5-1} y='80' textAnchor='middle' fill='#0b1820'>{job.id}</text></g>)}<text x='12' y='141' className='mini-svg-label'>0</text><text x='284' y='141' className='mini-svg-label'>16</text></svg></div><div className='mini-controls policy-switch' role='group' aria-label='Mini scheduling policy'>{(['FCFS','SJF'] as const).map(value=><button type='button' aria-pressed={policy===value} onClick={()=>setPolicy(value)} key={value}>{value}</button>)}</div><p className='mini-provenance'>Synthetic workload. Corrected timing model.</p><Link href='/playground/andre/'>Run Andre <ArrowRight size={16}/></Link></article>
      <article className='mini-demo'><div className='mini-demo-title'><h3>Shape a signal.</h3><span>03 / ADC → PWM</span></div><div className='mini-instrument'><svg viewBox='0 0 310 160' role='img' aria-label={`Ideal PWM duty cycle ${(duty*100).toFixed(1)} percent`}><path d='M10 45H300M10 110H300' stroke='#314a54'/><path d={pwm} fill='none' stroke='#d69ca5' strokeWidth='2'/><text x='10' y='142' className='mini-svg-label'>CCR3 {adcToCompare(adc)}</text><text x='300' y='142' textAnchor='end' className='mini-svg-label'>{(duty*100).toFixed(1)}% DUTY</text></svg></div><div className='mini-controls'><label htmlFor='mini-adc'>ADC</label><input id='mini-adc' aria-label='Mini ADC input' type='range' min='0' max='4095' value={adc} onChange={event=>setAdc(Number(event.target.value))}/><output>{adc}</output></div><p className='mini-provenance'>Source-derived mapping. Ideal, not measured.</p><Link href='/playground/stm32/'>Explore signals <ArrowRight size={16}/></Link></article>
    </div><Link className='motion-all' href='/playground/'>Explore all 10 interactive demos <ArrowRight size={18}/></Link>
  </div>;
}
