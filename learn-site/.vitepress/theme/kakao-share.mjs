import { ogImage } from '../og-image.mjs'

export function sendFeed(kakao, course, url) {
  const link = { mobileWebUrl: url, webUrl: url }
  kakao.Share.sendDefault({ objectType: 'feed', content: {
    title: course.title, description: course.summary,
    imageUrl: ogImage(url, import.meta.env.VITE_ASSET_CDN_BASE_URL), link,
  } })
}
