import { defineConfig } from 'vitepress'
import { markdown } from './markdown.mjs'
import { themeConfig, transformPageData } from './pdf.mjs'
import { printHead } from './print.mjs'

export default defineConfig({
  title: 'Git과 웹 배포 강의',
  lang: 'ko-KR',
  base: '/',
  srcDir: '../docs',
  srcExclude: ['261102/**', '261103/**', 'ci.md', 'deployment.md', 'setup/**'],
  rewrites: {
    'lecture/index.md': 'git/index.md',
    'lecture/catalog.md': 'git/catalog.md',
    'lecture/:page': 'git/:page',
    'lecture/appendix/:page': 'git/appendix/:page',
    'lecture/supplement/:page': 'git/supplement/:page',
  },
  cleanUrls: true,
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
