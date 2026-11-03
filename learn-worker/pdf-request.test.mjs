import test from 'node:test';
import assert from 'node:assert/strict';
import { pdfRequest } from './pdf-request.js';
import config from '../learn-site/.vitepress/pdf.json' with { type: 'json' };
const base = config.baseUrl + config.version + '/01-environment.pdf';
test('plain URL redirects without cache, revision maps to immutable key', async () => {
  const redirect = pdfRequest(new Request(base), {});
  assert.equal(redirect.status, 302);
  assert.equal(redirect.headers.get('Cache-Control'), 'no-store');
  assert.equal(new URL(redirect.headers.get('Location')).searchParams.get('revision'), config.revision);
  let key;
  const response = await pdfRequest(new Request(base + '?revision=abcdef0'), {
    FILES: { get: async value => { key = value; return null; } },
  });
  assert.equal(key, `${config.version}/revisions/abcdef0/01-environment.pdf`);
  assert.equal(response.status, 404);
});
