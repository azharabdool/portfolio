import type { MetadataRoute } from 'next';
import { projects } from '@/data/profile';
import { archiveProjects } from '@/data/engineering-archive';
import { siteOrigin } from '@/lib/site-origin';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin;
  return ['/', '/profile/', '/resume/', '/lab/', ...projects.map(({ slug }) => `/projects/${slug}/`), ...archiveProjects.map(({slug})=>`/engineering/${slug}/`)].map((route) => ({ url: new URL(route, origin).href }));
}
