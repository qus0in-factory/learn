import { defineConfig } from 'vitepress'
import { markdown } from './markdown.mjs'
import { themeConfig, transformPageData } from './pdf.mjs'
import { printHead } from './print.mjs'
import { site } from './site.mjs'
import { faviconHead } from './favicon.mjs'
import { courseUpdated } from './updated.mjs'
import { pages, vueAlias } from './pages.mjs'

export default defineConfig({
  title: site.title,
  lang: 'ko-KR',
  base: '/',
  srcDir: '../docs',
  srcExclude: ['261102/**', '261103/**', 'ci.md', 'deployment.md', 'setup/**', 'license-notices.md'],
  rewrites: pages,
  cleanUrls: true,
  outDir: '../dist/learn',
  ignoreDeadLinks: true,
  themeConfig: { ...themeConfig, courseUpdated: courseUpdated() },
  transformPageData,
  head: [...printHead, ...faviconHead],
  vite: { resolve: { alias: vueAlias } },
  markdown,
})
