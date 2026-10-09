import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { demos } from '@/data/demos';
import { DemoStage } from '@/components/demo-stage';
import { pageMetadata, caseStudySchema } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
export const dynamicParams=false;
export function generateStaticParams(){return demos.map(({slug})=>({slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const d=demos.find(d=>d.slug===slug);return pageMetadata(d?.title??'Interactive Lab',`${d?.summary} A clearly labelled portfolio recreation by Azhar Abdool, based on ${d?.origin}.`,`/playground/${slug}/`);}
export default async function DemoPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;const d=demos.find(d=>d.slug===slug);if(!d)notFound();
  const image='image' in d?d.image:null;
  return <article className='project-detail container demo-page'><StructuredData data={caseStudySchema(d.title,d.summary,`/playground/${slug}/`,d.changes)}/><Link href='/playground/' className='back-link'><ArrowLeft size={17}/>Interactive Engineering Lab</Link><div className='detail-heading'><p className='eyebrow'>{d.origin}</p><h1>{d.title}</h1><p className='lead'>{d.summary}</p></div><section className='demo-origin'><span className='provenance-badge original-badge'>ORIGINAL PROJECT</span><p>{d.origin}. <Link href={d.study}>Read the original case study <ArrowUpRight size={15}/></Link></p>{image&&<figure><Image src={image} alt={`Actual recovered ${d.origin} application screenshot`} width={1000} height={600} sizes='(max-width:640px) 90vw, 900px'/><figcaption>Genuine source-built Swing application capture during the 2026 recovery; not a mockup.</figcaption></figure>}</section><DemoStage slug={d.slug}/><div className='demo-documentation'><section><h2>How it works</h2><p>{d.rules}</p></section><section><h2>What changed for the portfolio</h2><p>{d.changes}</p></section><section><h2>Evidence & limitations</h2><p>The original project’s contribution, source attribution, results and limitations remain in its case study. New synthetic inputs and browser state are not historical measurements.</p><Link className='back-link' href={d.study}>Original evidence and technical details <ArrowUpRight size={16}/></Link></section></div></article>;
}
