<script setup>
import { share } from '../course-share.mjs'
import ShareIcon from './ShareIcon.vue'
import { useShare } from './useShare.mjs'
import './share-course.css'

const props = defineProps({ course: { type: Object, required: true } })
const { message, xUrl, copy } = useShare(props.course)
</script>

<template>
  <div class="share-course">
    <img :src="share.qr" :alt="share.qrAlt" width="120" height="120">
    <div class="share-actions">
      <button type="button" disabled :aria-label="share.kakao"><ShareIcon name="kakao" /></button>
      <a :href="xUrl" :aria-label="share.xLabel" target="_blank" rel="noopener noreferrer"><ShareIcon name="x" /></a>
      <button type="button" :aria-label="share.copy" @click="copy"><ShareIcon name="link" /></button>
      <span role="status">{{ message }}</span>
    </div>
  </div>
</template>
