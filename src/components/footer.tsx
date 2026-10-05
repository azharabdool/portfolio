import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import { profile } from '@/data/profile';

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><p>Azhar Abdool<span>Software &amp; Computer Engineering</span></p><div><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><Github size={18} /></a><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><Linkedin size={18} /></a><a href={`mailto:${profile.email}`} aria-label="Email Azhar" title="Email"><Mail size={18} /></a><Link href="/#home" title="Back to top" aria-label="Back to top"><ArrowUpRight size={18} /></Link></div><span className="footer-year">© 2026 Azhar Abdool</span></div></footer>;
}
