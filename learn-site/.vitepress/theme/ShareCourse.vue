<script setup>
import { share } from '../course-share.mjs'
import ShareIcon from './ShareIcon.vue'
import KakaoButton from './KakaoButton.vue'
import { useShare } from './useShare.mjs'
import './share-course.css'
import './share-interaction.css'
import './share-toast.css'

const props = defineProps({ course: { type: Object, required: true } })
const { message, xUrl, copy, kakao } = useShare(props.course)
</script>

<template>
  <div class="share-course">
    <div class="share-actions">
      <KakaoButton :kakao="kakao" />
      <a class="share-button" :href="xUrl" :aria-label="share.xLabel" target="_blank" rel="noopener noreferrer"><ShareIcon name="x" /></a>
      <button class="share-button" type="button" :aria-label="share.copy" @click="copy"><ShareIcon name="link" /></button>
    </div>
    <img :src="share.qr" :alt="share.qrAlt" width="120" height="120">
    <span v-if="message" class="share-toast" role="status" aria-live="polite">{{ message }}</span>
  </div>
</template>
