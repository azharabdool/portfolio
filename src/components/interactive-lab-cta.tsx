import Link from 'next/link';
import { ArrowUpRight, FlaskConical, Play } from 'lucide-react';
import { DemoPreview } from './demo-preview';
import { demos } from '@/data/demos';
import { projects } from '@/data/profile';
import { archiveProjects } from '@/data/engineering-archive';
export function InteractiveLabCTA() {
  return <section id='engineering-archive' className='interactive-lab-cta'><div className='lab-cta-intro'><p className='eyebrow'>ENGINEERING, IN MOTION</p><h3>Look closer.<br/>Then take the controls.</h3><p>{projects.length} major projects. {archiveProjects.length} engineering studies.<br/>{demos.length} interactive browser experiences.</p><div className='lab-cta-links'><Link className='button button-primary' href='/playground/'><Play size={17}/>Play the demos<ArrowUpRight size={17}/></Link><Link className='button button-quiet' href='/lab/'><FlaskConical size={17}/>Engineering Lab</Link><Link className='back-link' href='/projects/'>All projects<ArrowUpRight size={17}/></Link></div></div><div className='lab-cta-previews'>{[{kind:'threads',label:'QUEUE / SERVICE'},{kind:'rooms',label:'STATE / ACTION'},{kind:'signals',label:'HARMONICS / SIGNAL'}].map(p=><Link href={`/playground/${p.kind==='threads'?'andre':p.kind==='rooms'?'four-rooms':'fourier'}/`} key={p.kind}><DemoPreview kind={p.kind}/><span>{p.label}</span></Link>)}</div></section>;
}
