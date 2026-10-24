
const fs=require('fs'),cp=require('child_process');
const W='/Volumes/work/code/rea/hua-studio';
const BT=String.fromCharCode(96), F=BT+BT+BT;
const types=JSON.parse(fs.readFileSync(W+'/swift-types.json','utf8'));
const toks=new Set();
for(const t of types){ if(t.mangled)toks.add(t.mangled); for(const f of t.fields){ if(f.type&&f.type!=='?')toks.add(f.type);} }
const list=[...toks];
const mk=s=>{ if(s.startsWith('_$s'))return s.slice(1); if(s.startsWith('$s'))return s; return '$s'+s; };
const tries=list.map(mk);
let lines=[];
try{ lines=cp.execFileSync('xcrun',['swift-demangle','--simplified'],{input:tries.join('\n'),maxBuffer:64*1024*1024}).toString().split('\n'); }catch(e){ lines=[]; }
const dm={};
list.forEach((t,i)=>{ const d=lines[i]; dm[t]=(d&&d.trim()&&d.trim()!==tries[i])?d.trim():t; });
const readable=t=>{ if(!t||t==='?')return '?'; const d=dm[t]; if(!d||d===t)return t; return d; };
const groups={enum:[],struct:[],class:[],other:[]};
for(const t of types.filter(x=>x.numFields>0)) (groups[t.kind]||groups.other).push(t);
let md='# HuaStudio 类型骨架（Swift 元数据还原）\n\n';
md+='> 解析自 '+BT+'__swift5_types'+BT+' / '+BT+'__swift5_fieldmd'+BT+' / '+BT+'__swift5_reflstr'+BT+' 段，配合 '+BT+'swift-demangle'+BT+'\n\n';
md+='共 **'+types.length+'** 个类型描述符，其中 **'+types.filter(x=>x.numFields>0).length+'** 个带字段。\n\n';
md+='**可信度**：字段名 100% 准确；简单类型（String/Bool/Int/Double/Optional/数组/ObjC 类）已 demangle；复杂泛型的内层类型引用经过 linker 重定位，静态解析显示为 '+BT+'?'+BT+'。函数体不可恢复。\n\n---\n\n';
for(const k of ['enum','struct','class']){
  const l=groups[k].sort((a,b)=>b.numFields-a.numFields||String(a.mangled).localeCompare(String(b.mangled)));
  if(!l.length)continue;
  md+='## '+k+'（'+l.length+'）\n\n';
  for(const t of l){
    md+='### '+BT+t.mangled+BT+'\n\n'+F+'swift\n'+k+' '+t.mangled+' {\n';
    const w=Math.max(4,...t.fields.map(f=>f.name.length));
    for(const f of t.fields) md+='    '+f.name.padEnd(w)+' : '+readable(f.type)+'\n';
    md+='}\n'+F+'\n\n';
  }
}
const empty=types.filter(x=>x.numFields===0);
md+='## 无字段描述符（'+empty.length+'）\n\n'+F+'\n'+empty.map(t=>t.mangled).sort().join('  ')+'\n'+F+'\n';
fs.writeFileSync(W+'/types.md',md);
console.log('types.md',md.length,'bytes |',['enum','struct','class'].map(k=>k+'='+groups[k].length).join(' '));
const p=types.find(x=>x.mangled==='Project');
console.log('\n=== Project ==='); p.fields.forEach(f=>console.log('   '+f.name.padEnd(12)+' : '+readable(f.type)));
const r=types.find(x=>x.mangled==='RecordingMeta');
console.log('=== RecordingMeta ==='); r.fields.forEach(f=>console.log('   '+f.name.padEnd(14)+' : '+readable(f.type)));
