import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { basename, extname } from 'node:path'
import settings from './settings.json' with { type: 'json' }

const root = 'dist/learn'
const files = readdirSync(root, { recursive: true }).filter((p) =>
  /^assets\/inter-[^/]+\.woff2$/.test(p) || /^(?:git-)?cover-\d+\.(webp|avif)$/.test(p))
if (files.length !== settings.expectedCount) throw Error('Unexpected asset count')
const assets = files.sort().map((path) => {
  const bytes = readFileSync(`${root}/${path}`)
  const sha256 = createHash('sha256').update(bytes).digest('hex')
  return { path: `/${path}`, key: `${settings.prefix}/${sha256}/${basename(path)}`,
    size: bytes.length, sha256, type: settings.types[extname(path)] }
})
writeFileSync('learn-site/.vitepress/cdn-assets.json', JSON.stringify(assets, null, 2) + '\n')
console.log(assets.length, assets.reduce((sum, a) => sum + a.size, 0))
