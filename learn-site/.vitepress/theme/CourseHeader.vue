<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { courses } from '../courses.mjs'
import { site } from '../site.mjs'
import ShareCourse from './ShareCourse.vue'
import CourseCover from './CourseCover.vue'
import './course-alignment.css'

const { page, theme } = useData()
const course = computed(() => courses.find(c => page.value.relativePath.split('/')[0] === c.id) || courses[0])
</script>

<template>
  <header class="course-header">
    <h1>{{ course.title }}</h1>
    <p>{{ course.summary }}</p>
    <small>{{ site.updated }}{{ theme.courseUpdated }}</small>
    <CourseCover />
    <ShareCourse :course="course" />
  </header>
</template>
