export const profile = {
  name: 'Azhar Abdool',
  title: 'Software & Computer Engineer',
  email: 'azharabdool786@gmail.com',
  github: 'https://github.com/azharabdool',
  linkedin: 'https://www.linkedin.com/in/azhar-abdool/',
  cv: '/Azhar-Abdool-General-Engineering-CV.pdf',
  aiCv: '/Azhar-Abdool-AI-Engineering-CV.pdf',
  intro: 'Building intelligent software, data platforms and real-world systems.',
  about: 'My background connects software and computer engineering. I studied Computer Science and Computer Engineering at the University of Cape Town and now develop enterprise software at NCT Forestry. That foundation carries through to my work with machine learning, Foundry data workflows, embedded systems and networks.',
  aboutDetail: 'I work across the software-to-hardware spectrum, with a growing focus on intelligent, data-driven systems. My current part-time Honours study in Security & Network Engineering adds a security perspective to how I build and integrate systems.',
};

export const categories = ['All', 'AI & ML', 'Data / FDE', 'Software', 'Embedded', 'Systems', 'Security & Networks'] as const;
export type Category = Exclude<(typeof categories)[number], 'All'>;

export type Project = {
  slug: string;
  title: string;
  category: Category;
  year: string;
  context: string;
  description: string;
  tags: string[];
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  visual: 'foundry' | 'neural' | 'data' | 'rooms' | 'mobile' | 'embedded' | 'systems' | 'network' | 'vision' | 'planning';
  overview: string;
  approach: string;
  pipeline: string[];
  results: string[];
  limitations: string;
  attribution: string;
  repository?: string;
};

