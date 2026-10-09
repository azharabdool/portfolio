import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { honoursModules } from '@/data/honours';

export function HonoursModules({ compact = false }: { compact?: boolean }) {
  const Heading = compact ? 'h4' : 'h3';
  return <div className='honours-modules'>{honoursModules.map(module => <div className='honours-module' key={module.code}><span className='honours-code'>{module.code}</span><div><Heading>{module.title}</Heading><p className='honours-tools'>{module.tools}</p><p>{module.concepts}</p><p className='honours-scope'>{module.scope}</p></div><Link href={module.href} aria-label={`Explore ${module.title}`}>Explore<ArrowUpRight size={16}/></Link></div>)}</div>;
}
