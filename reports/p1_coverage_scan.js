const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, '..', 'content', 'packs');
const files = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js'];

function loadPack(fn){
  const src = fs.readFileSync(path.join(base, fn), 'utf8');
  const m = src.match(/(?:var|const|let)\s+(\w+)\s*=\s*(\[[\s\S]*\])\s*;/);
  if(!m) throw new Error('no array in '+fn);
  // eslint-disable-next-line no-eval
  return eval('(' + m[2] + ')');
}

const all = [];
const perFile = {};
for(const fn of files){
  const arr = loadPack(fn);
  perFile[fn] = arr.length;
  all.push(...arr);
}

console.log('Per-file counts:', JSON.stringify(perFile));
console.log('TOTAL MCQ:', all.length);

const secCount = {};
const secName = {};
const losCount = {};
const topicCount = {};
const cogCount = {};
const diffCount = {};
const stateCount = {};
let calcYes = 0;

for(const o of all){
  const s = o.Section || '?';
  secCount[s] = (secCount[s]||0)+1;
  secName[s] = o.SectionName;
  const los = o.LOSTag || '?';
  losCount[los] = (losCount[los]||0)+1;
  const t = o.Topic || '?';
  topicCount[t] = (topicCount[t]||0)+1;
  const c = o.CognitiveLevel || '?';
  cogCount[c] = (cogCount[c]||0)+1;
  const d = o.Difficulty || '?';
  diffCount[d] = (diffCount[d]||0)+1;
  const st = o.question_state || '?';
  stateCount[st] = (stateCount[st]||0)+1;
  if(o.CalculationItem === true || o.CalculationItem === 'Yes') calcYes++;
}

console.log('\nSECTIONS:');
for(const s of Object.keys(secCount).sort()){
  console.log(`  ${s}: ${secCount[s]}  ${secName[s]}`);
}
console.log('\nDistinct LOS tags:', Object.keys(losCount).length);
console.log('LOS tag counts:');
for(const k of Object.keys(losCount).sort()){
  console.log(`  ${k}: ${losCount[k]}`);
}
console.log('\nDistinct Topic values:', Object.keys(topicCount).length);
console.log('CognitiveLevel:', JSON.stringify(cogCount));
console.log('Difficulty:', JSON.stringify(diffCount));
console.log('question_state:', JSON.stringify(stateCount));
console.log('CalculationYes:', calcYes);

// Write JSON for downstream
const out = {total: all.length, perFile, secCount, secName, losCount, topicCountCount: Object.keys(topicCount).length, cogCount, diffCount, stateCount, calcYes};
fs.writeFileSync(path.join(__dirname,'p1_coverage_scan_out.json'), JSON.stringify(out,null,2));
console.log('\nWROTE p1_coverage_scan_out.json');
