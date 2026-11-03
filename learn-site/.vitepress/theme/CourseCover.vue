<script setup>
import base from '../cover.json'
import course from '../git-cover.json'
import { labels } from '../labels.mjs'
import CoverPicture from './CoverPicture.vue'

const config = { ...base, ...course, alt: labels.courseCoverAlt,
  style: { ...base.style, ...course.style } }
</script>

<template><CoverPicture class="course-cover" :config="config" /></template>
