import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {schedule} from '../src/lib/lab-models.ts';
import {dijkstraSteps,graphPath,graphNodes,components,syntheticRaster,moveTile,shuffledPuzzle,solvedPuzzle,initialWords,catchWord,fallWords,moveRoom,clubState,translateAddress} from '../src/lib/playground-models.ts';
import {demos} from '../src/data/demos.ts';
import {projects} from '../src/data/profile.ts';
import {archiveProjects} from '../src/data/engineering-archive.ts';
import {studyCollections} from '../src/data/study-collections.ts';
const readJson=p=>JSON.parse(fs.readFileSync(new URL(p,import.meta.url),'utf8'));
test('FCFS/SJF boundaries, waiting, response, turnaround and non-preemption',()=>{
  const jobs=[{id:'A',arrival:0,burst:7},{id:'B',arrival:0,burst:3},{id:'C',arrival:1,burst:2},{id:'D',arrival:2,burst:4}];
  assert.deepEqual(schedule(jobs,'FCFS').map(j=>j.id),['A','B','C','D']);
  assert.deepEqual(schedule(jobs,'SJF').map(j=>j.id),['B','C','D','A']);
  for(const policy of ['FCFS','SJF'])for(const j of schedule(jobs,policy)){assert.equal(j.waiting,j.start-j.arrival);assert.equal(j.response,j.waiting);assert.equal(j.turnaround,j.end-j.arrival);assert.ok(j.waiting>=0);}
  assert.deepEqual(schedule([{id:'A',arrival:0,burst:9},{id:'B',arrival:1,burst:1}],'SJF').map(j=>j.id),['A','B']);
});
test('all five Dijkstra final states match source-executed Java records',()=>{
  const original=readJson('../src/data/graph-traces.json');
  for(const start of graphNodes){const steps=dijkstraSteps(start);assert.deepEqual(steps.at(-1).distance,original[start].at(-1).distances);for(let i=1;i<steps.length;i++){assert.ok(steps[i].settled.length>=steps[i-1].settled.length);}}
  assert.deepEqual(graphPath(dijkstraSteps('A').at(-1),'E'),['A','C','B','D','E']);
  assert.deepEqual(graphPath(dijkstraSteps('E').at(-1),'A'),[]);
});
test('BFS orthogonal components, inclusive thresholds and size filters',()=>{
  assert.equal(components([255,0,0,255],2,128,1).groups.length,2);
  assert.equal(components([128,128,0,255],2,128,1).groups.length,1);
  assert.equal(components([255,0,0,255],2,128,2).kept.length,0);
  const pixels=syntheticRaster();assert.deepEqual(components(pixels,24,128,1).groups.map(g=>g.length),[25,1,24]);
  assert.equal(components(pixels,24,128,4).kept.length,2);assert.equal(components(pixels,24,255,1).kept.length,1);
  assert.equal(components(pixels,24,1,1).groups.length,4);
});
test('sliding puzzle moves only adjacent tiles and shuffle stays a permutation',()=>{
  assert.equal(moveTile(solvedPuzzle,0),solvedPuzzle);assert.equal(moveTile(solvedPuzzle,5)[5],0);assert.equal(moveTile(solvedPuzzle,7)[7],0);
  const a=moveTile(solvedPuzzle,7);assert.deepEqual(moveTile(a,8),solvedPuzzle);
  for(let seed=1;seed<=25;seed++){let n=seed;const b=shuffledPuzzle(()=>{n=(n*1664525+1013904223)>>>0;return n/2**32;});assert.deepEqual([...b].sort((x,y)=>x-y),[0,1,2,3,4,5,6,7,8]);const inversion=b.filter(Boolean).reduce((sum,v,i,a)=>sum+a.slice(i+1).filter(w=>w<v).length,0);assert.equal(inversion%2,0);}
});
test('typing exact catch scores length once; falling/missing updates independently',()=>{
  const a=initialWords();assert.equal(catchWord(a,'SIGNAL'),a);const b=catchWord(a,'signal');assert.equal(b.caught,1);assert.equal(b.score,6);assert.equal(catchWord(b,'signal'),b);const c=fallWords(a,101);assert.equal(c.missed,1);assert.equal(c.score,0);assert.equal(c.words[0].y,0);
});
test('recorded Four Rooms playback reconstructs deterministic states and rewards',()=>{
  const recordings=readJson('../src/data/four-rooms-replay.json');
  for(const r of recordings){assert.ok(r.trace.length>0);let total=0;for(const s of r.trace){total+=s.reward;assert.ok([-15,-1,80].includes(s.reward));assert.notEqual(r.grid[s.position[1]][s.position[0]],-1);}assert.ok(Number.isFinite(total));}
  const r=recordings[0];let state={position:r.start,collected:[],reward:0,total:0,action:'START',steps:0};
  for(const s of r.trace){state=moveRoom(state,s.action,r.grid,r.packages);assert.deepEqual(state.position,s.position);assert.equal(state.reward,s.reward);assert.equal(r.packages.length-state.collected.length,s.remaining);}
  const wall=moveRoom({position:[1,1],collected:[],reward:0,total:0,action:'START',steps:0},0,r.grid,r.packages);assert.deepEqual(wall.position,[1,1]);assert.equal(wall.reward,-15);
});
test('club occupancy never exceeds capacity including queued arrivals',()=>{
  for(let c=1;c<=8;c++)for(let t=0;t<300;t+=.5){const patrons=clubState(t,c,20);assert.ok(patrons.filter(p=>p.status==='inside').length<=c);for(const p of patrons){assert.ok(p.entry>=p.arrival);assert.ok(p.leave>p.entry);}}
});
test('fixed-table memory translations and input bounds',()=>{
  assert.deepEqual(translateAddress(68),{page:0,offset:68,frame:2,physical:324});assert.equal(translateAddress(895).physical,895);assert.throws(()=>translateAddress(896));assert.throws(()=>translateAddress(-1));assert.throws(()=>translateAddress(1.5));
});
test('exact inventory: 10 major, 17 studies, 10 distinct demo views; collections cover archive once',()=>{
  assert.equal(projects.length,10);assert.equal(archiveProjects.length,17);assert.equal(demos.length,10);assert.equal(new Set(demos.map(d=>d.slug)).size,10);
  const studies=new Set([...projects.map(p=>`/projects/${p.slug}/`),...archiveProjects.map(p=>`/engineering/${p.slug}/`)]);
  for(const d of demos)assert.ok(studies.has(d.study));
  const collectionSlugs=studyCollections.flatMap(c=>c.slugs);assert.equal(new Set(collectionSlugs).size,17);assert.deepEqual([...collectionSlugs].sort(),archiveProjects.map(p=>p.slug).sort());
});
test('simulations load only after opening; motion hook guards viewport, visibility and reduced motion',()=>{
  const stage=fs.readFileSync(new URL('../src/components/demo-stage.tsx',import.meta.url),'utf8');assert.ok(stage.includes("useState(false)"));assert.ok(stage.includes('ssr:false'));assert.ok(stage.includes('!open?'));
  const clock=fs.readFileSync(new URL('../src/components/demos/use-demo-clock.ts',import.meta.url),'utf8');assert.ok(clock.includes('!visible||!foreground||reduced'));assert.ok(clock.includes('clearInterval(timer)'));
});
