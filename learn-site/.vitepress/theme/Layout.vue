<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiteFooter from './SiteFooter.vue'
import { site } from '../site.mjs'
import { labels } from '../labels.mjs'
import CourseBreadcrumb from './CourseBreadcrumb.vue'
import './task-list.css'
import './header-logo.css'

const { frontmatter, page } = useData()
</script>

<template>
  <DefaultTheme.Layout :style="{ '--vp-nav-logo-height': site.logoHeight }">
    <template #layout-bottom><SiteFooter /></template>
    <template #doc-before>
      <CourseBreadcrumb v-if="/^git\/(?:\d{2}-|appendix\/)/.test(page.relativePath)" />
      <p v-if="frontmatter.pdf" class="pdf-download">
        <a :href="frontmatter.pdf">{{ labels.pdf }}</a>
      </p>
    </template>
  </DefaultTheme.Layout>
</template>
