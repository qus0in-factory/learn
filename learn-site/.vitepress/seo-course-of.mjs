import { courses } from './courses.mjs'

const lessonPattern = {
  git: /^\/git\/(\d|appendix\/|commands\/)/,
  'git-easy': /^\/git-easy\/(\d|github-practice\/|git-practice\/)/,
}

export function courseOf(path = '') {
  const course = [...courses].sort((a, b) => b.link.length - a.link.length)
    .find(item => path === item.link || path.startsWith(item.link))
  if (!course) return { course: null, isCourseIndex: false, isLesson: false }
  const pattern = lessonPattern[course.id]
  return {
    course,
    isCourseIndex: path === course.link,
    isLesson: pattern ? pattern.test(path) : false,
  }
}

// Share course roots with client components without importing filesystem helpers.
export function coursePrefix(relativePath = '') {
  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`
  return (courseOf(path).course || courses[0]).link.replace(/\/$/, '')
}

export const flattenCourseItems = items =>
  items.flatMap(item => item.items ? flattenCourseItems(item.items) : [item])
