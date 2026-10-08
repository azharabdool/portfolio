import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/profile';
import { archiveProjects } from '@/data/engineering-archive';
import { ProjectCard } from './project-card';

export function EngineeringSpotlights() {
  return <div className='engineering-spotlights'><div className='spotlight-heading'><p className='eyebrow'>ENGINEERING SPOTLIGHTS</p><h3>Data, pixels, graphs and real hardware.</h3></div><div className='spotlight-grid'>
    {['student-performance-data-mining','computer-vision-connected-components'].map(slug => <ProjectCard key={slug} project={projects.find(p => p.slug === slug)!}/>) }
    {['transformer-build','dijkstra-experiment'].map(slug => { const p = archiveProjects.find(p => p.slug === slug)!; return <article key={slug} className='project-card'><Link href={`/engineering/${slug}/`} className='project-card-link' aria-label={`Read ${p.title}`}><div className='spotlight-image'><Image src={p.image!} alt={p.imageAlt!} fill sizes='(max-width:640px) 90vw, (max-width:960px) 44vw, 280px'/></div><div className='project-card-copy'><div className='project-meta'><span>{slug === 'transformer-build' ? 'Electrical engineering' : 'Algorithms'}</span><span>{p.year}</span></div><div className='project-course'>{p.course}{slug === 'transformer-build' && ' · Collaborative'}</div><h3>{p.title}<ArrowUpRight size={20}/></h3><p>{p.summary}</p><div className='project-tags'>{p.tags.slice(0,3).map(t => <span key={t}>{t}</span>)}</div></div></Link></article>; })}
  </div></div>;
}
