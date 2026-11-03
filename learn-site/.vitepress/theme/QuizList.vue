<script setup>
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
        <a v-for="slug in question.lessons" :key="slug" :href="`/git/${slug}`">{{ title(slug) }}</a>
      </span>
    </li>
  </ol>
</template>
