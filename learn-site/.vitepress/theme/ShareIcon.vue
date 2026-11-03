<script setup>
import kakao from './icons/kakaotalk.svg?raw'
import x from './icons/x.svg?raw'
import link from './icons/link.svg?raw'
import slides from './icons/presentation.svg?raw'
import code from './icons/code.svg?raw'
import './share-icon.css'
import './icon-tokens.css'
defineProps({ name: { type: String, required: true } })
const icons = { kakao, x, link, slides, code }
</script>

<template>
  <span class="share-icon" :class="name" aria-hidden="true" v-html="icons[name]" />
</template>
