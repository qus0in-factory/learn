import { pdfConfig } from '../../learn-site/.vitepress/pdf-url.mjs'

export function courseMeta() {
  return {
    title: 'Git과 웹 배포 강의',
    version: pdfConfig.version,
    revision: pdfConfig.revision,
    syncedAt: new Date().toISOString(),
  }
}
