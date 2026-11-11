import c from '../learn-site/.vitepress/pdf.json' with {type:'json'};
import e from '../learn-site/.vitepress/pdf-easy.json' with {type:'json'};
import { pdfResponse } from './pdf-response.js';
export function pdfEasyRequest(req, env) {
  const url = new URL(req.url), prefix = `/${c.version}/${e.prefix}`;
  if (url.host !== new URL(c.baseUrl).host || !url.pathname.startsWith(prefix)) return null;
  if (!['GET', 'HEAD'].includes(req.method)) return new Response(null, {status:405});
  const file=url.pathname.slice(prefix.length), revision=url.searchParams.get('revision');
  if (!/^\d{2}-[a-z-]+\.pdf$/.test(file)) return new Response(null,{status:404});
  if (revision === null) {
    url.searchParams.set('revision', e.revision);
    return new Response(null, {status:302,
      headers:{Location:url.href, 'Cache-Control':'no-store'}});
  }
  if (!/^[a-f0-9]{7,40}$/.test(revision)) return new Response(null,{status:400});
  return pdfResponse(req,env.FILES,`${prefix.slice(1)}revisions/${revision}/${file}`);
}
