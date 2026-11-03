<script setup>
import { useData } from 'vitepress'
import { tagLabels } from '../tag-labels.mjs'
import commands from '../commands.json'

const { frontmatter, theme } = useData()
const steps = (frontmatter.value.stepRefs || [])
  .map((ref) => theme.value.courseContents.find((item) => item.link === `/git/${ref}`)).filter(Boolean)
const docs = `${commands.docs}${frontmatter.value.command}`
</script>

<template>
  <h2 :id="'related-steps'" tabindex="-1">{{ tagLabels.relatedSteps }}</h2>
  <ul>
    <li v-for="s in steps" :key="s.link"><a :href="s.link">{{ s.order ? `${s.order} ${s.text}` : s.text }}</a></li>
  </ul>
  <h2 :id="'official-docs'" tabindex="-1">{{ tagLabels.officialDocs }}</h2>
  <ul><li><a :href="docs" target="_blank" rel="noreferrer">git-{{ frontmatter.command }}</a></li></ul>
</template>
