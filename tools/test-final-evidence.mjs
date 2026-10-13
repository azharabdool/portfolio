import assert from 'node:assert/strict';
import test from 'node:test';
import fs from 'node:fs';
import ts from 'typescript';
import { projects } from '../src/data/profile.ts';
import { archiveProjects } from '../src/data/engineering-archive.ts';
import { credentialEvidence } from '../src/data/credentials.ts';
import { findCourseContext } from '../src/data/course-context.ts';

test('systems publication links only the individual translator and bounded notes', () => {
  const project = projects.find(p => p.slug === 'operating-systems-simulations');
  assert.equal(project.repository, 'https://github.com/azharabdool/operating-systems-simulations');
  assert.match(project.attribution, /Teaching scheduler source.*remain private/);
  const source = fs.readFileSync(new URL('../src/app/projects/[slug]/page.tsx', import.meta.url), 'utf8');
  assert.match(source, /Translator repository/);
  assert.match(source, /Teaching scheduler source remains private/);
  const notes = fs.readFileSync(new URL('../public/project-notes/operating-systems-simulations.md', import.meta.url), 'utf8');
  assert.match(notes, /python verify_translation.py/);
  assert.doesNotMatch(notes, /java[^\n]*barScheduling|javac[^\n]*scheduling\//);
  assert.match(notes, /No paging, replacement, TLB or page-fault handler is implemented/);
});

test('connected-components source links only the verified synthetic-only release', () => {
  const project = projects.find(p => p.slug === 'computer-vision-connected-components');
  assert.equal(project.repository, 'https://github.com/azharabdool/computer-vision-connected-components');
  assert.match(project.attribution, /synthetic examples only/);
  const notes = fs.readFileSync(new URL('../public/project-notes/computer-vision-connected-components.md', import.meta.url), 'utf8');
  assert.match(notes, /python input_checks.py/);
  assert.doesNotMatch(notes, /\.\/components[^\n]*Birds\.pgm|g\+\+[^\n]*tests\.cpp/);
  assert.match(notes, /threshold zero/);
});

test('profile route links the verified public professional README', () => {
  const source = fs.readFileSync(new URL('../src/app/profile/page.tsx', import.meta.url), 'utf8');
  assert.match(source, /href="https:\/\/github\.com\/azharabdool\/azharabdool#readme">GitHub profile README/);
  assert.doesNotMatch(source, /https:\/\/github\.com\/azharabdool\/operating-systems-simulations/);
});

test('featured six include RL instead of student-performance, without losing either', () => {
  const featured = projects.filter(p => p.featured).map(p => p.slug);
  assert.equal(featured.length, 6);
  assert.ok(featured.includes('reinforcement-learning-four-rooms'));
  assert.ok(!featured.includes('student-performance-data-mining'));
  assert.ok(projects.some(p => p.slug === 'student-performance-data-mining'));
});
test('case-study routes and slugs stay unique', () => {
  assert.equal(new Set(projects.map(p => p.slug)).size, 10);
  assert.equal(new Set(archiveProjects.map(p => p.slug)).size, 17);
});
test('course descriptions do not silently fall back to a different year', () => {
  assert.equal(findCourseContext('UCT CSC3022', '2024').name, 'C++ and Machine Learning');
  assert.equal(findCourseContext('UCT CSC3022', '2026'), undefined);
  assert.equal(findCourseContext('UCT EEE2044S', '2021').name, 'Introduction to Power Engineering');
});
test('ten genuine credential documents and thumbnails exist; homepage shows four', () => {
  assert.equal(credentialEvidence.length, 10);
  assert.equal(credentialEvidence.filter(c => c.featured).length, 4);
  for (const c of credentialEvidence) {
    assert.ok(fs.existsSync(new URL(`../public/credentials/${c.slug}.pdf`, import.meta.url)));
    assert.ok(fs.existsSync(new URL(`../public/credentials/${c.slug}.webp`, import.meta.url)));
    if (c.slug.startsWith('azure') || c.slug.startsWith('security') || c.slug === 'defender-cloud') assert.equal(c.kind, 'training');
  }
  assert.equal(credentialEvidence.find(c => c.slug === 'sap-associate').expires, '2026-01-21');
});

test('SVG tooltips use a single string expression for stable React hydration', () => {
  const source = fs.readFileSync(new URL('../src/components/ml-experiments.tsx', import.meta.url), 'utf8');
  const tree = ts.createSourceFile('ml-experiments.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let titles = 0;
  const visit = node => {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText(tree) === 'title') {
      titles++;
      assert.equal(node.children.length, 1);
      assert.ok(ts.isJsxExpression(node.children[0]));
      assert.ok(ts.isTemplateExpression(node.children[0].expression));
    }
    ts.forEachChild(node, visit);
  };
  visit(tree);
  assert.equal(titles, 2);
});
