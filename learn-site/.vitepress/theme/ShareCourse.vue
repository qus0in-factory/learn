<script setup>
import { share } from '../course-share.mjs'
import ShareLinks from './ShareLinks.vue'
import KakaoButton from './KakaoButton.vue'
import CourseQr from './CourseQr.vue'
import { useShare } from './useShare.mjs'
import LessonLinks from './LessonLinks.vue'
import PrintHelp from './PrintHelp.vue'
import './share-course.css'
import './share-interaction.css'
import './share-toast.css'

const props = defineProps({ course: { type: Object, required: true }, lesson: Object })
const { message, xUrl, copy, kakao } = useShare(props.course)
</script>

<template>
  <div class="share-course">
    <div class="share-actions">
      <LessonLinks :lesson="lesson" />
      <KakaoButton :kakao="kakao" />
      <ShareLinks :x-url="xUrl" @copy="copy" />
      <PrintHelp />
    </div>
    <CourseQr v-if="!lesson" :course="course" />
    <span v-if="message" class="share-toast" role="status" aria-live="polite">{{ message }}</span>
  </div>
</template>
