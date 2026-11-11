<script setup>
import { useData } from 'vitepress'
import { site } from '../site.mjs'
import { stepLabel as s } from '../step-label.mjs'
import C from './ShareCourse.vue'
import T from './StepTags.vue'
import gists from '../../../scripts/learn-gist-easy/gists.json'
import './step-header.css'
const { page: p, frontmatter: f, theme: t } = useData(), path = p.value.relativePath.slice(0, -3), link = '/' + path
const { courseLessons: c, easyLessons: e } = t.value, i = c.findIndex(l => l.link === link), item = c[i], gist = item?.gist || gists[path]?.url, pdf = /^git-easy\//.test(path) && e?.[path], lesson = item || ((pdf || gist) && { pdf, gist }), course = { title: p.value.title, summary: f.value.subtitle || '', link }
</script>
<template>
<header class="step-header vp-doc"><p v-if="item" class="step-header__step">{{ s(i) }}</p>
<h1>{{ p.title }}</h1><p v-if="f.subtitle">{{ f.subtitle }}</p>
<T /><small>{{ site.updated }}{{ f.pageUpdated }}</small><C :course="course" :lesson="lesson || {}" /></header></template>
