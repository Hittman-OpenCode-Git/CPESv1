// S380 Phase 3 — Domain F deep verification + DL-026 Certified full listing

const fs = require('fs');
const vm = require('vm');

function loadPack(filePath, varName) {
  const code = fs.readFileSync(filePath, 'utf8');
  const sandbox = { module: { exports: {} }, console, Array, Object, String, Number, Boolean, Date, RegExp, Math, JSON, parseInt, parseFloat, isNaN, isFinite, undefined, null: null, true: true, false: false };
  const script = new vm.Script(code + ';\n__result = ' + varName + ';');
  const ctx = vm.createContext(sandbox);
  script.runInContext(ctx);
  return sandbox.__result;
}

const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');

// Deep check DL-035 items: P1-FC-001, P1-FC-010, P1-FC-025, P1-FD-033, P1-FD-049, P1-FD-075
const sampleQIDs = ['P1-FC-001', 'P1-FC-010', 'P1-FC-025', 'P1-FD-033', 'P1-FD-049', 'P1-FD-075'];
console.log('=== DL-035 SAMPLE DEEP CHECK ===');

for (const qid of sampleQIDs) {
  const q = packC.find(i => i.QuestionID === qid) || packD.find(i => i.QuestionID === qid);
  if (!q) { console.log(qid + ': NOT FOUND'); continue; }
  const cc = q.CorrectChoice;
  const state = q.question_state;
  console.log('');
  console.log(qid + ' | CC=' + cc + ' | state=' + (state || 'MISSING') + ' | Section=' + (q.Section || '?'));
  for (const l of ['A','B','C','D']) {
    const ew = q['ExplanationWrong' + l];
    const present = ew !== undefined && ew !== null;
    const empty = present && (ew === '' || (typeof ew === 'string' && ew.trim() === ''));
    const len = present ? (typeof ew === 'string' ? ew.length : String(ew).length) : -1;
    const marker = (l === cc ? ' [CC]' : '') + (empty ? ' (EMPTY)' : '') + (!present ? ' (ABSENT)' : '');
    console.log('  EW_' + l + ': len=' + len + marker);
  }
}

// Now get full DL-026 Certified listing (all 65 items)
console.log('');
console.log('=== FULL DL-026 CERTIFIED LISTING (65 items) ===');

function findDl026Certified(pack, label) {
  const results = [];
  for (const q of pack) {
    if (q.question_state !== 'Certified') continue;
    const cc = q.CorrectChoice;
    const emptySlots = [];
    for (const l of ['A','B','C','D']) {
      if (l !== cc) {
        const ew = q['ExplanationWrong' + l];
        if (ew === undefined || ew === null || ew === '' || (typeof ew === 'string' && ew.trim() === '')) {
          emptySlots.push(l);
        }
      }
    }
    if (emptySlots.length > 0) {
      results.push({ qid: q.QuestionID, section: q.Section || '?', cc, empty_slots: emptySlots, topic: (q.Topic || '').substring(0, 60) });
    }
  }
  return results;
}

const allDl026 = [
  ...findDl026Certified(packC, 'C').map(f => ({...f, pack: 'C'})),
  ...findDl026Certified(packD, 'D').map(f => ({...f, pack: 'D'})),
  ...findDl026Certified(loadPack('pack_b_corrected.js', 'MCQ_BANK_B'), 'B').map(f => ({...f, pack: 'B'})),
];

console.log('Total: ' + allDl026.length);
allDl026.forEach(f => {
  console.log(f.qid + ' | ' + f.pack + ' | ' + f.section + ' | CC=' + f.cc + ' | empty=[' + f.empty_slots.join(',') + '] | ' + f.topic);
});

// Check P1-CC-011 specifically — was marked as remediated in S880
console.log('');
console.log('=== P1-CC-011 DEEP CHECK (S880 claimed remediation) ===');
const cc011 = packC.find(q => q.QuestionID === 'P1-CC-011');
if (cc011) {
  console.log('CC=' + cc011.CorrectChoice + ' state=' + cc011.question_state);
  for (const l of ['A','B','C','D']) {
    const ew = cc011['ExplanationWrong' + l];
    const present = ew !== undefined && ew !== null;
    const len = present ? (typeof ew === 'string' ? ew.length : String(ew).length) : -1;
    console.log('  EW_' + l + ': len=' + len + (l === cc011.CorrectChoice ? ' [CC]' : ''));
  }
}

// Check P1-CC-030 — another one flagged
console.log('');
console.log('=== P1-CC-030 DEEP CHECK ===');
const cc030 = packC.find(q => q.QuestionID === 'P1-CC-030');
if (cc030) {
  console.log('CC=' + cc030.CorrectChoice + ' state=' + cc030.question_state);
  for (const l of ['A','B','C','D']) {
    const ew = cc030['ExplanationWrong' + l];
    const present = ew !== undefined && ew !== null;
    const len = present ? (typeof ew === 'string' ? ew.length : String(ew).length) : -1;
    console.log('  EW_' + l + ': len=' + len + (l === cc030.CorrectChoice ? ' [CC]' : ''));
  }
}
