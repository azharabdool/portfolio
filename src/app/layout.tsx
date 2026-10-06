import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { profile } from '@/data/profile';
import { siteOrigin } from '@/lib/site-origin';
import { identityGraph } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
import { PerformanceProbe } from '@/components/performance-probe';
import './globals.css';
import './mobile-city.css';
import './launch-polish.css';
import './engineering-experience.css';

export const metadata: Metadata = {
  metadataBase: siteOrigin,
  title: { default: 'Azhar Abdool | Software & Computer Engineer', template: '%s | Azhar Abdool' },
  description: 'Software and computer engineering portfolio of Azhar Abdool. Enterprise software, applied AI, data platforms, STM32 embedded systems and security.',
  applicationName: 'Azhar Abdool Portfolio',
  alternates: { canonical: '/' },
  authors: [{ name: profile.name }],
  robots: { index: true, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION ?? 'xf_oWYeL_2FZgFUnqpGidzIjBRZGArjcAPl7EByJ5eo' },
  keywords: ['Azhar Abdool', 'Software Engineer', 'Computer Engineer', 'Machine Learning', 'Palantir Foundry', 'STM32'],
  openGraph: { title: 'Azhar Abdool | Software & Computer Engineer', description: profile.intro, type: 'website', images: [{ url: '/images/social-preview.png', width: 1200, height: 630, alt: 'Azhar Abdool, Software & Computer Engineer, above a moonlit city' }] },
  twitter: { card: 'summary_large_image', title: 'Azhar Abdool | Software & Computer Engineer', description: profile.intro, images: ['/images/social-preview.png'] },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><StructuredData data={identityGraph}/><PerformanceProbe/><a href="#main-content" className="skip-link">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></body></html>;
}
