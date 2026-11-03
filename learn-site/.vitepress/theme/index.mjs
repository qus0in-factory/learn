import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import CourseList from './CourseList.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('CourseList', CourseList)
  },
}
