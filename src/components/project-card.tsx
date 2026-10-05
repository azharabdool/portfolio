import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/profile';
import { ProjectArt } from './project-art';

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card">
    <Link href={`/projects/${project.slug}/`} className="project-card-link" aria-label={`Read ${project.title}`}>
      <ProjectArt project={project} />
      <div className="project-card-copy">
        <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
        <h3>{project.title}<ArrowUpRight size={20} aria-hidden="true" /></h3>
        <p>{project.description}</p>
        <div className="project-tags">{project.tags.slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </Link>
  </article>;
}
