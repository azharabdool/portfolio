import { projects } from './profile.ts';
import { archiveProjects } from './engineering-archive.ts';
import { homeProjectCopy } from './home-content.ts';

export const disciplines = [
  { id: 'ai', label: 'AI & Data', code: 'AI', color: '#df9dbd', statement: 'From observations to decisions.' },
  { id: 'software', label: 'Software', code: 'SW', color: '#bce2e8', statement: 'Make the whole workflow work.' },
  { id: 'systems', label: 'Systems', code: 'SYS', color: '#9dbce8', statement: 'Understand the mechanism. Measure the cost.' },
  { id: 'embedded', label: 'Embedded', code: 'MCU', color: '#d69ca5', statement: 'Where code meets physical behaviour.' },
  { id: 'electrical', label: 'Electrical', code: 'EE', color: '#d2d8cb', statement: 'Signals, energy and physical constraints.' },
  { id: 'security', label: 'Security & Networks', code: 'NET', color: '#9eced0', statement: 'Connect systems. Examine their boundaries.' },
] as const;
export type Discipline = typeof disciplines[number]['id'];
type Connection = { discipline: Discipline; reason: string };
const edge = (discipline: Discipline, reason: string): Connection => ({ discipline, reason });
const connections: { slug: string; label: string; links: Connection[] }[] = [
  {slug:'machine-learning-mnist-classifier',label:'MNIST',links:[edge('ai','PyTorch classification, preprocessing and held-out evaluation.'),edge('software','A reproducible Python training and evaluation workflow.')]},
  {slug:'reinforcement-learning-four-rooms',label:'Four Rooms',links:[edge('ai','Tabular Q-learning over state/action values.'),edge('systems','State transitions, action selection and reward bookkeeping.')]},
  {slug:'student-performance-data-mining',label:'Data mining',links:[edge('ai','Preprocessing, classification, K-Means and PCA.'),edge('software','scikit-learn pipelines separate data transformations from estimation.')]},
  {slug:'foundry-ai-infographic-dashboard',label:'Foundry',links:[edge('ai','Documented analytical and conversational AI workflows.'),edge('software','Ontology and application workflows; documentation, not a public backend export.')]},
  {slug:'foundry-supply-demand-planning',label:'Planning study',links:[edge('ai','Inspect input grain and schemas for a proposed analytical workflow.'),edge('software','Data contracts and proposed workflow boundaries; not a deployed planning platform.')]},
  {slug:'uct-tutor-marketplace-app',label:'TuToR',links:[edge('software','Collaborative React Native application with navigation, identity and tutoring flows.'),edge('security','Authentication and role boundaries; contribution is shared, not sole authorship.')]},
  {slug:'microservices-architecture-study',label:'Service boundaries',links:[edge('software','Honours architecture analysis of service contracts and messaging.'),edge('security','Trust boundaries and failure-aware design; report, not deployed services.')]},
  {slug:'relational-queries',label:'Relational queries',links:[edge('software','Joins, predicates and aggregation across relational records.'),edge('ai','Data preparation depends on correct joins and grain.')]},
  {slug:'typing-tutor',label:'Typing game',links:[edge('software','Source-built Java Swing GUI and word-length scoring.'),edge('systems','Event handling and concurrent application state.')]},
  {slug:'image-tile-puzzle',label:'Image puzzle',links:[edge('software','C++ image tiles, legal adjacent swaps and generated PGM frames.'),edge('systems','State invariants and legal-move generation.')]},
  {slug:'computer-vision-connected-components',label:'Image regions',links:[edge('systems','Four-neighbour queue traversal and component-size filtering.'),edge('ai','Classical image preprocessing, not a learned model.'),edge('software','C++ ownership, validated parsing and synthetic regression checks.')]},
  {slug:'operating-systems-simulations',label:'Andre / scheduling',links:[edge('systems','FCFS/SJF queues, coordination and auditing invalid historical timing metrics.'),edge('software','Individual address translator is public; teaching scheduler source stays private.')]},
  {slug:'dijkstra-experiment',label:'Dijkstra',links:[edge('systems','Shortest-path search, relaxation and instrumented algorithm cost.'),edge('ai','Graph search is an intelligent-systems foundation, not an ML claim.')]},
  {slug:'parallel-monte-carlo',label:'Terrain search',links:[edge('systems','Fork/join parallel terrain search and measured work.'),edge('software','Work partitioning, correctness and reproducible experiments.')]},
  {slug:'virtual-memory',label:'Virtual memory',links:[edge('systems','Page/offset decomposition through a fixed seven-entry table.'),edge('embedded','Bit-level addressing illustrates a software/hardware interface; no MMU emulation.')]},
  {slug:'club-concurrency',label:'Concurrent club',links:[edge('systems','Bounded occupancy, threads and shared-state coordination.'),edge('software','Recovered source-built Swing simulation.')]},
  {slug:'record-lookup',label:'Record lookup',links:[edge('systems','Compare array lookup and binary-search-tree structure.'),edge('software','Synthetic found/missing-key checks distinguish behaviour from scaffold ownership.')]},
  {slug:'attribute-validation',label:'Attribute rules',links:[edge('systems','Validate combinations of record attributes.'),edge('software','Small Java rule engine, not an AI model or full game.')]},
  {slug:'parallel-image-filters',label:'Parallel filters',links:[edge('systems','Neighbourhood operations and parallel work partitioning.'),edge('ai','Image processing is a vision foundation; no neural-network claim.')]},
  {slug:'stm32-signal-generation',label:'STM32',links:[edge('embedded','Timer requests, DMA, PWM, ADC and peripheral interaction.'),edge('electrical','Source lookup values connect sample sequences to ideal output waveforms.'),edge('systems','Cadence and interrupt coordination; no new board measurements.')]},
  {slug:'assembly-image-processing',label:'Assembly pixels',links:[edge('embedded','Register-level pixel/address operations in assembly coursework.'),edge('systems','Low-level memory representation; original toolchain needed for execution.')]},
  {slug:'fourier-reconstruction',label:'Fourier',links:[edge('electrical','Fourier-series reconstruction and harmonic content.'),edge('embedded','Sampling and waveform representation provide signal-generation foundations.')]},
  {slug:'frequency-response',label:'Filter response',links:[edge('electrical','Frequency-dependent filter response and signal analysis.'),edge('embedded','Signals crossing a hardware/software boundary require bandwidth awareness.')]},
  {slug:'transformer-build',label:'Transformer',links:[edge('electrical','Windings, construction and retained electrical results.'),edge('embedded','Power conversion is a hardware foundation, not a claimed integration with the STM32 practical.')]},
  {slug:'dc-motor-characteristics',label:'DC machine',links:[edge('electrical','Electrical machine characteristics and retained measurement plots.')]},
  {slug:'networking-p2p-chat-prototype',label:'Peer networking',links:[edge('security','TCP discovery and UDP messages expose framing and plaintext-auth limitations.'),edge('software','Collaborative socket application; shared full source withheld.'),edge('systems','Control-plane coordination is distinct from peer data flow.')]},
  {slug:'waf-request-filtering',label:'WAF guards',links:[edge('security','Two inspected ModSecurity request guards, with bounded authorship/runtime evidence.'),edge('software','Request parsing and rejection at an application boundary; not a complete secure stack.')]},
];

