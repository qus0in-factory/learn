---
layout: doc
---

<script setup>
import { site } from '../learn-site/.vitepress/site.mjs'
</script>

<h1>{{ site.title }}</h1>
<p>{{ site.subtitle }}</p>
<blockquote><p>{{ site.catchphrase }}</p></blockquote>

<CourseList />
