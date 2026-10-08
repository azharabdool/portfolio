import Image from 'next/image';
import { ArrowUpRight, FileCheck2 } from 'lucide-react';
import { Credential, credentialDate, credentialTypes } from '@/data/credentials';

export function CredentialGrid({ items }: { items: Credential[] }) {
  return <div className='credential-grid'>{items.map(item => <article className='credential-card' key={item.slug} data-kind={item.kind}>
    <a className='credential-preview' href={`/credentials/${item.slug}.pdf`} target='_blank' rel='noopener noreferrer' aria-label={`View ${item.title} document`}><Image src={`/credentials/${item.slug}.webp`} alt={`Genuine ${item.issuer} document for ${item.title}, privacy-reviewed copy`} fill sizes='(max-width:640px) 90vw, (max-width:960px) 44vw, 580px' /></a>
    <div className='credential-copy'><p className='eyebrow'>{credentialTypes[item.kind]}</p><h3>{item.title}</h3><p className='credential-issuer'>{item.issuer}</p><p>{item.detail}</p><dl className='credential-dates'><div><dt>Issued</dt><dd>{item.issued ? <time dateTime={item.issued}>{credentialDate(item.issued)}</time> : 'Date not recorded'}</dd></div>{item.expires && <div><dt>Expired</dt><dd><time dateTime={item.expires}>{credentialDate(item.expires)}</time></dd></div>}</dl><div className='credential-actions'><a href={`/credentials/${item.slug}.pdf`} target='_blank' rel='noopener noreferrer'><FileCheck2 size={16}/>{item.kind === 'training' ? 'View course record' : 'View certificate'}<ArrowUpRight size={14}/></a>{item.verify && <a href={item.verify} target='_blank' rel='noopener noreferrer'>Verify credential<ArrowUpRight size={14}/></a>}</div></div>
  </article>)}</div>;
}
