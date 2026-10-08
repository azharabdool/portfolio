import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import { moonState } from '../src/lib/moon-journey.ts';

test('moon starts high and only sets on forward scroll', () => {
  assert.equal(moonState(0).phase, 'high');
  for (const mobile of [false, true]) {
    for (let i = 1; i <= 10000; i++) assert.ok(moonState(i / 10000, mobile).y >= moonState((i - 1) / 10000, mobile).y);
  }
  assert.equal(moonState(.45).phase, 'descending');
  assert.equal(moonState(.8).phase, 'horizon');
  assert.equal(moonState(1).phase, 'setting');
  assert.ok(moonState(1).y > .85);
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
