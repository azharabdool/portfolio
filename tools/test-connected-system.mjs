import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {disciplines, engineeringNodes, networkPosition} from '../src/data/engineering-network.ts';
import {searchCommands, commandEntries} from '../src/lib/command-index.ts';
import {projects} from '../src/data/profile.ts';
import {archiveProjects} from '../src/data/engineering-archive.ts';
import {analyticsAllowed,anonymousPageUrl} from '../src/lib/traffic-privacy.ts';
import {idealPwmPath} from '../src/lib/lab-models.ts';

test('six evidence-based disciplines cover every historical record exactly once',()=>{
  assert.equal(disciplines.length,6); assert.equal(engineeringNodes.length,27);
  assert.deepEqual(new Set(engineeringNodes.map(n=>n.slug)),new Set([...projects,...archiveProjects].map(p=>p.slug)));
  for(const [index,node] of engineeringNodes.entries()){
    assert.ok(node.links.length); assert.equal(new Set(node.links.map(l=>l.discipline)).size,node.links.length);
    for(const link of node.links){assert.ok(disciplines.some(d=>d.id===link.discipline));assert.ok(link.reason.length>30);}
    const p=networkPosition(index);assert.ok(p.x>17&&p.x<663&&p.y>17&&p.y<623);
  }
});
test('palette finds real work, tools, certificates, demos and actions',()=>{
  for(const [query,id] of [['machine learning','project-machine-learning-mnist-classifier'],['machine learning','project-reinforcement-learning-four-rooms'],['machine learning','project-foundry-ai-infographic-dashboard'],['embedded','study-transformer-build'],['DMA','project-stm32-signal-generation'],['AZ-500','credential-azure-security'],['play','demo-four-rooms'],['Run Andre','demo-andre'],['general CV','general-cv']]){
    assert.ok(searchCommands(query).some(e=>e.id===id),`${query} misses ${id}`);
  }
  assert.equal(searchCommands('no-such-engineering-thing').length,0);
  assert.equal(new Set(commandEntries.map(e=>e.id)).size,commandEntries.length);
  for(const entry of commandEntries){assert.ok(entry.href.startsWith('/')||entry.href.startsWith('https://')||entry.href.startsWith('mailto:'));}
});
test('preview loading is deferred and homepage instruments do not mount full demo apps',()=>{
  const source=fs.readFileSync(new URL('../src/components/connected-system.tsx',import.meta.url),'utf8');
  assert.match(source,/mapNear/);assert.match(source,/demosNear/);assert.match(source,/dynamic\(/);
  const demos=fs.readFileSync(new URL('../src/components/mini-engineering-demos.tsx',import.meta.url),'utf8');
  assert.doesNotMatch(demos,/DemoLauncher|iframe|three|webgl/i);assert.match(demos,/episode.trace/);assert.match(demos,/!active\|\|!playing/);
});

test('traffic measurement excludes previews, privacy opt-outs and private URL components',()=>{
  assert.equal(analyticsAllowed('azharabdool.vercel.app'),true);
  assert.equal(analyticsAllowed('portfolio-livid-seven-890kon00eu.vercel.app'),true);
  for(const host of ['localhost','127.0.0.1','preview.vercel.app','example.com'])assert.equal(analyticsAllowed(host),false);
  assert.equal(analyticsAllowed('azharabdool.vercel.app','1'),false);
  assert.equal(analyticsAllowed('azharabdool.vercel.app',null,true),false);
  assert.equal(anonymousPageUrl('https://azharabdool.vercel.app/projects/?email=private#secret'),'https://azharabdool.vercel.app/projects/');
  for(const url of ['bad','http://azharabdool.vercel.app/','https://unknown.vercel.app/'])assert.equal(anonymousPageUrl(url),null);
  const source=fs.readFileSync(new URL('../src/components/traffic-analytics.tsx',import.meta.url),'utf8');
  assert.match(source,/event.type !== 'pageview'/);assert.match(source,/beforeSend/);assert.doesNotMatch(source,/track\(|identify|localStorage/);
});

test('ideal PWM is flat at both duty-cycle endpoints, with pulses only between them',()=>{
  assert.equal(idealPwmPath(0),'M10 110 H300');assert.equal(idealPwmPath(4095),'M10 45 H300');
  assert.match(idealPwmPath(2048),/V45 H/);assert.match(idealPwmPath(2048),/V110 H/);
});

test('homepage preserves depth and contains purposeful previews, without a fabricated app screen',()=>{
  const page=fs.readFileSync(new URL('../src/app/page.tsx',import.meta.url),'utf8');
  assert.match(page,/ConnectedSystem/);assert.match(page,/EngineeringSpotlights/);assert.match(page,/EducationFeature/);assert.doesNotMatch(page,/CityTransition|InteractiveLabCTA/);
  const card=fs.readFileSync(new URL('../src/components/card-preview.tsx',import.meta.url),'utf8');
  assert.match(card,/episode.trace.map/);assert.match(card,/schedule\(jobs,policy\)/);assert.match(card,/NOT AN APP SCREEN/);
  const header=fs.readFileSync(new URL('../src/components/header.tsx',import.meta.url),'utf8');assert.match(header,/CommandLauncher/);
});
