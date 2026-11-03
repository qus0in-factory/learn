import { labels } from './labels.mjs'

export function appendixTitle(page) {
  const appendix = page.relativePath.match(/^(?:lecture|git)\/appendix\/(\d{2})-/)
  if (appendix) page.title = `${labels.appendix} ${Number(appendix[1])}. ${page.title}`
}
