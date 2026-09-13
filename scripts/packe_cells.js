const fs = require('fs');
const src = fs.readFileSync('content/packs/pack_e_corrected.js', 'utf8');
const s = src.indexOf('[');
let d = 0, e = -1;
for (let i = s; i < src.length; i++) {
  if (src[i] === '[') d++;
  else if (src[i] === ']') { d--; if (d === 0) { e = i; break; } }
}
const arr = (new Function('return ' + src.substring(s, e + 1)))();
const bySec = {};
for (const q of arr) {
  const sec = q.Section || '?';
  bySec[sec] = bySec[sec] || { n: 0, Analyze: 0, Evaluate: 0, VDiff: 0, ids: [] };
  bySec[sec].n++;
  if (q.CognitiveLevel === 'Analyze') bySec[sec].Analyze++;
  if (q.CognitiveLevel === 'Evaluate') bySec[sec].Evaluate++;
  if (q.DifficultyScore === 5) bySec[sec].VDiff++;
  bySec[sec].ids.push(q.QuestionID);
}
for (const [sec, v] of Object.entries(bySec).sort()) {
  console.log('Sec ' + sec + ': n=' + v.n + ' Analyze=' + v.Analyze + ' Evaluate=' + v.Evaluate + ' VDiff=' + v.VDiff);
}
for (const [sec, v] of Object.entries(bySec).sort()) {
  const nums = v.ids.map(id => { const m = id.match(/-(\d+)$/); return m ? +m[1] : -1; }).filter(n => n >= 0);
  if (nums.length) console.log('Sec ' + sec + ': min=' + Math.min(...nums) + ' max=' + Math.max(...nums));
}