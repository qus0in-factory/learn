import assert from 'node:assert/strict';
import { pdfConfig, pdfUrl } from '../../learn-site/.vitepress/pdf-url.mjs';
import { prove } from './verify-files.mjs';
import { httpGet } from './http-get.mjs';
export function verifyPdfHttp(file, get = httpGet) {
  const name = file.name + '.pdf';
  const url = pdfUrl(name);
  const plain = get(`${pdfConfig.baseUrl}${pdfConfig.version}/${name}`);
  assert.equal(plain.status, 302);
  assert(plain.headers.includes('cache-control: no-store'));
  assert(plain.headers.includes('location: ' + url));
  const revision = get(url);
  assert.equal(revision.status, 200);
  assert(revision.headers.includes('content-type: application/pdf'));
  assert(revision.headers.includes('cache-control: public, max-age=31536000, immutable'));
  prove(revision.body, file.size, file.sha256);
  return { name, url, size: file.size, sha256: file.sha256 };
}
