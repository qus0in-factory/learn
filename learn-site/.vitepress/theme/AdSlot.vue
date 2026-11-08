<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { adLabels } from '../ad-labels.mjs'
import { isSlotVisible, getSlotSpec } from '../ad-slot-config.mjs'
import NietzscheBanner from './NietzscheBanner.vue'
import './ad-slot.css'

const p = defineProps({ slotName: { type: String, default: 'docBottom' } })
const { page } = useData()
const show = computed(() => isSlotVisible(p.slotName, page.value?.relativePath))
const s = computed(() => getSlotSpec(p.slotName))
</script>

<template>
  <aside v-if="show" :class="['ad-slot', `ad-slot--${p.slotName}`]" :aria-label="adLabels.disclosure">
    <div class="ad-slot-bar">
      <span>{{ adLabels.badge }}</span>
      <a :href="adLabels.privacyPath">{{ adLabels.privacy }}</a>
    </div>
    <NietzscheBanner v-if="s.nietzsche" :data="s.nietzsche" />
  </aside>
</template>
