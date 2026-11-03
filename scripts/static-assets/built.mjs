import { readFileSync, readdirSync } from 'node:fs'
import { cdnUrl } from '../../learn-site/.vitepress/cdn-url.mjs'
import { checkedAssets } from './manifest.mjs'

export function checkBuild() {
  const base = process.env.VITE_ASSET_CDN_BASE_URL
  if (!base) throw Error('Set CDN base for production deployment')
  const root = 'dist/learn'
  const css = readdirSync(`${root}/assets`).filter((p) => p.endsWith('.css'))
  const text = ['index.html', ...css.map((p) => `assets/${p}`)]
    .map((p) => readFileSync(`${root}/${p}`, 'utf8')).join('\n')
  for (const asset of checkedAssets()) {
    if (!text.includes(cdnUrl(asset.path, base))) throw Error(`Missing CDN URL: ${asset.path}`)
  }
}
