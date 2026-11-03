import { readdirSync, readFileSync } from 'node:fs'

const DIR = new URL('../../docs/lecture/', import.meta.url)
const BASE = '/git/'

function title(file) {
  const text = readFileSync(new URL(file, DIR), 'utf8')
  return text.match(/^# (.+)$/m)?.[1] ?? file.replace(/\.md$/, '')
}

function items(dir, pattern) {
  return readdirSync(new URL(dir, DIR))
    .filter((file) => pattern.test(file))
    .sort()
    .map((file) => ({
      text: title(`${dir}${file}`).replace(/^\d+차시\.\s*/, ''),
      link: `${BASE}${dir}${file.replace(/\.md$/, '')}`,
    }))
}

export const sidebar = {
  '/git/': [{ text: 'Go Git 集', items: items('', /^\d{2}-[\w-]+\.md$/) }],
  '/git/appendix/': [{ text: '부록', items: items('appendix/', /^\d{2}-[\w-]+\.md$/) }],
  '/git/supplement/': [{ text: '보충', items: items('supplement/', /^\d{2}-[\w-]+\.md$/) }],
}
