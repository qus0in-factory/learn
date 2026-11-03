import { onUnmounted, ref } from 'vue'
import { share } from '../course-share.mjs'

export function useToast() {
  const message = ref('')
  let timer
  function notify(text) {
    clearTimeout(timer)
    message.value = text
    timer = setTimeout(() => { message.value = '' }, share.toastDuration)
  }
  onUnmounted(() => clearTimeout(timer))
  return { message, notify }
}
