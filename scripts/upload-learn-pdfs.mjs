import { resolve } from 'node:path';
import { output } from './learn-pdf/paths.mjs';
import { pdfConfig } from '../learn-site/.vitepress/pdf-url.mjs';
import { uploadFiles } from './learn-pdf/upload-files.mjs';
import { immutablePut } from './learn-pdf/immutable-put.mjs';
const actual = await uploadFiles();
for (const file of actual) immutablePut(resolve(output, file),
  `learn-files/${pdfConfig.version}/revisions/${pdfConfig.revision}/${file}`);
