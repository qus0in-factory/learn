<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiteFooter from './SiteFooter.vue'
import { site } from '../site.mjs'
import { labels } from '../labels.mjs'
import CourseBreadcrumb from './CourseBreadcrumb.vue'
import StepHeader from './StepHeader.vue'
import './task-list.css'
import './header-logo.css'

const { frontmatter, page } = useData()
const appendixPrefix = () => {
  const match = page.value.relativePath.match(/^git\/appendix\/(\d{2})-/)
  return match ? JSON.stringify(`${labels.appendix} ${Number(match[1])}. `) : '""'
}
</script>

<template>
  <DefaultTheme.Layout :style="{ '--vp-nav-logo-height': site.logoHeight, '--appendix-prefix': appendixPrefix() }">
    <template #layout-bottom><SiteFooter /></template>
    <template #doc-footer-before>
      <p v-if="frontmatter.pageUpdated" class="page-updated">{{ site.updated }}{{ frontmatter.pageUpdated }}</p>
    </template>
    <template #doc-before>
      <CourseBreadcrumb v-if="/^git\/(?:\d{2}-|appendix\/)/.test(page.relativePath)" />
      <StepHeader v-if="frontmatter.pdf" :key="page.relativePath" />
    </template>
  </DefaultTheme.Layout>
</template>
