import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, FileText, Github } from 'lucide-react';
import { ProjectArt } from '@/components/project-art';
import { projects } from '@/data/profile';
import { projectDepth } from '@/data/project-depth';
import { AlgorithmExplorer } from '@/components/algorithm-explorer';
import { StructuredData } from '@/components/structured-data';
import { pageMetadata, caseStudySchema, personId } from '@/lib/seo';
import { MLExperiments, DataMiningCase } from '@/components/ml-experiments';
import { FourRoomsReplay } from '@/components/four-rooms-replay';
import { EmbeddedLab, SchedulingLab } from '@/components/systems-lab';
import { CourseContext } from '@/components/course-context';
import { DemoLink } from '@/components/demo-link';
import { StudyWorkbench } from '@/components/study-workbench';
import { projectInsights } from '@/data/project-insights';

export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return pageMetadata(project?.title ?? 'Project', `${project?.description ?? 'Engineering case study'} ${project?.context ?? 'Portfolio'} technical case study in Azhar Abdool’s engineering portfolio.`, `/projects/${slug}/`);
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const depth = projectDepth[slug];
  const next = projects[(projects.findIndex((item) => item.slug === slug) + 1) % projects.length];
  return <article id="home" className="project-detail container">
    <StructuredData data={caseStudySchema(project.title,project.description,`/projects/${slug}/`,project.attribution)}/>
    {slug==='machine-learning-mnist-classifier'&&<StructuredData data={{'@context':'https://schema.org','@type':'SoftwareSourceCode',name:'MNIST feedforward classifier',author:{'@id':personId},programmingLanguage:'Python',codeRepository:project.repository,description:'Individual original PyTorch classifier with clearly labelled portfolio enhancements.'}}/>}
    <Link href="/projects/" className="back-link"><ArrowLeft size={16} /> All projects</Link>
    <div className="detail-heading"><p className="eyebrow">{project.category.toUpperCase()} <span>/</span> {project.context} <span>/</span> {project.year}</p><h1>{project.title}</h1><p className="lead">{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
    <ProjectArt project={project} large />
    <CourseContext label={project.context} year={project.year}/>
    <DemoLink study={`/projects/${slug}/`}/>
    <StudyWorkbench insight={projectInsights[slug]}/>
    <div className="detail-body">
      <aside className="detail-sidebar"><p className="eyebrow">PROJECT CONTEXT</p><p>{project.attribution}</p><a href={`/project-notes/${project.slug}.md`} download className="button button-quiet"><FileText size={17} /> Project notes</a>{project.repository ? <a href={project.repository} target="_blank" rel="noopener noreferrer" className="button button-quiet"><Github size={17} /> {slug==='stm32-signal-generation'?'Documentation repository':'Source repository'}<ArrowUpRight size={14} /></a> : <p className="publication-note">{['uct-tutor-marketplace-app','stm32-signal-generation','networking-p2p-chat-prototype'].includes(slug) ? 'Collaborative source held privately.' : 'Repository publication under review this week.'}</p>}{slug==='stm32-signal-generation'&&project.repository&&<p className="publication-note">Documentation and source-derived plot only. Collaborative firmware remains private.</p>}</aside>
      <div className="detail-copy">
        <section><h2>What it is</h2><p>{project.overview}</p></section>
        <section><h2>Why it was built</h2><p>{depth.why}</p></section>
        <section><h2>My contribution</h2><p>{depth.contribution}</p></section>
        <section><h2>How it works</h2><p>{project.approach}</p><ol className="pipeline">{project.pipeline.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol></section>
        <section><h2>Technical implementation</h2><ul>{depth.implementation.map(item=><li key={item}>{item}</li>)}</ul></section>
        {slug === 'foundry-ai-infographic-dashboard' && <section><h2>Related applied FDE work</h2><p>Retained planning demonstration notes describe fill-rate and variance views, production adjustments and weekly reporting. Those notes support the intended workflow, not independently verified platform execution.</p><Link href='/projects/foundry-supply-demand-planning/' className='back-link'>Explore the planning workflow study <ArrowRight size={16}/></Link><Link href='/credentials/' className='back-link'>View the original Foundry training documents <ArrowRight size={16}/></Link></section>}
        {slug==='machine-learning-mnist-classifier'&&<section><h2>Controlled enhancement experiments</h2><MLExperiments/></section>}
        {slug==='student-performance-data-mining'&&<section><h2>Analytical case study</h2><DataMiningCase/></section>}
        {slug==='reinforcement-learning-four-rooms'&&<section><h2>Inside the agent’s path</h2><FourRoomsReplay/></section>}
        {slug==='stm32-signal-generation'&&<section><h2>A peripheral, made visible</h2><EmbeddedLab/></section>}
        {slug==='operating-systems-simulations'&&<section><h2>Compare the scheduling policies</h2><SchedulingLab/></section>}
        {depth.media&&<section><h2>Visual evidence</h2>{depth.media.map(media=><figure className="detail-evidence" key={media.src}><Image src={media.src} alt={media.alt} width={media.width} height={media.height} sizes="(max-width:640px) 90vw, 750px"/><figcaption>{media.caption}</figcaption></figure>)}</section>}
        {slug==='operating-systems-simulations'&&<section><h2>Address translation</h2><AlgorithmExplorer mode="memory"/><Link className="back-link" href="/engineering/virtual-memory/">Explore the memory exercise <ArrowRight size={16}/></Link><Link className="back-link" href="/engineering/club-concurrency/">Explore the separate Swing club simulation <ArrowRight size={16}/></Link></section>}
        <section><h2>Results & evidence</h2><ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul></section>
        <section><h2>Engineering challenges</h2><p>{depth.challenges}</p></section>
        <section className="limitations"><h2>Scope & limitations</h2><p>{project.limitations}</p></section>
        <section><h2>What I learned</h2><p>{depth.learned}</p></section>
        <section><h2>What I would improve now</h2><p>{depth.improve}</p></section>
      </div>
    </div>
    <Link href={`/projects/${next.slug}/`} className="next-project"><span>NEXT PROJECT<strong>{next.title}</strong></span><ArrowRight size={24} /></Link>
  </article>;
}
