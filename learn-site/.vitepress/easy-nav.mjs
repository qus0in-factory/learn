import { readFileSync } from 'node:fs'
import { easyLabels } from './easy-labels.mjs'
import { ghPractice, gitPractice } from '../easy-pages.mjs'

const dir = new URL('../../docs/easy/', import.meta.url)
const link = file => '/' + file.replace(/index\.html$/, '').replace(/\.html$/, '')
const title = file => readFileSync(new URL(file.replace(/^git-easy\//, '').replace('.html', '.md'), dir), 'utf8')
  .match(/^# (.+)$/m)[1]
const item = file => ({ text: title(file), link: link(file) })

export const easySidebar = {
  '/git-easy/': [
    { text: easyLabels.title, link: '/git-easy/' },
    {
      text: 'GitHub',
      items: [
        item('git-easy/01-what-is-github.html'),
        item('git-easy/02-ai-and-github.html'),
        {
          text: easyLabels.githubPractice,
          collapsed: true,
          items: ghPractice.map(item),
        },
      ],
    },
    {
      text: 'Git',
      items: [
        item('git-easy/04-what-is-git-cli.html'),
        item('git-easy/05-git-principle.html'),
        {
          text: easyLabels.gitPractice,
          collapsed: true,
          items: gitPractice.map(item),
        },
      ],
    },
  ],
}
