import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { reexportMocks } from './module-mocks.mjs';
export function exportCase() {
  const dir = mkdtempSync(tmpdir() + '/pdf-export-');
  const file = dir + '/01-fixture.md';
  writeFileSync(file, '---\nlecture: 01-fixture.md\n---\n# Fixture\n'
    + '교안: [STEP 01 §Fixture](https://echo.qus0in.dev/git/01-fixture#fixture)\n\n'
    + '- Fixture content\n');
  const fixture = new URL('./export-fixture.mjs', import.meta.url).href;
  const hooks = reexportMocks(['summary.mjs', 'page.mjs', 'inspect.mjs', 'font-audit.mjs'],
    fixture, new URL('../learn-pdf/', import.meta.url));
  return { dir, file, hooks };
}
