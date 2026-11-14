import { courseOrder } from './nav.mjs'
import { easySidebar } from './easy-nav.mjs'
import { absolute } from './seo-paths.mjs'
import { courseOf } from './seo-course-of.mjs'

const flatten = items => items.flatMap(item => item.items ? flatten(item.items) : [item])
const parts = steps => {
  const names = steps.map(item => item.text)
  return {
    about: names, teaches: names,
    hasPart: steps.map(item => ({ '@type': 'LearningResource', name: item.text, url: absolute(item.link) })),
  }
}

export function courseParts(page) {
  const { course, isCourseIndex, isLesson } = courseOf(page.path)
  if (isCourseIndex && course?.id === 'git')
    return parts(courseOrder.filter(item => /^\/git\/\d/.test(item.link)))
  if (isCourseIndex && course?.id === 'git-easy')
    return parts(flatten(easySidebar['/git-easy/']).filter(item => courseOf(item.link).isLesson))
  if (isLesson && page.tags.length) return { teaches: page.tags }
  return {}
}
