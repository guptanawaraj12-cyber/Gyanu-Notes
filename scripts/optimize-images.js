const sharp=require('sharp');
const fs=require('fs');
const path=require('path');
const dir=path.join(__dirname,'..','assets','images','team');
for(const f of fs.readdirSync(dir)){
 if(!/\.jpe?g$/i.test(f))continue;
 const src=path.join(dir,f);
 const base=f.replace(/\.(jpe?g)$/i,'');
 const outJ=path.join(dir,base+'.jpg');
 const outW=path.join(dir,base+'.webp');
 sharp(src).resize({width:600,withoutEnlargement:true}).jpeg({quality:75}).toFile(outJ);
 sharp(src).resize({width:600,withoutEnlargement:true}).webp({quality:75}).toFile(outW);
 console.log('optimized',f);
}
// logo
const logo=path.join(__dirname,'..','assets','images','logo.jpeg');
sharp(logo).resize({width:256,withoutEnlargement:true}).jpeg({quality:80}).toFile(path.join(__dirname,'..','assets','images','logo.jpg'));
sharp(logo).resize({width:256,withoutEnlargement:true}).webp({quality:80}).toFile(path.join(__dirname,'..','assets','images','logo.webp'));
console.log('done');