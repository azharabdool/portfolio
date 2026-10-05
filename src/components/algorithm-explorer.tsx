'use client';

import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import trace from '@/data/dijkstra-trace.json';

const vertices = [{ id: 'A', x: 45, y: 130 }, { id: 'B', x: 215, y: 55 }, { id: 'C', x: 215, y: 205 }, { id: 'D', x: 385, y: 130 }, { id: 'E', x: 535, y: 130 }];
const edges = [['A','B',4],['A','C',1],['C','B',2],['B','D',1],['C','D',5],['D','E',3]] as const;

export function AlgorithmExplorer({ mode }: { mode: 'graph' | 'memory' }) {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState(68);
  if (mode === 'memory') {
    const page = address >> 7; const offset = address & 127; const frame = [2,4,1,7,3,5,6][page];
    return <div className="engineering-tool"><label htmlFor="virtual-address">Virtual address <strong>{address} / 0x{address.toString(16)}</strong></label><input id="virtual-address" type="range" min="0" max="895" value={address} onChange={e=>setAddress(Number(e.target.value))}/><div className="memory-flow"><div>PAGE<strong>{page}</strong></div><div>OFFSET<strong>{offset}</strong></div><div>FRAME<strong>{frame}</strong></div><div>PHYSICAL<strong>0x{((frame << 7)+offset).toString(16)}</strong></div></div><p className="evidence-caption">Documentation model using the exact fixed table and bit operations in OS1Assignment.java. Not a full virtual-memory system.</p></div>;
  }
  const current = trace[step] as { current: string; visited: string[]; distances: Record<string, number | null> };
  return <div className="engineering-tool"><svg className="graph-trace" viewBox="0 0 580 265" role="img" aria-label={`Dijkstra step ${step}: ${current.current}, settled vertices ${current.visited.join(', ') || 'none'}`}><defs><marker id="graph-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6" fill="#9aafb7"/></marker></defs>{edges.map(([a,b,weight])=>{const from=vertices.find(v=>v.id===a)!;const to=vertices.find(v=>v.id===b)!;const angle=Math.atan2(to.y-from.y,to.x-from.x);return <g key={`${a}${b}`}><line x1={from.x+27*Math.cos(angle)} y1={from.y+27*Math.sin(angle)} x2={to.x-29*Math.cos(angle)} y2={to.y-29*Math.sin(angle)} stroke="#70868f" markerEnd="url(#graph-arrow)"/><text x={(from.x+to.x)/2+10} y={(from.y+to.y)/2-10} fill="#d1dde2" fontSize="14">{weight}</text></g>})}{vertices.map(v=><g key={v.id}><circle cx={v.x} cy={v.y} r="26" fill={current.current===v.id?'#b4d7e4':current.visited.includes(v.id)?'#36554b':'#19242a'} stroke="#91b1bf"/><text x={v.x} y={v.y+6} textAnchor="middle" fill={current.current===v.id?'#0c1013':'#eef2f1'} fontSize="18">{v.id}</text><text x={v.x} y={v.y+49} textAnchor="middle" fill="#c0d1d7" fontSize="14">d = {current.distances[v.id as keyof typeof current.distances] ?? '∞'}</text></g>)}</svg><div className="tool-controls"><button className="icon-button" title="Previous step" aria-label="Previous step" disabled={step===0} onClick={()=>setStep(step-1)}><ArrowLeft size={17}/></button><output aria-live="polite">{step===0?'Initial distances':`Settle ${current.current}`} <span>{step} / {trace.length-1}</span></output><button className="icon-button" title="Next step" aria-label="Next step" disabled={step===trace.length-1} onClick={()=>setStep(step+1)}><ArrowRight size={17}/></button><button className="icon-button" title="Reset trace" aria-label="Reset trace" onClick={()=>setStep(0)}><RotateCcw size={17}/></button></div><p className="evidence-caption">New example input, traced by an instrumented copy of the actual Java implementation. Directed, non-negative edges. Settled vertices are green; the current vertex is highlighted.</p></div>;
}
