import { imageRequestLabels as labels } from './image-request-labels.mjs'
import { FIELDS, parseImageRequest } from './image-request-parse.mjs'

// ```image-request fences become a placeholder card; elsewhere they stay plain code blocks.
export function imageRequest(md) {
  const fence = md.renderer.rules.fence
  const esc = md.utils.escapeHtml
  md.renderer.rules.fence = (tokens, i, options, env, self) => {
    if (tokens[i].info.trim() !== 'image-request') return fence(tokens, i, options, env, self)
    const values = parseImageRequest(tokens[i].content)
    const rows = FIELDS.filter(([key]) => values[key])
      .map(([key, label]) => `<div><dt>${esc(label)}</dt><dd>${esc(values[key])}</dd></div>`).join('')
    return `<aside class="image-request"><p class="image-request__head"><strong>${esc(labels.title)}</strong>`
      + `<span>${esc(labels.status)}</span></p><dl>${rows}</dl>`
      + `<p class="image-request__note">${esc(labels.note)}</p></aside>\n`
  }
}
