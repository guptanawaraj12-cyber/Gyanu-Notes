const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
function walk(d){let out=[];for(const e of fs.readdirSync(d,{withFileTypes:true})){if(e.name.startsWith('.'))continue;const f=path.join(d,e.name);if(e.isDirectory())out=out.concat(walk(f));else if(e.name.endsWith('.html'))out.push(f);}return out;}
const files=walk(root);
let bad=0;
for(const f of files){
 const html=fs.readFileSync(f,'utf8');
 if(!/<title\b[^>]*>/.test(html) && !/id="page-title"/.test(html)){console.log('NO TITLE',f);bad++;}
 if(!/name="description"/.test(html)){console.log('NO DESC',f);bad++;}
 if(!/rel="canonical"/.test(html)){console.log('NO CANONICAL',f);bad++;}
 const re=/(href|src)="([^"]+)"/g; let m;
 while((m=re.exec(html))){
   const u=m[2];
   if(u.startsWith('http')||u.startsWith('#')||u.startsWith('mailto:')||u.startsWith('tel:'))continue;
   const clean=u.split('?')[0].split('#')[0];
   if(!clean||clean==='/')continue;
   const p=path.join(root,clean.replace(/^\//,''));
   if(!fs.existsSync(p)&&!fs.existsSync(p+'/index.html')){console.log('BROKEN',f,u);bad++;}
 }
}
console.log('done',bad);
