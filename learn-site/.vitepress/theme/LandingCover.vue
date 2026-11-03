<script setup>
import cover from '../cover.json'
import { site } from '../site.mjs'
import './cover.css'
</script>

<template>
  <section class="landing-cover" :style="{ '--cover-width': cover.displayWidth }">
    <img :src="cover.src" :alt="cover.alt" :width="cover.width" :height="cover.height"
      fetchpriority="high" decoding="async">
    <div class="visually-hidden">
      <h1>{{ site.title }}</h1>
      <p>{{ site.subtitle }}</p>
      <blockquote><p>{{ site.catchphrase }}</p></blockquote>
    </div>
  </section>
</template>
