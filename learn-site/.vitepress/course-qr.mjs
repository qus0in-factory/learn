import { renderSVG } from 'uqr'
import { courses } from './courses.mjs'
import { share } from './course-share.mjs'

const svg = (course) => renderSVG(new URL(course.link, share.origin).href, { border: 4 })
const virtualId = 'virtual:course-qr'
const resolvedId = `\0${virtualId}`

export function courseQr() {
  return {
    name: 'course-qr',
    resolveId(id) { if (id === virtualId) return resolvedId },
    load(id) {
      if (id !== resolvedId) return
      const map = Object.fromEntries(courses.map(c => [c.id, share.qr(c.id)]))
      return `export default ${JSON.stringify(map)}`
    },
    generateBundle() {
      for (const course of courses) {
        const file = share.qr(course.id).replace(/^\//, '')
        const source = svg(course)
        this.emitFile({ type: 'asset', fileName: file, source })
        if (course.id === 'git-easy') {
          this.emitFile({ type: 'asset', fileName: 'git-easy/qr.svg', source })
        }
      }
    },
  }
}
