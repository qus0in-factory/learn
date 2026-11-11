<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import SiteFooter from './SiteFooter.vue'
import { site } from '../site.mjs'
import CourseBreadcrumb from './CourseBreadcrumb.vue'
import StepIntro from './StepIntro.vue'
import PageUpdated from './PageUpdated.vue'
import AdSlot from './AdSlot.vue'
import './task-list.css'
import './header-logo.css'
import './header-logotype.css'

const { frontmatter, page } = useData()
</script>

<template>
  <DefaultTheme.Layout :style="{ '--vp-nav-logo-height': site.logoHeight }">
    <template #doc-after><AdSlot slot-name="docBottom" /></template>
    <template #aside-ads-before><AdSlot slot-name="asideRail" /></template>
    <template #layout-bottom><SiteFooter /></template>
    <template #doc-footer-before><PageUpdated /></template>
    <template #doc-before>
      <CourseBreadcrumb />
      <StepIntro v-if="frontmatter.stepHeader" :key="page.relativePath" />
    </template>
  </DefaultTheme.Layout>
</template>
