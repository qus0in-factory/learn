<script setup>
import { useData } from 'vitepress'
import links from '../install-links.json'
import { stepLabels } from '../step-labels.mjs'
import './step-downloads.css'
import './step-downloads-notes.css'
const { frontmatter } = useData()
const items = (frontmatter.value.downloads || []).map(id => links.find(l => l.id === id)).filter(Boolean)
</script>

<template>
  <section v-if="items.length" class="step-downloads">
    <p class="step-downloads__title">{{ stepLabels.downloads }}</p>
    <ul class="step-downloads__list">
      <li v-for="item in items" :key="item.id">
        <a class="step-downloads__link" :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
      </li>
    </ul>
    <div class="step-downloads__notes">
      <p v-for="note in stepLabels.installNotes" :key="note">{{ note }}</p>
    </div>
  </section>
</template>
