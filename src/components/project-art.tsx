import Image from 'next/image';
import { BrainCircuit, CircuitBoard, Cpu, Database, GitBranch, Layers3, Radio, Smartphone } from 'lucide-react';
import type { Project } from '@/data/profile';
import { CardPreview } from './card-preview';

export function ProjectArt({ project, large = false }: { project: Project; large?: boolean }) {
  if (project.image) return <div className={`project-art image-art ${large ? 'large-art' : ''}`}><Image src={project.image} alt={project.imageAlt ?? project.title} fill sizes={large ? '(max-width: 800px) 100vw, 1000px' : '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 400px'} className="project-image" />{!large && <CardPreview project={project} />}</div>;
  const Icon = { neural: BrainCircuit, embedded: CircuitBoard, systems: Cpu, mobile: Smartphone, network: Radio, planning: Database, data: GitBranch, foundry: Layers3, rooms: BrainCircuit, vision: Layers3 }[project.visual];
  const labels = {
    neural: ['784', '128', '64', '10'], embedded: ['LUT', 'TIMER', 'DMA', 'PWM'], systems: ['REQUEST', 'QUEUE', 'POLICY', 'SERVICE'], mobile: ['STUDENT', 'DISCOVER', 'TUTOR'], network: ['CLIENT', 'TCP', 'PEER', 'UDP'], planning: ['FORECAST', 'ACTUALS', 'PRODUCTS'], data: ['CLEAN', 'SPLIT', 'TRAIN', 'EVALUATE'], foundry: ['DATA', 'ONTOLOGY', 'WORKFLOW'], rooms: ['STATE', 'ACTION', 'REWARD'], vision: ['IMAGE', 'THRESHOLD', 'BFS'],
  }[project.visual];
  return <div className={`project-art diagram-art art-${project.visual} ${large ? 'large-art' : ''}`} role="img" aria-label={`${project.title} architecture: ${labels.join(' to ')}`}>
    <span className="diagram-caption">{project.category.toUpperCase()} / {project.year}</span>
    <div className="diagram-center"><Icon size={large ? 65 : 45} strokeWidth={1} /><div className="diagram-flow">{labels.map((label, index) => <span key={label} className={index === labels.length - 1 ? 'diagram-node final-node' : 'diagram-node'}>{label}</span>)}</div></div>
    <span className="diagram-bottom">{project.visual === 'mobile' ? 'APPLICATION ARCHITECTURE' : 'SYSTEM FLOW'}</span>
    {!large && <CardPreview project={project} />}
  </div>;
}
