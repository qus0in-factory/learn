<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import './course-contents.css'
import CourseResourceCells from './CourseResourceCells.vue'
const { theme } = useData()
const lessons = theme.value.courseLessons
const step = (index) => `${labels.step} ${String(index + 1).padStart(labels.stepDigits, labels.stepPad)}`
</script>

<template>
  <div class="course-table"><table class="course-contents">
    <thead><tr><th>{{ labels.order }}</th><th>{{ labels.title }}</th><th>{{ labels.pdfColumn }}</th><th>{{ labels.gistColumn }}</th></tr></thead>
    <tbody>
      <tr v-for="(lesson, index) in lessons" :key="lesson.link">
        <td>{{ step(index) }}</td><td><a :href="lesson.link">{{ lesson.text }}</a></td>
        <CourseResourceCells :lesson="lesson" :step="step(index)" />
      </tr>
    </tbody>
  </table></div>
</template>
