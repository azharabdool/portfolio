export const cityDistricts = [
  {
    name: 'AI & Data', code: 'AI', color: '#e4a0ba', x: 90, y: 96,
    title: 'From pixels to predictions',
    summary: 'Build a learning workflow from data preparation to held-out evaluation. Digit recognition, package-collecting agents and student segmentation explore different kinds of intelligent behaviour.',
    tools: ['PyTorch', 'scikit-learn', 'pandas / NumPy'], theory: ['Representation', 'Optimisation', 'Leakage / evaluation'],
    evidence: 'Individual ML coursework and source-backed experiments.', href: '/projects/machine-learning-mnist-classifier/',
    related: [{ label: 'Four Rooms Q-learning', href: '/projects/reinforcement-learning-four-rooms/' }, { label: 'Honours data mining', href: '/projects/student-performance-data-mining/' }],
  },
  {
    name: 'Software', code: 'APP', color: '#8dd2df', x: 300, y: 52,
    title: 'Connect the whole workflow',
    summary: 'Link identity, navigation and persistent records in a collaborative tutoring app. Current Honours architecture work adds a design perspective on service boundaries, contracts and distributed failure.',
    tools: ['React Native / Expo', 'Firebase', 'React Navigation'], theory: ['Role-based flows', 'Service contracts', 'Data ownership'],
    evidence: 'Shared capstone; Git history supports contributions, not sole ownership.', href: '/projects/uct-tutor-marketplace-app/',
    related: [{ label: 'Honours architecture study', href: '/engineering/microservices-architecture-study/' }, { label: 'Enterprise experience', href: '/#experience' }],
  },
  {
    name: 'Embedded', code: 'MCU', color: '#b5d69c', x: 500, y: 96,
    title: 'Signals beyond the screen',
    summary: 'Connect numerical samples to hardware events: timers trigger DMA transfers into PWM registers. ADC and LCD practicals extend the work into sensing and peripheral interaction.',
    tools: ['Embedded C / STM32', 'Timers / DMA', 'ADC / PWM'], theory: ['Sample cadence', 'Interrupts', 'Peripheral coordination'],
    evidence: 'Collaborative source and hand-ins; plots are source-derived, not new hardware measurements.', href: '/projects/stm32-signal-generation/',
    related: [{ label: 'Transformer construction', href: '/engineering/transformer-build/' }, { label: 'Fourier reconstruction', href: '/engineering/fourier-reconstruction/' }],
  },
  {
    name: 'Systems', code: 'SYS', color: '#e4c18b', x: 700, y: 52,
    title: 'Understand contention and cost',
    summary: 'Explore queues, shared state and address bits through scheduling and memory exercises. Algorithm instrumentation and fork/join work connect implementation choices to correctness and measurement.',
    tools: ['Java / blocking queues', 'ForkJoinPool', 'Bit operations'], theory: ['Scheduling policy', 'Synchronisation', 'Measurement boundaries'],
    evidence: 'Runnable source studies; original scheduler aggregate defects are explicitly documented.', href: '/projects/operating-systems-simulations/',
    related: [{ label: 'Dijkstra experiments', href: '/engineering/dijkstra-experiment/' }, { label: 'Parallel terrain search', href: '/engineering/parallel-monte-carlo/' }],
  },
  {
    name: 'Security & Networks', code: 'SEC', color: '#b7a8e5', x: 910, y: 96,
    title: 'Know the trust boundary',
    summary: 'Current Honours work examines web request guards and security-aware system design. Earlier socket coursework makes discovery, message framing and insecure transport assumptions concrete.',
    tools: ['ModSecurity configuration', 'Python sockets', 'TCP / UDP'], theory: ['Defence in depth', 'Request phases', 'Framing / trust'],
    evidence: 'Two inspected WAF rules, architecture analysis and a collaborative networking prototype; no secure-stack deployment claimed.', href: '/engineering/waf-request-filtering/',
    related: [{ label: 'Peer networking prototype', href: '/projects/networking-p2p-chat-prototype/' }, { label: 'Current Honours study', href: '/#honours' }],
  },
];

export function cityWirePath(index: number) {
  const a = cityDistricts[index], b = cityDistricts[index + 1];
  return `M${a.x} ${a.y} C${a.x + 65} ${a.y - 48},${b.x - 65} ${b.y - 48},${b.x} ${b.y}`;
}
