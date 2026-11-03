<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import './course-contents.css'
const { theme } = useData()
const lessons = theme.value.sidebar['/git/'][0].items
</script>

<template>
  <table class="course-contents">
    <thead><tr><th>{{ labels.order }}</th><th>{{ labels.title }}</th></tr></thead>
    <tbody>
      <tr v-for="(lesson, index) in lessons" :key="lesson.link">
        <td>{{ index + 1 }}</td><td><a :href="lesson.link">{{ lesson.text }}</a></td>
      </tr>
    </tbody>
  </table>
</template>
