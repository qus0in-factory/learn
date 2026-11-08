import { markdownGlossary } from './markdown-glossary.mjs'
import { markdownLinks } from './markdown-links.mjs'
import { courseOrder } from './nav.mjs'

export function markdownStatic(text) {
  return text.replace(/<GlossaryList\s*\/>/g, markdownGlossary)
    .replace(/<Catalog\s*\/>/g, markdownLinks(courseOrder.filter(p => /^\/git\/\d/.test(p.link))))
    .replace(/<LandingCover\s*\/>/g, '')
    .replace(/<div class="landing-column"[^>]*>([\s\S]*?)<\/div>/g, '$1')
}
