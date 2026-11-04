<script setup>
import { ref } from 'vue'
import { share } from '../course-share.mjs'
import qr from 'virtual:course-qr'
import './course-qr.css'

const dialog = ref()
const trigger = ref()
const visible = ref(false)
const open = () => { dialog.value?.showModal(); visible.value = true }
const close = () => dialog.value?.close()
const restore = () => { visible.value = false; trigger.value?.focus() }
</script>

<template>
  <button ref="trigger" class="course-qr" type="button" aria-haspopup="dialog" aria-label="과정 페이지 QR 코드 크게 보기" @click="open">
    <img :src="qr" :alt="share.qrAlt" width="120" height="120">
  </button>
  <dialog ref="dialog" class="course-qr-dialog" aria-labelledby="course-qr-title" @close="restore">
    <div class="course-qr-dialog__header">
      <h2 id="course-qr-title">과정 페이지 QR 코드</h2>
      <button class="share-button" type="button" autofocus @click="close">닫기</button>
    </div>
    <img v-if="visible" class="course-qr-dialog__image" :src="qr" :alt="share.qrAlt">
  </dialog>
</template>
