<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { stepLabels } from '../step-labels.mjs'
import { tagSlug } from '../tag-slug.mjs'
import './step-tags.css'

const { frontmatter, page } = useData()
const prefix = computed(() => page.value.relativePath.startsWith('git-easy/') ? '/git-easy' : '/git')
</script>

<template>
  <ul v-if="frontmatter.tags?.length" class="step-tags" :aria-label="stepLabels.tags">
    <li v-for="tag in frontmatter.tags" :key="tag">
      <a :href="`${prefix}/tags#${tagSlug(tag)}`">{{ tag }}</a>
    </li>
  </ul>
</template>
