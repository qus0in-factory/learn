import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pdfConfig, pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs'

test('pdf url rejects empty or unsafe names', () => {
  assert.throws(() => pdfUrl(''), /invalid pdf file/)
  assert.throws(() => pdfUrl('../secret.pdf'), /invalid pdf file/)
  assert.throws(() => pdfUrl('01-environment.md'), /invalid pdf file/)
  assert.equal(pdfUrl('01-environment.pdf'), `${pdfConfig.baseUrl}${pdfConfig.version}/01-environment.pdf?revision=${pdfConfig.revision}`)
})
