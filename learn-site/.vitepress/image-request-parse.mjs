import { imageRequestLabels as labels } from './image-request-labels.mjs'

export const FIELDS = Object.entries(labels.fields)

// "주제: ..." style lines -> { subject, parts, relation, style }; labels come from the dictionary.
export function parseImageRequest(content) {
  const values = {}
  for (const line of content.split('\n')) {
    const [name, ...rest] = line.split(':')
    const key = FIELDS.find(([, label]) => label === name.trim())?.[0]
    if (key) values[key] = rest.join(':').trim()
  }
  if (!values.style || values.style.startsWith('(')) values.style = labels.defaultStyle
  return values
}
