import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { output } from './paths.mjs';
export async function evidence(key, html) {
  if (/\/Users\/|\/private\/|file:\/\/|learner@example/.test(html)) {
    throw Error('Private path or identity in screenshot');
  }
  const dir = resolve(output, 'screenshots');
  await mkdir(dir, { recursive: true });
  await writeFile(resolve(dir, key + '.html'), html);
  return resolve(dir, key + '.png');
}
