<script setup>
import { cover, coverImage } from '../cover.mjs'
import { site } from '../site.mjs'
import './cover.css'
import './cover-mask.css'
</script>

<template>
  <section class="landing-cover" :style="cover.style">
    <img v-bind="coverImage" :sizes="cover.sizes" :alt="cover.alt"
      fetchpriority="high" decoding="async">
    <div class="visually-hidden">
      <h1>{{ site.title }}</h1>
      <p>{{ site.subtitle }}</p>
      <blockquote><p>{{ site.catchphrase }}</p></blockquote>
    </div>
  </section>
</template>
