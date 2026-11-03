<script setup>
import { useData } from 'vitepress'
import links from '../install-links.json'
import { stepLabels } from '../step-labels.mjs'
import { installPage } from '../install-page.mjs'
import './step-downloads.css'

const { frontmatter } = useData()
const items = (frontmatter.value.downloads || []).map((id) => links.find((link) => link.id === id)).filter(Boolean)
</script>

<template>
  <section v-if="items.length" class="step-downloads">
    <p class="step-downloads__title">{{ stepLabels.downloads }}</p>
    <ul>
      <li v-for="item in items" :key="item.id">
        <a :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
      </li>
    </ul>
    <template v-if="items.some(item => item.id === 'gitWindows')">
      <p>{{ stepLabels.installOrder }}</p>
      <p>{{ stepLabels.macGit }}</p>
    </template>
  </section>
  <p v-else-if="frontmatter.installation"><a :href="installPage.link">{{ installPage.title }}</a></p>
</template>
