<script setup>
import { courses } from '../courses.mjs'
import { site } from '../site.mjs'
import { useData } from 'vitepress'
import './courses.css'
import CardThumbnail from './CardThumbnail.vue'
const { theme } = useData()
</script>

<template>
  <ul class="course-list">
    <li v-for="course in courses" :key="course.id" class="course-card">
      <a :href="course.link" :style="course.image?.style">
        <CardThumbnail v-if="course.image" :image="course.image" />
        <div class="course-card-text">
        <strong>{{ course.title }}</strong>
        <span>{{ course.summary }}</span>
        <small>{{ site.updated }}{{ theme.courseUpdated }}</small>
        </div>
      </a>
    </li>
  </ul>
</template>
