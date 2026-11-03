import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { output, root } from './learn-pdf/paths.mjs';
import { lectureFiles } from './learn/paths.mjs';
import { pdfConfig } from '../learn-site/.vitepress/pdf-url.mjs';
const expected = (await lectureFiles()).map(n => n.replace('.md', '.pdf')).sort();
const actual = (await readdir(output)).filter(n => n.endsWith('.pdf')).sort();
if (expected.length !== 12 || JSON.stringify(actual) !== JSON.stringify(expected)) {
  throw Error('Expected exactly the 12 lesson PDFs');
}
for (const file of actual) {
  if ((await readFile(resolve(output, file))).slice(0, 5).toString() !== '%PDF-') {
    throw Error(`Invalid PDF: ${file}`);
  }
}
for (const file of actual) execFileSync('npx', ['wrangler', 'r2', 'object', 'put',
  `learn-files/${pdfConfig.version}/${file}`, '--remote', '--content-type',
  'application/pdf', '--file', resolve(output, file)], { cwd: root, stdio: 'inherit' });
