import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateConfig } from '../../learn-site/.vitepress/pdf-config.mjs'

test('pdf config rejects empty or malformed values', () => {
  assert.throws(() => validateConfig({}), /invalid pdf baseUrl/)
  assert.throws(() => validateConfig({ baseUrl: 'https://files.qus0in.dev', version: 'v0.1.0', revision: '8dea329' }), /invalid pdf baseUrl/)
  assert.throws(() => validateConfig({ baseUrl: 'https://files.qus0in.dev/', version: '0.1.0', revision: '8dea329' }), /invalid pdf version/)
  assert.throws(() => validateConfig({ baseUrl: 'https://files.qus0in.dev/', version: 'v0.1.0', revision: '' }), /invalid pdf revision/)
})
