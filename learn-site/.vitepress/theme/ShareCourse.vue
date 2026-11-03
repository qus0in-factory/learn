<script setup>
import { ref } from 'vue'
import { share } from '../course-share.mjs'
import './share-course.css'

const props = defineProps({ course: { type: Object, required: true } })
const message = ref('')
const url = new URL(props.course.link, share.origin).href
const xUrl = `${share.x}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(props.course.title)}`
async function copy() {
  try {
    await navigator.clipboard.writeText(url)
    message.value = share.copied
  } catch {
    message.value = share.failed
  }
}
</script>

<template>
  <div class="share-course">
    <img :src="share.qr" :alt="share.qrAlt" width="120" height="120">
    <div class="share-actions">
      <button type="button" disabled>{{ share.kakao }}</button>
      <a :href="xUrl" target="_blank" rel="noopener noreferrer">{{ share.xLabel }}</a>
      <button type="button" @click="copy">{{ share.copy }}</button>
      <span role="status">{{ message }}</span>
    </div>
  </div>
</template>
