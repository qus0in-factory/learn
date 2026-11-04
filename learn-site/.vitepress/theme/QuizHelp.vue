<script setup>
import { ref, useId } from 'vue'
import ShareIcon from './ShareIcon.vue'
import { quizLabels as text } from '../quiz-labels.mjs'
import { useDismiss } from './useDismiss.mjs'
import './share-course.css'
import './print-help.css'
import './quiz-help.css'

const root = ref(null), open = ref(false), id = useId()
useDismiss(root, open)
</script>

<template>
  <span ref="root" class="quiz-help">
    <button class="share-button" type="button" :aria-label="text.help" :title="text.help" :aria-expanded="open" :aria-controls="id" @click="open = !open"><ShareIcon name="help" /></button>
    <span v-if="open" :id="id" class="button-help" role="region" :aria-label="text.help">{{ text.helpText }}</span>
  </span>
</template>
