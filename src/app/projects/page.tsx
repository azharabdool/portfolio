import Link from 'next/link';
import { ProjectBrowser } from '@/components/project-browser';
import { pageMetadata } from '@/lib/seo';
import { projects } from '@/data/profile';
export const metadata=pageMetadata('Projects','Explore Azhar Abdool’s ten major projects across AI, software, enterprise data, embedded systems, operating systems and networking.','/projects/');
export default function Projects(){return <article className='container project-detail projects-index-page'><p className='eyebrow'>AZHAR ABDOOL / SELECTED ENGINEERING WORK</p><h1>Across the system.</h1><p className='lead'>{projects.length} major projects, with the implementation and evidence behind each.</p><div className='inventory-line'><Link href='/lab/'>17 historical engineering studies</Link><Link href='/playground/'>10 interactive experiences</Link></div><ProjectBrowser/></article>;}
