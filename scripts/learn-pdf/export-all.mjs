import { resolve } from 'node:path';
import { root } from './paths.mjs';
import { lectureFiles } from '../learn/paths.mjs';
import { exportLesson } from './export.mjs';
export async function exportAll(browser, bundle) {
  const files = await lectureFiles();
  if (files.length !== 12) throw Error('Expected 12 lessons');
  const results = [];
  for (const file of files) {
    results.push(await exportLesson(browser,
      resolve(root, 'scripts/learn-pdf/content', file), bundle));
  }
  return results;
}
