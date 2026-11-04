<script setup>
import { ref, useId } from 'vue'
import ShareIcon from './ShareIcon.vue'
import { actionLabels as text } from '../action-labels.mjs'
import { useHelp } from './useHelp.mjs'
import './print-help.css'
const root = ref(null), id = useId()
const { open, rows, toggle } = useHelp(root)
const print = () => window.print()
</script>

<template>
  <button class="share-button" :aria-label="text.print" :title="text.print" @click="print"><ShareIcon name="printer" /></button>
  <span ref="root" class="print-help">
    <button class="share-button" :aria-label="text.help" :title="text.help" :aria-expanded="open" :aria-controls="id" @click="toggle"><ShareIcon name="help" /></button>
    <div v-if="open" :id="id" class="button-help" role="region" :aria-label="text.help">
      <div v-for="row in rows" :key="row.text"><ShareIcon :name="row.icon" /><span>{{ row.text }}</span></div>
    </div>
  </span>
</template>
