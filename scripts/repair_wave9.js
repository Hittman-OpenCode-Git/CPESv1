// Repair Wave-9 staging damage from blind key-rotation (rebalance_wave9.js).
// Root causes: (1) flipped without measuring original CCs; (2) Choices indexOf searched
// forward from QID (Choices precedes QID) hitting NEIGHBOR blocks.
// Repair via parsed objects (no string surgery): victims swap choices back (gated on
// coherence improvement); targets swap EWs back then set CC = empty-slot letter.
const fs = require('fs');
function words(t) {
  return new Set((t || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(w => w.length > 3));
}
function violations(o) {
  let v = 0;
  for (const L of ['A', 'B', 'C', 'D']) {
    const e = o['ExplanationWrong' + L] || '';
    const ch = (o.Choices || {})[L] || '';
    if (L === o.CorrectChoice) { if (e !== '') v++; continue; }
    if (!e) { v++; continue; }
    const m = e.match(/^Option ([A-D])\b/);
    if (!m || m[1] !== L) v++;
    const ws = words(ch), vs = words(e);
    let hit = 0;
    for (const w of ws) if (vs.has(w)) hit++;
    if (ws.size && hit / ws.size < 0.2) v++;
  }
  return v;
}
// [file, qid, letterA, letterB, role]
const victims = [
  ['tier3_wave9a.js', 'P1E-E-104', 'A', 'B'],
  ['tier3_wave9a.js', 'P1E-E-107', 'A', 'B'],
  ['tier3_wave9a.js', 'P1E-E-106', 'C', 'D'],
  ['tier3_wave9b.js', 'P1E-E-113', 'C', 'D'],
  ['tier3_wave9b.js', 'P1E-E-115', 'A', 'B'],
  ['tier3_wave9b.js', 'P1E-E-118', 'C', 'D'],
  ['tier3_wave9c.js', 'P1E-E-126', 'C', 'D'],
  ['tier3_wave9c.js', 'P1E-E-121', 'A', 'B'],
];
const cache = {};
function load(f) {
  if (!cache[f]) {
    fs.copyFileSync('scripts/' + f, 'scripts/' + f + '.bak-rebalance-fix');
    cache[f] = require('./' + f);
  }
  return cache[f];
}
console.log('--- VICTIMS (swap choices back iff coherence improves) ---');
for (const [f, qid, L1, L2] of victims) {
  const arr = load(f);
  const o = arr.find(x => x.QuestionID === qid);
  const before = violations(o);
  const t = o.Choices[L1]; o.Choices[L1] = o.Choices[L2]; o.Choices[L2] = t;
  const after = violations(o);
  if (after < before) {
    console.log(qid + ': reverted Choices ' + L1 + '<->' + L2 + ' (viol ' + before + '->' + after + ') KEPT');
  } else {
    const t2 = o.Choices[L1]; o.Choices[L1] = o.Choices[L2]; o.Choices[L2] = t2;
    console.log(qid + ': revert NOT better (viol ' + before + '->' + after + ') LEFT AS-IS — FLAG FOR HUMAN READ');
  }
}
// targets: swap EWs back, then CC = empty-slot letter
const targets = [
  ['tier3_wave9a.js', 'P1E-E-103', 'A', 'B'],
  ['tier3_wave9a.js', 'P1E-E-106', 'A', 'B'],
  ['tier3_wave9b.js', 'P1E-E-114', 'A', 'B'],
  ['tier3_wave9c.js', 'P1E-E-130', 'A', 'B'],
  ['tier3_wave9a.js', 'P1E-E-105', 'C', 'D'],
  ['tier3_wave9b.js', 'P1E-E-112', 'C', 'D'],
  ['tier3_wave9b.js', 'P1E-E-117', 'C', 'D'],
  ['tier3_wave9c.js', 'P1E-E-125', 'C', 'D'],
];
console.log('--- TARGETS (swap EWs back, CC = empty slot) ---');
for (const [f, qid, L1, L2] of targets) {
  const arr = load(f);
  const o = arr.find(x => x.QuestionID === qid);
  const t = o['ExplanationWrong' + L1]; o['ExplanationWrong' + L1] = o['ExplanationWrong' + L2]; o['ExplanationWrong' + L2] = t;
  const empties = ['A', 'B', 'C', 'D'].filter(L => (o['ExplanationWrong' + L] || '') === '');
  if (empties.length !== 1) {
    console.log(qid + ': AMBIGUOUS empty slots [' + empties.join(',') + '] — FLAG FOR HUMAN READ');
    continue;
  }
  const oldCC = o.CorrectChoice;
  o.CorrectChoice = empties[0];
  console.log(qid + ': EWs reverted; CC ' + oldCC + '->' + o.CorrectChoice + '; viol=' + violations(o));
}
for (const [f, arr] of Object.entries(cache)) {
  const varName = { 'tier3_wave9a.js': 'WAVE9A', 'tier3_wave9b.js': 'WAVE9B', 'tier3_wave9b2.js': 'WAVE9B2', 'tier3_wave9b3.js': 'WAVE9B3', 'tier3_wave9c.js': 'WAVE9C' }[f] || 'WAVE';
  fs.writeFileSync('scripts/' + f, 'const ' + varName + ' = ' + JSON.stringify(arr, null, 2) + ';\nmodule.exports = ' + varName + ';\n', 'utf8');
}
console.log('written');