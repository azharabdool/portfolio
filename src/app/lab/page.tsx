import { EngineeringLab } from '@/components/engineering-lab';
import { pageMetadata, caseStudySchema } from '@/lib/seo';
import { StructuredData } from '@/components/structured-data';
export const metadata=pageMetadata('Engineering Lab', 'Explore Azhar Abdool’s engineering work: source-traced Dijkstra, STM32 ADC/PWM, scheduling, memory translation, concurrency and recorded reinforcement learning.', '/lab/');
export default function LabPage() {
  return <article className="project-detail container lab-page"><StructuredData data={caseStudySchema('Engineering Lab','Source-based interactive portfolio explanations across computer science and computer engineering.','/lab/','New demonstrations are distinct from original coursework.')}/><p className="eyebrow">AZHAR ABDOOL / ENGINEERING LAB</p><h1>A closer look<br/>at the system.</h1><p className="lead">Algorithms, signals and execution. The engineering underneath the result.</p><EngineeringLab/></article>;
}
