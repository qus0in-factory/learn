import { loadCatalog } from './catalog.js'

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=60',
    },
  })

export async function handleApi(request, env) {
  if (new URL(request.url).pathname !== '/api/catalog') {
    return json({ error: 'not_found' }, 404)
  }
  if (request.method !== 'GET') return json({ error: 'method_not_allowed' }, 405)
  try {
    return json(await loadCatalog(env.DB))
  } catch {
    return json({ error: 'catalog_unavailable' }, 503)
  }
}
