<script setup>
import { useData } from 'vitepress'
import { site } from '../site.mjs'

const { frontmatter } = useData()
</script>

<template>
  <p v-if="frontmatter.footerUpdated" class="page-updated">{{ site.updated }}{{ frontmatter.footerUpdated }}</p>
</template>
