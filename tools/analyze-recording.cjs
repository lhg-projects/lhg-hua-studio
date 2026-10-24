
const fs=require('fs'),os=require('os');
const P=os.homedir()+'/Library/Containers/alchain.HuaStudio/Data/Library/Application Support/HuaStudio/Recordings/CAE0F99D-A3E1-420C-99E9-95A845C128AF';
const track=JSON.parse(fs.readFileSync(P+'/track.json','utf8'));
const proj=JSON.parse(fs.readFileSync(P+'/project.json','utf8'));
const tl=JSON.parse(fs.readFileSync(P+'/timeline.json','utf8'));
const meta=JSON.parse(fs.readFileSync(P+'/meta.json','utf8'));
console.log('=== track.json top-level keys ===');
for(const k of Object.keys(track)) console.log('  '+k+' : '+Array.isArray(track[k])?('array['+track[k].length+']'):typeof track[k]);
console.log('\n=== items per key + first item ===');
for(const k of Object.keys(track)){
  const v=track[k];
  if(Array.isArray(v)&&v.length) console.log('  '+k+'['+v.length+'] first='+JSON.stringify(v[0]));
  else if(!Array.isArray(v)) console.log('  '+k+' = '+JSON.stringify(v).slice(0,200));
}
console.log('\n=== click count:',(track.clicks||[]).length,'=== cursor samples:',(track.cursor||[]).length);
const cur=track.cursor||[];
if(cur.length){
  const dt=[];for(let i=1;i<cur.length;i++)dt.push(cur[i].t-cur[i-1].t);
  dt.sort((a,b)=>a-b);
  console.log('cursor sample interval ms: min='+dt[0].toFixed(1),'median='+dt[Math.floor(dt.length/2)].toFixed(1),'max='+dt[dt.length-1].toFixed(1));
}
console.log('\n=== zoomSeg vs clicks analysis ===');
for(const z of proj.zoomSegs){
  console.log('zoomSeg start='+z.start.toFixed(1)+' end='+z.end.toFixed(1)+' dur='+(z.end-z.start).toFixed(1)+' points='+z.points.length);
  for(const p of z.points) console.log('   point t='+p.t.toFixed(1)+' x='+p.x.toFixed(4)+' y='+p.y.toFixed(4));
  const near=(track.clicks||[]).filter(c=>Math.abs(c.t-z.start)<3000);
  for(const c of near) console.log('   click   t='+c.t.toFixed(1)+' x='+c.x.toFixed(4)+' y='+c.y.toFixed(4)+'  (start-t='+(c.t-z.start).toFixed(1)+')');
}
console.log('\n=== timeline events:',(tl.apps||[]).length,'app switches over',meta.durationMs.toFixed(0),'ms');
const apps=[...new Set((tl.apps||[]).map(a=>a.name))];
console.log('distinct apps:',apps.length);
console.log('\n=== meta ===');
console.log(JSON.stringify(meta,null,1).slice(0,700));
