export function ga4Head(id) {
  if (!/^G-[A-Z0-9]+$/.test(id)) throw Error('Invalid GA4 measurement ID')
  return [
    ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${id}` }],
    ['script', {}, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(id)});`],
  ]
}
