import { easyLabels } from './easy-labels.mjs'

export function easy(page) {
  if (page.relativePath !== 'git-easy/index.md' && page.filePath !== 'course-git-easy.md') return
  page.title = easyLabels.title
  page.frontmatter.title = easyLabels.title
}
