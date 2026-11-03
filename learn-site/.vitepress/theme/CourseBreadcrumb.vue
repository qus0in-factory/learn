<script setup>
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import { courses } from '../courses.mjs'
import './course-breadcrumb.css'

const { page } = useData()
</script>

<template>
  <div class="course-breadcrumb">
    <a href="/">{{ labels.siteTitle }}</a><span aria-hidden="true">›</span>
    <a :href="courses[0].link">{{ labels.courseTitle }}</a><span aria-hidden="true">›</span>
    <span>{{ page.title }}</span>
  </div>
</template>
