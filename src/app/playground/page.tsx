import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { demos } from '@/data/demos';
import { DemoPreview } from '@/components/demo-preview';
import { pageMetadata } from '@/lib/seo';
export const metadata=pageMetadata('Interactive Engineering Lab','Play Azhar Abdool’s browser recreations of UCT scheduling, typing, graph search, reinforcement-learning replay, image processing, signals and memory projects.','/playground/');
export default function Playground() {
  return <article className='container project-detail playground-page'><p className='eyebrow'>AZHAR ABDOOL / INTERACTIVE ENGINEERING LAB</p><h1>Engineering,<br/>in motion.</h1><p className='lead'>Queues to shortest paths. Pixels to signals. Take the controls.</p><div className='inventory-line'><span>{demos.length} INTERACTIVE EXPERIENCES</span><Link href='/projects/'>Major projects <ArrowUpRight size={15}/></Link><Link href='/lab/'>Historical Engineering Lab <ArrowUpRight size={15}/></Link></div><div className='demo-grid'>{demos.map(d=><Link href={`/playground/${d.slug}/`} className='demo-card' key={d.slug}><DemoPreview kind={d.kind}/><div><p className='eyebrow'>{d.verb}</p><h2>{d.title}<ArrowUpRight size={19}/></h2><p>{d.summary}</p><small>{d.origin}</small></div></Link>)}</div><p className='evidence-caption'>Browser recreations are new portfolio work, not the original Java, C++, Python or embedded applications. Recorded Four Rooms episodes remain genuine execution evidence. Each experience links to its historical case study.</p></article>;
}
