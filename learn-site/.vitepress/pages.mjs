export const pages = {
  'lecture/index.md': 'git/index.md',
  'lecture/catalog.md': 'git/catalog.md',
  'lecture/:page': 'git/:page',
  'lecture/appendix/:page': 'git/appendix/:page',
  'lecture/supplement/:page': 'git/supplement/:page',
}

export const vueAlias = {
  vue: new URL('../../course-site/node_modules/vue', import.meta.url).pathname,
  'vue/server-renderer': new URL('../../course-site/node_modules/vue/server-renderer', import.meta.url).pathname,
}
