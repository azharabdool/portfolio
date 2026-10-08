export type CourseContext = { code: string; name: string; year: string; summary: string; url: string; faculty: string; page: number };
const science2024 = 'https://uct.ac.za/media/584501';
const science2023 = 'https://uct.ac.za/media/229776';
const science2022 = 'https://uct.ac.za/media/9844';
const ebe2021 = 'https://uct.ac.za/media/9674';
export const courseContexts: CourseContext[] = [
  { code:'CSC3022F', name:'C++ and Machine Learning', year:'2024', summary:'C++ language and memory-model foundations followed by Python-based machine-learning implementation.', url:science2024, faculty:'Science', page:102 },
  { code:'CSC3002F', name:'Computer Science 3002', year:'2024', summary:'Operating-system organisation and computer networks, with an Internet-protocol focus.', url:science2024, faculty:'Science', page:102 },
  { code:'CSC3003S', name:'Computer Science 3003', year:'2024', summary:'Advanced software design, algorithm analysis and limits of computation.', url:science2024, faculty:'Science', page:102 },
  { code:'CSC2001F', name:'Computer Science 2001', year:'2023', summary:'Data structures, graph algorithms and relational database design; practical Java programming.', url:science2023, faculty:'Science', page:99 },
  { code:'CSC2001F', name:'Computer Science 2001', year:'2022', summary:'Data storage, data structures and database foundations. Individual implementation is described separately below.', url:science2022, faculty:'Science', page:99 },
  { code:'CSC2002S', name:'Computer Science 2002', year:'2023', summary:'Concurrent programming, computer architecture and interface design, with Java and assembler practicals.', url:science2023, faculty:'Science', page:99 },
  { code:'CSC2002S', name:'Computer Science 2002', year:'2022', summary:'Concurrent programming, computer architecture and interface design, with Java and assembler practicals.', url:science2022, faculty:'Science', page:99 },
  { code:'EEE3096S', name:'Embedded Systems II', year:'2023', summary:'Embedded architectures, firmware/software stacks and system modelling. The practicals shown here focus on peripherals and signal generation.', url:'https://uct.ac.za/media/229755', faculty:'Engineering & the Built Environment', page:136 },
  { code:'EEE2044S', name:'Introduction to Power Engineering', year:'2021', summary:'Magnetic circuits, electrical machines and single-phase transformers.', url:ebe2021, faculty:'Engineering & the Built Environment', page:126 },
  { code:'EEE2047S', name:'Signals and Systems I', year:'2021', summary:'Linear systems, convolution, Fourier analysis and sampling in time and frequency domains.', url:ebe2021, faculty:'Engineering & the Built Environment', page:127 },
];
export function findCourseContext(label: string, year: string) {
  return courseContexts.find(course => course.year === year && label.includes(course.code.slice(0, 7)));
}
