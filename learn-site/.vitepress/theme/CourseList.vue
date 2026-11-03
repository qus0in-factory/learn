<script setup>
import { courses } from '../courses.mjs'
import { site } from '../site.mjs'
import { useData } from 'vitepress'
import './courses.css'
const { theme } = useData()
</script>

<template>
  <ul class="course-list">
    <li v-for="course in courses" :key="course.id" class="course-card">
      <a :href="course.link">
        <strong>{{ course.title }}</strong>
        <span>{{ course.summary }}</span>
        <small>{{ site.updated }}{{ theme.courseUpdated }}</small>
      </a>
    </li>
  </ul>
</template>
