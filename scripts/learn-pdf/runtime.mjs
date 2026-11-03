import { chromium } from 'playwright';
export async function launch() {
  if (process.env.PDF_BROWSER || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH) {
    throw Error('System browser overrides are forbidden');
  }
  return chromium.launch();
}
