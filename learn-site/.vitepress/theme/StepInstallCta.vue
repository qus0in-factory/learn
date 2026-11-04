<script setup>
import { useData } from 'vitepress'
import { installPage } from '../install-page.mjs'
import './step-install-cta.css'
const { frontmatter } = useData()
</script>

<template>
  <p v-if="frontmatter.installation && !frontmatter.downloads?.length" class="step-install-cta">
    <a class="step-install-cta__link" :href="installPage.link">{{ installPage.title }} <span aria-hidden>→</span></a>
  </p>
</template>
