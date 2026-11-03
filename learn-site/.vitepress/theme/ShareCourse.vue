<script setup>
import { share } from '../course-share.mjs'
import ShareIcon from './ShareIcon.vue'
import KakaoButton from './KakaoButton.vue'
import { useShare } from './useShare.mjs'
import { labels } from '../labels.mjs'
import './share-course.css'
import './share-interaction.css'
import './share-toast.css'

const props = defineProps({ course: { type: Object, required: true }, lesson: Object })
const { message, xUrl, copy, kakao } = useShare(props.course)
</script>

<template>
  <div class="share-course">
    <div class="share-actions">
      <a v-if="lesson?.pdf" class="share-button" :href="lesson.pdf" :aria-label="labels.pdf"><ShareIcon name="slides" /></a>
      <a v-if="lesson?.gist" class="share-button" :href="lesson.gist" :aria-label="labels.gistLink" target="_blank" rel="noopener noreferrer"><ShareIcon name="code" /></a>
      <KakaoButton :kakao="kakao" />
      <a class="share-button" :href="xUrl" :aria-label="share.xLabel" target="_blank" rel="noopener noreferrer"><ShareIcon name="x" /></a>
      <button class="share-button" type="button" :aria-label="share.copy" @click="copy"><ShareIcon name="link" /></button>
    </div>
    <img v-if="!lesson" :src="share.qr" :alt="share.qrAlt" width="120" height="120">
    <span v-if="message" class="share-toast" role="status" aria-live="polite">{{ message }}</span>
  </div>
</template>
