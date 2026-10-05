import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AlgorithmExplorer } from '@/components/algorithm-explorer';
import { archiveProjects } from '@/data/engineering-archive';

export const dynamicParams = false;
export function generateStaticParams() { return archiveProjects.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params; const p=archiveProjects.find(p=>p.slug===slug);
  return {title:p?.title,description:p?.summary,alternates:{canonical:`/engineering/${slug}/`}};
}
export default async function ArchiveDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const p=archiveProjects.find(p=>p.slug===slug); if(!p) notFound();
  const next=archiveProjects[(archiveProjects.indexOf(p)+1)%archiveProjects.length];
  return <article className="project-detail container">
    <Link className="back-link" href="/#engineering-archive"><ArrowLeft size={16}/> Engineering archive</Link>
    <div className="detail-heading"><p className="eyebrow">{p.course} / {p.year}</p><h1>{p.title}</h1><p className="lead">{p.summary}</p><div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div>
    {p.image&&<figure className="archive-output"><Image src={p.image} alt={p.imageAlt!} width={p.imageSize?.[0]??1000} height={p.imageSize?.[1]??600} sizes="(max-width:640px) 100vw, 1000px"/><figcaption>{p.imageAlt}</figcaption></figure>}
    {p.additionalImage&&<figure className="archive-output"><Image src={p.additionalImage} alt={p.additionalImageAlt!} width={p.additionalImageSize?.[0]??1000} height={p.additionalImageSize?.[1]??400} sizes="(max-width:640px) 100vw, 1000px"/><figcaption>{p.additionalImageAlt}</figcaption></figure>}
    {(p.visual==='graph'||p.visual==='memory')&&<AlgorithmExplorer mode={p.visual}/>}
    <div className="detail-body"><aside className="detail-sidebar"><p className="eyebrow">CONTRIBUTION & ORIGIN</p><p>{p.contribution}</p><p className="evidence-caption">Source remains in the coursework archive. This page is documentation, not a newly released application.</p></aside><div className="detail-copy"><section><h2>How it works</h2><p>{p.approach}</p></section><section><h2>Results & recovery</h2><ul>{p.results.map(r=><li key={r}>{r}</li>)}</ul></section><section className="limitations"><h2>Technical limitations</h2><p>{p.limitations}</p></section><section><h2>What I would improve now</h2><p>{p.improvements}</p></section></div></div>
    <Link className="next-project" href={`/engineering/${next.slug}/`}><span>NEXT IN THE ARCHIVE<strong>{next.title}</strong></span><ArrowRight size={24}/></Link>
  </article>;
}
