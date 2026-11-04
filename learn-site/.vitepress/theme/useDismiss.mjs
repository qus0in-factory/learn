import { onMounted, onUnmounted } from 'vue'

// Closes a popover on Escape or when the pointer goes down outside of `root`.
export function useDismiss(root, open) {
  function close(event) {
    if (event.type === 'keydown' ? event.key === 'Escape' : !root.value?.contains(event.target)) open.value = false
  }
  onMounted(() => { document.addEventListener('keydown', close); document.addEventListener('pointerdown', close) })
  onUnmounted(() => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) })
}
