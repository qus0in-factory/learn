import test from 'node:test';
import assert from 'node:assert/strict';
import { pdfResponse } from './pdf-response.js';
const object = { size: 8, httpEtag: '"sha"', body: '%PDF-new' };
const bucket = { get: async () => object };
test('revision responses are immutable PDF, with HEAD and conditional GET', async () => {
  const url = 'https://files.example/pdf';
  const response = await pdfResponse(new Request(url), bucket, 'key');
  assert.equal(await response.text(), '%PDF-new');
  assert.equal(response.headers.get('Content-Type'), 'application/pdf');
  assert.match(response.headers.get('Cache-Control'), /max-age=31536000, immutable/);
  const head = await pdfResponse(new Request(url, { method: 'HEAD' }), bucket, 'key');
  assert.equal(await head.text(), '');
  const cached = await pdfResponse(new Request(url, { headers: { 'If-None-Match': '"sha"' } }), bucket, 'key');
  assert.equal(cached.status, 304);
});
