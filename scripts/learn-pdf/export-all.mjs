import { lectureFiles } from '../learn/paths.mjs';
import { exportDeck } from './pilot/export.mjs';
export async function exportAll(browser, bundle) {
  const files = await lectureFiles();
  if (files.length !== 12) throw Error('Expected 12 lessons');
  const results = [];
  for (const file of files) {
    results.push(await exportDeck(browser, file.replace('.md', '')));
  }
  return results;
}
