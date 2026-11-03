import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { reexportMocks } from './module-mocks.mjs';
export function exportCase() {
  const dir = mkdtempSync(tmpdir() + '/pdf-export-');
  const file = dir + '/01-fixture.md';
  writeFileSync(file, '# 1차시. Fixture\n');
  const fixture = new URL('./export-fixture.mjs', import.meta.url).href;
  const hooks = reexportMocks(['lesson.mjs', 'page.mjs', 'inspect.mjs', 'font-audit.mjs'],
    fixture, new URL('../learn-pdf/', import.meta.url));
  return { dir, file, hooks };
}
