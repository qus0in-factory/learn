<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <DefaultTheme.Layout>
    <template #doc-before>
      <p v-if="frontmatter.pdf" class="pdf-download">
        <a :href="frontmatter.pdf">이 주제 PDF 다운로드</a>
      </p>
    </template>
  </DefaultTheme.Layout>
</template>
