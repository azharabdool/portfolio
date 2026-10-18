import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/profile';
import { ProjectArt } from './project-art';
import { findCourseContext } from '@/data/course-context';
import { homeProjectCopy } from '@/data/home-content';

export function ProjectCard({ project, compact=false }: { project: Project; compact?:boolean }) {
  const course = findCourseContext(project.context, project.year);
  const copy=compact?homeProjectCopy[project.slug]:undefined;
  return <article className={`project-card${compact?' compact-project':''}`}>
    <Link href={`/projects/${project.slug}/`} className="project-card-link" aria-label={`Read ${copy?.title??project.title}`}>
      <ProjectArt project={project} />
      <div className="project-card-copy">
        <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
        {!compact&&<div className='project-course'>{course ? `UCT · ${course.code} · ${course.name}${project.context.includes('Collaborative') ? ' · Collaborative' : ''}` : project.context}</div>}
        {copy?.scope&&<div className='project-course'>{copy.scope}</div>}
        <h3>{copy?.title??project.title}<ArrowUpRight size={20} aria-hidden="true" /></h3>
        <p>{copy?.summary??project.description}</p>
        <div className="project-tags">{project.tags.slice(0, compact?3:4).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </Link>
  </article>;
}
