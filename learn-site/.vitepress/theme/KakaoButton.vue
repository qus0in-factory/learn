<script setup>
import { share } from '../course-share.mjs'
import ShareIcon from './ShareIcon.vue'
defineProps({ kakao: { type: Object, required: true } })
</script>

<template>
  <button class="share-button" type="button" :disabled="!kakao.available || kakao.busy.value"
    :aria-label="kakao.available ? share.kakaoReady : share.kakao" @click="kakao.send">
    <ShareIcon name="kakao" />
  </button>
</template>
