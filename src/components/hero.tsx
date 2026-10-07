import { ArrowDown, ArrowDownToLine, ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '@/data/profile';

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" id="home">
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="line" /> ENGINEERING ACROSS BOUNDARIES</p>
          <h1 id="hero-title">Azhar Abdool<span className="name-period">.</span></h1>
          <p className="hero-role">Software &amp; Computer Engineer</p>
          <p className="hero-description">{profile.intro}</p>
          <div className="hero-actions">
            <a href="#projects" className="button button-primary">Explore my work <ArrowRight size={17} /></a>
            <a href={profile.cv} className="button button-quiet" aria-label="View general engineering CV">View CV<ArrowDownToLine size={17} /></a>
          </div>
          <div className="hero-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={17} /> GitHub <span className="sr-only">(opens in new tab)</span></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={17} /> LinkedIn <span className="sr-only">(opens in new tab)</span></a>
            <a href={`mailto:${profile.email}`}><Mail size={17} /> Email</a>
          </div>
          <a className='hero-academic' href='#education'><span>University of Cape Town</span><span>BSc Computer Science &amp; Computer Engineering <i /> 2025</span></a>
        </div>
        <div className="hero-coordinate" aria-hidden="true"><span>SOFTWARE</span><span>DATA</span><span>HARDWARE</span><i /></div>
        <a className="scroll-cue" href="#about" aria-label="Read about Azhar"><ArrowDown size={17} /><span>Beyond the code</span></a>
      </div>
    </section>
  );
}
