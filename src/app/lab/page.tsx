import { EngineeringLab } from '@/components/engineering-lab';
import { pageMetadata, caseStudySchema } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import Link from 'next/link';
import { studyCollections } from '@/data/study-collections';
import { archiveProjects } from '@/data/engineering-archive';
export const metadata=pageMetadata('Engineering Lab', 'Explore Azhar Abdool’s engineering work: source-traced Dijkstra, STM32 ADC/PWM, scheduling, memory translation, concurrency and recorded reinforcement learning.', '/lab/');
export default function LabPage() {
  return <article className="project-detail container lab-page"><StructuredData data={caseStudySchema('Engineering Lab','Source-based interactive portfolio explanations across computer science and computer engineering.','/lab/','New demonstrations are distinct from original coursework.')}/><p className="eyebrow">AZHAR ABDOOL / ENGINEERING LAB</p><h1>A closer look<br/>at the system.</h1><p className="lead">17 historical engineering studies. Algorithms, signals and execution.</p><div className='inventory-line'><Link href='/playground/'>Play the 10 interactive experiences</Link><Link href='/projects/'>Explore the 10 major projects</Link></div><section className='study-collections'><h2>Explore by foundation</h2><div>{studyCollections.map(c=><section key={c.title}><h3>{c.title}</h3><p>{c.note}</p>{c.slugs.map(slug=><Link key={slug} href={`/engineering/${slug}/`}>{archiveProjects.find(p=>p.slug===slug)!.title}</Link>)}</section>)}</div></section><EngineeringLab/></article>;
}
