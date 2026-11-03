import { ref } from 'vue'
import { share } from '../course-share.mjs'

export function useShare(course) {
  const message = ref('')
  const url = new URL(course.link, share.origin).href
  const xUrl = `${share.x}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(course.title)}`
  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      message.value = share.copied
    } catch {
      message.value = share.failed
    }
  }
  return { message, xUrl, copy }
}
