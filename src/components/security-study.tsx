import { ArrowDown, Database, Network, ShieldCheck } from 'lucide-react';

export function SecurityStudy({ mode }: { mode: 'waf' | 'services' }) {
  const stages = mode === 'waf' ? [
    ['HTTP request', 'Method, URI, headers and argument fields'],
    ['Phase 1 / method guard', 'The retained TRACE rule denies matching requests with HTTP 403.'],
    ['Phase 2 / pattern guard', 'A case-insensitive rule checks selected SQL-like markers and denies matches with HTTP 403.'],
    ['Remaining rules / upstream', 'The rest of the rule set, gateway and services were not recovered.'],
  ] : [
    ['Client / API gateway', 'Proposed entry point in the NexaFlow case study'],
    ['Business service boundaries', 'Project, User, Billing and Notification responsibilities'],
    ['Independent data ownership', 'Stores belong to their service, rather than a shared writable database'],
    ['Asynchronous work', 'Proposed events and a message broker for notifications and analytical updates'],
  ];
  return <figure className='security-study'><p className='eyebrow'>{mode === 'waf' ? 'RETAINED CONFIGURATION / NEW EXPLANATORY DIAGRAM' : 'SUBMITTED ARCHITECTURE REPORT / DESIGN, NOT DEPLOYMENT'}</p><ol>{stages.map(([title, detail], i) => <li key={title}><div><span>{String(i+1).padStart(2,'0')}</span>{mode === 'waf' ? <ShieldCheck size={22}/> : i === 2 ? <Database size={22}/> : <Network size={22}/>}<h3>{title}</h3><p>{detail}</p></div>{i < stages.length-1 && <ArrowDown size={18} aria-hidden='true'/>}</li>)}</ol><figcaption>{mode === 'waf' ? 'Two configuration rules are evidence of request guards, not a verified secure microservices deployment. Regex filtering alone does not establish comprehensive SQL-injection protection.' : 'A portfolio diagram of the report’s proposed service boundaries. These components are not claimed as implemented or deployed software.'}</figcaption></figure>;
}
