import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
const sha = v => createHash('sha256').update(v).digest('hex')
export function probe(file) {
  const info = execFileSync('pdfinfo',[file],{encoding:'utf8'})
  const pages = Number(info.match(/^Pages:\s+(\d+)/m)[1])
  const size = info.match(/^Page size:\s+([\d.]+) x ([\d.]+)/m).slice(1).map(Number)
  const rows = execFileSync('pdffonts',[file],{encoding:'utf8'}).split('\n').slice(2).filter(Boolean)
  const fonts = rows.map(line => {
    const m = line.match(/^(\S+)\s+.+?\s+(yes|no)\s+(yes|no)\s+(yes|no)\s+\d+\s+\d+\s*$/)
    if (!m) throw Error(`pdffonts: ${line}`)
    return { name: m[1].replace(/^[A-Z]{6}\+/, ''), embedded: m[2] === 'yes' }
  })
  const text = execFileSync('pdftotext',[file,'-'],{encoding:'utf8'}).replace(/\s+/g,'')
  return { pages, size, fonts, textSha: sha(text), textLength: text.length, bytesSha: sha(readFileSync(file)) }
}
