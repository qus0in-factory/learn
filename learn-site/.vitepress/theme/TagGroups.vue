<script setup>
import { useData } from 'vitepress'
import { tagLabels as t } from '../tag-labels.mjs'
import { sortedGroups } from './tag-group-items.mjs'
import TagGroupLinks from './TagGroupLinks.vue'
import './tag-groups.css'

const { theme } = useData()
const groups = sortedGroups(theme.value.tagGroups)
</script>

<template>
  <p>{{ t.intro }}</p>
  <nav class="tag-index" :aria-label="t.index">
    <a v-for="g in groups" :key="g.slug" :href="`#${g.slug}`">{{ g.tag }}</a>
  </nav>
  <section v-for="g in groups" :key="g.slug" class="tag-group">
    <h2 :id="g.slug" tabindex="-1">{{ g.tag }}</h2>
    <TagGroupLinks :group="g" />
  </section>
</template>
