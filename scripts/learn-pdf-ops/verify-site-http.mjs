import assert from 'node:assert/strict';
import links from '../learn-pdf/site-links.json' with { type: 'json' };
import { pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs';
import { httpGet } from './http-get.mjs';
export function verifySiteHttp(files) {
  for (const { name } of files) {
    const response = httpGet(new URL(name, links.base).href);
    assert.equal(response.status, 200);
    assert(response.body.toString().includes(pdfUrl(name + '.pdf')));
  }
  const response = httpGet(new URL('/api/catalog', links.base).href);
  assert.equal(response.status, 200);
  const catalog = JSON.parse(response.body);
  assert.equal(catalog.lectures.length, 12);
  assert.equal(catalog.quiz.length, 10);
  for (const { name } of files) {
    assert.equal(catalog.lectures.find(l => l.slug === name)?.pdf, pdfUrl(name + '.pdf'));
  }
}
