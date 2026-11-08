<script setup>
import { computed } from 'vue'
import { useRotatingQuotes } from './use-rotating-quotes.mjs'
import './nietzsche-banner.css'

const props = defineProps({ data: { type: Object, required: true } })
const quotes = computed(() => props.data?.quotes || [])
const { idx, fading, ready } = useRotatingQuotes(quotes, props.data?.intervalMs)
const cur = computed(() => quotes.value[idx.value] || { text: '', source: '' })
</script>

<template>
  <a
    v-if="cur.text"
    :href="data.link"
    target="_blank"
    rel="noopener noreferrer"
    :class="['ad-nietzsche', { 'ad-nietzsche-ready': ready }]"
    :aria-label="cur.text"
  >
    <div :class="['ad-nietzsche-text', { 'ad-nietzsche-fade': fading }]">
      {{ cur.text }}
    </div>
    <div :class="['ad-nietzsche-src', { 'ad-nietzsche-fade': fading }]">
      — {{ cur.source }}
    </div>
  </a>
</template>