export const projects: Project[] = [
  {
    slug: 'foundry-ai-infographic-dashboard', title: 'From business data to visual intelligence', category: 'Data / FDE', year: '2026', context: 'Foundry project', visual: 'foundry', featured: true,
    image: '/images/foundry-dashboard.webp', imageAlt: 'Original Foundry streaming KPI dashboard with charts and quality indicators',
    description: 'An enterprise KPI dashboard with a conversational infographic workflow and generation history.',
    tags: ['Foundry', 'Ontology', 'AIP Logic', 'Gemini'],
    overview: 'A Foundry project exploring OTT streaming KPIs and presenting business questions through an infographic-generation interface. Supplied screenshots show the dashboard, prompt view, generated analysis and previous-generation history.',
    approach: 'The CV records dataset transformations, Ontology workflows, AIP Logic for natural-language interactions and Gemini integration for infographic summaries. The screenshots support the visible user workflow; an exported application or model-call trace was not supplied.',
    pipeline: ['Business data', 'Foundry transforms', 'Ontology', 'Prompt workflow', 'Infographic history'],
    results: ['Two privacy-reviewed screenshots document the dashboard and prompt interface.', 'Visible KPIs include active users, sessions, engagement depth, streaming quality and error rate.'],
    limitations: 'Presented as an evidence-based case study. Backend configuration and model behaviour cannot be reproduced from screenshots, and no performance metrics are claimed.',
    attribution: 'Independent 2026 project. AIP Logic and Gemini implementation details are supported by the supplied CV; screenshot evidence is narrower.',
  },
  {
    slug: 'machine-learning-mnist-classifier', title: 'Handwritten digit recognition', category: 'AI & ML', year: '2024', context: 'UCT · CSC3022', visual: 'neural', featured: true,
    repository: 'https://github.com/azharabdool/machine-learning-mnist-classifier',
    description: 'A PyTorch neural network that learns to classify MNIST digits from normalised image input.',
    tags: ['Python', 'PyTorch', 'Neural networks'],
    overview: 'Built a feedforward classifier for handwritten digits, including data loading, minibatch training, test evaluation and prediction for a local image.',
    approach: 'Flatten 28 × 28 images into 784 inputs, then use 128- and 64-unit ReLU hidden layers and a 10-class output. The original uses Adam at 0.001, batches of 32 and seven epochs.',
    pipeline: ['MNIST', 'Normalise', '784 → 128 → 64 → 10', 'Train with Adam', 'Evaluate / predict'],
    results: ['The original training log records 95.71% MNIST test accuracy.', 'The cleaned entry point supports explicit dataset paths and a bounded, non-interactive smoke run.'],
    limitations: 'The 95.71% result is historical. The submitted softmax-before-cross-entropy design is retained and documented; no saved checkpoint or seeded repeatability evidence was supplied.',
    attribution: 'UCT CSC3022 coursework, 2024. Setup changes are labelled as portfolio cleanup.',
  },
  {
    slug: 'student-performance-data-mining', title: 'Finding patterns in student performance', category: 'AI & ML', year: '2026', context: 'Eduvos · ITDAA4', visual: 'data', featured: true,
    repository: 'https://github.com/azharabdool/student-performance-data-mining',
    image: '/images/data-mining-evaluation.webp', imageAlt: 'Confusion matrices generated by a fresh execution of the supplied data-mining notebook',
    description: 'Segmentation, preprocessing and comparative classification with train-only scikit-learn pipelines.',
    tags: ['scikit-learn', 'pandas', 'K-Means', 'PCA'],
    overview: 'Analyse tutorial attendance and academic performance, segment students with clustering, and compare pass/fail classifiers on a separate AI-usage dataset.',
    approach: 'Use scaled K-Means features and PCA for segmentation. For classification, remove identifier/outcome leakage columns, split 80/20 with stratification, and fit imputation, encoding and SelectKBest inside training pipelines. Compare Logistic Regression and a depth-limited Decision Tree.',
    pipeline: ['Clean data', 'EDA / segmentation', 'Stratified split', 'Train-only preprocessing', 'Compare classifiers'],
    results: ['Fresh local execution reproduced 94.75% Logistic Regression accuracy and 92.8125% Decision Tree accuracy.', 'Rounded historical positive-class F1 scores: 0.971 and 0.960 respectively.'],
    limitations: 'The positive class is “passed”; these F1/recall values do not directly describe detection of students needing support. A single held-out split is not external validation. Raw datasets remain local pending provenance review.',
    attribution: 'Eduvos coursework, 2026. Source notebook preserved; private metadata and individual-record outputs cleared.',
  },
  {
    slug: 'uct-tutor-marketplace-app', title: 'Connecting students with tutors', category: 'Software', year: '2024', context: 'UCT · Group capstone', visual: 'mobile', featured: true,
    description: 'A React Native application for tutor discovery, registration, profiles and session workflows.',
    tags: ['React Native', 'Expo', 'Firebase'],
    overview: 'TuToR is a group capstone application for students and tutors in the UCT network, bringing discovery, profiles, meeting/session screens and feedback into a mobile workflow.',
    approach: 'React Navigation connects student/tutor screen flows. Firebase Authentication, Firestore and Storage provide authentication and persistence. Source includes wallet and transcript-upload screens.',
    pipeline: ['Registration', 'Student / tutor profile', 'Tutor discovery', 'Session workflow', 'Ratings / feedback'],
    results: ['A substantial React Native/Expo application is present in source.', 'Portfolio cleanup replaces deployed Firebase identifiers with environment-based setup.'],
    limitations: 'Collaborative source remains private pending team republishing permission. End-to-end operation requires a new Firebase project and reviewed rules. Wallet UI is not evidence of production payment processing.',
    attribution: 'Collaborative university project, UCT CSC3003S, 2024. Git history verifies 40 commits under Azhar, including navigation, authentication, chat, meeting and profile screens; this is contribution evidence, not exclusive module ownership.',
  },
  {
    slug: 'stm32-signal-generation', title: 'Signals, timing and the physical world', category: 'Embedded', year: '2023', context: 'UCT · EEE3096S', visual: 'embedded', featured: true,
    description: 'STM32 embedded C work coordinating timers, DMA, waveform lookup tables, ADC and PWM.',
    tags: ['C', 'STM32', 'DMA', 'ADC / PWM'],
    overview: 'Embedded practicals exploring waveform generation and analogue-input control on a microcontroller, with LCD and interrupt interaction.',
    approach: 'A timer-driven DMA transfer writes waveform lookup-table values to the PWM compare register. A related practical samples ADC input and updates PWM behaviour.',
    pipeline: ['Waveform LUT', 'Timer trigger', 'DMA', 'PWM compare register', 'Signal output'],
    results: ['Original C source demonstrates peripheral configuration and waveform tables.', 'Separate practical source documents ADC sampling and PWM control.'],
    limitations: 'Source excerpt only. Original board headers, HAL/startup/linker files and LCD support are missing from the selected folders. Hardware execution and oscilloscope measurements were not performed during cleanup.',
    attribution: 'Group embedded practicals, 2023. STM32 vendor boilerplate and third-party rights remain attributed.',
  },
  {
    slug: 'operating-systems-simulations', title: 'Understanding systems under contention', category: 'Systems', year: '2024', context: 'UCT · CSC3002', visual: 'systems', featured: true,
    description: 'Java simulations for FCFS/SJF scheduling, thread coordination and virtual address translation.',
    tags: ['Java', 'Concurrency', 'Operating systems'],
    overview: 'Explore the behaviour of scheduler policies in a concurrent service simulation and map virtual addresses to physical frames using a fixed page table.',
    approach: 'Patron and service threads coordinate with CountDownLatch. FIFO and priority queues support FCFS/SJF policies; timing outputs capture wait, response and turnaround behaviour. A separate memory exercise decodes little-endian addresses.',
    pipeline: ['Concurrent requests', 'FIFO / priority queue', 'FCFS / SJF service', 'Timing outputs'],
    results: ['Source compiled with JDK 17; both three-patron FCFS/SJF smoke runs completed.', 'The address translator reproduced eight physical addresses from the supplied fixture.'],
    limitations: 'Fresh runs expose an invalid turnaround aggregate: the order arrival field is not populated, and waiting/response aggregates use the global service start rather than each order arrival. These are not valid scheduler benchmarks. Teaching scaffolding is attributed.',
    attribution: 'UCT CSC3002, 2024. Built on teaching skeleton code; portfolio cleanup reorganises the source.',
  },
  {
    slug: 'reinforcement-learning-four-rooms', title: 'Learning to navigate Four Rooms', category: 'AI & ML', year: '2024', context: 'UCT · CSC3022', visual: 'rooms',
    image: '/images/four-rooms.webp', imageAlt: 'Original Four Rooms agent path in a room grid',
    description: 'Tabular Q-learning experiments with package collection and stochastic transitions.', tags: ['Python', 'Q-learning', 'NumPy'],
    overview: 'Three submitted agents explore single, multiple and ordered package collection in a supplied Four Rooms environment.',
    approach: 'Use NumPy state-action tables, reward shaping and Q-value updates. Actions are greedy argmax selections; stochastic environment transitions provide a separate source of randomness.',
    pipeline: ['Grid state', 'Greedy action', 'Transition / reward', 'Q-value update', 'Path plot'],
    results: ['Six original deterministic/stochastic path images are retained.', 'A bounded launcher isolates fresh generated paths from historical evidence.'],
    limitations: 'Bookkeeping, terminal updates and unbounded loops can affect completion. A successful single run is not a convergence or optimality result. No invented success-rate metric is included.',
    attribution: 'UCT coursework using a supplied teaching environment, 2024.',
  },
  {
    slug: 'computer-vision-connected-components', title: 'Structure inside grayscale images', category: 'Systems', year: '2024', context: 'UCT · CSC3022', visual: 'vision',
    image: '/images/connected-components.webp', imageAlt: 'New synthetic input beside the mask produced by the original connected-component algorithm',
    description: 'A C++ image processor using thresholding, flood fill and component-size filtering.', tags: ['C++', 'Image processing', 'BFS'],
    overview: 'Extract connected foreground regions from PGM images, inspect component statistics and write filtered masks.',
    approach: 'Apply a grayscale threshold, traverse connected neighbours using a queue-based flood fill, store component pixels and filter by minimum/maximum size.',
    pipeline: ['PGM image', 'Threshold', 'BFS traversal', 'Size filter', 'Output mask'],
    results: ['The submitted processor compiled, passed 19 assertions in two tests and generated a mask from a new synthetic input.', 'The public visual uses original synthetic shapes rather than supplied image fixtures with unclear redistribution rights.'],
    limitations: 'Classical image processing, with no trained model. Original test expectations and input-validation limitations are documented in the project notes.',
    attribution: 'Authored coursework with supplied image fixtures and a third-party Catch test header.',
  },
  {
    slug: 'networking-p2p-chat-prototype', title: 'Coordinating peers over a network', category: 'Security & Networks', year: '2024', context: 'UCT · Group assignment', visual: 'network',
    description: 'A Python socket prototype separating TCP coordination from UDP peer messaging.', tags: ['Python', 'TCP / UDP', 'Sockets'],
    overview: 'Register and discover peers through a central server, then send chat messages directly as UDP datagrams.',
    approach: 'A threaded TCP control service manages users and addresses; clients run a UDP receive thread for peer messages. The protocol is delimiter-based and instructional.',
    pipeline: ['Client', 'TCP coordination', 'Peer discovery', 'UDP message'],
    results: ['Source has been curated with configurable loopback defaults and an explicit security review.'],
    limitations: 'Plaintext passwords, unauthenticated UDP and weak framing are known limitations. This is networking coursework, not a secure chat product; run it only in an isolated lab.',
    attribution: 'Group networking coursework, UCT CSC3002, 2024.',
  },
  {
    slug: 'foundry-supply-demand-planning', title: 'Planning the flow from supply to demand', category: 'Data / FDE', year: '2026', context: 'Planning brief / data study', visual: 'planning',
    description: 'Manufacturing input validation and a proposed ontology-backed planning workflow.', tags: ['Data validation', 'Foundry planning', 'CSV'],
    overview: 'A supplied manufacturing planning brief proposes comparing forecast demand, production actuals and product master data in Foundry.',
    approach: 'Document input grain and validate schemas before designing joins and variance/fill-rate indicators. The cleanup adds a clearly labelled input-inspection script.',
    pipeline: ['Forecast', 'Production actuals', 'Product master', 'Validate keys', 'Proposed planning view'],
    results: ['Supplied inputs contain 32 forecast rows, 40 actuals rows and four product-master rows.'],
    limitations: 'A planning brief and local data study, not a verified deployed Foundry application. Data redistribution rights and a platform export remain unconfirmed.',
    attribution: 'Supplied 2026 project brief; local input validation is a post-project addition.',
  },
];

