import { writeFileSync } from 'node:fs'
import { settings } from './manifest.mjs'

const rules = [{
  allowed: { origins: [settings.origin], methods: ['GET', 'HEAD'] },
  exposeHeaders: ['ETag'],
  maxAgeSeconds: 3600,
}]
writeFileSync('dist/static-assets-cors.json', JSON.stringify({ rules }, null, 2))
console.log('CORS plan: GET/HEAD only', settings.origin)
