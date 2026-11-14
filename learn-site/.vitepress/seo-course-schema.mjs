import { absolute } from './seo-paths.mjs'
import { pageProperties } from './seo-page-properties.mjs'
import { courseParts } from './seo-course-parts.mjs'
import { breadcrumbs } from './seo-breadcrumbs.mjs'
import { courseOf } from './seo-course-of.mjs'
import { ogImage } from './og-image.mjs'
import meta from './seo-meta.json' with { type: 'json' }

export function courseGraph(p, url) {
  const { course, isCourseIndex, isLesson } = courseOf(p.path)
  const onCourse = isCourseIndex || isLesson
  const isCollection = /^\/(?:git|git-easy)\/(?:tags|catalog)$/.test(p.path)
  const isGlossary = /^\/(?:git|git-easy)\/glossary$/.test(p.path)
  const item = {
    '@type': isCourseIndex ? 'Course' : isLesson ? 'LearningResource' : isCollection ? 'CollectionPage' : 'WebPage',
    name: p.title, description: p.description, url, inLanguage: 'ko-KR',
    ...pageProperties(p), ...courseParts(p),
    ...(isGlossary ? { mainEntity: { '@id': `${url}#terms` } } : {}),
    ...(onCourse ? { isAccessibleForFree: true, image: ogImage(p.path) } : {}),
    ...(onCourse && course?.id === 'git-easy' ? { educationalLevel: 'Beginner' } : {}),
    ...(isLesson ? { learningResourceType: 'Lesson' } : {}),
    ...(isCourseIndex ? { '@id': absolute(course.link), provider: meta.publisher } : isLesson
      ? { isPartOf: { '@id': absolute(course.link) } } : {}),
  }
  return [item, breadcrumbs(p)]
}
