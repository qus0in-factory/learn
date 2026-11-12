import test from 'node:test';
import {strictEqual as eq} from 'node:assert';
import worker from './index.js';
import c from '../learn-site/.vitepress/pdf.json' with {type:'json'};
import e from '../learn-site/.vitepress/pdf-easy.json' with {type:'json'};
const base=c.baseUrl+c.version+'/', file='easy/01-environment.pdf';
const get=(p,env={})=>worker.fetch(new Request(base+p),env);
test('easy route and original redirect',async()=>{
  for(const [p,r] of [[file,e.revision],['01-environment.pdf',c.revision]]){
    const res=await get(p);
    eq(res.status,302);
    eq(res.headers.get('Cache-Control'),'no-store');
    eq(res.headers.get('Location'),base+p+'?revision='+r);
  }
  for(const r of ['', 'BAD', 'abcdef', 'a'.repeat(41)])
    eq((await get(file+'?revision='+r)).status,400);
  eq((await get('easy/1-BAD.pdf')).status,404);
  await get(file+'?revision=abcdef0',{FILES:{get:async k=>{
    eq(k,c.version+'/easy/revisions/abcdef0/01-environment.pdf'); return null;
  }}});
});
