'use client';

import { ArrowLeft, ArrowRight, BookOpen, GitBranch, ScanLine } from 'lucide-react';
import { useId, useRef, useState, type KeyboardEvent } from 'react';
import type { ProjectInsight } from '@/data/project-insights';

const modes = [
  { label: 'System flow', Icon: GitBranch },
  { label: 'Theory', Icon: BookOpen },
  { label: 'Validation', Icon: ScanLine },
];

export function StudyWorkbench({ insight }: { insight: ProjectInsight }) {
  const id = useId();
  const [mode, setMode] = useState(0);
  const [step, setStep] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === 'ArrowRight' ? (index + 1) % modes.length
      : event.key === 'ArrowLeft' ? (index + modes.length - 1) % modes.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : null;
    if (next === null) return;
    event.preventDefault(); setMode(next); tabs.current[next]?.focus();
  };
  return <section className='study-workbench' aria-labelledby={`${id}-heading`}>
    <div className='study-intro'><p className='eyebrow'>ENGINEERING PERSPECTIVE</p><h2 id={`${id}-heading`}>Inside the work</h2><p>{insight.purpose}</p></div>
    <dl className='study-tools'>{insight.tools.map(tool => <div key={tool.title}><dt>{tool.title}</dt><dd>{tool.detail}</dd></div>)}</dl>
    <div className='study-tabs' role='tablist' aria-label='Technical perspective'>
      {modes.map(({ label, Icon }, index) => <button key={label} type='button' ref={node => { tabs.current[index] = node; }} role='tab' id={`${id}-tab-${index}`} aria-controls={`${id}-panel-${index}`} aria-selected={mode === index} tabIndex={mode === index ? 0 : -1} onClick={() => setMode(index)} onKeyDown={event => onKey(event, index)}><Icon size={16}/>{label}</button>)}
    </div>
    <div className='study-panel' role='tabpanel' id={`${id}-panel-0`} aria-labelledby={`${id}-tab-0`} hidden={mode !== 0} tabIndex={0}>
      <ol className='study-flow'>{insight.flow.map((item, index) => <li key={item.title} data-reached={index <= step}><button type='button' aria-pressed={step === index} onClick={() => setStep(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</button></li>)}</ol>
      <div className='study-step' aria-live='polite' aria-atomic='true'><span className='eyebrow'>STEP {step + 1} / {insight.flow.length}</span><h3>{insight.flow[step].title}</h3><p>{insight.flow[step].detail}</p></div>
      <div className='study-controls'><span>Source-derived walkthrough</span><button type='button' aria-label='Previous flow step' title='Previous flow step' disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft size={18}/></button><button type='button' aria-label='Next flow step' title='Next flow step' disabled={step === insight.flow.length - 1} onClick={() => setStep(step + 1)}><ArrowRight size={18}/></button></div>
    </div>
    <div className='study-panel' role='tabpanel' id={`${id}-panel-1`} aria-labelledby={`${id}-tab-1`} hidden={mode !== 1} tabIndex={0}><dl className='study-theory'>{insight.concepts.map(concept => <div key={concept.title}><dt>{concept.title}</dt><dd>{concept.detail}</dd></div>)}</dl></div>
    <div className='study-panel' role='tabpanel' id={`${id}-panel-2`} aria-labelledby={`${id}-tab-2`} hidden={mode !== 2} tabIndex={0}><div className='study-validation'><h3>What the demonstration establishes</h3><p>{insight.check}</p><h3>Evidence behind this page</h3><p>{insight.evidence}</p></div></div>
  </section>;
}
