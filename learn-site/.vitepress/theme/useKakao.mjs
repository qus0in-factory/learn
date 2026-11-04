import { onMounted, ref } from 'vue'
import { share } from '../course-share.mjs'
import { loadKakao } from './kakao-loader.mjs'
import { prepared, whenIdle } from './kakao-ready.mjs'
import { sendFeed } from './kakao-share.mjs'

const key = import.meta.env.VITE_KAKAO_JS_KEY || ''

export function useKakao(course, url, notify) {
  const busy = ref(false)
  // Load the SDK in advance so the click opens the share window inside the user gesture
  // (Safari and in-app browsers block windows opened after an async load).
  onMounted(() => { if (key) whenIdle(() => loadKakao().then(k => prepared(k, key)).catch(() => {})) })
  async function send() {
    if (!key || busy.value) return
    try {
      if (window.Kakao?.isInitialized()) return sendFeed(window.Kakao, course, url)
      busy.value = true
      sendFeed(prepared(await loadKakao(), key), course, url)
    } catch {
      notify(share.kakaoFailed)
    } finally {
      busy.value = false
    }
  }
  return { available: Boolean(key), busy, send }
}
