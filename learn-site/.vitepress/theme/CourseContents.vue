<script setup>
import { useData } from 'vitepress'
const { theme } = useData()
const lessons = theme.value.sidebar['/git/'][0].items
</script>

<template>
  <table>
    <thead><tr><th>차시</th><th>제목</th></tr></thead>
    <tbody>
      <tr v-for="(lesson, index) in lessons" :key="lesson.link">
        <td>{{ index + 1 }}차시</td><td><a :href="lesson.link">{{ lesson.text }}</a></td>
      </tr>
    </tbody>
  </table>
</template>
