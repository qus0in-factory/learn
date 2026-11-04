<script setup>
import { labels } from '../labels.mjs'
import { appendixLabels } from '../appendix-labels.mjs'
import './appendix-tabs.css'
defineProps({ groups: Array, modelValue: String, move: Function })
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="appendix-tabs" role="tablist" :aria-label="labels.appendix" @keydown="move">
    <button v-for="group in [{ id: '', text: appendixLabels.all }, ...groups]" :key="group.id"
      role="tab" :aria-selected="modelValue === group.id" :tabindex="modelValue === group.id ? 0 : -1"
      aria-controls="appendix-table" @click="$emit('update:modelValue', group.id)">{{ group.text }}</button>
  </div>
</template>
