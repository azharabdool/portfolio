import Link from 'next/link';
import { Play, ArrowUpRight } from 'lucide-react';
import { demos } from '@/data/demos';
export function DemoLink({study}:{study:string}) { const matches=demos.filter(d=>d.study===study);return matches.length?<section className='study-demo-links'><p className='eyebrow'>2026 PORTFOLIO RECREATIONS</p>{matches.map(d=><Link className='button button-quiet' href={`/playground/${d.slug}/`} key={d.slug}><Play size={17}/>{d.title}<ArrowUpRight size={17}/></Link>)}</section>:null; }
