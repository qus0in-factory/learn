import { mkdirSync, readFileSync } from 'node:fs'
import { prove } from '../learn-pdf-ops/verify-files.mjs'
import { remoteObject } from '../learn-pdf-ops/remote-object.mjs'
import { checkedAssets, settings } from './manifest.mjs'

export async function verify(read = remoteObject) {
  mkdirSync('dist/learn-pdfs', { recursive: true })
  for (const asset of checkedAssets()) {
    prove(readFileSync(`dist/learn${asset.path}`), asset.size, asset.sha256)
    prove(await read(`${settings.bucket}/${asset.key}`), asset.size, asset.sha256)
  }
  console.log(`Static assets: ${settings.expectedCount}/${settings.expectedCount} remote size/SHA verified`)
}
