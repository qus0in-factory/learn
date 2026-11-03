import { readFileSync, writeFileSync } from 'node:fs'
import { match } from './match.mjs'
const [macFile, linuxFile, out] = process.argv.slice(2)
const [mac, linux] = [macFile, linuxFile].map(f => JSON.parse(readFileSync(f, 'utf8')))
const bad = []
const rows = mac.map((a, i) => {
  const { ok, row } = match(a, linux[i])
  if (!ok) bad.push(row.name)
  return row
})
const result = { lessons: rows.length, bad, byteIdentical: rows.filter(r => r.bytes).length, rows }
writeFileSync(out, JSON.stringify(result, null, 2))
console.log(`semantic ${rows.length - bad.length}/${rows.length}, bytes ${result.byteIdentical}/${rows.length}, bad ${bad.join(',') || 'none'}`)
if (bad.length || rows.length !== 12) process.exit(1)
