<script setup>
import { useData } from 'vitepress'
import { site } from '../site.mjs'

const { frontmatter } = useData()
</script>

<template>
  <p v-if="frontmatter.pageUpdated" class="page-updated">{{ site.updated }}{{ frontmatter.pageUpdated }}</p>
</template>
