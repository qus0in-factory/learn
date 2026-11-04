import CourseList from './CourseList.vue'
import CourseHeader from './CourseHeader.vue'
import CourseContents from './CourseContents.vue'
import QuizBlank from './QuizBlank.vue'
import QuizHelp from './QuizHelp.vue'
import StepDownloads from './StepDownloads.vue'
import Illustration from './Illustration.vue'
import Screenshot from './Screenshot.vue'
import AppendixContents from './AppendixContents.vue'
import TagGroups from './TagGroups.vue'
import GlossaryList from './GlossaryList.vue'
import CommandLinks from './CommandLinks.vue'

// Components usable from Markdown pages.
const components = {
  CourseList, CourseHeader, CourseContents, QuizBlank, QuizHelp, StepDownloads,
  Illustration, Screenshot, AppendixContents, TagGroups, CommandLinks, GlossaryList,
}

export function registerComponents(app) {
  for (const [name, component] of Object.entries(components)) app.component(name, component)
}
