import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { motionEnabled } from '../src/lib/motion-preference.ts';
import { cityDistricts, cityWirePath } from '../src/data/city-districts.ts';
import { honoursModules } from '../src/data/honours.ts';

test('first load enables motion unless reduced motion is requested', () => {
  assert.equal(motionEnabled(null,false),true);
  assert.equal(motionEnabled(null,true),false);
  assert.equal(motionEnabled(true,true),true);
  assert.equal(motionEnabled(false,false),false);
});
test('all five districts have distinct colours, tools, theory and working route shapes', () => {
  assert.equal(cityDistricts.length,5);
  assert.equal(new Set(cityDistricts.map(d=>d.color)).size,5);
  for (const d of cityDistricts) {
    assert.ok(d.summary.length>100);
    assert.equal(d.tools.length,3);
    assert.equal(d.theory.length,3);
    assert.equal(d.related.length,2);
    assert.match(d.href,/^\/(projects|engineering)\/[a-z0-9-]+\/$/);
    assert.ok(d.x>=16&&d.x<=984&&d.y>=16&&d.y+49<=160);
  }
  for (let i=0;i<4;i++) assert.match(cityWirePath(i),new RegExp(`M${cityDistricts[i].x} ${cityDistricts[i].y} C`));
});
test('Honours additions retain implementation and authorship boundaries',()=>{
  assert.deepEqual(honoursModules.map(m=>m.code),['ITDAA4','ITSMA4','ITDTA4']);
  assert.match(honoursModules[0].tools,/scikit-learn/);
  assert.match(honoursModules[1].scope,/not a deployed/);
  assert.match(honoursModules[2].scope,/authorship.*not established/);
  assert.match(cityDistricts[4].evidence,/no secure-stack deployment/);
});
test('district animation is pausable, offscreen-aware and explicitly opt-in under reduced motion',()=>{
  const css=fs.readFileSync(new URL('../src/app/city-identity.css',import.meta.url),'utf8');
  const component=fs.readFileSync(new URL('../src/components/city-transition.tsx',import.meta.url),'utf8');
  assert.match(css,/animation-play-state:paused/);
  assert.match(css,/data-active=true.*data-motion=play/);
  assert.match(css,/data-explicit-motion=true/);
  assert.match(component,/IntersectionObserver/);
  assert.match(component,/visibilitychange/);
  assert.match(component,/role='tablist'/);
  assert.match(component,/Previous|ArrowLeft/);
});
