<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { courseOf } from '../seo-course-of.mjs'
import { glossaryLabels as t } from '../glossary-labels.mjs'
import GlossaryTerm from './GlossaryTerm.vue'
import './tag-groups.css'

const { page, theme } = useData()
const groups = computed(() => {
  const isEasy = courseOf(`/${page.value.relativePath}`).course?.id === 'git-easy'
  return (isEasy ? theme.value.easyGlossary : theme.value.glossary).groups
})
</script>

<template>
  <p>{{ t.intro }}</p>
  <nav class="tag-index" :aria-label="t.index">
    <a v-for="term in groups.flatMap(g => g.terms)" :key="term.slug" :href="`#${term.slug}`">{{ term.term }}</a>
  </nav>
  <section v-for="g in groups" :key="g.id" class="tag-group">
    <h2 :id="g.id" tabindex="-1">{{ g.text }}</h2>
    <GlossaryTerm v-for="term in g.terms" :key="term.slug" :term="term" />
  </section>
</template>
