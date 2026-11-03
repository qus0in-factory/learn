<script setup>
import { useData } from 'vitepress'
import { stepLabels } from '../step-labels.mjs'
import './step-tags.css'

const { frontmatter } = useData()
</script>

<template>
  <ul v-if="frontmatter.tags?.length" class="step-tags" :aria-label="stepLabels.tags">
    <li v-for="tag in frontmatter.tags" :key="tag">{{ tag }}</li>
  </ul>
</template>
