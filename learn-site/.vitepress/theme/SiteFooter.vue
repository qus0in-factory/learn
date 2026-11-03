<script setup>
import { site } from '../site.mjs'
import './footer.css'
</script>

<template>
  <footer class="site-footer">
    <a v-for="item in site.footer" :key="item.link" :href="item.link">{{ item.text }}</a>
  </footer>
</template>
