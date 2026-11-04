<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import { appendixLabels } from '../appendix-labels.mjs'
import { useAppendixTabs } from './useAppendixTabs.mjs'
import AppendixTabs from './AppendixTabs.vue'
import './course-contents.css'

const { theme } = useData()
const groups = theme.value.appendixNavigation
const { selected, items, move } = useAppendixTabs(groups)
</script>

<template>
  <AppendixTabs v-model="selected" :groups="groups" :move="move" />
  <div id="appendix-table" class="course-table" role="tabpanel" :aria-label="labels.appendix">
    <table class="appendix-contents">
      <thead><tr><th v-if="!selected">{{ appendixLabels.topic }}</th><th>{{ labels.title }}</th></tr></thead>
      <tbody><tr v-for="item in items" :key="item.link"><td v-if="!selected">{{ item.topic }}</td><td><a :href="item.link">{{ item.text }}</a></td></tr></tbody>
    </table>
  </div>
</template>
