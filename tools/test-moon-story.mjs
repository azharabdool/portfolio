import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { journeyProgress, moonState, settleJourney } from '../src/lib/moon-journey.ts';

test('moon damping is frame-rate independent and never overshoots', () => {
  const simulate = (hz) => {
    let p = 0;
    for (let frame=0; frame<hz; frame++) p=settleJourney(p,1,1000/hz);
    return p;
  };
  assert.ok(Math.abs(simulate(60)-simulate(120))<1e-9);
  for (const target of [0,.3,1]) {
    let p=.7;
    for (let frame=0;frame<300;frame++) {
      const next=settleJourney(p,target,16);
      assert.ok(next>=Math.min(p,target)&&next<=Math.max(p,target));
      p=next;
    }
    assert.equal(p,target);
  }
  assert.equal(settleJourney(.2,.8,0),.2);
  assert.equal(settleJourney(.2,.8,NaN),.2);
  assert.equal(settleJourney(.2,.8,10000),settleJourney(.2,.8,64));
  assert.equal(settleJourney(NaN,NaN,16),0);
  assert.equal(journeyProgress(10,NaN,100),1);
});

test('moon moves through keyframe joins without a stop-start plateau', () => {
  for (const p of [.25,.5,.75]) {
    assert.ok(moonState(p).y-moonState(p-.001).y>.0002);
    assert.ok(moonState(p+.001).y-moonState(p).y>.0002);
  }
});

test('moon journey spans the full page instead of ending at featured work', () => {
  for (const [height,viewport] of [[8500,1080],[9200,900],[9500,768],[22000,844],[23000,800]]) {
    const range=height-viewport;
    assert.equal(journeyProgress(0,height,viewport),0);
    assert.equal(journeyProgress(range*.5,height,viewport),.5);
    assert.equal(journeyProgress(range,height,viewport),1);
    assert.ok(journeyProgress(1600,height,viewport)<.25);
    assert.equal(journeyProgress(-100,height,viewport),0);
    assert.equal(journeyProgress(height+5000,height,viewport),1);
    assert.equal(journeyProgress(NaN,height,viewport),0);
    let previous=0;
    for(let i=0;i<=100;i++){const progress=journeyProgress(range*i/100,height,viewport);assert.ok(progress>=previous);previous=progress;}
  }
  assert.equal(journeyProgress(0,500,800),0);
});

test('homepage retains its fixed scene behind translucent content', () => {
  const css=fs.readFileSync(new URL('../src/app/moon-story.css',import.meta.url),'utf8');
  const page=fs.readFileSync(new URL('../src/app/page.tsx',import.meta.url),'utf8');
  const component=fs.readFileSync(new URL('../src/components/moon-journey.tsx',import.meta.url),'utf8');
  assert.match(css,/\.cinematic-backdrop \{ position:fixed;/);
  assert.doesNotMatch(css,/\.homepage-world \{[^}]*isolation:isolate/);
  assert.doesNotMatch(page,/cinematic-zone/);
  assert.doesNotMatch(component,/sceneOpacity|cityOpacity|sceneVisible/);
  for(const section of ['projects','about','experience','credentials']) assert.match(css,new RegExp(`\\.homepage-world \\.${section}-section[^}]*background:#[0-9a-f]{8}`));
});

test('moon starts high and descends without leaving the visible skyline', () => {
  assert.equal(moonState(0).phase, 'high');
  for (const mobile of [false, true]) {
    for (let i = 1; i <= 10000; i++) assert.ok(moonState(i / 10000, mobile).y >= moonState((i - 1) / 10000, mobile).y);
  }
  assert.equal(moonState(.45).phase, 'descending');
  assert.equal(moonState(.8).phase, 'horizon');
  assert.equal(moonState(1).phase, 'setting');
  assert.ok(moonState(1).y > .55 && moonState(1).y < .65);
  assert.ok(moonState(1,true).y > .5 && moonState(1,true).y < .6);
  assert.ok(moonState(1).light >= .7);
  assert.equal(moonState(1).setting, 1);
});
test('keyframe joins are continuous, including reverse scrolling', () => {
  for (const p of [.25, .5, .75]) {
    const a = moonState(p - 1e-6), b = moonState(p + 1e-6);
    for (const key of ['x', 'y', 'scale', 'light', 'stars', 'setting']) assert.ok(Math.abs(a[key] - b[key]) < .0001, `${p} ${key}`);
  }
});
test('desktop and simplified mobile trajectories remain bounded', () => {
  for (const mobile of [false, true]) for (let i = 0; i <= 1000; i++) {
    const state = moonState(i / 1000, mobile);
    for (const key of ['x', 'y', 'scale', 'light', 'stars', 'setting']) assert.ok(Number.isFinite(state[key]));
    assert.ok(state.x > .5 && state.x < .95);
    assert.ok(state.y > .1 && state.y < 1);
    assert.ok(state.light >= 0 && state.light <= 1);
  }
});
test('progress clamps safely', () => {
  assert.deepEqual(moonState(-1), moonState(0));
  assert.deepEqual(moonState(2), moonState(1));
  assert.deepEqual(moonState(NaN), moonState(0));
});
test('visual accuracy comparisons match genuine held-out counts', () => {
  const data = JSON.parse(fs.readFileSync(new URL('../src/data/mnist-experiments.json', import.meta.url), 'utf8'));
  for (const run of data.configurations) {
    const total = run.confusion_matrix.flat().reduce((sum, n) => sum + n, 0);
    const correct = run.confusion_matrix.reduce((sum, row, i) => sum + row[i], 0);
    assert.equal(total, data.test_count);
    assert.equal(correct / total, run.test.accuracy);
    assert.equal(run.curve.length, run.epochs);
  }
});
test('recorded RL playback follows valid steps and actual collection events', () => {
  const recordings = JSON.parse(fs.readFileSync(new URL('../src/data/four-rooms-replay.json', import.meta.url), 'utf8'));
  for (const recording of recordings) {
    let previous = recording.start;
    for (const step of recording.trace) {
      const [x, y] = step.position;
      assert.notEqual(recording.grid[y][x], -1);
      assert.ok(Math.abs(x - previous[0]) + Math.abs(y - previous[1]) <= 1);
      assert.ok([-15, -1, 80].includes(step.reward));
      if (step.reward === 80) assert.ok(recording.packages.some(([px, py]) => px === x && py === y));
      previous = step.position;
    }
    assert.equal(recording.trace.at(-1).remaining, 0);
  }
});
