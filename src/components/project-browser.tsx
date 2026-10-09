'use client';

import { useState } from 'react';
import { categories, projects } from '@/data/profile';
import { ProjectCard } from './project-card';

export function ProjectBrowser() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const filtered = projects.filter((project) => category === 'All' || project.category === category);
  return <div className="project-browser">
    <div className="filters" role="group" aria-label="Filter projects by engineering discipline">
      {categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? 'filter-button active' : 'filter-button'}>{item}</button>)}
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
    <div className="featured-grid project-index-grid">{filtered.map(project=><ProjectCard key={project.slug} project={project}/>)}</div>
  </div>;
}
