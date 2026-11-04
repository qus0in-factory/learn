import { ref } from 'vue'
import { helpRows } from './help-rows.mjs'
import { useDismiss } from './useDismiss.mjs'

export function useHelp(root) {
  const open = ref(false), rows = ref([])
  useDismiss(root, open)
  function toggle() {
    rows.value = helpRows(root.value)
    open.value = !open.value
  }
  return { open, rows, toggle }
}
