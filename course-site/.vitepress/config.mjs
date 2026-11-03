import { defineConfig } from 'vitepress'
import { render } from 'pele'
import { configureMarkdown } from '../../scripts/learn-pdf/markdown-shared.mjs'

export default defineConfig({
  title: '수업 안내',
  lang: 'ko-KR',
  base: '/git/docs/',
  outDir: '../dist/hdai/git/docs',
  markdown: {
    config(md) {
      configureMarkdown(md, {
        mermaid: c => `<div class="mermaid-diagram">${render(c).svg}</div>\n`
      })
    },
  },
})
