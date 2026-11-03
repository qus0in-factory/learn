---
layout: doc
aside: false
---

<script setup>
import LandingCover from '../learn-site/.vitepress/theme/LandingCover.vue'
import column from '../learn-site/.vitepress/landing-column.json'
import '../learn-site/.vitepress/theme/landing-column.css'
</script>

<div class="landing-column" :style="{ '--landing-column-width': column.maxWidth }">
  <LandingCover />

  <CourseList />
</div>
