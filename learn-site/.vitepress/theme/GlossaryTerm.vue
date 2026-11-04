<script setup>
import GlossaryLinks from './GlossaryLinks.vue'
import './glossary.css'

defineProps({ term: { type: Object, required: true } })
</script>

<template>
  <article class="glossary-term">
    <h3 :id="term.slug" tabindex="-1">{{ term.term }}</h3>
    <p><strong>{{ term.definition }}</strong></p>
    <p>{{ term.plain }}</p>
    <GlossaryLinks :term="term" />
  </article>
</template>
