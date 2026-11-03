import config from './og.json' with { type: 'json' }

export function ogHead(values) {
  return [...Object.entries(values).map(([key, content]) =>
    ['meta', { property: `og:${key}`, content }]),
  ['meta', { name: 'twitter:card', content: config.card }]]
}
