<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiteFooter from './SiteFooter.vue'
import { site } from '../site.mjs'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout :style="{ '--vp-nav-logo-height': site.logoHeight }">
    <template #layout-bottom><SiteFooter /></template>
    <template #doc-before>
      <p v-if="frontmatter.pdf" class="pdf-download">
        <a :href="frontmatter.pdf">이 주제 PDF 다운로드</a>
      </p>
    </template>
  </DefaultTheme.Layout>
</template>
