import Link from 'next/link';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { uct } from '@/data/education';

export function EducationFeature() {
  return <section className='section education-section' id='education' aria-labelledby='education-title'><div className='container'>
    <div className='section-heading'><div><p className='eyebrow section-label'><span>05</span> EDUCATION / ENGINEERING FOUNDATION</p><h2 id='education-title'>Built on a UCT foundation.</h2></div><GraduationCap className='section-symbol' size={30} strokeWidth={1.2} aria-hidden='true' /></div>
    <div className='uct-feature'><div className='uct-institution'><p className='eyebrow'>BSc / GRADUATED 2025</p><h3>University of<br />Cape Town</h3><p className='uct-degree'>Computer Science<br /><span>&amp; Computer Engineering</span></p><a className='uct-ranking' href={uct.ranking.url} target='_blank' rel='noopener noreferrer' title={`Official UCT ranking context, reviewed ${uct.ranking.reviewed}`}>{uct.ranking.label}<ArrowUpRight size={16} /><span className='sr-only'>Official UCT rankings, opens in a new tab</span></a></div>
      <div className='uct-foundation'><p className='foundation-statement'>One foundation.<br /><span>From computation to the physical world.</span></p><ul className='uct-domains'>{uct.domains.map((domain, i) => <li key={domain}><span aria-hidden='true'>{String(i + 1).padStart(2, '0')}</span>{domain}</li>)}</ul><p className='foundation-context'>The coursework behind the systems, signals and learning models in this portfolio. Earlier Mechatronics study preceded the move into Computer Science and Computer Engineering.</p></div>
    </div>
    <ol className='academic-journey' aria-label='Academic project journey'>{uct.journey.map(item => <li key={item.year}><Link href={item.href}><span className='journey-year'>{item.year}</span><i aria-hidden='true' /><span>{item.title}</span><ArrowUpRight size={14} aria-hidden='true' /></Link></li>)}</ol>
    <div className='honours-entry'><span className='eyebrow'>CURRENT / PART-TIME</span><h3>BSc Honours Security &amp; Network Engineering</h3><p>Eduvos <span>Continuing study in cybersecurity, enterprise security and networks.</span></p></div>
  </div></section>;
}
