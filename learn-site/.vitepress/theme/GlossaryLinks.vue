<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { glossaryLabels as t } from '../glossary-labels.mjs'
import { itemLabel } from './tag-group-items.mjs'

const props = defineProps({ term: { type: Object, required: true } })
const { page } = useData()
const prefix = computed(() => page.value.relativePath.startsWith('git-easy/') ? '/git-easy' : '/git')
const rows = computed(() => [
  [t.steps, props.term.steps.map(s => ({ href: s.link, text: itemLabel(s) }))],
  [t.commands, props.term.commands.map(c => ({ href: c.link, text: c.text }))],
  [t.tags, props.term.tags.map(g => ({ href: `${prefix.value}/tags#${g.slug}`, text: g.tag }))],
].filter(([, items]) => items.length))
</script>

<template>
  <p class="glossary-links">
    <template v-for="[label, items] in rows" :key="label"><span>{{ label }}:</span>
      <template v-for="(item, i) in items" :key="item.href"><span v-if="i"> · </span><a :href="item.href">{{ item.text }}</a></template>
    </template>
  </p>
</template>
