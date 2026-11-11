import { labels } from './labels.mjs'

const qrPaths = { git: '/course-git-qr.svg', 'git-easy': '/course-git-easy-qr.svg' }
const qr = (id = 'git') => qrPaths[id] || `/course-${id}-qr.svg`
qr.git = qrPaths.git
qr['git-easy'] = qrPaths['git-easy']
qr.slice = (...a) => qrPaths.git.slice(...a)

export const share = {
  origin: 'https://echo.qus0in.dev',
  qr,
  qrAlt: '과정 페이지 QR 코드',
  x: 'https://x.com/intent/post',
  xLabel: labels.shareX,
  copy: labels.shareCopy,
  copied: labels.copied,
  failed: labels.copyFailed,
  kakao: labels.shareKakao,
  kakaoReady: labels.shareKakaoReady,
  kakaoFailed: labels.shareKakaoFailed,
  toastDuration: 3000,
}
