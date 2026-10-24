
const fs=require('fs');
const W='/Volumes/work/code/rea/hua-studio';
const all=fs.readFileSync(W+'/extract/strings-all.txt','utf8').split('\n');
const isNoise=s=>!s||s.length<4||/^[A-Za-z0-9+\/=]{20,}$/.test(s)||/^[0-9a-fA-F]{16,}$/.test(s)||/[\u0000-\u001f]/.test(s);
const clean=[...new Set(all.filter(s=>!isNoise(s)))];
const hasCJK=s=>/[\u3040-\u30ff\u4e00-\u9fff\uac00-\ud7af]/.test(s);
const hasAccent=s=>/[àâçéèêëîïôùûüÿœæñáíóú¿¡]/i.test(s);
const langs={en:[],zh:[],ja:[],ko:[],fr:[],es:[]};
for(const s of clean){
  if(hasCJK(s)){
    if(/[\u3040-\u30ff]/.test(s))langs.ja.push(s);
    else if(/[\uac00-\ud7af]/.test(s))langs.ko.push(s);
    else langs.zh.push(s);
  } else if(/^[A-Za-z0-9 ,.\-'’!?:;()%\/&+×→←…"]+$/.test(s) && /[a-z]{3}/.test(s) && s.split(' ').length>=2){
    langs.en.push(s);
  } else if(hasAccent(s)) langs.fr.push(s);
}
console.log('clean total:',clean.length);
for(const k of Object.keys(langs))console.log(k, langs[k].length);
fs.writeFileSync(W+'/extract/ui-en.txt',[...new Set(langs.en)].sort().join('\n'));
fs.writeFileSync(W+'/extract/ui-zh.txt',[...new Set(langs.zh)].sort().join('\n'));
console.log('\n=== English UI copy (sample 40) ===');
[...new Set(langs.en)].sort().slice(0,40).forEach(s=>console.log('  '+s));
console.log('\n=== Chinese UI copy (sample 25) ===');
[...new Set(langs.zh)].sort().slice(0,25).forEach(s=>console.log('  '+s));
