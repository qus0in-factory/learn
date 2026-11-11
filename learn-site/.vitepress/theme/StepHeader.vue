<script setup>
import { useData } from 'vitepress'
import { site } from '../site.mjs'
import { stepLabel } from '../step-label.mjs'
import ShareCourse from './ShareCourse.vue'
import StepTags from './StepTags.vue'
import gists from '../../../scripts/learn-gist-easy/gists.json'
import './step-header.css'
const { page: p, frontmatter: f, theme: t } = useData()
const d = p.value, path = d.relativePath.replace('.md', ''), link = '/' + path
const list = t.value.courseLessons, index = list.findIndex(i => i.link === link), item = list[index]
const gist = item?.gist || gists[path]?.url, lesson = item || (gist && { gist })
const course = { title: d.title, summary: f.value.subtitle || '', link }
</script>
<template>
<header class="step-header vp-doc"><p v-if="item" class="step-header__step">{{ stepLabel(index) }}</p>
<h1>{{ p.title }}</h1><p v-if="f.subtitle">{{ f.subtitle }}</p>
<StepTags /><small>{{ site.updated }}{{ f.pageUpdated }}</small><ShareCourse :course="course" :lesson="lesson || {}" /></header></template>
