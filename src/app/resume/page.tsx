import { ArrowDownToLine } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/data/profile';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata('Engineering CVs', 'Azhar Abdool’s General Engineering CV and targeted AI Engineering CV: software, computer engineering, enterprise data, applied ML, embedded systems and networks.', '/resume/');
export default function ResumePage() {
  return <article className="project-detail container"><p className="eyebrow">AZHAR ABDOOL / CVS</p><h1>Engineering, in context.</h1><p className="lead">A broad technical foundation, with a focused version for AI and machine-learning applications.</p><div className="resume-page-grid"><section><h2>General Engineering CV</h2><p>Software and computer engineering, professional enterprise systems, data/intelligent systems, embedded work and security/network study.</p><a className="button button-primary" href={profile.cv} download>General CV <ArrowDownToLine size={18}/></a></section><section><h2>AI Engineering CV</h2><p>Applied ML project evidence, preprocessing, model development/evaluation, Foundry workflows and software/data integration. A transition toward AI engineering, not a senior ML claim.</p><a className="button button-quiet" href={profile.aiCv} download>AI CV <ArrowDownToLine size={18}/></a></section></div><p>Both PDFs contain selectable text. Project metrics and credentials are limited to supplied evidence.</p><Link href="/profile/" className="back-link">About Azhar Abdool</Link></article>;
}
