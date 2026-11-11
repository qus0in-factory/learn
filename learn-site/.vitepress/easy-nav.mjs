import { readFileSync } from 'node:fs'
import { easyLabels } from './easy-labels.mjs'
import { easyPages } from '../easy-pages.mjs'

const dir = new URL('../../docs/easy/', import.meta.url)
const link = file => '/' + file.replace(/index\.html$/, '').replace(/\.html$/, '')
const title = file => file.endsWith('index.html') ? easyLabels.title
  : readFileSync(new URL(file.replace(/^.*\//, '').replace('.html', '.md'), dir), 'utf8').match(/^# (.+)$/m)[1]

export const easySidebar = {
  '/git-easy/': [{ text: easyLabels.title,
    items: easyPages.map(file => ({ text: title(file), link: link(file) })) }],
}
