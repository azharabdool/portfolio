import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AlgorithmExplorer } from '@/components/algorithm-explorer';
import { archiveProjects } from '@/data/engineering-archive';
import { StructuredData } from '@/components/structured-data';
import { pageMetadata, caseStudySchema } from '@/lib/seo';
import { ConcurrencyLab } from '@/components/systems-lab';
import { FourierLab } from '@/components/signal-lab';
import { LookupLab } from '@/components/lookup-lab';
import { CourseContext } from '@/components/course-context';
import { SecurityStudy } from '@/components/security-study';

export const dynamicParams = false;
export function generateStaticParams() { return archiveProjects.map(({slug})=>({slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {
  const {slug}=await params; const p=archiveProjects.find(p=>p.slug===slug);
  return pageMetadata(p?.title??'Engineering archive', `${p?.summary??'Recovered engineering work'} Azhar Abdool’s ${p?.course??'engineering'} portfolio context.`, `/engineering/${slug}/`);
}
export default async function ArchiveDetail({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const p=archiveProjects.find(p=>p.slug===slug); if(!p) notFound();
  const next=archiveProjects[(archiveProjects.indexOf(p)+1)%archiveProjects.length];
  return <article className="project-detail container">
    <StructuredData data={caseStudySchema(p.title,p.summary,`/engineering/${slug}/`,p.contribution)}/>
    <Link className="back-link" href="/lab/"><ArrowLeft size={16}/> Engineering Lab</Link>
    <div className="detail-heading"><p className="eyebrow">{p.course} / {p.year}</p><h1>{p.title}</h1><p className="lead">{p.summary}</p><div className="project-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></div>
    <CourseContext label={p.course} year={p.year}/>
    {slug === 'waf-request-filtering' && <SecurityStudy mode='waf'/>}
    {slug === 'microservices-architecture-study' && <SecurityStudy mode='services'/>}
    {p.image&&<figure className="archive-output"><Image src={p.image} alt={p.imageAlt!} width={p.imageSize?.[0]??1000} height={p.imageSize?.[1]??600} sizes="(max-width:640px) 100vw, 1000px"/><figcaption>{p.imageAlt}</figcaption></figure>}
    {p.additionalImage&&<figure className="archive-output"><Image src={p.additionalImage} alt={p.additionalImageAlt!} width={p.additionalImageSize?.[0]??1000} height={p.additionalImageSize?.[1]??400} sizes="(max-width:640px) 100vw, 1000px"/><figcaption>{p.additionalImageAlt}</figcaption></figure>}
    {(p.visual==='graph'||p.visual==='memory')&&<AlgorithmExplorer mode={p.visual}/>}
    {slug==='parallel-monte-carlo'&&<ConcurrencyLab/>}
    {slug==='fourier-reconstruction'&&<FourierLab/>}
    {slug==='record-lookup'&&<LookupLab/>}
    {slug==='relational-queries'&&<section className="engineering-tool"><p className="eyebrow">SYNTHETIC QUERY EXECUTION</p><ol className="pipeline"><li>Two invented products</li><li>Join productLine key</li><li>Filter quantityInStock &lt;100</li><li>One resulting low-stock row</li></ol><table className="experiment-table"><thead><tr><th>Product</th><th>Stock</th><th>Line description</th></tr></thead><tbody><tr><td>Demo low stock</td><td>42</td><td>Synthetic demonstration line</td></tr></tbody></table><p className="evidence-caption">Actual new SQLite execution of the corrected portable query. Synthetic rows, not the original MySQL dataset; no original business records exposed.</p></section>}
    {slug==='attribute-validation'&&<section className="engineering-tool"><p className="eyebrow">ORIGINAL JAVA / NEW SYNTHETIC INPUTS</p><table className="experiment-table"><thead><tr><th>Input relationship</th><th>Original output</th></tr></thead><tbody><tr><td>Three identical records</td><td>Valid</td></tr><tr><td>All three attributes distinct</td><td>Valid</td></tr><tr><td>Same shape/fill, distinct colour</td><td>Invalid</td></tr></tbody></table><p className="evidence-caption">Source-built Check.java executed on three newly authored cases. The third row exposes the actual retained rule; a missing assignment specification is not replaced with an invented game requirement.</p></section>}
    <div className="detail-body"><aside className="detail-sidebar"><p className="eyebrow">CONTRIBUTION & ORIGIN</p><p>{p.contribution}</p><p className="evidence-caption">Source remains in the coursework archive. This page is documentation, not a newly released application.</p></aside><div className="detail-copy"><section><h2>How it works</h2><p>{p.approach}</p></section><section><h2>Results & recovery</h2><ul>{p.results.map(r=><li key={r}>{r}</li>)}</ul></section><section className="limitations"><h2>Technical limitations</h2><p>{p.limitations}</p></section><section><h2>What I would improve now</h2><p>{p.improvements}</p></section></div></div>
    <Link className="next-project" href={`/engineering/${next.slug}/`}><span>NEXT IN THE ARCHIVE<strong>{next.title}</strong></span><ArrowRight size={24}/></Link>
  </article>;
}
