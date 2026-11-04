<script setup>
import { coverPicture } from '../cover-picture.mjs'
import './cover.css'
import './cover-mask.css'
const props = defineProps({ config: { type: Object, required: true } })
const sources = coverPicture(props.config)
</script>

<template>
  <section class="landing-cover" :style="config.style">
    <picture>
      <source v-bind="sources.avif">
      <img v-bind="sources.image" :sizes="config.sizes" :alt="config.alt"
        fetchpriority="high" decoding="async">
    </picture>
    <slot />
  </section>
</template>
