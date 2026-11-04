<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import './course-contents.css'
import CourseResourceCells from './CourseResourceCells.vue'
const { theme } = useData()
const lessons = theme.value.courseContents.filter(item => item.pdf)
</script>

<template>
  <div class="course-table"><table class="course-contents">
    <thead><tr><th>{{ labels.order }}</th><th>{{ labels.title }}</th><th>{{ labels.pdfColumn }}</th><th>{{ labels.gistColumn }}</th></tr></thead>
    <tbody>
      <tr v-for="(lesson, index) in lessons" :key="lesson.link">
        <td>{{ lesson.order }}</td><td><a :href="lesson.link">{{ lesson.text }}</a></td>
        <CourseResourceCells v-if="lesson.pdf" :lesson="lesson" :step="lesson.order" />
        <template v-else><td></td><td></td></template>
      </tr>
    </tbody>
  </table></div>
</template>
