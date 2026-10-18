import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {mapReveal,mixPoint,lightOrigin} from '../src/lib/engineering-map-motion.ts';
import {homeFeaturedSlugs,homeProjectCopy} from '../src/data/home-content.ts';
import {projects} from '../src/data/profile.ts';
import {commandEntries} from '../src/lib/command-index.ts';

test('city-to-map progress is bounded, reversible and final under reduced motion',()=>{
  for(const viewport of [800,900,1080]){
    assert.equal(mapReveal(viewport,500,viewport),0);assert.equal(mapReveal(0,500,viewport),1);
    let previous=0;for(let top=viewport;top>=-100;top-=10){const p=mapReveal(top,500,viewport);assert.ok(p>=previous&&p<=1);previous=p;}
    assert.equal(mapReveal(viewport,500,viewport,true),1);
  }
  assert.deepEqual(mixPoint({x:10,y:20},{x:90,y:80},.5),{x:50,y:50});
  assert.deepEqual(mixPoint({x:10,y:20},{x:90,y:80},-1),{x:10,y:20});
  assert.deepEqual(mixPoint({x:10,y:20},{x:90,y:80},2),{x:90,y:80});
  for(let i=0;i<33;i++){const p=lightOrigin(i,{left:-530,top:0,width:1422,height:800},{left:20,top:400,width:320,height:270});assert.ok(p.x>=28&&p.x<=652&&p.y>=28&&p.y<=612);}
});

test('seven homepage sections replace the long CV order without deleting detail',()=>{
  const source=fs.readFileSync(new URL('../src/app/page.tsx',import.meta.url),'utf8');
  assert.equal((source.match(/<section /g)||[]).length,4);assert.match(source,/<Hero\/>/);assert.match(source,/<ConnectedSystem\/>/);
  for(const title of ['Selected work','Experience','University of Cape Town','Engineering Lab','Get in touch'])assert.ok(source.includes(title));
  for(const phrase of ['across boundaries','with a purpose','with direction','something that matters','the whole system','across the stack'])assert.ok(!source.toLowerCase().includes(phrase));
  assert.equal(homeFeaturedSlugs.length,6);assert.equal(new Set(homeFeaturedSlugs).size,6);
  for(const slug of homeFeaturedSlugs){assert.ok(projects.some(p=>p.slug===slug));assert.ok(homeProjectCopy[slug].summary.length<150);}
  assert.equal(homeProjectCopy['stm32-signal-generation'].scope,'Collaborative');assert.equal(homeProjectCopy['uct-tutor-marketplace-app'].scope,'Collaborative');
  assert.ok(commandEntries.filter(e=>e.kind==='Skills').every(e=>e.href==='/profile/#skills'));
});

test('map previews respond to pointer/focus and every project node is a direct link',()=>{
  const source=fs.readFileSync(new URL('../src/components/engineering-map.tsx',import.meta.url),'utf8');
  assert.match(source,/onPointerEnter/);assert.match(source,/onFocus/);assert.match(source,/href=\{item.href\} prefetch=\{false\} data-node-index/);
  assert.match(source,/map-hub.*related/);assert.match(source,/node.image/);assert.match(source,/node.summary/);assert.doesNotMatch(source,/ONE FOUNDATION|network-statement/);
  const hook=fs.readFileSync(new URL('../src/hooks/use-network-morph.ts',import.meta.url),'utf8');
  assert.match(hook,/lightOrigin/);assert.match(hook,/active&&enabled/);assert.match(hook,/cancelAnimationFrame/);assert.doesNotMatch(hook,/setInterval|setState/);
});
