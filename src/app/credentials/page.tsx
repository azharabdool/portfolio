import { CredentialGrid } from '@/components/credentials';
import { credentialEvidence } from '@/data/credentials';
import { pageMetadata, caseStudySchema } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';

export const metadata = pageMetadata('Credentials & Training', 'Azhar Abdool’s verified credential documents: Ontology University, SAP, Palantir and Microsoft course evidence, with certification and training clearly distinguished.', '/credentials/');
export default function CredentialsPage() {
  return <article className='project-detail container credentials-page'><StructuredData data={caseStudySchema('Credential evidence','Reviewed original issuer documents, not recreated certificates.','/credentials/','Professional certification, records of achievement and training are distinguished.')}/><p className='eyebrow'>AZHAR ABDOOL / CREDENTIAL EVIDENCE</p><h1>Credentials & training.</h1><p className='lead'>Original issuer documents. Professional certification, achievement and course completion are kept distinct.</p><p className='evidence-caption'>Public copies have unnecessary metadata removed. The Ontology University identifier is omitted from its privacy-reviewed copy; searchable credential information is retained on this page.</p><CredentialGrid items={credentialEvidence}/></article>;
}
