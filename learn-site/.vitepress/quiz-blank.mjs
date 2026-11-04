// ::answer:: inside a paragraph becomes a <QuizBlank> that hides the answer until it is clicked.
const MARK = ':'

export function quizBlank(md) {
  md.inline.ruler.before('emphasis', 'quiz_blank', (state, silent) => {
    const { src, pos } = state
    if (src[pos] !== MARK || src[pos + 1] !== MARK) return false
    const end = src.indexOf(MARK + MARK, pos + 2)
    if (end < 0 || end === pos + 2) return false
    if (!silent) {
      const token = state.push('html_inline', '', 0)
      token.content = `<QuizBlank answer="${md.utils.escapeHtml(src.slice(pos + 2, end))}" />`
    }
    state.pos = end + 2
    return true
  })
}
