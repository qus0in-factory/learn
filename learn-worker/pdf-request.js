import config from '../learn-site/.vitepress/pdf.json' with { type: 'json' };
import { pdfResponse } from './pdf-response.js';
export function pdfRequest(request, env) {
  const url = new URL(request.url);
  if (url.host !== new URL(config.baseUrl).host) return null;
  if (!['GET', 'HEAD'].includes(request.method)) return new Response(null, { status: 405 });
  const prefix = `/${config.version}/`;
  const file = url.pathname.slice(prefix.length);
  if (!url.pathname.startsWith(prefix) || !/^\d{2}-[a-z-]+\.pdf$/.test(file)) {
    return new Response(null, { status: 404 });
  }
  const revision = url.searchParams.get('revision');
  if (!revision) {
    url.searchParams.set('revision', config.revision);
    return new Response(null, { status: 302,
      headers: { Location: url.href, 'Cache-Control': 'no-store' } });
  }
  if (!/^[a-f0-9]{7,40}$/.test(revision)) return new Response(null, { status: 400 });
  return pdfResponse(request, env.FILES, `${config.version}/revisions/${revision}/${file}`);
}
