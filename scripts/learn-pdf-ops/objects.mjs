import { readFileSync, statSync } from 'node:fs';
import { output } from '../learn-pdf/paths.mjs';
import { pdfConfig } from '../../learn-site/.vitepress/pdf-url.mjs';
import { checkArtifact } from '../learn-pdf/artifact.mjs';
import { workerConfig } from './worker-config.mjs';
export function objects() {
  checkArtifact();
  const config = workerConfig();
  const bucket = config.r2_buckets.find(b => b.binding === 'FILES').bucket_name;
  const { pdfs } = JSON.parse(readFileSync(output + '/artifact.json'));
  return Object.entries(pdfs).map(([name, sha256]) => ({
    name, sha256, size: statSync(`${output}/${name}.pdf`).size,
    key: `${bucket}/${pdfConfig.version}/revisions/${pdfConfig.revision}/${name}.pdf`,
  }));
}
