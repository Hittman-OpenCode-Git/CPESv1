const fs = require('fs');
const packs = { A: 'content/packs/pack_a_corrected.js', B: 'content/packs/pack_b_corrected.js', C: 'content/packs/pack_c_corrected.js' };
const ids = [];
for (let n = 101; n <= 130; n++) ids.push({ qid: 'P1-DC-' + n, pack: 'C' });
for (let n = 101; n <= 130; n++) ids.push({ qid: 'P1-C-' + n, pack: 'A' });
for (let n = 211; n <= 240; n++) ids.push({ qid: 'P1B-C-' + n, pack: 'B' });
const cache = {};
let ok = 0;
const miss = [];
const ccDist = { A: 0, B: 0, C: 0, D: 0 };
const stateCount = {};
for (const { qid, pack } of ids) {
  if (!cache[pack]) cache[pack] = fs.readFileSync(packs[pack], 'utf8');
  const src = cache[pack];
  const m = src.indexOf('"QuestionID": "' + qid + '"');
  if (m === -1) { miss.push(qid); continue; }
  ok++;
  const seg = src.slice(Math.max(0, m - 3000), m + 6000);
  const ccM = seg.match(/"CorrectChoice": "([ABCD])"/);
  const stM = seg.match(/"question_state": "([^"]+)"/);
  if (ccM) ccDist[ccM[1]]++;
  const st = stM ? stM[1] : 'MISSING';
  stateCount[st] = (stateCount[st] || 0) + 1;
}
console.log('found ' + ok + '/90 missing: ' + (miss.join(',') || 'none'));
console.log('CC dist: ' + JSON.stringify(ccDist));
console.log('states: ' + JSON.stringify(stateCount));
