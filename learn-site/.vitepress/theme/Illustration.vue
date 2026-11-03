<script setup>
import config from '../illustrations.json'
import { coverPicture } from '../cover-picture.mjs'
import './illustration.css'

const props = defineProps({ name: { type: String, required: true }, alt: { type: String, required: true } })
const sources = coverPicture({ ...config, stem: config.prefix + props.name })
</script>

<template>
  <figure class="illustration">
    <picture>
      <source v-bind="sources.avif">
      <img v-bind="sources.image" :sizes="config.sizes" :alt="alt" loading="lazy" decoding="async">
    </picture>
  </figure>
</template>
