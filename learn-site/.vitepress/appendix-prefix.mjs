import { labels } from './labels.mjs'

export function appendixPrefix(relativePath) {
  const match = relativePath.match(/^git\/appendix\/(\d{2})-/)
  return match ? JSON.stringify(`${labels.appendix} ${Number(match[1])}. `) : '""'
}
