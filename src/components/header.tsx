'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';

const navigation = ['About', 'Experience', 'Projects', 'Skills', 'Certifications', 'Education', 'Contact'];

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" aria-label="Azhar Abdool home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">A<span /></span>
          <span>Azhar Abdool<span className="brand-caption">SOFTWARE & COMPUTER ENGINEERING</span></span>
        </Link>
        <nav aria-label="Main navigation" id="main-navigation" className={open ? 'navigation is-open' : 'navigation'}>
          <Link href="/" className="mobile-home" onClick={() => setOpen(false)}>Home</Link>
          {navigation.map((label) => <Link key={label} href={`/#${label.toLowerCase()}`} onClick={() => setOpen(false)}>{label}</Link>)}
          <Link href="/lab/" onClick={()=>setOpen(false)}>Lab</Link>
        </nav>
        <a className="header-contact" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button className="icon-button menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)} title={open ? 'Close navigation' : 'Open navigation'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
