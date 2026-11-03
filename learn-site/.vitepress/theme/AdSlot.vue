<script setup>
import { computed, onMounted, ref } from 'vue'
import config from '../ads.json'
import { activeBanners } from '../active-banners.mjs'
import { adLabels } from '../ad-labels.mjs'
import './ad-slot.css'

const now = ref(0)
onMounted(() => { now.value = Date.now() })
const banners = computed(() => activeBanners(config, now.value))
</script>

<template>
  <aside v-if="banners.length" class="ad-slot" :aria-label="adLabels.disclosure">
    <small>{{ adLabels.disclosure }}</small>
    <a v-for="banner in banners" :key="banner.image" :href="banner.link" target="_blank" rel="sponsored noopener noreferrer">
      <img :src="banner.image" :alt="banner.alt" :width="config.imageWidth" :height="config.imageHeight" loading="lazy" decoding="async">
    </a>
    <a :href="adLabels.privacyPath">{{ adLabels.privacy }}</a>
  </aside>
</template>
