import { readFileSync, writeFileSync } from 'node:fs'
import { probe } from './probe.mjs'
const [dir, out] = process.argv.slice(2)
const list = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'))
const pdfs = list.map(({ name }) => ({ name, ...probe(`${dir}/${name}.pdf`) }))
writeFileSync(out, JSON.stringify(pdfs, null, 2))
console.log(`collected ${pdfs.length} PDFs from ${dir}`)
