import { kakaoSdk } from '../kakao-sdk.mjs'

let loading
export function loadKakao() {
  if (window.Kakao) return Promise.resolve(window.Kakao)
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = kakaoSdk.url
      script.integrity = kakaoSdk.integrity
      script.crossOrigin = 'anonymous'
      script.onload = () => window.Kakao ? resolve(window.Kakao) : reject(new Error('SDK unavailable'))
      script.onerror = () => { script.remove(); reject(new Error('SDK load failed')) }
      document.head.appendChild(script)
    }).catch((error) => { loading = undefined; throw error })
  }
  return loading
}
