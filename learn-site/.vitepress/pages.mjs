export const pages = {
  'course-git.md': 'git/index.md',
  'lecture/catalog.md': 'git/catalog.md',
  'lecture/:page': 'git/:page',
  'lecture/appendix/:page': 'git/appendix/:page',
}

export const excluded = [
  '261102/**', '261103/**', 'ci.md', 'deployment.md',
  'setup/**', 'license-notices.md', 'lecture/index.md', 'content-style.md',
]

export const vueAlias = {
  vue: new URL('../../course-site/node_modules/vue', import.meta.url).pathname,
  'vue/server-renderer': new URL('../../course-site/node_modules/vue/server-renderer', import.meta.url).pathname,
}
