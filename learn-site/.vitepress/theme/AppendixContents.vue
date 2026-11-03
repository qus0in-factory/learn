<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import './course-contents.css'

const { theme } = useData()
const items = theme.value.courseContents.filter(item => item.link.startsWith('/git/appendix/'))
</script>

<template>
  <div class="course-table"><table class="appendix-contents">
    <thead><tr><th>{{ labels.title }}</th></tr></thead>
    <tbody><tr v-for="item in items" :key="item.link">
      <td><a :href="item.link">{{ item.text }}</a></td>
    </tr></tbody>
  </table></div>
</template>
