<script setup>
import { useCatalog } from './useCatalog.mjs'
import QuizList from './QuizList.vue'
const { state, data } = useCatalog()
</script>

<template>
  <p v-if="state === 'loading'" role="status">카탈로그를 불러오는 중입니다.</p>
  <p v-else-if="state === 'error'" role="alert">카탈로그를 불러오지 못했습니다.</p>
  <p v-else-if="state === 'empty'">등록된 강의가 없습니다.</p>
  <template v-else>
    <p>PDF 자산 버전: <code>{{ data.version }}</code></p>
    <table>
      <thead>
        <tr><th>순서</th><th>일자</th><th>주제</th><th>PDF</th></tr>
      </thead>
      <tbody>
        <tr v-for="lecture in data.lectures" :key="lecture.slug">
          <td>{{ lecture.position }}</td>
          <td>Day {{ lecture.day }}</td>
          <td>{{ lecture.title }}</td>
          <td><a v-if="lecture.pdf" :href="lecture.pdf">PDF</a></td>
        </tr>
      </tbody>
    </table>
    <QuizList :quiz="data.quiz" :lectures="data.lectures" />
  </template>
</template>
