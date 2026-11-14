<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { tagLabels as t } from '../tag-labels.mjs'
import { glossaryLabels } from '../glossary-labels.mjs'
import { itemLabel } from './tag-group-items.mjs'

const props = defineProps({ group: { type: Object, required: true }, prefix: { type: String, required: true } })
const { theme } = useData()
const terms = computed(() => (props.prefix === '/git-easy' ? theme.value.easyGlossary : theme.value.glossary)
  .groups.flatMap(g => g.terms).filter(term => term.tags.some(x => x.tag === props.group.tag)))
const rows = computed(() => [
  [t.pages, props.group.pages.map(p => ({ href: p.link, text: itemLabel(p) }))],
  [t.commands, props.group.commands.map(c => ({ href: c.link, text: c.text }))],
  [glossaryLabels.terms, terms.value.map(term => ({ href: `${props.prefix}/glossary#${term.slug}`, text: term.term }))],
].filter(([, items]) => items.length))
</script>

<template>
  <p v-for="[label, items] in rows" :key="label"><strong>{{ label }}</strong>:
    <template v-for="(item, i) in items" :key="item.href"><span v-if="i"> · </span><a :href="item.href">{{ item.text }}</a></template>
  </p>
</template>
