import { labels } from './labels.mjs'
import { easyLabels } from './easy-labels.mjs'

const texts = {
  '{{ learningGoals }}': labels.learningGoals,
  '{{ appendix }}': labels.appendix,
  '{{ easyTitle }}': easyLabels.title,
}

export function markdownLabels(md) {
  md.core.ruler.before('inline', 'course-labels', (state) => {
    for (const token of state.tokens) {
      if (token.type === 'inline' && token.content in texts) token.content = texts[token.content]
    }
  })
}
