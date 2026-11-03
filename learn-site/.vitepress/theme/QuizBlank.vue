<script setup>
import { ref } from 'vue'
import { quizLabels } from '../quiz-labels.mjs'
import './quiz-blank.css'

defineProps({ answer: { type: String, required: true } })
const open = ref(false)
</script>

<template>
  <button
    type="button"
    class="quiz-blank"
    :class="{ 'is-open': open }"
    :aria-expanded="open"
    :aria-label="open ? undefined : quizLabels.show"
    :title="open ? quizLabels.hide : quizLabels.show"
    @click="open = !open"
  >
    <span :aria-hidden="!open">{{ answer }}</span>
  </button>
</template>
