type SearchableProject = { title: string; description: string; overview: string; tags: string[]; category: string; context: string; approach: string; pipeline: string[] };

export function matchesProject(project: SearchableProject, query: string) {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const text = [project.title, project.description, project.overview, project.category, project.context, project.approach, ...project.tags, ...project.pipeline].join(' ').toLowerCase();
  return words.every(word => text.includes(word));
}
