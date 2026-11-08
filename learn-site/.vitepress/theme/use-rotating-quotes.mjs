import { ref, onMounted, onUnmounted } from 'vue'

export function useRotatingQuotes(quotesRef, intervalMs) {
  const idx = ref(0)
  const fading = ref(false)
  let timer = null

  function next() {
    const list = quotesRef.value || []
    if (list.length <= 1) return
    fading.value = true
    setTimeout(() => {
      idx.value = (idx.value + 1) % list.length
      fading.value = false
    }, 300)
  }

  onMounted(() => {
    const list = quotesRef.value || []
    if (!list.length) return
    idx.value = Math.floor(Math.random() * list.length)
    const stop = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (!stop && intervalMs > 0) timer = setInterval(next, intervalMs)
  })

  onUnmounted(() => { if (timer) clearInterval(timer) })

  return { idx, fading }
}
