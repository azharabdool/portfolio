import { ArrowDownToLine, ArrowUpRight, BriefcaseBusiness, GraduationCap, ShieldCheck } from 'lucide-react';
import { Hero } from '@/components/hero';
import { ProjectCard } from '@/components/project-card';
import { ProjectBrowser } from '@/components/project-browser';
import { EngineeringArchive } from '@/components/engineering-archive';
import { CityTransition } from '@/components/city-transition';
import { credentials, profile, projects, skillGroups } from '@/data/profile';

function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <p className="eyebrow section-label"><span>{number}</span>{children}</p>;
}

export default function Home() {
  return <>
    <Hero />
    <div className="discipline-band"><div className="container"><span>INTELLIGENT SYSTEMS</span><i /><span>ENTERPRISE SOFTWARE</span><i /><span>COMPUTER ENGINEERING</span><i /><span>SECURITY & NETWORKS</span></div></div>
    <section className="section about-section" id="about" aria-labelledby="about-title"><div className="container about-grid">
      <div><SectionLabel number="01">ABOUT</SectionLabel><h2 id="about-title">An engineer across<br /><span>the whole system.</span></h2><div className="about-signature"><span>UCT</span><span>COMPUTER SCIENCE<br />+ COMPUTER ENGINEERING</span></div></div>
      <div className="about-copy"><p className="lead">{profile.about}</p><p>{profile.aboutDetail}</p><div className="about-principles"><span>Understand the system.</span><span>Build for the real world.</span><span>Keep the evidence clear.</span></div><div className="resume-options" id="resume"><h3>CVs</h3><a href={profile.cv} className="resume-link" download>General Engineering CV<ArrowDownToLine size={18}/></a><a href={profile.aiCv} className="resume-link" download>AI Engineering CV<ArrowDownToLine size={18}/></a></div></div>
    </div></section>
    <section className="section experience-section" id="experience" aria-labelledby="experience-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="02">EXPERIENCE</SectionLabel><h2 id="experience-title">Engineering in practice.</h2></div><BriefcaseBusiness size={28} strokeWidth={1.2} className="section-symbol" aria-hidden="true" /></div>
      <div className="experience-entry"><div className="experience-period">OCT 2025 — PRESENT<span className="current-marker">CURRENT ROLE</span></div><div><h3>Software Engineer</h3><p className="experience-company">NCT Forestry</p><p>Building enterprise PIMS modules and operational workflows with Oracle APEX, PL/SQL and React Native.</p><ul className="experience-details"><li>Backend procedures, reporting queries and enterprise integrations.</li><li>GIS workflows using Google Maps, GeoJSON and polygon validation.</li><li>RBAC, input validation, debugging, testing and deployment.</li></ul><div className="project-tags"><span>Oracle APEX</span><span>PL/SQL</span><span>React Native</span><span>GIS</span></div></div></div>
      <div className="experience-entry"><div className="experience-period">OCT 2024 — MAR 2025</div><div><h3>SAP Graduate Programme</h3><p className="experience-company">OpenSource Intelligent Solutions</p><p>Completed SAP Associate training and earned the Business Process Integration with SAP S/4HANA certification, alongside enterprise systems workshops and technical sessions.</p><div className="project-tags"><span>SAP S/4HANA</span><span>Enterprise processes</span><span>ABAP training</span></div></div></div>
    </div></section>
    <CityTransition />
    <section className="section projects-section" id="projects" aria-labelledby="projects-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="03">SELECTED WORK</SectionLabel><h2 id="projects-title">Different disciplines.<br /><span>One engineering foundation.</span></h2></div><p className="heading-note">From learning models to moving signals,<br />a selection of work across the stack.</p></div>
      <div className="featured-grid">{projects.filter((project) => project.featured).map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
      <div className="catalogue-heading"><h3>Explore the full collection</h3><span>COURSEWORK · INDEPENDENT PROJECTS · CASE STUDIES</span></div>
      <ProjectBrowser />
    </div></section>
    <EngineeringArchive />
    <section className="section skills-section" id="skills" aria-labelledby="skills-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="04">TECHNICAL FOUNDATION</SectionLabel><h2 id="skills-title">Tools with a purpose.</h2></div><p className="heading-note">Skills grounded in project work,<br />professional experience and training.</p></div>
      <div className="skills-grid">{skillGroups.map((group) => <div key={group.title} className="skill-group"><span className="skill-number">{group.number}</span><h3>{group.title}</h3><ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul></div>)}</div>
    </div></section>
    <section className="section credentials-section" id="certifications" aria-labelledby="credentials-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="05">CERTIFICATIONS & TRAINING</SectionLabel><h2 id="credentials-title">Learning with direction.</h2></div><ShieldCheck className="section-symbol" size={30} strokeWidth={1.2} aria-hidden="true" /></div>
      <div className="credential-list">{credentials.map((item) => <article key={item.name} className="credential-row"><div><span className="credential-type">{item.type}</span><h3>{item.name}</h3><p>{item.detail}</p></div><div className="credential-issuer">{item.issuer}{item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.name} credential profile`} title="View credential profile"><ArrowUpRight size={20} /></a>}</div></article>)}</div>
    </div></section>
    <section className="section education-section" id="education" aria-labelledby="education-title"><div className="container">
      <div className="section-heading"><div><SectionLabel number="06">EDUCATION</SectionLabel><h2 id="education-title">A software-to-hardware foundation.</h2></div><GraduationCap size={30} strokeWidth={1.2} className="section-symbol" aria-hidden="true" /></div>
      <div className="education-grid"><article><p className="education-status">CURRENT · PART-TIME</p><h3>BSc Honours<br />Security & Network Engineering</h3><p className="education-institution">Eduvos</p><p>Continuing study in cybersecurity, enterprise security and networks.</p></article><article><p className="education-status">GRADUATED 2025</p><h3>BSc Computer Science<br />& Computer Engineering</h3><p className="education-institution">University of Cape Town</p><p>Software, algorithms, databases, networks, embedded systems and AI/ML. Earlier study in Mechatronics before transferring.</p></article></div>
    </div></section>
    <section className="section contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><SectionLabel number="07">CONTACT</SectionLabel><h2 id="contact-title">Let&apos;s build<br /><span>something that matters.</span></h2><p>Software, intelligent systems, enterprise platforms<br className="desktop-break" /> and engineering that reaches the real world.</p></div><div className="contact-links"><a href={`mailto:${profile.email}`} className="contact-email">{profile.email}<ArrowUpRight size={22} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight size={20} /></a><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={20} /></a><a href={profile.cv} download>General Engineering CV<ArrowDownToLine size={20} /></a><a href={profile.aiCv} download>AI Engineering CV<ArrowDownToLine size={20} /></a></div></div></section>
  </>;
}
