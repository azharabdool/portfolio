import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return <section className="container not-found"><p className="eyebrow">404</p><h1>Page not found.</h1><Link href="/" className="button button-primary"><ArrowLeft size={18} /> Back to portfolio</Link></section>;
}
