import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { ROOT } from './paths.mjs'

test('hdai deployment assets directory is ./dist/hdai', () => {
  const wrangler = readFileSync(join(ROOT, 'wrangler.jsonc'), 'utf8')
  assert.match(wrangler, /"directory":\s*"\.\/dist\/hdai"/)
  assert.doesNotMatch(wrangler, /"directory":\s*"\.\/dist\/git"/)
})

test('build scripts output to dist/hdai/git, not legacy dist/git', () => {
  const slides = readFileSync(join(ROOT, 'slides/package.json'), 'utf8')
  assert.match(slides, /--out\s+\.\.\/dist\/hdai\/git\/slides/)

  const vitepress = readFileSync(join(ROOT, 'course-site/.vitepress/config.mjs'), 'utf8')
  assert.match(vitepress, /outDir:\s*['"]\.\.\/dist\/hdai\/git\/docs['"]/)

  const landing = readFileSync(join(ROOT, 'scripts/build-landing.py'), 'utf8')
  assert.match(landing, /TARGET\s*=\s*ROOT\s*\/\s*['"]dist\/hdai\/git['"]/)
})
