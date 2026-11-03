import { courseOrder } from './nav.mjs'
import { courseLessons } from './course-data.mjs'
import { stepLabel } from './step-label.mjs'

export const courseContents = courseOrder.map(item => {
  const index = courseLessons.findIndex(lesson => lesson.link === item.link)
  return index < 0 ? { ...item, order: item.text.split('. ')[0] } :
    { ...courseLessons[index], order: stepLabel(index) }
})
