<script setup>
import { useData } from 'vitepress'
import { site } from '../site.mjs'
import { stepLabel } from '../step-label.mjs'
import ShareCourse from './ShareCourse.vue'
import './step-header.css'

const { page, frontmatter, theme } = useData()
const link = `/${page.value.relativePath.replace(/\.md$/, '')}`
const index = theme.value.courseLessons.findIndex(item => item.link === link)
const lesson = theme.value.courseLessons[index]
const course = { title: page.value.title, summary: frontmatter.value.subtitle || '', link }
</script>

<template>
  <header class="step-header vp-doc">
    <p v-if="lesson" class="step-header__step">{{ stepLabel(index) }}</p>
    <h1>{{ page.title }}</h1>
    <p v-if="frontmatter.subtitle">{{ frontmatter.subtitle }}</p>
    <small>{{ site.updated }}{{ frontmatter.pageUpdated }}</small>
    <ShareCourse v-if="lesson" :course="course" :lesson="lesson" />
  </header>
</template>
