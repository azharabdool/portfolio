export type Credential = {
  slug: string; title: string; issuer: string; kind: 'certification' | 'achievement' | 'training';
  issued: string | null; expires?: string; detail: string; verify?: string; featured?: boolean;
};
export const credentialEvidence: Credential[] = [
  { slug:'ontology-junior-fde', title:'Junior Forward Deployed Engineer', issuer:'Ontology University', kind:'achievement', issued:'2026-06-10', detail:'Certificate of achievement. Twelve-week practitioner programme and independent examiner defence.', featured:true },
  { slug:'sap-associate', title:'SAP Certified Associate - Business Process Integration with SAP S/4HANA', issuer:'SAP', kind:'certification', issued:'2025-01-20', expires:'2026-01-21', detail:'Professional certification earned in 2025. The supplied credential has expired.', verify:'https://www.credly.com/badges/592610f7-d014-475f-b705-026d5c9f5282', featured:true },
  { slug:'palantir-foundations', title:'Foundry & AIP Builder Foundations', issuer:'Palantir', kind:'training', issued:'2025-12-07', detail:'Completed the Foundry and AIP Builder Foundations curriculum.', verify:'https://verify.skilljar.com/c/f9jmp39wzz59', featured:true },
  { slug:'azure-security', title:'AZ-500: Microsoft Azure Security Technologies', issuer:'Ikamva Digital / Microsoft course evidence', kind:'training', issued:null, detail:'Named course badge. A passed Microsoft certification examination is not established.', featured:true },
  { slug:'palantir-application', title:'Deep Dive: Building Your First Application', issuer:'Palantir', kind:'training', issued:'2025-12-09', detail:'Badge of completion for the application-building course.', verify:'https://verify.skilljar.com/c/3rnwh7s7yjdf' },
  { slug:'security-operations', title:'SC-200T00-A: Microsoft Security Operations Analyst', issuer:'Ikamva Digital / Microsoft course evidence', kind:'training', issued:null, detail:'Named course badge, not evidence of a passed professional certification exam.' },
  { slug:'defender-cloud', title:'SC-5002: Secure Azure services and workloads with Microsoft Defender for Cloud regulatory compliance controls', issuer:'Ikamva Digital / Microsoft course evidence', kind:'training', issued:null, detail:'Course evidence covering Azure services, workloads and regulatory compliance controls.' },
  { slug:'sap-abap', title:'Learning the Basics of ABAP Programming on SAP BTP', issuer:'SAP', kind:'achievement', issued:'2025-01-21', detail:'Record of Achievement at foundational level.', verify:'https://www.credly.com/badges/2245f6d2-8370-4a5a-b17a-0b99cb7cceeb' },
  { slug:'sap-erp-processes', title:'Executing basic ERP processes with SAP S/4HANA', issuer:'SAP', kind:'achievement', issued:'2024-10-28', detail:'Record of Achievement covering procure-to-pay, plan-to-produce and order-to-cash.', verify:'https://www.credly.com/badges/a4b4e07a-5bb3-4e75-bd58-05c348d97d3f' },
  { slug:'sap-ts410-attendance', title:'TS410 - Integrated Business Processes in SAP S/4HANA', issuer:'SAP', kind:'training', issued:null, detail:'Certificate of Attendance. Course dates:12-25 November 2024; no separate issue date is recorded.' },
];
export const credentialTypes = { certification:'Professional certification', achievement:'Certificate / Record of Achievement', training:'Course / training' };
export function credentialDate(date: string) {
  return new Intl.DateTimeFormat('en-ZA', { day:'numeric', month:'short', year:'numeric', timeZone:'UTC' }).format(new Date(`${date}T12:00:00Z`));
}
