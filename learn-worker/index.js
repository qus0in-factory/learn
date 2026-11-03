import { handleApi } from './api.js'
import { legacyRedirect } from './legacy-redirects.js'

export default {
  async fetch(request, env) {
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
