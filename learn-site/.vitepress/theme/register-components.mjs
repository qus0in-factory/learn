import CourseList from './CourseList.vue'
import CourseHeader from './CourseHeader.vue'
import CourseContents from './CourseContents.vue'
import QuizBlank from './QuizBlank.vue'
import QuizHelp from './QuizHelp.vue'
import StepDownloads from './StepDownloads.vue'
import Illustration from './Illustration.vue'
import AppendixContents from './AppendixContents.vue'
import TagGroups from './TagGroups.vue'
import CommandLinks from './CommandLinks.vue'

// Components usable from Markdown pages.
const components = {
  CourseList, CourseHeader, CourseContents, QuizBlank, QuizHelp, StepDownloads,
  Illustration, AppendixContents, TagGroups, CommandLinks,
}

export function registerComponents(app) {
  for (const [name, component] of Object.entries(components)) app.component(name, component)
}