export const skillGroups = [
  { title: 'AI & Data', number: '01', items: ['Python', 'PyTorch', 'scikit-learn', 'pandas / NumPy', 'Classification', 'Q-learning', 'K-Means / PCA'] },
  { title: 'Software Engineering', number: '02', items: ['Java / JavaScript', 'C / C++ / C#', 'React Native', 'REST APIs', 'Git', 'Testing & debugging'] },
  { title: 'Enterprise & Platforms', number: '03', items: ['Oracle / PL/SQL', 'Oracle APEX', 'SQL / MySQL', 'Palantir Foundry', 'Ontology / AIP Logic', 'Firebase', 'Enterprise workflows'] },
  { title: 'Embedded & Systems', number: '04', items: ['STM32', 'ADC / PWM', 'Timers / DMA', 'Microcontrollers', 'Operating systems', 'Concurrency'] },
  { title: 'Security & Networks', number: '05', items: ['TCP / UDP', 'Wireshark', 'RBAC', 'Input validation', 'Application security', 'Azure security coursework'] },
];

export const credentials = [
    { name: 'Junior Forward Deployed Engineer', issuer: 'Ontology University', type: 'Certificate of achievement', detail: 'Issued 10 June 2026 · 12-week practitioner programme · independent examiner defence', link: null },
  { name: 'Business Process Integration with SAP S/4HANA', issuer: 'SAP', type: 'Professional certification · earned', detail: 'Earned January 2025 · supplied credential expired January 2026', link: 'https://www.credly.com/users/azhar-abdool' },
  { name: 'Azure Security Technologies · AZ-500', issuer: 'Microsoft course evidence', type: 'Course / training', detail: 'Supplied course record; professional exam certification not verified', link: null },
  { name: 'Security Operations Analyst · SC-200', issuer: 'Microsoft course evidence', type: 'Course / training', detail: 'Supplied course record; professional exam certification not verified', link: null },
  { name: 'Secure Azure services with Microsoft Defender for Cloud · SC-5002', issuer: 'Microsoft course evidence', type: 'Course / training', detail: 'Course record covering regulatory compliance and secure Azure services', link: null },
  { name: 'ABAP on SAP BTP & Basic ERP Processes', issuer: 'SAP', type: 'Training / record of achievement', detail: 'Supplied learning records, 2024–2025', link: null },
];
