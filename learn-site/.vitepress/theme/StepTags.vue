<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { stepLabels } from '../step-labels.mjs'
import { tagSlug } from '../tag-slug.mjs'
import './step-tags.css'

const { frontmatter, page } = useData()
const isEasy = computed(() => page.value.relativePath.startsWith('git-easy/'))
</script>

<template>
  <ul v-if="frontmatter.tags?.length" class="step-tags" :aria-label="stepLabels.tags">
    <li v-for="tag in frontmatter.tags" :key="tag">
      <template v-if="isEasy">{{ tag }}</template>
      <a v-else :href="`/git/tags#${tagSlug(tag)}`">{{ tag }}</a>
    </li>
  </ul>
</template>
