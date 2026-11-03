<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiteFooter from './SiteFooter.vue'
import { site } from '../site.mjs'
import CourseBreadcrumb from './CourseBreadcrumb.vue'
import StepHeader from './StepHeader.vue'
import PageUpdated from './PageUpdated.vue'
import { appendixPrefix } from '../appendix-prefix.mjs'
import './task-list.css'
import './header-logo.css'
import './header-logotype.css'

const { frontmatter, page } = useData()
</script>

<template>
  <DefaultTheme.Layout :style="{ '--vp-nav-logo-height': site.logoHeight, '--appendix-prefix': appendixPrefix(page.relativePath) }">
    <template #layout-bottom><SiteFooter /></template>
    <template #doc-footer-before>
      <PageUpdated />
    </template>
    <template #doc-before>
      <CourseBreadcrumb v-if="/^git\/(?:\d{2}-|appendix\/)/.test(page.relativePath)" />
      <StepHeader v-if="frontmatter.pdf" :key="page.relativePath" />
    </template>
  </DefaultTheme.Layout>
</template>
