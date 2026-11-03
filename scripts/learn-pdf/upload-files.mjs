import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { output } from './paths.mjs';
import { lectureFiles } from '../learn/paths.mjs';
import { checkArtifact } from './artifact.mjs';
export async function uploadFiles() {
  checkArtifact();
  const expected = (await lectureFiles()).map(n => n.replace('.md', '.pdf')).sort();
  const files = (await readdir(output)).filter(n => n.endsWith('.pdf')).sort();
  if (expected.length !== 12 || JSON.stringify(files) !== JSON.stringify(expected)) {
    throw Error('Expected exactly the 12 lesson PDFs');
  }
  for (const file of files) {
    if ((await readFile(resolve(output, file))).slice(0, 5).toString() !== '%PDF-') {
      throw Error(`Invalid PDF: ${file}`);
    }
  }
  return files;
}
