
const fs=require('fs');
const B='/Volumes/work/code/rea/hua-studio/app/HuaStudio.app/Contents/MacOS/HuaStudio';
const buf=fs.readFileSync(B);
let sliceOff=0;
if(buf.readUInt32BE(0)===0xcafebabe){const n=buf.readUInt32BE(4);for(let i=0;i<n;i++){const o=8+i*20;if(buf.readUInt32BE(o)===0x0100000c){sliceOff=buf.readUInt32BE(o+8);break;}}}
const ncmds=buf.readUInt32LE(sliceOff+16);
const sects=[];let p=sliceOff+32;
for(let i=0;i<ncmds;i++){const cmd=buf.readUInt32LE(p),cs=buf.readUInt32LE(p+4);
 if(cmd===0x19){const nsects=buf.readUInt32LE(p+64);let q=p+72;
  for(let j=0;j<nsects;j++){const sectname=buf.toString('ascii',q,q+16).replace(/\0.*$/,'');
   const addr=Number(buf.readBigUInt64LE(q+32)),size=Number(buf.readBigUInt64LE(q+40)),offset=buf.readUInt32LE(q+48);
   sects.push({sectname,addr,size,offset:sliceOff+offset});q+=80;}}
 p+=cs;}
function strs(sectName,minLen){
  const s=sects.find(x=>x.sectname===sectName); if(!s)return [];
  const out=[]; let o=s.offset, end=s.offset+s.size;
  while(o<end){ let e=o; while(e<end&&buf[e]!==0)e++; const v=buf.toString('utf8',o,e); if(v.length>=minLen)out.push(v); o=e+1; }
  return out;
}
const meths=strs('__objc_methname',3);
const cls=strs('__objc_classname',2);
const cstr=strs('__cstring',4);
console.log('objc_methname:',meths.length,'objc_classname:',cls.length,'cstring:',cstr.length);

// app-ish selectors: those that look like setters/actions
const sel=meths.filter(m=>/^[a-z][A-Za-z0-9_]*:?$/.test(m));
console.log('\n=== objc class names (app candidates) ===');
console.log(cls.filter(c=>!/^NS|^AV|^CA|^CG|^MTK|^WK|^QL|^SC/.test(c)).slice(0,40).join(' '));
console.log('\n=== objc selectors containing domain words ===');
const KEY=/zoom|cursor|record|export|clip|mask|cam|layout|project|timeline|cap|shot|render|frame|wave|audio|mic/i;
const hits=meths.filter(m=>KEY.test(m));
console.log('count:',hits.length);
console.log([...new Set(hits)].slice(0,50).join('\n'));

fs.writeFileSync('/Volumes/work/code/rea/hua-studio/extract/objc-methname.txt',meths.join('\n'));
fs.writeFileSync('/Volumes/work/code/rea/hua-studio/extract/objc-classname.txt',cls.join('\n'));
fs.writeFileSync('/Volumes/work/code/rea/hua-studio/extract/cstring.txt',cstr.join('\n'));
