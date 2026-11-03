import { defineConfig } from 'vitepress'
import { markdown } from './markdown.mjs'
import { themeConfig, transformPageData } from './pdf.mjs'
import { printHead } from './print.mjs'

export default defineConfig({
  title: 'Git과 웹 배포 강의',
  lang: 'ko-KR',
  base: '/',
  srcDir: '../docs/lecture',
  outDir: '../dist/learn',
  ignoreDeadLinks: true,
  themeConfig,
  transformPageData,
  head: printHead,
  vite: {
    resolve: {
      alias: {
        'vue': new URL('../../course-site/node_modules/vue', import.meta.url).pathname,
        'vue/server-renderer': new URL('../../course-site/node_modules/vue/server-renderer', import.meta.url).pathname,
      },
    },
  },
  markdown,
})
