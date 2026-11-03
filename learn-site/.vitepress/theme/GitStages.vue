<script setup>
import { useData } from 'vitepress'
import config from '../git-stages.json'
import { coverPicture } from '../cover-picture.mjs'
import './git-stages.css'

const { frontmatter } = useData()
const sources = coverPicture(config)
</script>

<template>
  <figure class="git-stages">
    <picture>
      <source v-bind="sources.avif">
      <img v-bind="sources.image" :sizes="config.sizes" :alt="frontmatter.gitStagesAlt" loading="lazy" decoding="async">
    </picture>
  </figure>
</template>
