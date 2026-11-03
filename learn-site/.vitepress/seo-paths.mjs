import { share } from './course-share.mjs'

export const origin = share.origin
export const pagePath = file => '/' + file.replace(/index\.md$/, '').replace(/\.md$/, '')
export const markdownPath = path => path.endsWith('/') ? `${path}index.md` : `${path}.md`
export const absolute = path => new URL(path, origin).href
