import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { seoRecords } from './seo-records.mjs'
import { markdownPath } from './seo-paths.mjs'
import { exportMarkdown } from './markdown-export.mjs'
import { discoveryFiles } from './discovery-files.mjs'

export function seoBuild(config) {
  const records = [...seoRecords.values()].sort((a, b) => a.path.localeCompare(b.path))
  const bodies = records.map(page => {
    const text = exportMarkdown(page, records)
    const file = join(config.outDir, markdownPath(page.path))
    mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, text)
    return text
  })
  for (const [name, text] of Object.entries(discoveryFiles(records, bodies))) {
    writeFileSync(join(config.outDir, name), text)
  }
}
