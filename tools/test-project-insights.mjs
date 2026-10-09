import assert from 'node:assert/strict';
import test from 'node:test';
import { projectInsights } from '../src/data/project-insights.ts';
import { projects } from '../src/data/profile.ts';
import { archiveProjects } from '../src/data/engineering-archive.ts';
import { matchesProject } from '../src/lib/project-search.ts';

test('all 27 case studies have specific purpose, tools, theory and validation', () => {
  const slugs=[...projects,...archiveProjects].map(p=>p.slug);
  assert.equal(slugs.length,27);
  assert.deepEqual(Object.keys(projectInsights).sort(),slugs.sort());
  for (const slug of slugs) {
    const p=projectInsights[slug];
    assert.ok(p.purpose.length>100,slug);
    assert.equal(p.flow.length,3,slug);
    assert.equal(p.concepts.length,3,slug);
    assert.equal(p.tools.length,2,slug);
    assert.ok(p.check.length>80&&p.evidence.length>50,slug);
    for(const e of [...p.flow,...p.concepts,...p.tools]) assert.ok(e.title&&e.detail,slug);
  }
});
test('report claims are bounded by source and actual verification',()=>{
  assert.match(projectInsights['reinforcement-learning-four-rooms'].concepts[2].detail,/retained agents choose argmax/);
  assert.match(projectInsights['operating-systems-simulations'].check,/invalidate/);
  assert.match(projectInsights['parallel-monte-carlo'].check,/not a speedup/);
  assert.match(projectInsights['stm32-signal-generation'].check,/not an oscilloscope/);
  assert.match(projectInsights['uct-tutor-marketplace-app'].check,/not evidence of a production-ready/);
});
test('project search matches tools and theory, combining all words',()=>{
  const mnist=projects.find(p=>p.slug==='machine-learning-mnist-classifier');
  const os=projects.find(p=>p.slug==='operating-systems-simulations');
  assert.ok(matchesProject(mnist,' PYTORCH adam '));
  assert.ok(matchesProject(mnist,''));
  assert.ok(matchesProject(os,'page table'));
  assert.equal(matchesProject(mnist,'pytorch kafka'),false);
  assert.equal(matchesProject(os,'pytorch'),false);
});
