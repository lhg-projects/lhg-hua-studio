
const fs=require('fs'), cp=require('child_process');
const B='/Volumes/work/code/rea/hua-studio/app/HuaStudio.app/Contents/MacOS/HuaStudio';
const buf=fs.readFileSync(B);
let sliceOff=0;
if(buf.readUInt32BE(0)===0xcafebabe){const n=buf.readUInt32BE(4);for(let i=0;i<n;i++){const o=8+i*20;if(buf.readUInt32BE(o)===0x0100000c){sliceOff=buf.readUInt32BE(o+8);break;}}}
const ncmds=buf.readUInt32LE(sliceOff+16);
const segs=[],sects=[];let p=sliceOff+32;
for(let i=0;i<ncmds;i++){const cmd=buf.readUInt32LE(p),cs=buf.readUInt32LE(p+4);
 if(cmd===0x19){const segname=buf.toString('ascii',p+8,p+24).replace(/\0.*$/,'');
  const vmaddr=Number(buf.readBigUInt64LE(p+24)),vmsize=Number(buf.readBigUInt64LE(p+32)),fileoff=Number(buf.readBigUInt64LE(p+40));
  const nsects=buf.readUInt32LE(p+64);segs.push({segname,vmaddr,vmsize,fileoff});
  let q=p+72;for(let j=0;j<nsects;j++){const sectname=buf.toString('ascii',q,q+16).replace(/\0.*$/,'');
   const addr=Number(buf.readBigUInt64LE(q+32)),size=Number(buf.readBigUInt64LE(q+40)),offset=buf.readUInt32LE(q+48);
   sects.push({sectname,addr,size,offset:sliceOff+offset});q+=80;}}
 p+=cs;}
const sec=n=>sects.find(s=>s.sectname===n);
function vmToOff(a){for(const s of sects)if(a>=s.addr&&a<s.addr+s.size)return s.offset+(a-s.addr);
 for(const g of segs)if(a>=g.vmaddr&&a<g.vmaddr+g.vmsize)return sliceOff+g.fileoff+(a-g.vmaddr);return -1;}
function cstr(a){const o=vmToOff(a);if(o<0||o>=buf.length)return null;let e=o;while(e<buf.length&&buf[e]!==0&&e-o<400)e++;const s=buf.toString('utf8',o,e);return /^[\x20-\x7e]{1,400}$/.test(s)?s:null;}
const MANGLE=/^[A-Za-z0-9_$][A-Za-z0-9_$]{0,300}$/;
function isMangled(s){return !!s && MANGLE.test(s) && /[A-Za-z]/.test(s);}
function resolveType(a,depth){
  depth=depth||0; if(depth>3)return '?';
  const s=cstr(a); if(isMangled(s))return s;
  const rel=rd32(a); if(rel===null)return '?';
  for(const mask of [~3,-1]){
    const t=a+((rel&mask)|0); if(t===a)continue;
    const s2=cstr(t); if(isMangled(s2))return s2;
    if(depth<2){const r=resolveType(t,depth+1); if(r!=='?')return r;}
  }
  return '?';
}
function rd32(a){const o=vmToOff(a);return (o>=0&&o+4<=buf.length)?buf.readInt32LE(o):0;}
function rdu16(a){const o=vmToOff(a);return (o>=0&&o+2<=buf.length)?buf.readUInt16LE(o):0;}
function rdu32(a){const o=vmToOff(a);return (o>=0&&o+4<=buf.length)?buf.readUInt32LE(o):0;}

const T=sec('__swift5_types');
const nTypes=T.size/4;
const types=[];
for(let i=0;i<nTypes;i++){
  const entry=T.addr+i*4;
  const desc=entry+rd32(entry);
  const flags=rdu32(desc);
  if(flags===0&&vmToOff(desc)<0)continue;
  const generic=!!(flags&0x80);
  const base=generic?desc+16:desc;
  const f2=rdu32(base);
  const kind=f2&0x1f;
  const name=cstr(base+8+rd32(base+8));
  const fieldOff=16;
  const fieldAddr=base+fieldOff+rd32(base+fieldOff);
  const rec={kind,generic,name,desc:base,fields:[]};
  const fo=vmToOff(fieldAddr);
  if(fo>=0){
    const numFields=rdu32(fieldAddr+12);
    const recSize=rdu16(fieldAddr+10)||12;
    if(numFields>=0&&numFields<200){
      let rp=fieldAddr+16;
      for(let k=0;k<numFields;k++){
        const tAddr=rp+4+rd32(rp+4);
        const nAddr=rp+8+rd32(rp+8);
        const fname=cstr(nAddr);
        const ftype=resolveType(tAddr,0);
        if(fname)rec.fields.push({name:fname,type:ftype||'?'});
        rp+=recSize;
      }
    }
  }
  types.push(rec);
}
const KN={0:'module',1:'extension',2:'anonymous',3:'protocol',16:'class',17:'struct',18:'enum',19:'union'};
const app=types.filter(t=>t.name&&t.name.includes('9HuaStudio'));
console.log('total types:',types.length,'| HuaStudio-namespaced:',app.length);
console.log('with fields:',types.filter(t=>t.fields.length).length);

const all=[];for(const t of types){if(t.name)all.push(t.name);for(const f of t.fields){if(f.name)all.push(f.name);if(f.type&&f.type!=='?')all.push(f.type);}}
const uniq=[...new Set(all)];
const out=cp.execFileSync('xcrun',['swift-demangle','--simplified'],{input:uniq.map(s=>s.replace(/^_/,'')).join('\n'),maxBuffer:128*1024*1024}).toString().split('\n');
const dm={};uniq.forEach((m,i)=>dm[m]=out[i]||m);
const result=types.map(t=>({kind:KN[t.kind]||String(t.kind),mangled:t.name,demangled:t.name?dm[t.name]||t.name:null,
  numFields:t.fields.length,fields:t.fields.map(f=>({name:f.name,type:dm[f.type]||f.type}))}));
fs.writeFileSync('/Volumes/work/code/rea/hua-studio/swift-types.json',JSON.stringify(result,null,1));
console.log('\n=== HuaStudio types (first 12) ===');
result.filter(t=>t.mangled&&t.mangled.includes('9HuaStudio')).slice(0,12).forEach(t=>{
  console.log('['+t.kind+'] '+t.demangled+'  ('+t.numFields+' fields)');
  t.fields.slice(0,8).forEach(f=>console.log('    '+f.name+' : '+f.type));
});
