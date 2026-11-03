import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import config from './ads.json' with { type: 'json' }

export function adsBuild(site, settings = config) {
  const text = settings.adsTxt.trim()
  if (text) writeFileSync(join(site.outDir, 'ads.txt'), text + '\n')
}
