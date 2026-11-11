import { site } from './site.mjs'
import { courses } from './courses.mjs'
import { share } from './course-share.mjs'
import config from './og.json' with { type: 'json' }
import { ogImage } from './og-image.mjs'
import { ogHead } from './og-head.mjs'
import meta from './seo-meta.json' with { type: 'json' }

export function ogPage(page) {
  const file = page.relativePath === 'course-git.md' ? 'git/index.md' : page.relativePath
  const path = '/' + file.replace(/index\.md$/, '').replace(/\.md$/, '')
  const course = (path === '/git' || path.startsWith('/git/')) && !path.startsWith('/git-easy')
  const description = page.frontmatter.subtitle || meta.descriptions[path] || (course ? courses[0].summary : site.subtitle)
  const values = { title: page.title || site.title, description,    url: new URL(path, share.origin).href,
    image: ogImage(path, process.env.VITE_ASSET_CDN_BASE_URL),
    type: /^\/git\/\d{2}-/.test(path) ? config.stepType : config.siteType }
  page.frontmatter.head = [...(page.frontmatter.head || []), ...ogHead(values)]
}
