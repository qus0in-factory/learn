import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { prove } from '../learn-pdf-ops/verify-files.mjs'
import { checkedAssets, settings } from './manifest.mjs'

const apply = process.argv.includes('--apply')
const prefix = process.argv.find(a => a.startsWith('--path-prefix='))?.slice(14)
for (const asset of checkedAssets()) {
  if (prefix && !asset.path.startsWith(prefix)) continue
  if (process.argv.includes('--images-only') && !asset.type.startsWith('image/')) continue
  const file = `dist/learn${asset.path}`
  prove(readFileSync(file), asset.size, asset.sha256)
  const key = `${settings.bucket}/${asset.key}`
  console.log(apply ? 'UPLOAD' : 'DRY-RUN', key, asset.size)
  if (apply) execFileSync('wrangler', ['r2', 'object', 'put', key, '--remote',
    '--file', file, '--content-type', asset.type,
    '--cache-control', settings.cacheControl], { stdio: 'pipe' })
}
