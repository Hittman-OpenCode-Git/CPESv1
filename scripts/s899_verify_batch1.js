const fs = require('fs');
const raw = fs.readFileSync('pack_c_corrected.js', 'utf8');
const qids = ['P1-EC-001','P1-EC-005','P1-EC-010','P1-EC-030','P1-EC-055'];
let ok = 0;
const results = [];
qids.forEach(q => {
  const i = raw.indexOf('"QuestionID": "' + q + '"');
  if (i < 0) { console.log(q + ': NOT FOUND'); return; }
  const w = raw.substring(i, i + 5000);
  const active = w.includes('"question_state": "Active"');
  const bloom = w.match(/"CognitiveLevel":\s*"(Analyze|Evaluate)"/);
  const diff = w.match(/"DifficultyScore":\s*(\d+)/);
  const status = active ?
    `Active, Bloom=${bloom ? bloom[1] : '?'}, Diff=${diff ? diff[1] : '?'}` :
    'NOT Active';
  console.log(q + ': ' + status);
  if (active) ok++;
  results.push({ q, active, bloom: bloom ? bloom[1] : null, diff: diff ? parseInt(diff[1]) : null });
});
console.log('\nOK: ' + ok + '/' + qids.length);
if (ok === qids.length) {
  console.log('BATCH 1: ALL 5 ITEMS VERIFIED — question_state: Active');
}

// Summary stats
const activeBloom = results.filter(r => r.active);
const analyze = activeBloom.filter(r => r.bloom === 'Analyze').length;
const evaluate = activeBloom.filter(r => r.bloom === 'Evaluate').length;
const diff4 = activeBloom.filter(r => r.diff === 4).length;
const diff5 = activeBloom.filter(r => r.diff === 5).length;
console.log(`\nBloom: Analyze=${analyze}, Evaluate=${evaluate}`);
console.log(`Difficulty: Difficult(4)=${diff4}, Very Difficult(5)=${diff5}`);
