import type { Metadata } from 'next';
import { profile } from '@/data/profile';
import { siteOrigin } from './site-origin';
import { uct } from '@/data/education';

export const absoluteUrl = (path: string) => new URL(path, siteOrigin).href;
export const personId = absoluteUrl('/#azhar-abdool');
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const namedTitle=title.includes(profile.name)?title:`${title} | ${profile.name}`;
  return {
    title: { absolute:namedTitle }, description, alternates: { canonical: path },
    openGraph: { title: namedTitle, description, url: path, type: 'website', siteName: 'Azhar Abdool', images: [{ url: '/images/social-preview.png', width: 1200, height: 630, alt: 'Azhar Abdool, Software & Computer Engineer, above a moonlit city' }] },
    twitter: { card: 'summary_large_image', title: namedTitle, description, images: ['/images/social-preview.png'] },
  };
}
export const identityGraph = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Person', '@id': personId, name: profile.name, url: absoluteUrl('/profile/'), jobTitle: profile.title,
      description: profile.about, sameAs: [profile.github, profile.linkedin, 'https://www.credly.com/users/azhar-abdool'],
      alumniOf: { '@type': 'CollegeOrUniversity', '@id': uct.url + '#university', name: uct.name, alternateName: 'UCT', url: uct.url },
      worksFor: { '@type': 'Organization', name: 'NCT Forestry' },
      hasCredential: { '@type': 'EducationalOccupationalCredential', name:'Junior Forward Deployed Engineer', credentialCategory:'Certificate of achievement', recognizedBy:{'@type':'Organization',name:'Ontology University'}, description:'Issued 10 June 2026 after a 12-week practitioner programme and independent examiner defence. A programme achievement, not an employment title.' },
      knowsAbout: ['Software engineering', 'Computer engineering', 'Applied machine learning', 'Data engineering', 'Embedded systems', 'Computer networks'] },
    { '@type': 'WebSite', '@id': absoluteUrl('/#website'), name: 'Azhar Abdool', alternateName: 'Azhar Abdool Engineering Portfolio', url: absoluteUrl('/'), publisher: { '@id': personId }, inLanguage: 'en' },
  ],
};
export function caseStudySchema(title: string, description: string, path: string, context: string) {
  return {
    '@context': 'https://schema.org', '@type': 'CreativeWork', '@id': absoluteUrl(path + '#case-study'),
    name: `${title} — portfolio case study`, description: `${description} ${context}`,
    url: absoluteUrl(path), author: { '@id': personId }, inLanguage: 'en',
    isPartOf: { '@id': absoluteUrl('/#website') },
  };
}
