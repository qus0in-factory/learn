<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { labels } from '../labels.mjs'
import { courses } from '../courses.mjs'
import './course-breadcrumb.css'

const { page } = useData()
const show = computed(() => /^(?:git\/(?:\d{2}-|appendix\/|commands\/|tags|glossary)|git-easy\/(?!index\.md))/.test(page.value.relativePath))
const course = computed(() => courses.find(c => page.value.relativePath.split('/')[0] === c.id) || courses[0])
</script>

<template>
  <div v-if="show" class="course-breadcrumb">
    <a href="/">{{ labels.siteTitle }}</a><span aria-hidden="true">›</span>
    <a :href="course.link">{{ course.title }}</a><span aria-hidden="true">›</span>
    <span>{{ page.title }}</span>
  </div>
</template>
