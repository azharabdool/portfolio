'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AlgorithmExplorer } from './algorithm-explorer';
import { EmbeddedLab, SchedulingLab, ConcurrencyLab } from './systems-lab';
import { FourRoomsReplay } from './four-rooms-replay';
import { archiveProjects } from '@/data/engineering-archive';
import { LabPreview } from './lab-preview';
import { FourierLab } from './signal-lab';
const modes=['Signals','Scheduling','Graph search','Memory','Workers','Learning agent','Fourier'] as const;
export function EngineeringLab() {
  const [mode,setMode]=useState<typeof modes[number]>('Signals');
  const [category,setCategory]=useState('All');
  const visible=archiveProjects.filter(p=>category==='All'||p.visual===category);
  return <><div className="lab-workbench"><div className="lab-toolbar"><span className="eyebrow">ENGINEERING / OBSERVATION DESK</span><span className="lab-status"><i/> SOURCE-BASED EXPLORATION</span></div><div className="lab-mode-tabs" role="group" aria-label="Engineering lab mode">{modes.map(m=><button key={m} aria-pressed={mode===m} onClick={()=>setMode(m)}>{m}</button>)}</div><h2>{mode==='Signals'?'From an input to a signal':mode==='Scheduling'?'The order changes the wait':mode==='Graph search'?'A shortest path, one relaxation at a time':mode==='Memory'?'Where an address goes':mode==='Workers'?'Partition. Work. Reduce.' :mode==='Fourier'?'From harmonics to a pulse':'A policy moving through rooms'}</h2>{mode==='Signals'?<EmbeddedLab/>:mode==='Scheduling'?<SchedulingLab/>:mode==='Graph search'?<AlgorithmExplorer mode="graph"/>:mode==='Memory'?<AlgorithmExplorer mode="memory"/>:mode==='Workers'?<ConcurrencyLab/>:mode==='Fourier'?<FourierLab/>:<FourRoomsReplay/>}</div><div className="lab-catalogue-heading"><h2>Engineering archive</h2><div className="segmented" role="group" aria-label="Archive discipline">{[['All','All'],['signals','Signals / EEE'],['graph','Algorithms'],['threads','Concurrency'],['memory','Systems'],['image','Images / data']].map(([value,label])=><button key={value} aria-pressed={category===value} onClick={()=>setCategory(value)}>{label}</button>)}</div></div><div className="lab-catalogue">{visible.map(p=><Link className="lab-module" key={p.slug} href={`/engineering/${p.slug}/`}><LabPreview kind={p.visual}/><div><span className="project-meta">{p.course} / {p.year}</span><h3>{p.title}</h3><p>{p.summary}</p></div></Link>)}</div><p className="evidence-caption">Original submissions, source-executed records and new portfolio visualisations are identified separately on each case study. Historical screenshots are genuine application captures; synthetic demonstrations are not historical measurements.</p></>;
}
