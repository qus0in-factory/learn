<script setup>
import kakao from './icons/kakaotalk.svg?raw'
import x from './icons/x.svg?raw'
import link from './icons/link.svg?raw'
defineProps({ name: { type: String, required: true } })
const icons = { kakao, x, link }
</script>

<template>
  <span class="share-icon" :class="{ simple: name !== 'link' }" aria-hidden="true" v-html="icons[name]" />
</template>
