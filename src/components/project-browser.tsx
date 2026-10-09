'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { categories, projects } from '@/data/profile';
import { matchesProject } from '@/lib/project-search';
import { ProjectCard } from './project-card';

export function ProjectBrowser() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All');
  const [query, setQuery] = useState('');
  const filtered = projects.filter((project) => (category === 'All' || project.category === category) && matchesProject(project, query));
  return <div className="project-browser">
    <div className='project-search'><Search size={19} aria-hidden='true'/><input type='search' aria-label='Search projects by tool or concept' placeholder='Search projects, tools or concepts' value={query} onChange={event => setQuery(event.target.value)}/>{query&&<button type='button' aria-label='Clear project search' title='Clear project search' onClick={()=>setQuery('')}><X size={18}/></button>}</div>
    <div className="filters" role="group" aria-label="Filter projects by engineering discipline">
      {categories.map((item) => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)} className={category === item ? 'filter-button active' : 'filter-button'}>{item}</button>)}
    </div>
    <p className="result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}</p>
    <div className="featured-grid project-index-grid">{filtered.map(project=><ProjectCard key={project.slug} project={project}/>)}</div>
    {filtered.length===0&&<p className='project-empty'>No projects match these filters.</p>}
  </div>;
}
