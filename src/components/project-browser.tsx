'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { categories, projects } from '@/data/profile';

export function ProjectBrowser() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const filtered = projects.filter((project) => category === 'All' || project.category === category);
  return <div className="project-browser">
    <div className="filters" role="group" aria-label="Filter projects by engineering discipline">
      {categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? 'filter-button active' : 'filter-button'}>{item}</button>)}
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
    <div className="project-list">{filtered.map((project) => <Link key={project.slug} href={`/projects/${project.slug}/`} className="project-row">
      <span className={`discipline-mark discipline-${project.visual}`} aria-hidden="true" />
      <span className="project-row-main"><strong>{project.title}</strong><span>{project.description}</span></span>
      <span className="project-row-category">{project.category}</span><span className="project-row-year">{project.year}</span><ArrowUpRight size={18} aria-hidden="true" />
    </Link>)}</div>
  </div>;
}
