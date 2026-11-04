import { labels } from './labels.mjs'

export function markdownLabels(md) {
  md.core.ruler.before('inline', 'course-labels', (state) => {
    for (const token of state.tokens) {
      if (token.type === 'inline' && token.content === '{{ learningGoals }}') {
        token.content = labels.learningGoals
      }
      if (token.type === 'inline' && token.content === '{{ appendix }}') {
        token.content = labels.appendix
      }
    }
  })
}
