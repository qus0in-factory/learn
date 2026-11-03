<script setup>
import ShareIcon from './ShareIcon.vue'
import { labels } from '../labels.mjs'

defineProps({ lesson: Object })
</script>

<template>
  <a v-if="lesson?.pdf" class="share-button" :href="lesson.pdf" :aria-label="labels.pdf"><ShareIcon name="slides" /></a>
  <a v-if="lesson?.gist" class="share-button" :href="lesson.gist" :aria-label="labels.gistLink" target="_blank" rel="noopener noreferrer"><ShareIcon name="code" /></a>
</template>
