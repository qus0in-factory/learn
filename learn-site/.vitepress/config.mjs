import { defineConfig } from 'vitepress'
import { markdown } from './markdown.mjs'
import { themeConfig } from './pdf.mjs'
import { transformPageData } from './page-data.mjs'
import { printHead } from './print.mjs'
import { site } from './site.mjs'
import { faviconHead } from './favicon.mjs'
import { courseUpdated } from './updated.mjs'
import { excluded, pages, vueAlias } from './pages.mjs'
import { cdnVite } from './cdn-vite.mjs'
import { cdnHead } from './cdn-head.mjs'
import { courseQr } from './course-qr.mjs'

export default defineConfig({
  title: site.title,
  lang: 'ko-KR',
  base: '/',
  srcDir: '../docs',
  srcExclude: excluded,
  rewrites: pages,
  cleanUrls: true,
  outDir: '../dist/learn',
  ignoreDeadLinks: true,
  themeConfig: { ...themeConfig, courseUpdated: courseUpdated() },
  transformPageData,
  transformHead: cdnHead,
  head: [...printHead, ...faviconHead],
  vite: { ...cdnVite, plugins: [courseQr()], resolve: { alias: vueAlias } },
  markdown,
})
