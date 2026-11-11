<script setup>
import { useData } from 'vitepress'
import { site } from '../site.mjs'
import { stepLabel } from '../step-label.mjs'
import ShareCourse from './ShareCourse.vue'
import StepTags from './StepTags.vue'
import gists from '../../../scripts/learn-pdf/gists.json'
import './step-header.css'

const { page: p, frontmatter: f, theme: t } = useData()
const l = '/' + p.value.relativePath.replace('.md', ''), cl = t.value.courseLessons
const idx = cl.findIndex(i => i.link === l), item = cl[idx]
const u = gists[l.slice(1)]?.url, lesson = item || (u && { gist: u })
const course = { title: p.value.title, summary: f.value.subtitle || '', link: l }
</script>

<template>
  <header class="step-header vp-doc">
    <p v-if="item" class="step-header__step">{{ stepLabel(idx) }}</p>
    <h1>{{ p.title }}</h1>
    <p v-if="f.subtitle">{{ f.subtitle }}</p>
    <StepTags />
    <small>{{ site.updated }}{{ f.pageUpdated }}</small>
    <ShareCourse :course="course" :lesson="lesson || {}" />
  </header>
</template>
