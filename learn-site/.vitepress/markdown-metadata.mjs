import meta from './seo-meta.json' with { type: 'json' }

export const markdownMetadata = page =>
  `> 저자: ${meta.author.name}\n> 라이선스: ${meta.licenseLabel}\n> 최종 업데이트: ${page.updated?.slice(0, 10) || ''}\n\n`
