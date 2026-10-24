
const fs=require('fs');
const B='/Volumes/work/code/rea/hua-studio/app/HuaStudio.app/Contents/MacOS/HuaStudio';
const buf=fs.readFileSync(B);

function u32(b,o){return b.readUInt32LE(o);}
function i32(b,o){return b.readInt32LE(o);}

// ---- fat header ----
let sliceOff=0, sliceMagic=buf.readUInt32BE(0);
const FAT=0xcafebabe;
if(sliceMagic===FAT){
  const n=buf.readUInt32BE(4);
  let best=null;
  for(let i=0;i<n;i++){
    const o=8+i*20;
    const cpu=buf.readUInt32BE(o);
    const off=buf.readUInt32BE(o+8);
    const size=buf.readUInt32BE(o+12);
    console.log('arch cpu=0x'+cpu.toString(16),'off='+off,'size='+size);
    if(cpu===0x0100000c)best={off,size,cpu}; // arm64
  }
  if(!best)best={off:buf.readUInt32BE(16),size:buf.readUInt32BE(20)};
  sliceOff=best.off;
} else {
  console.log('thin binary');
}

const magic=buf.readUInt32LE(sliceOff);
if(magic!==0xfeedfacf)throw new Error('not macho64: 0x'+magic.toString(16));
const ncmds=buf.readUInt32LE(sliceOff+16);
console.log('slice offset',sliceOff,'ncmds',ncmds);

// ---- segments / sections ----
const segs=[]; // {name, vmaddr, vmsize, fileoff, filesize}
const sects=[]; // {seg,sect,addr,size,offset}
let p=sliceOff+32;
for(let i=0;i<ncmds;i++){
  const cmd=buf.readUInt32LE(p);
  const cmdsize=buf.readUInt32LE(p+4);
  if(cmd===0x19){ // LC_SEGMENT_64
    const segname=buf.toString('ascii',p+8,p+24).replace(/\0.*$/,'');
    const vmaddr=Number(buf.readBigUInt64LE(p+24));
    const vmsize=Number(buf.readBigUInt64LE(p+32));
    const fileoff=Number(buf.readBigUInt64LE(p+40));
    const filesize=Number(buf.readBigUInt64LE(p+48));
    const nsects=buf.readUInt32LE(p+64);
    segs.push({segname,vmaddr,vmsize,fileoff,filesize,nsects});
    let q=p+72;
    for(let j=0;j<nsects;j++){
      const sectname=buf.toString('ascii',q,q+16).replace(/\0.*$/,'');
      const sseg=buf.toString('ascii',q+16,q+32).replace(/\0.*$/,'');
      const addr=Number(buf.readBigUInt64LE(q+32));
      const size=Number(buf.readBigUInt64LE(q+40));
      const offset=buf.readUInt32LE(q+48);
      sects.push({sectname,sseg,addr,size,offset:sliceOff+offset});
      q+=80;
    }
  }
  p+=cmdsize;
}

const names=sects.map(s=>s.sseg+','+s.sectname);
console.log('sections:',names.length);
console.log(names.filter(n=>n.includes('swift5')||n.includes('cstring')||n.includes('objc_')).join(' '));

function sec(sname){return sects.find(s=>s.sectname===sname);}
function vmToOff(addr){
  for(const s of sects){ if(addr>=s.addr && addr<s.addr+s.size) return s.offset+(addr-s.addr); }
  for(const g of segs){ if(addr>=g.vmaddr && addr<g.vmaddr+g.vmsize) return sliceOff+g.fileoff+(addr-g.vmaddr); }
  return -1;
}
function cstrAt(addr){
  const o=vmToOff(addr); if(o<0)return null;
  let e=o; while(e<buf.length && buf[e]!==0 && e-o<512)e++;
  return buf.toString('utf8',o,e);
}
module.exports={buf,sliceOff,sects,sec,vmToOff,cstrAt};

const t=sec('__swift5_types'), f=sec('__swift5_fieldmd'), r=sec('__swift5_reflstr');
console.log('types:',t&&{addr:t.addr,size:t.size},'fieldmd:',f&&{addr:f.addr,size:f.size},'reflstr:',r&&{addr:r.addr,size:r.size});

// count type descriptors
if(t){
  const n=t.size/4;
  console.log('type descriptors:',n);
  const out=[];
  for(let i=0;i<n;i++){
    const rel=buf.readInt32LE(t.offset+i*4);
    const descAddr=t.addr+i*4+rel;
    const flags=buf.readUInt32LE(vmToOff(descAddr));
    const kind=flags&0x1f;
    out.push({i,descAddr,kind,flags:flags>>>0});
  }
  const kinds={};
  for(const o of out)kinds[o.kind]=(kinds[o.kind]||0)+1;
  console.log('kinds:',JSON.stringify(kinds));
}
