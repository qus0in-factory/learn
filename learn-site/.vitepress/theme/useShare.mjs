import { share } from '../course-share.mjs'
import { useToast } from './useToast.mjs'
import { useKakao } from './useKakao.mjs'

export function useShare(course) {
  const { message, notify } = useToast()
  const url = new URL(course.link, share.origin).href
  const xUrl = `${share.x}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(course.title)}`
  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      notify(share.copied)
    } catch {
      notify(share.failed)
    }
  }
  return { message, xUrl, copy, kakao: useKakao(course, url, notify) }
}
