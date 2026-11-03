import { labels } from './labels.mjs'
import { markdownLabels } from './markdown-labels.mjs'

export function displayText(text) {
  return text.replace(/(\d+)차시/g, `$1${labels.numberedLesson}`).replace(/차시/g, labels.lesson)
}

export function displayTitle(text) {
  return displayText(text.replace(/^\d+차시\.\s*/, ''))
}

export function displayMarkdown(md) {
  markdownLabels(md)
  md.core.ruler.after('inline', 'display-lesson-text', (state) => {
    for (let i = 0; i < state.tokens.length; i++) {
      const token = state.tokens[i]
      if (token.type !== 'inline') continue
      const heading = state.tokens[i - 1]?.tag === 'h1'
      token.content = heading ? displayTitle(token.content) : displayText(token.content)
      for (const child of token.children || []) {
        if (child.type === 'text') {
          child.content = heading ? displayTitle(child.content) : displayText(child.content)
        }
      }
    }
  })
}

export function stepLabel(index) {
  return `${labels.step} ${String(index + 1).padStart(labels.stepDigits, labels.stepPad)}`
}
