import { labels } from './labels.mjs'
import { adLabels } from './ad-labels.mjs'

export const site = {
  title: labels.siteTitle,
  subtitle: 'AI & 코딩 익힘책',
  logo: '/header-logo.png',
  logoHeight: '36px',
  catchphrase: '날로 달라지는 세상, 익혀서 배우자!',
  updated: `${labels.updated} : `,
  home: labels.home,
  licenseTitle: '오픈소스 라이선스',
  licenseNotice: '이 사이트의 제작·실행에 사용한 의존성과 라이선스입니다.',
  appLicense: '웹앱 자체 라이선스',
  appLicenseNotice: '추후 이곳에 표시합니다.',
  footer: [
    { text: adLabels.privacy, link: adLabels.privacyPath },
    { text: 'License', link: '/licenses' },
    { text: 'GitHub', link: 'https://github.com/qus0in-factory', icon: 'github' },
    { text: 'X', link: 'https://x.com/qus0in', icon: 'x' },
  ],
}
