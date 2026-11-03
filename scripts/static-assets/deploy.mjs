import { execFileSync } from 'node:child_process'
import { verify } from './verify.mjs'
import { checkBuild } from './built.mjs'

checkBuild()
await verify()
execFileSync('wrangler', ['deploy', '--config', 'learn-worker/wrangler.jsonc'], {
  stdio: 'inherit',
})
