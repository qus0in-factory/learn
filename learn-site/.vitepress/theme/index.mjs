import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import CourseList from './CourseList.vue'
import CourseHeader from './CourseHeader.vue'
import CourseContents from './CourseContents.vue'
import QuizBlank from './QuizBlank.vue'
import StepDownloads from './StepDownloads.vue'
import GitStages from './GitStages.vue'
import AppendixContents from './AppendixContents.vue'
import './content-links.css'
import './mermaid-theme.css'
import './nav-icons.css'
import './image-request.css'
import 'virtual:nav-icons.css'
import './print.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('CourseList', CourseList)
    app.component('CourseHeader', CourseHeader)
    app.component('CourseContents', CourseContents)
    app.component('QuizBlank', QuizBlank)
    app.component('StepDownloads', StepDownloads)
    app.component('GitStages', GitStages)
    app.component('AppendixContents', AppendixContents)
  },
}
