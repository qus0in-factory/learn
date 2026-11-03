const base = name => name.replace(/_[A-Za-z]+$/, '')
const family = pdf => [...new Set(pdf.fonts.map(f => base(f.name)))].sort().join(',')
export function match(a, b) {
  const pin = b.fonts.every(f => f.embedded && /^NotoSans(KR|Mono)/.test(base(f.name)))
  const ok = a.name === b.name && a.pages === b.pages && a.size.join() === '960,540' && b.size.join() === '960,540' &&
    a.textSha === b.textSha && family(a) === family(b) && pin
  return { ok, row: { name: b.name, pages: [a.pages, b.pages], size: b.size,
    text: a.textSha === b.textSha, fonts: family(b), embedded: pin, bytes: a.bytesSha === b.bytesSha } }
}
