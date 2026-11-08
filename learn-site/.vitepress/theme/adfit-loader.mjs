// AdFit SDK loader: script 1회 비동기 로드 + SPA 라우트 이동 시 재렌더 요청.
// 근거: adfit-web-sdk README(공식 설치·NO-AD 콜백) + ba.min.js 4.41.4 동작 분석.
let scriptPromise = null

export function loadAdfitScript(src) {
  if (typeof document === 'undefined') return Promise.reject(new Error('SSR'))
  if (typeof window !== 'undefined' && window.adfit) return Promise.resolve()
  if (scriptPromise) return scriptPromise
  scriptPromise = new Promise((resolve, reject) => {
    const el = document.createElement('script')
    el.src = src
    el.async = true
    el.charset = 'utf-8'
    el.onload = () => resolve()
    el.onerror = () => {
      el.remove()
      scriptPromise = null
      reject(new Error('adfit script load failed'))
    }
    document.head.appendChild(el)
  })
  return scriptPromise
}

export function renderAdfit(ins) {
  try {
    const adfit = typeof window !== 'undefined' ? window.adfit : null
    if (!adfit) return false
    // render(ins): 등록된 ins면 refresh, 신규면 add. load(): 전체 ins 스캔.
    if (ins && typeof adfit.render === 'function') {
      adfit.render(ins)
      return true
    }
    if (typeof adfit.load === 'function') {
      adfit.load()
      return true
    }
  } catch {
    return false
  }
  return false
}
