<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import './course-contents.css'
const { theme } = useData()
const lessons = theme.value.courseLessons
</script>

<template>
  <div class="course-table"><table class="course-contents">
    <thead><tr><th>{{ labels.order }}</th><th>{{ labels.title }}</th><th>{{ labels.pdfColumn }}</th><th>{{ labels.gistColumn }}</th></tr></thead>
    <tbody>
      <tr v-for="(lesson, index) in lessons" :key="lesson.link">
        <td>{{ labels.step }} {{ index + 1 }}</td><td><a :href="lesson.link">{{ lesson.text }}</a></td>
        <td><a :href="lesson.pdf">{{ labels.pdfDownload }}</a></td>
        <td><a v-if="lesson.gist" :href="lesson.gist">{{ labels.gistLink }}</a><template v-else>{{ labels.noGist }}</template></td>
      </tr>
    </tbody>
  </table></div>
</template>
