import { absolute, markdownPath } from './seo-paths.mjs'

export const markdownLinks = items => items.map(item =>
  `- [${item.text}](${absolute(markdownPath(item.link))})`).join('\n')
