import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { archiveProjects } from '@/data/engineering-archive';
import { LabPreview } from './lab-preview';

export function EngineeringArchive() {
  return <section className="section archive-section" id="engineering-archive" aria-labelledby="archive-title"><div className="container"><div className="section-heading"><div><p className="eyebrow">ENGINEERING LAB & ARCHIVE</p><h2 id="archive-title">More than the headline projects.</h2></div><p className="heading-note">Algorithms, interfaces and experiments.<br/>The work behind the engineering foundation.</p></div><Link href="/lab/" className="lab-entry">Enter the Engineering Lab <ArrowUpRight size={22}/></Link><div className="archive-grid">{archiveProjects.map(p=><Link key={p.slug} href={`/engineering/${p.slug}/`} className="archive-card">{p.image?<div className="archive-thumbnail"><Image src={p.image} alt={p.imageAlt!} fill sizes="(max-width:640px) 90vw, (max-width:960px) 45vw, 30vw"/></div>:<div className={`archive-thumbnail archive-schematic archive-${p.visual}`} aria-hidden="true"><LabPreview kind={p.visual}/><span>{p.tags.slice(0,3).join(' · ')}</span></div>}<div className="archive-card-copy"><span className="project-meta">{p.course} / {p.year}</span><h3>{p.title}<ArrowUpRight size={16}/></h3><p>{p.summary}</p><div className="project-tags">{p.tags.slice(0,3).map(t=><span key={t}>{t}</span>)}</div></div></Link>)}</div></div></section>;
}
