import { defineConfig } from 'vitepress'
import { markdown } from './markdown.mjs'
import { themeConfig } from './site-theme.mjs'
import { transformPageData } from './page-data.mjs'
import { printHead } from './print.mjs'
import { site } from './site.mjs'
import { faviconHead } from './favicon.mjs'
import { excluded, pages, vueAlias } from './pages.mjs'
import { cdnVite } from './cdn-vite.mjs'
import { cdnHead } from './cdn-head.mjs'
import { sitePlugins } from './site-plugins.mjs'
import { seoOptions } from './seo-options.mjs'

export default defineConfig({
  ...seoOptions,
  title: site.title,
  lang: 'ko-KR',
  base: '/',
  srcDir: '../docs',
  srcExclude: excluded,
  rewrites: pages,
  cleanUrls: true,
  outDir: '../dist/learn',
  ignoreDeadLinks: true,
  themeConfig,
  transformPageData,
  transformHead: cdnHead,
  head: [...printHead, ...faviconHead],
  vite: { ...cdnVite, plugins: sitePlugins, resolve: { alias: vueAlias } },
  markdown,
})
