<script setup>
import { courses } from '../courses.mjs'
</script>

<template>
  <ul class="course-list">
    <li v-for="course in courses" :key="course.id" class="course-card">
      <a :href="course.link">
        <strong>{{ course.title }}</strong>
        <span>{{ course.summary }}</span>
        <small>{{ course.meta }}</small>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.course-list {
  display: grid;
  gap: 16px;
  padding: 0;
  margin: 24px 0 0;
  list-style: none;
}

.course-card a {
  display: grid;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.course-card a:hover {
  border-color: var(--vp-c-brand-1);
}

.course-card strong {
  font-size: 1.15rem;
}

.course-card span {
  color: var(--vp-c-text-2);
}

.course-card small {
  color: var(--vp-c-text-3);
}
</style>
