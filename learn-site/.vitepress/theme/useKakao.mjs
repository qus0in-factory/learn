import { ref } from 'vue'
import { share } from '../course-share.mjs'
import { ogImage } from '../og-image.mjs'
import { loadKakao } from './kakao-loader.mjs'

const key = import.meta.env.VITE_KAKAO_JS_KEY || ''
export function useKakao(course, url, notify) {
  const busy = ref(false)
  async function send() {
    if (!key || busy.value) return
    busy.value = true
    try {
      const kakao = await loadKakao()
      if (!kakao.isInitialized()) kakao.init(key)
      const link = { mobileWebUrl: url, webUrl: url }
      kakao.Share.sendDefault({ objectType: 'feed', content: {
        title: course.title, description: course.summary,
        imageUrl: ogImage(url, import.meta.env.VITE_ASSET_CDN_BASE_URL), link,
      } })
    } catch {
      notify(share.kakaoFailed)
    } finally {
      busy.value = false
    }
  }
  return { available: Boolean(key), busy, send }
}
