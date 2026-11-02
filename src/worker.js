export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
      return Response.redirect(new URL('/git/docs/', url), 302)
    }
    for (const route of ['/git/slides', '/git/docs']) {
      if (url.pathname === route) {
        return Response.redirect(new URL(`${route}/`, url), 308)
      }
    }
    const response = await env.ASSETS.fetch(request)
    if (response.status === 404 && /^\/git\/slides\/\d+\/?$/.test(url.pathname)) {
      return env.ASSETS.fetch(new Request(new URL('/git/slides/', url), request))
    }
    return response
  },
}
