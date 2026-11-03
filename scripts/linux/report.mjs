import { readFileSync, writeFileSync } from 'node:fs'
const [input, out] = process.argv.slice(2)
const r = JSON.parse(readFileSync(input, 'utf8'))
const table = r.rows.map(x => `| ${x.name} | ${x.pages.join(' / ')} | ${x.size.join('x')} | ${x.text ? 'same' : 'DIFF'} | ${x.embedded ? 'yes' : 'NO'} | ${x.bytes ? 'same' : 'diff'} |`)
const structural = r.rows.filter(x => x.pages[0] === x.pages[1] && x.size.join() === '960,540' && x.embedded).length
const text = r.rows.filter(x => x.text).length
const lines = ['# Linux vs macOS PDF comparison', '',
  `- page/size/font: ${structural}/${r.lessons}`,
  `- text identical: ${text}/${r.lessons}`,
  `- strict: ${r.lessons - r.bad.length}/${r.lessons}`,
  `- byte identical: ${r.byteIdentical}/${r.lessons}`,
  `- problems: ${r.bad.join(', ') || 'none'}`, '',
  '| lesson | pages | size | text | fonts embedded | bytes |',
  '| --- | --- | --- | --- | --- | --- |', ...table, '']
const md = lines.join('\n')
writeFileSync(out, md)
console.log(md)
