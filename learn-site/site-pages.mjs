import { commandOrder } from './.vitepress/command-nav.mjs'
import { easyPages } from './easy-pages.mjs'
import { lecturePages } from './lecture-pages.mjs'

export const commandPages = commandOrder

export const expectedPages = ['index.html', '404.html', 'licenses.html', 'privacy.html', 'git/index.html',
  'git/catalog.html', 'git/tags.html', 'git/glossary.html', ...lecturePages,
  ...commandPages.map(name => `git/commands/${name}.html`), ...easyPages, 'git-easy/tags.html', 'git-easy/glossary.html']
