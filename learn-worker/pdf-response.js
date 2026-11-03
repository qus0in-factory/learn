export async function pdfResponse(request, bucket, key) {
  const object = await bucket.get(key);
  if (!object) return new Response('PDF not found', { status: 404,
    headers: { 'Cache-Control': 'no-store' } });
  const headers = new Headers({
    'Content-Type': 'application/pdf',
    'Content-Length': String(object.size),
    'Cache-Control': 'public, max-age=31536000, immutable',
    'ETag': object.httpEtag,
    'X-Content-Type-Options': 'nosniff',
  });
  if (request.headers.get('If-None-Match') === object.httpEtag) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(request.method === 'HEAD' ? null : object.body, { headers });
}
