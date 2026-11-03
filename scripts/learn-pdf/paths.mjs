import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
export const here = fileURLToPath(new URL('.', import.meta.url));
export const root = resolve(here, '../..');
export const output = resolve(root, 'dist/learn-pdfs');
