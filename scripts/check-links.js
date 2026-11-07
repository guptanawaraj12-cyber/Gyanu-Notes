const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
function walk(d){let out=[];for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name.startsWith('.'))continue;const f=path.join(d,e.name);if(e.isDirectory())out=out.concat(walk(f));else if(e.name.endsWith('.html'))out.push(f);}return out;}
const files=walk(root);
let bad=0;
for(const f of files){const html=fs.readFileSync(f,'utf8');const m=html.match(/href="([^"]+)"/g)||[];for(const a of m){const u=a.match(/href="([^"]+)"/)[1];if(u.startsWith('http')||u.startsWith('#'))continue;if(u.startsWith('/')){const p=path.join(root,u.replace(/^\//,''));if(!fs.existsSync(p)&&!fs.existsSync(p+'/index.html')){console.log('BROKEN',f,u);bad++;}}}}
console.log('done',bad);