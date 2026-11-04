export function prepared(kakao, key) {
  if (!kakao.isInitialized()) kakao.init(key)
  return kakao
}

export function whenIdle(task) {
  return window.requestIdleCallback ? window.requestIdleCallback(task) : setTimeout(task, 1500)
}
