---
layout: doc
sidebar: false
aside: false
---

<script setup>
import { site } from '../learn-site/.vitepress/site.mjs'
</script>

<h1>{{ site.licenseTitle }}</h1>
<p>{{ site.licenseNotice }}</p>

<!--@include: ./license-notices.md-->

<h2>{{ site.appLicense }}</h2>
<p>{{ site.appLicenseNotice }}</p>
