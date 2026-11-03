<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiteFooter from './SiteFooter.vue'
import { site } from '../site.mjs'
import { labels } from '../labels.mjs'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout :style="{ '--vp-nav-logo-height': site.logoHeight }">
    <template #sidebar-nav-before><a href="/">{{ site.home }}</a></template>
    <template #layout-bottom><SiteFooter /></template>
    <template #doc-before>
      <p v-if="frontmatter.pdf" class="pdf-download">
        <a :href="frontmatter.pdf">{{ labels.pdf }}</a>
      </p>
    </template>
  </DefaultTheme.Layout>
</template>
