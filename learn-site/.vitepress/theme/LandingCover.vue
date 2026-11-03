<script setup>
import { cover } from '../cover.mjs'
import { site } from '../site.mjs'
import CoverPicture from './CoverPicture.vue'
</script>

<template>
  <CoverPicture :config="cover">
    <div class="visually-hidden">
      <h1>{{ site.title }}</h1>
      <p>{{ site.subtitle }}</p>
      <blockquote><p>{{ site.catchphrase }}</p></blockquote>
    </div>
  </CoverPicture>
</template>
