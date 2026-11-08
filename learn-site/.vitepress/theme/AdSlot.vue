<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { adLabels } from '../ad-labels.mjs'
import { isSlotVisible, getSlotSpec } from '../ad-slot-config.mjs'
import { loadAdfitScript, renderAdfit } from './adfit-loader.mjs'
import NietzscheBanner from './NietzscheBanner.vue'
import './ad-slot.css'

const p = defineProps({ slotName: { type: String, default: 'docBottom' } })
const { page, frontmatter } = useData()
const show = computed(() => isSlotVisible(p.slotName, page.value?.relativePath, undefined, frontmatter.value?.ads))
const s = computed(() => getSlotSpec(p.slotName, undefined, frontmatter.value?.ads))
// NO-AD 콜백명은 슬롯별 유일해야 한다(공식 가이드 요구).
const cbName = `__adfitOnFail_${p.slotName}`
const wantAd = computed(() => show.value && !s.value.forceQuote && s.value.provider === 'adfit' && !!s.value.adfit?.unit)
const adFailed = ref(false)
const insEl = ref(null)
// 미등록 도메인·심사 전에는 SDK가 광고 요청 자체를 보내지 않고 onfail도
// 발사하지 않는다(무응답). 빈 ins가 남으면 타임아웃으로 인용문을 보여준다.
const EMPTY_FALLBACK_MS = 8000
let fallbackTimer = 0
let observer = null

function clearPending() {
  if (fallbackTimer) {
    clearTimeout(fallbackTimer)
    fallbackTimer = 0
  }
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

function watchFill() {
  clearPending()
  const ins = insEl.value
  if (!ins || typeof MutationObserver === 'undefined') return
  observer = new MutationObserver(() => {
    if (ins.childElementCount > 0) {
      adFailed.value = false
      clearPending()
    }
  })
  observer.observe(ins, { childList: true })
  fallbackTimer = setTimeout(() => {
    if (ins.childElementCount === 0) adFailed.value = true
  }, EMPTY_FALLBACK_MS)
}

async function refreshAd() {
  clearPending()
  if (!wantAd.value) return
  adFailed.value = false
  await nextTick()
  if (!insEl.value) return
  try {
    await loadAdfitScript(s.value.adfit.scriptUrl)
  } catch {
    adFailed.value = true
    return
  }
  if (!renderAdfit(insEl.value)) adFailed.value = true
  else watchFill()
}

if (typeof window !== 'undefined') {
  window[cbName] = (elm) => {
    if (!elm || elm === insEl.value) adFailed.value = true
  }
}

onMounted(refreshAd)
onUnmounted(clearPending)
watch(() => [page.value?.relativePath, wantAd.value], refreshAd)
</script>

<template>
  <aside v-if="show" :class="['ad-slot', `ad-slot--${p.slotName}`]" :aria-label="adLabels.disclosure">
    <div class="ad-slot-bar">
      <span>{{ adLabels.badge }}</span>
      <a :href="adLabels.privacyPath">{{ adLabels.privacy }}</a>
    </div>
    <div class="ad-slot-body" :style="{ minHeight: s.height + 'px' }">
      <ins
        v-if="wantAd"
        ref="insEl"
        class="kakao_ad_area"
        style="display:none;"
        :data-ad-unit="s.adfit.unit"
        :data-ad-width="s.adfit.width"
        :data-ad-height="s.adfit.height"
        :data-ad-onfail="cbName"
        :key="page.relativePath"
      ></ins>
      <NietzscheBanner v-if="s.forceQuote || adFailed || !wantAd" :data="s.nietzsche" />
    </div>
  </aside>
</template>
