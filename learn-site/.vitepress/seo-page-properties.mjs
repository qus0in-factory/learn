import meta from './seo-meta.json' with { type: 'json' }

export const pageProperties = page => ({
  author: meta.author, publisher: meta.publisher, license: meta.license,
  dateModified: page.updated,
  ...(page.published ? { datePublished: page.published } : {}),
})
