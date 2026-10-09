import Link from 'next/link';
import { ArrowDownToLine, ArrowUpRight, BriefcaseBusiness, ShieldCheck } from 'lucide-react';
import { Hero } from '@/components/hero';
import { ProjectCard } from '@/components/project-card';
import { InteractiveLabCTA } from '@/components/interactive-lab-cta';
import { EngineeringSpotlights } from '@/components/engineering-spotlights';
import { CredentialGrid } from '@/components/credentials';
import { credentialEvidence } from '@/data/credentials';
import { CityTransition } from '@/components/city-transition';
import { MoonJourney } from '@/components/moon-journey';
import { EducationFeature } from '@/components/education-feature';
import { profile, projects, skillGroups } from '@/data/profile';

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="eyebrow section-label"><span>{number}</span>{children}</p>;
}

export default function Home() {
  return <div className='homepage-world'>
    <MoonJourney />
    <Hero />
    <div className="discipline-band"><div className="container"><span>INTELLIGENT SYSTEMS</span><i /><span>ENTERPRISE SOFTWARE</span><i /><span>COMPUTER ENGINEERING</span><i /><span>SECURITY & NETWORKS</span></div></div>
    <CityTransition />
    <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="01">SELECTED WORK</SectionLabel><h2 id="projects-title">Different disciplines.<br /><span>One engineering foundation.</span></h2></div><p className="heading-note">From learning models to moving signals,<br />a selection of work across the stack.</p></div>
      <div className="featured-grid">{['foundry-ai-infographic-dashboard','machine-learning-mnist-classifier','reinforcement-learning-four-rooms','stm32-signal-generation','uct-tutor-marketplace-app','operating-systems-simulations'].map(slug => <ProjectCard key={slug} project={projects.find(p => p.slug === slug)!}/>)}</div>
      <EngineeringSpotlights/>
      <InteractiveLabCTA/>
    </div></section>
    <section className="section about-section" id="about" aria-labelledby="about-title"><div className="container about-grid">
      <div><SectionLabel number="02">ABOUT</SectionLabel><h2 id="about-title">An engineer across<br /><span>the whole system.</span></h2><div className="about-signature"><span>UCT</span><span>COMPUTER SCIENCE<br />+ COMPUTER ENGINEERING</span></div></div>
      <div className="about-copy"><p className="lead">{profile.about}</p><p>{profile.aboutDetail}</p><a className="profile-link" href="/profile/">About Azhar Abdool <ArrowUpRight size={16}/></a><div className="about-principles"><span>Understand the system.</span><span>Build for the real world.</span><span>Keep the evidence clear.</span></div><div className="resume-options" id="resume"><h3>CVs</h3><a href={profile.cv} className="resume-link" download>General Engineering CV<ArrowDownToLine size={18}/></a><a href={profile.aiCv} className="resume-link" download>AI Engineering CV<ArrowDownToLine size={18}/></a><a className="resume-link" href="/resume/">CV context <ArrowUpRight size={18}/></a></div></div>
    </div></section>
    <section className="section experience-section" id="experience" aria-labelledby="experience-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="03">EXPERIENCE</SectionLabel><h2 id="experience-title">Engineering in practice.</h2></div><BriefcaseBusiness size={28} strokeWidth={1.2} className="section-symbol" aria-hidden="true" /></div>
      <div className="experience-entry"><div className="experience-period">OCT 2025 — PRESENT<span className="current-marker">CURRENT ROLE</span></div><div><h3>Software Engineer</h3><p className="experience-company">NCT Forestry</p><p>Developing enterprise applications and operational workflows with Oracle APEX, PL/SQL and React Native.</p><ul className="experience-details"><li>Backend procedures, reporting queries and enterprise integrations.</li><li>GIS workflows using Google Maps, GeoJSON and polygon validation.</li><li>RBAC, input validation, debugging, testing and deployment.</li></ul><div className="project-tags"><span>Oracle APEX</span><span>PL/SQL</span><span>React Native</span><span>GIS</span></div></div></div>
      <div className="experience-entry"><div className="experience-period">OCT 2024 — MAR 2025</div><div><h3>SAP Graduate Programme</h3><p className="experience-company">OpenSource Intelligent Solutions</p><p>Completed SAP Associate training and earned the Business Process Integration with SAP S/4HANA certification, alongside enterprise systems workshops and technical sessions.</p><div className="project-tags"><span>SAP S/4HANA</span><span>Enterprise processes</span><span>ABAP training</span></div></div></div>
    </div></section>
    <section className="section skills-section" id="skills" aria-labelledby="skills-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="04">TECHNICAL FOUNDATION</SectionLabel><h2 id="skills-title">Tools with a purpose.</h2></div><p className="heading-note">Skills grounded in project work,<br />professional experience and training.</p></div>
      <div className="skills-grid">{skillGroups.map((group) => <div key={group.title} className="skill-group"><span className="skill-number">{group.number}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
    </div></section>
    <EducationFeature />
    <section className="section credentials-section" id="certifications" aria-labelledby="credentials-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="06">CERTIFICATIONS & TRAINING</SectionLabel><h2 id="credentials-title">Learning with direction.</h2></div><ShieldCheck className="section-symbol" size={30} strokeWidth={1.2} aria-hidden="true" /></div>
      <CredentialGrid items={credentialEvidence.filter(c => c.featured)}/><Link href='/credentials/' className='lab-entry'>All {credentialEvidence.length} credential documents <ArrowUpRight size={20}/></Link>
    </div></section>
    <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><SectionLabel number="07">CONTACT</SectionLabel><h2 id="contact-title">Let&apos;s build<br /><span>something that matters.</span></h2><p>Software, intelligent systems, enterprise platforms<br className="desktop-break" /> and engineering that reaches the real world.</p></div><div className="contact-links"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight size={22} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={20} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={20} /></a><a href={profile.cv} download>General Engineering CV<ArrowDownToLine size={20} /></a><a href={profile.aiCv} download>AI Engineering CV<ArrowDownToLine size={20} /></a></div></div></section>
  </div>;
}
