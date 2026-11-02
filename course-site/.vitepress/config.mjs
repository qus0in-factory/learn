import { defineConfig } from 'vitepress'
import { render } from 'pele'

export default defineConfig({
  title: '수업 안내',
  lang: 'ko-KR',
  base: '/git/docs/',
  outDir: '../dist/git/docs',
  markdown: {
    config(md) {
      const fence = md.renderer.rules.fence
      md.renderer.rules.fence = (tokens, index, options, env, self) => {
        const token = tokens[index]
        if (token.info.trim() !== 'mermaid') return fence(tokens, index, options, env, self)
        return `<div class="mermaid-diagram">${render(token.content).svg}</div>\n`
      }
    },
  },
})
