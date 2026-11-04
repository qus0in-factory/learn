import { appendixNavigation } from './nav.mjs'

export const appendixSections = render => appendixNavigation
  .map(group => `### ${group.text}\n\n${render(group)}\n`).join('\n')

export function appendixMarkdown(md) {
  md.core.ruler.before('block', 'appendix-sections', state => {
    state.src = state.src.replace('<AppendixContents />', appendixSections(group =>
      `<AppendixContents group="${group.id}" />`))
  })
}
