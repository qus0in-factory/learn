<script setup>
import { share } from '../course-share.mjs'
import ShareIcon from './ShareIcon.vue'

defineProps({ xUrl: { type: String, required: true } })
defineEmits(['copy'])
</script>

<template>
  <a class="share-button" :href="xUrl" :aria-label="share.xLabel" target="_blank" rel="noopener noreferrer"><ShareIcon name="x" /></a>
  <button class="share-button" type="button" :aria-label="share.copy" @click="$emit('copy')"><ShareIcon name="link" /></button>
</template>
