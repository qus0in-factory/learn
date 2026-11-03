<script setup>
import { useData } from 'vitepress'
import { tagLabels as t } from '../tag-labels.mjs'
import { sortedGroups, itemLabel } from './tag-group-items.mjs'
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
    <p v-if="g.pages.length"><strong>{{ t.pages }}</strong>:
      <template v-for="(p, i) in g.pages" :key="p.link"><span v-if="i"> · </span><a :href="p.link">{{ itemLabel(p) }}</a></template>
    </p>
    <p v-if="g.commands.length"><strong>{{ t.commands }}</strong>:
      <template v-for="(c, i) in g.commands" :key="c.link"><span v-if="i"> · </span><a :href="c.link">{{ c.text }}</a></template>
    </p>
  </section>
</template>
