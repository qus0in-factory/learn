import { test } from 'node:test';
import assert from 'node:assert/strict';
import { easyExamples } from './easy-examples.mjs';

test('easyExamples aggregates bash blocks and extracts markdown', () => {
  const md = [
    '# Git test',
    '```bash',
    'git init',
    '```',
    'middle note',
    '```bash',
    'git status',
    '```',
    '```markdown',
    '# TIL',
    '```',
  ].join('\n');
  const files = easyExamples(md);
  assert.equal(files.length, 2);
  assert.equal(files[0].name, 'git-commands.sh');
  assert.equal(files[0].token.content, 'git init\n\ngit status\n');
  assert.equal(files[1].name, 'writing-template.md');
  assert.equal(files[1].token.content.trim(), '# TIL');
});

test('easyExamples returns empty array when no relevant code blocks', () => {
  assert.deepEqual(easyExamples('# No code\njust text'), []);
});
