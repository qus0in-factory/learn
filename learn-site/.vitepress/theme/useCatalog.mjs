import { onMounted, ref } from 'vue'

export function useCatalog() {
  const state = ref('loading')
  const data = ref()

  onMounted(async () => {
    try {
      const response = await fetch('/api/catalog')
      if (!response.ok) throw new Error(String(response.status))
      data.value = await response.json()
      state.value = data.value.lectures.length ? 'ready' : 'empty'
    } catch {
      state.value = 'error'
    }
  })

  return { state, data }
}
