import { launch } from './runtime.mjs';
import { fonts } from './fonts.mjs';
import { here, output } from './paths.mjs';
import { overflowTest } from './overflow-test.mjs';
import { tableTest } from './table-test.mjs';
import { layoutTest } from './layout-test.mjs';
const browser = await launch();
try {
  const page = await browser.newPage();
  await fonts(page);
  await page.addStyleTag({ path: here + 'style.css' });
  await page.addScriptTag({ path: output + '/renderer.js' });
  await overflowTest(page);
  console.log('pagination and overflow rejection PASS');
  await tableTest(page);
  await layoutTest(page);
  console.log('table grouping/headers/widths, code boundaries and compact PASS');
} finally { await browser.close(); }
