const fs=require("fs"),md=require("markdown-it")();
const nl=(s,b)=>(s.slice(0,b&&s.indexOf(b)).match(/\n/g)||"").length;
const strip=s=>s.replace(/(`+)[\s\S]*?\1/g,m=>m.replace(/[^\n]/g," "));
function check(f){
let e=0,log=(l,t)=>{console.error(f+":"+l+": "+t);e++};
for(const t of md.parse(fs.readFileSync(f,"utf8"),{})){
if(t.type!=="inline"||!t.content.includes("**"))continue;
let m,l0=(t.map?.[0]||0)+1,cur=l0,s=strip(t.content);
while((m=/\*\*([^\s*]+?\.)\*\*~(?=[\w가-힣])/g.exec(s)))log(l0+nl(s,m[0]),m[0]);
if(!/\*\*.*\*\*/.test(s.replace(/\\\*|[\w./-]\/\*\*/g,"")))continue;
for(const c of t.children){
if(c.type==="softbreak")cur++;
else if(c.type==="text"&&c.content.includes("**")){log(cur+nl(c.content,"**"),c.content);cur+=nl(c.content);}
}}return e;}
const F=a=>fs.statSync(a).isDirectory()?fs.readdirSync(a,{recursive:true}).filter(x=>x.endsWith(".md")).map(x=>a+"/"+x):[a];
const err=process.argv.slice(2).flatMap(F).reduce((s,f)=>s+check(f),0);
if(err)process.exit(1);
console.log("markdown-lint: ok");
