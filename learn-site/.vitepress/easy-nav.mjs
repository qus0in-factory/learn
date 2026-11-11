import { readFileSync } from 'node:fs'
import { easyLabels as l } from './easy-labels.mjs'
import { ghPractice, gitPractice } from '../easy-pages.mjs'

const dir = new URL('../../docs/easy/', import.meta.url)
const link = f => '/' + f.replace(/index\.html$/, '').replace(/\.html$/, '')
const title = f => readFileSync(new URL(f.replace(/^git-easy\//, '').replace('.html', '.md'), dir), 'utf8').match(/^# (.+)$/m)[1]
const item = f => ({ text: title(f), link: link(f) })
const section = (t, a, b, label, list) => ({ text: t, items: [item(a), item(b), { text: label, collapsed: true, items: list.map(item) }] })

export const easySidebar = {
  '/git-easy/': [
    { text: l.title, link: '/git-easy/' },
    section('GitHub', 'git-easy/01-what-is-github.html', 'git-easy/02-ai-and-github.html', l.githubPractice, ghPractice),
    section('Git', 'git-easy/04-what-is-git-cli.html', 'git-easy/05-git-principle.html', l.gitPractice, gitPractice),
  ],
}
