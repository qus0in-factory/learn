import { ref, onMounted, onUnmounted } from 'vue'

export function useRotatingQuotes(quotesRef, ms) {
  const idx = ref(0), fading = ref(false), ready = ref(false)
  let timer = null, tout = null
  const show = () => { ready.value = true; if (tout) clearTimeout(tout) }

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
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) {
      show(); return
    }
    if (ms > 0) timer = setInterval(next, ms)
    tout = setTimeout(show, 1500)
    document.fonts?.load?.('1em Caveat').then(show, show) ?? show()
  })

  onUnmounted(() => {
    clearInterval(timer)
    clearTimeout(tout)
  })

  return { idx, fading, ready }
}
