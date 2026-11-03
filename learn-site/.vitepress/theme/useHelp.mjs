import { onMounted, onUnmounted, ref } from 'vue'
import { helpRows } from './help-rows.mjs'

export function useHelp(root) {
  const open = ref(false), rows = ref([])
  function close(event) {
    if (event.type === 'keydown' ? event.key === 'Escape' : !root.value?.contains(event.target)) open.value = false
  }
  function toggle() {
    rows.value = helpRows(root.value)
    open.value = !open.value
  }
  onMounted(() => { document.addEventListener('keydown', close); document.addEventListener('pointerdown', close) })
  onUnmounted(() => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) })
  return { open, rows, toggle }
}
