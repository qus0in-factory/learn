<script setup>
import { ref, computed } from "vue"
import { share } from "../course-share.mjs"
import "./course-qr.css"

const props = defineProps({ course: Object })
const qr = computed(() => share.qr(props.course?.id))
const d = ref(), trigger = ref(), visible = ref(false), alt = share.qrAlt
const open = () => { d.value?.showModal(); visible.value = true }
const reset = () => { visible.value = false; trigger.value?.focus() }
</script>

<template>
  <button ref="trigger" class="course-qr" type="button" aria-haspopup="dialog" :aria-label="`${alt} 크게 보기`" @click="open">
    <img :src="qr" :alt="alt" width="120" height="120">
  </button>
  <dialog ref="d" class="course-qr-dialog" aria-labelledby="course-qr-title" @close="reset">
    <div class="course-qr-dialog__header"><h2 id="course-qr-title">{{ alt }}</h2><button class="share-button" type="button" autofocus @click="d?.close()">닫기</button></div>
    <img v-if="visible" class="course-qr-dialog__image" :src="qr" :alt="alt">
  </dialog>
</template>
