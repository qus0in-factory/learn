import { resolve } from 'node:path';
import { build } from 'esbuild';
import { here, output } from './paths.mjs';
export async function renderer(directory = output) {
  const outfile = resolve(directory, 'renderer.js');
  await build({ entryPoints: [resolve(here, 'browser.js')], bundle: true, outfile });
  return outfile;
}
