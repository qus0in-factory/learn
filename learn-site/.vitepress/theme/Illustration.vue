<script setup>
import config from '../illustrations.json'
import { coverPicture } from '../cover-picture.mjs'
import { illustrationStem } from '../illustration-stem.mjs'
import './illustration.css'

const props = defineProps({ name: { type: String, required: true }, alt: { type: String, required: true } })
const sources = coverPicture({ ...config, stem: illustrationStem(props.name) })
</script>

<template>
  <figure class="illustration">
    <picture>
      <source v-bind="sources.avif">
      <img v-bind="sources.image" :sizes="config.sizes" :alt="alt" loading="lazy" decoding="async">
    </picture>
  </figure>
</template>
