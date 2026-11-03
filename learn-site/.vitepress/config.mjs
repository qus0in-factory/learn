import { defineConfig } from 'vitepress'
import { render } from 'pele'

export default defineConfig({
  title: 'Git과 웹 배포 강의',
  lang: 'ko-KR',
  base: '/',
  srcDir: '../docs/lecture',
  outDir: '../dist/learn',
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: '강의 목차', link: '/index' },
      { text: 'PDF (예정)', link: 'https://files.qus0in.dev/v0.1.0/01-environment.pdf' },
    ],
  },
  head: [
    ['style', {}, `
      @media print {
        .VPNav, .VPLocalNav, .VPDocAside, .VPSidebar, .VPFooter, button, .appearance { display: none !important; }
        .VPDoc { padding: 0 !important; }
      }
      @page { size: A4; margin: 16mm; }
    `],
  ],
  vite: {
    resolve: {
      alias: {
        'vue': new URL('../../course-site/node_modules/vue', import.meta.url).pathname,
        'vue/server-renderer': new URL('../../course-site/node_modules/vue/server-renderer', import.meta.url).pathname,
      },
    },
  },
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
