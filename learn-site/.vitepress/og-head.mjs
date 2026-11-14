import config from './og.json' with { type: 'json' }

const twitterName = { title: 'twitter:title', description: 'twitter:description', image: 'twitter:image' }

export function ogHead(values, article) {
  const og = Object.entries(values).filter(([, content]) => content != null && content !== '')
    .map(([key, content]) => ['meta', { property: `og:${key}`, content: String(content) }])
  const times = article ? ['published_time', 'modified_time'].filter(key => article[key])
    .map(key => ['meta', { property: `article:${key}`, content: article[key] }]) : []
  const twitter = [
    ['meta', { name: 'twitter:card', content: config.card }],
    ...['title', 'description', 'image'].filter(key => values[key])
      .map(key => ['meta', { name: twitterName[key], content: String(values[key]) }]),
  ]
  return [...og, ...times, ...twitter]
}
