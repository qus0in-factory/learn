import { renderSVG } from 'uqr'
import { courses } from './courses.mjs'
import { share } from './course-share.mjs'

const svg = () => renderSVG(new URL(courses[0].link, share.origin).href, { border: 4 })
const virtualId = 'virtual:course-qr'
const resolvedId = `\0${virtualId}`

export function courseQr() {
  return {
    name: 'course-qr',
    resolveId(id) { if (id === virtualId) return resolvedId },
    load(id) {
      if (id === resolvedId) return `export default ${JSON.stringify(`data:image/svg+xml,${encodeURIComponent(svg())}`)}`
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: share.qr.slice(1),
        source: svg(),
      })
    },
  }
}
