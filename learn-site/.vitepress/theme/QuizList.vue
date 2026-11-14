<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { coursePrefix } from '../seo-course-of.mjs'

const { page } = useData()
const prefix = computed(() => coursePrefix(page.value.relativePath))
const props = defineProps({ quiz: Array, lectures: Array })
const title = (slug) => props.lectures.find((lecture) => lecture.slug === slug)?.title || slug
</script>

<template>
  <h2>복습 퀴즈</h2>
  <ol>
    <li v-for="question in quiz" :key="question.position">
      {{ question.question }}
      <span v-if="question.lessons?.length">
        —
        <a v-for="slug in question.lessons" :key="slug" :href="`${prefix}/${slug}`">{{ title(slug) }}</a>
      </span>
    </li>
  </ol>
</template>
