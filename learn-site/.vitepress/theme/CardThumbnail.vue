<script setup>
import { coverPicture } from '../cover-picture.mjs'
const props = defineProps({ image: { type: Object, required: true } })
const sources = coverPicture(props.image)
</script>

<template>
  <picture class="card-thumbnail">
    <source v-bind="sources.avif">
    <img v-bind="sources.image" :sizes="image.sizes" :alt="image.alt" decoding="async">
  </picture>
</template>
