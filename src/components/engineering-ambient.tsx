'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function routeDistrict(path: string) {
  if (/stm32|signal|fourier|frequency|transformer|machine-fundamentals/.test(path)) return 'embedded';
  if (/mnist|four-rooms|data-mining|foundry/.test(path)) return 'ai';
  if (/network|security|firewall/.test(path)) return 'security';
  if (/andre|operating|dijkstra|parallel|concurren|memory/.test(path)) return 'systems';
  return 'software';
}
export function EngineeringAmbient() {
  const pathname = usePathname();
  const [selected, setSelected] = useState('software');
  const district = pathname === '/' ? selected : routeDistrict(pathname);
  useEffect(() => { document.body.dataset.engineeringDistrict = district; return () => {delete document.body.dataset.engineeringDistrict;}; }, [district]);
  useEffect(() => {
    const select = (event: Event) => setSelected((event as CustomEvent<string>).detail);
    document.addEventListener('engineering-district', select);
    return () => document.removeEventListener('engineering-district', select);
  }, []);
  return <div className='engineering-ambient' data-district={district} aria-hidden='true'><svg viewBox='0 0 220 700' preserveAspectRatio='xMaxYMid meet'><g className='ambient-data'><path d='M205 40V170L145 230V370L205 430V650M145 230H85L35 280V410H145M85 230V120H35'/>{[[205,170],[145,230],[145,370],[35,410],[85,120]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r='4'/>)}</g><path className='ambient-signal' d='M30 330H50V270H90V330H130V270H170V330H210'/><g className='ambient-process'><path d='M170 70V250H60V410H170V600'/><rect x='150' y='230' width='40' height='40'/><rect x='40' y='390' width='40' height='40'/></g></svg></div>;
}
