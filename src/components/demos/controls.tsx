'use client';
import { Pause, Play, RotateCcw, StepForward } from 'lucide-react';
export function DemoControls({running,done=false,reduced=false,toggle,step,reset}:{running:boolean;done?:boolean;reduced?:boolean;toggle:()=>void;step:()=>void;reset:()=>void}) {
  return <div className='demo-controls'><button className='button button-primary' disabled={done} onClick={toggle}>{running?<Pause size={17}/>:<Play size={17}/>} {running?'Pause':'Start'}</button><button className='icon-button' aria-label='Step simulation' title='Step simulation' disabled={done} onClick={step}><StepForward size={18}/></button><button className='icon-button' aria-label='Reset simulation' title='Reset simulation' onClick={reset}><RotateCcw size={18}/></button>{reduced&&<span className='evidence-caption'>Reduced motion · transitions off</span>}</div>;
}
