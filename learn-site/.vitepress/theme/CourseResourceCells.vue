<script setup>
import download from './icons/download.svg?raw'
import external from './icons/external-link.svg?raw'
import { labels } from '../labels.mjs'
import './icon-tokens.css'

defineProps({ lesson: { type: Object, required: true }, step: { type: String, required: true } })
const label = (pattern, step) => pattern.replace('{step}', step)
</script>

<template>
  <td><a :href="lesson.pdf" :aria-label="label(labels.pdfFor, step)" :title="label(labels.pdfFor, step)"><span aria-hidden="true" v-html="download" /></a></td>
  <td><a v-if="lesson.gist" :href="lesson.gist" :aria-label="label(labels.gistFor, step)" :title="label(labels.gistFor, step)"><span aria-hidden="true" v-html="external" /></a><template v-else>{{ labels.noGist }}</template></td>
</template>
