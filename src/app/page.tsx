import Link from 'next/link';
import { ArrowDownToLine, ArrowUpRight, FlaskConical } from 'lucide-react';
import { Hero } from '@/components/hero';
import { ProjectCard } from '@/components/project-card';
import { ConnectedSystem } from '@/components/connected-system';
import { MoonJourney } from '@/components/moon-journey';
import { profile, projects } from '@/data/profile';
import { homeFeaturedSlugs } from '@/data/home-content';
import { uct } from '@/data/education';

export default function Home() {
  return <div className='homepage-world home-edit'>
    <MoonJourney/>
    <Hero/>
    <ConnectedSystem/>
    <section className='section projects-section' id='projects' aria-labelledby='projects-title'><div className='container'>
      <div className='home-section-heading'><h2 id='projects-title'>Selected work</h2><Link href='/projects/'>All projects <ArrowUpRight size={16}/></Link></div>
      <div className='featured-grid'>{homeFeaturedSlugs.map(slug=><ProjectCard key={slug} project={projects.find(p=>p.slug===slug)!} compact/>)}</div>
    </div></section>
    <section className='section experience-section' id='experience' aria-labelledby='experience-title'><div className='container career-summary'>
      <div id='about'><h2 id='experience-title'>Experience</h2>
        <article className='career-role'><p className='career-date'>OCT 2025 - PRESENT</p><h3>Software Engineer</h3><p className='career-company'>NCT Forestry</p><p>Oracle APEX, PL/SQL and React Native. Enterprise integrations, GIS workflows and role-based access.</p></article>
        <article className='career-role'><p className='career-date'>OCT 2024 - MAR 2025</p><h3>SAP Graduate Programme</h3><p className='career-company'>OpenSource Intelligent Solutions</p><p>SAP S/4HANA business-process training and enterprise systems workshops.</p></article>
        <Link href='/profile/'>Full profile <ArrowUpRight size={16}/></Link>
      </div>
      <div className='career-education' id='education'><h2>University of Cape Town</h2><p className='career-degree'>BSc Computer Science &amp; Computer Engineering</p><p>Graduated 2025</p><a className='career-ranking' href={uct.ranking.url} target='_blank' rel='noopener noreferrer'>{uct.ranking.label}<ArrowUpRight size={14}/><span className='sr-only'>Official UCT rankings, opens in a new tab</span></a><div className='career-honours'><p className='career-date'>CURRENT / PART-TIME</p><h3>BSc Honours Security &amp; Network Engineering</h3><p>Eduvos</p></div><div className='career-detail-links'><Link href='/profile/#education'>Education &amp; Honours <ArrowUpRight size={15}/></Link><Link href='/profile/#skills'>Technical skills <ArrowUpRight size={15}/></Link><Link href='/credentials/'>Credentials <ArrowUpRight size={15}/></Link></div></div>
    </div></section>
    <section className='section engineering-entry-section' id='engineering-archive' aria-labelledby='engineering-entry-title'><div className='container home-lab-entry'><div><FlaskConical size={25} strokeWidth={1.2} aria-hidden='true'/><h2 id='engineering-entry-title'>Engineering Lab</h2><p>17 engineering studies. 10 browser demos.</p></div><div><Link href='/lab/'>Engineering studies <ArrowUpRight size={18}/></Link><Link href='/playground/'>All demos <ArrowUpRight size={18}/></Link></div></div></section>
    <section className='section contact-section' id='contact' aria-labelledby='contact-title'><div className='container contact-grid'><div><h2 id='contact-title'>Get in touch</h2><a href={`mailto:${profile.email}`} className='contact-email'>{profile.email}<ArrowUpRight size={21}/></a></div><div className='contact-links'><a href={profile.github} target='_blank' rel='noopener noreferrer'>GitHub <ArrowUpRight size={18}/></a><a href={profile.linkedin} target='_blank' rel='noopener noreferrer'>LinkedIn <ArrowUpRight size={18}/></a><div id='resume' className='contact-cvs'><a href={profile.cv} download>General Engineering CV <ArrowDownToLine size={18}/></a><a href={profile.aiCv} download>AI Engineering CV <ArrowDownToLine size={18}/></a></div></div></div></section>
  </div>;
}
