'use client';

import Link from 'next/link';
import { ArrowUpRight, FlaskConical, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { profile } from '@/data/profile';

const navigation = [
  { label: 'Projects', id: 'projects' }, { label: 'Lab', id: 'engineering-archive', href: '/lab/' },
  { label: 'About', id: 'about' }, { label: 'Experience', id: 'experience' }, { label: 'Skills', id: 'skills' },
  { label: 'Education', id: 'education' }, { label: 'Credentials', id: 'certifications' }, { label: 'Contact', id: 'contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  useEffect(() => {
    if (pathname !== '/') return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('main section[id]')).filter(node => navigation.some(item => item.id === node.id));
    const observer = new IntersectionObserver(() => {
      const current = nodes.filter(node => node.getBoundingClientRect().top <= innerHeight * .3).at(-1);
      setActive(current?.id ?? '');
    }, { rootMargin: '-15% 0px -65% 0px', threshold: 0 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" aria-label="Azhar Abdool home" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">A<span /></span>
          <span>Azhar Abdool<span className="brand-caption">SOFTWARE & COMPUTER ENGINEERING</span></span>
        </Link>
        <nav aria-label="Main navigation" id="main-navigation" className={open ? 'navigation is-open' : 'navigation'}>
          <Link href="/" className="mobile-home" onClick={() => setOpen(false)}>Home</Link>
          {navigation.map(item => <Link key={item.id} href={item.href ?? `/#${item.id}`} className={item.href ? 'nav-lab' : undefined} aria-current={(pathname === '/' && active === item.id) || (pathname === '/lab/' && item.href) ? 'location' : undefined} onClick={() => { setOpen(false); setActive(item.id); }}>{item.href && <FlaskConical size={13} aria-hidden='true' />}{item.label}</Link>)}
        </nav>
        <a className="header-contact" href={`mailto:${profile.email}`}>Let&apos;s talk <ArrowUpRight size={15} /></a>
        <button ref={toggle} className="icon-button menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-controls="main-navigation" aria-expanded={open} onClick={() => setOpen(!open)} title={open ? 'Close navigation' : 'Open navigation'}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
