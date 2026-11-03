import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import { registerComponents } from './register-components.mjs'
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
    registerComponents(app)
  },
}
