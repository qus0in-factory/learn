import { renderSVG } from 'uqr'
import { courses } from './courses.mjs'
import { share } from './course-share.mjs'

export function courseQr() {
  return {
    name: 'course-qr',
    apply: 'build',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: share.qr.slice(1),
        source: renderSVG(new URL(courses[0].link, share.origin).href, { border: 4 }),
      })
    },
  }
}
