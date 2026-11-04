import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';

export function freeze(root) {
  const configPath = '../../learn-site/.vitepress/pdf-source.json';
  const config = JSON.parse(readFileSync(new URL(configPath, import.meta.url)));
  mkdirSync(root + '/assets/pdf-frozen', { recursive: true });
  copyFileSync(new URL('../../' + config.manifest, import.meta.url), root + '/' + config.manifest);
  writeFileSync(root + '/learn-site/.vitepress/pdf-source.json', JSON.stringify(config));
  writeFileSync(root + '/learn-site/.vitepress/pdf.json', JSON.stringify({ revision: config.revision }));
  return root + '/' + config.manifest;
}
