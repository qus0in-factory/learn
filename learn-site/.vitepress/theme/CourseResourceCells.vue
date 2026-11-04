<script setup>
import ShareIcon from './ShareIcon.vue'
import { labels } from '../labels.mjs'

defineProps({ lesson: { type: Object, required: true }, step: { type: String, required: true } })
const label = (pattern, step) => pattern.replace('{step}', step)
</script>

<template>
  <td><a :href="lesson.pdf" :aria-label="label(labels.pdfFor, step)" :title="label(labels.pdfFor, step)"><ShareIcon name="slides" /></a></td>
  <td><a v-if="lesson.gist" :href="lesson.gist" :aria-label="label(labels.gistFor, step)" :title="label(labels.gistFor, step)"><ShareIcon name="code" /></a><template v-else>{{ labels.noGist }}</template></td>
</template>
