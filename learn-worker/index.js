import { handleApi } from './api.js'
import { legacyRedirect } from './legacy-redirects.js'
import { pdfRequest } from './pdf-request.js'

function cacheAsset(response, pathname) {
  if (response.status !== 200 || !pathname.startsWith('/assets/')) return response
  const headers = new Headers(response.headers)
  headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export default {
  async fetch(request, env) {
    const pdf = pdfRequest(request, env)
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
    return cacheAsset(await env.ASSETS.fetch(request), url.pathname)
  },
}