export const engineeringNodes = connections.map((connection) => {
  const major = projects.find(project => project.slug === connection.slug);
  const archive = archiveProjects.find(project => project.slug === connection.slug);
  if (!major && !archive) throw new Error(`Missing network evidence: ${connection.slug}`);
  const copy=homeProjectCopy[connection.slug];
  const source=(major??archive)!;
  const recoveredImage=connection.slug==='machine-learning-mnist-classifier'?'/images/mnist-predictions.webp':connection.slug==='stm32-signal-generation'?'/images/stm32-lookup-tables.webp':undefined;
  return { ...connection, primary: connection.links[0].discipline,
    title: source.title, summary: copy?.summary??archive?.summary??major!.description,
    image: source.image??recoveredImage, imageAlt: source.imageAlt??`${connection.label}: retained output or source-derived plot`, credit:copy?.scope??(/collaborative/i.test(archive?.contribution??'')?'Collaborative':undefined), year:source.year, previewStages:major?.pipeline.slice(0,3),
    tags: (major ?? archive)!.tags, href: `/${major ? 'projects' : 'engineering'}/${connection.slug}/`,
    scope: major?.attribution ?? archive!.contribution };
});

export function networkPosition(index: number) {
  const node = engineeringNodes[index];
  const hub = disciplines.findIndex(item => item.id === node.primary);
  const peers = engineeringNodes.filter(item => item.primary === node.primary);
  const slot = peers.findIndex(item => item.slug === node.slug);
  const angle = (hub * 60 - 90 + (slot - (peers.length - 1) / 2) * 7) * Math.PI / 180;
  const radius = slot % 2 ? 264 : 302;
  return { x: 340 + Math.cos(angle) * radius, y: 320 + Math.sin(angle) * radius };
}
export function hubPosition(index: number) {
  const angle = (index * 60 - 90) * Math.PI / 180;
  return { x: 340 + Math.cos(angle) * 170, y: 320 + Math.sin(angle) * 170 };
}
