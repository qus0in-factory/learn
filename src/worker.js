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
    return env.ASSETS.fetch(request)
  },
}
