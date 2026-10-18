import Link from 'next/link';
import { profile, skillGroups } from '@/data/profile';
import { credentialEvidence, credentialTypes } from '@/data/credentials';
import { pageMetadata, absoluteUrl, personId } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { EducationFeature } from '@/components/education-feature';
export const metadata = pageMetadata('About Azhar Abdool', 'Azhar Abdool: University of Cape Town (UCT) Computer Science and Computer Engineering graduate and professional Software Engineer, working across applied AI, data and real-world systems.', '/profile/');
export default function ProfilePage() {
  return <article className="project-detail container profile-page">
    <StructuredData data={{'@context':'https://schema.org','@type':'ProfilePage',url:absoluteUrl('/profile/'),name:'About Azhar Abdool',mainEntity:{'@id':personId}}}/>
    <p className="eyebrow">ENGINEER PROFILE</p><h1>Azhar Abdool</h1><p className="lead">{profile.title}</p>
    <div className="profile-prose">
      <h2>Background</h2><p>{profile.about}</p><p>{profile.aboutDetail}</p>
      <h2>Experience</h2><h3>Software Engineer, NCT Forestry</h3><p>October 2025 - present. Developing enterprise applications and operational workflows with Oracle APEX, PL/SQL and React Native.</p><ul><li>Backend procedures, reporting queries and enterprise integrations.</li><li>GIS workflows using Google Maps, GeoJSON and polygon validation.</li><li>RBAC, input validation, debugging, testing and deployment.</li></ul><h3>SAP Graduate Programme, OpenSource Intelligent Solutions</h3><p>October 2024 - March 2025. Completed SAP Associate training and earned the Business Process Integration with SAP S/4HANA certification, alongside enterprise systems workshops and technical sessions. Training included ABAP. The supplied SAP credential has since expired; its dates are shown in the credential library.</p>
      <h2>Projects</h2><p>The project pages document digit classification, reinforcement learning, data analysis, Foundry workflows, STM32 peripherals, algorithms, concurrent Java applications and networks. They identify collaborative coursework and distinguish new portfolio demonstrations from the original work.</p>
      <div className="profile-links"><Link href="/#projects">Selected projects</Link><Link href="/lab/">Engineering Lab</Link><Link href="/resume/">CVs</Link><Link href="/credentials/">Credential documents</Link><a href="https://github.com/azharabdool/azharabdool#readme">GitHub profile README</a><a href={profile.linkedin}>LinkedIn</a></div>
      <h2>Credentials and training</h2>{credentialEvidence.filter(c => c.featured).map(c => <section key={c.slug}><h3>{c.title}</h3><p>{credentialTypes[c.kind]} · {c.issuer}. {c.detail}</p></section>)}<Link href='/credentials/'>View all credential documents</Link>
    </div>
    <section className='section profile-skills' id='skills' aria-labelledby='profile-skills-title'><h2 id='profile-skills-title'>Technical skills</h2><div className='skills-grid'>{skillGroups.map(group=><div className='skill-group' key={group.number}><span className='skill-number'>{group.number}</span><h3>{group.title}</h3><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></div>)}</div></section>
    <EducationFeature/>
  </article>;
}
