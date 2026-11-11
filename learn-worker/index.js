import { handleApi } from './api.js'
import { legacyRedirect } from './legacy-redirects.js'
import { pdfRequest } from './pdf-request.js'
import { pdfEasyRequest } from './pdf-easy-request.js'

export default {
  async fetch(request, env) {
    const pdf = pdfEasyRequest(request, env) || pdfRequest(request, env)
    if (pdf) return pdf
    const url = new URL(request.url)
    if (url.pathname === '/api' || url.pathname.startsWith('/api/')) {
      return handleApi(request, env)
    }
    const target = legacyRedirect(url.pathname)
    if (target) {
      const destination = new URL(target, url)
      destination.search = url.search
      return Response.redirect(destination.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
