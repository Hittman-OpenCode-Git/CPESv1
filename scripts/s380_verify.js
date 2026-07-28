// S380 Phase 2 — Deep Verification & Cross-Reference

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

// Load all packs
const packC = loadPack('pack_c_corrected.js', 'MCQ_BANK_C');
const packD = loadPack('pack_d_corrected.js', 'MCQ_BANK_D');
const packB = loadPack('pack_b_corrected.js', 'MCQ_BANK_B');

// DL-035 QID list (from DEFECT_LIBRARY.md DL-035 entry)
const dl035 = {
  PackC: ['P1-FC-001','P1-FC-006','P1-FC-007','P1-FC-010','P1-FC-015','P1-FC-020','P1-FC-025','P1-FC-026','P1-FC-031','P1-FC-036','P1-FC-043','P1-FC-048','P1-FC-053','P1-FC-058','P1-FC-063','P1-FC-068','P1-FC-073','P1-FC-074','P1-FC-075','P1-FD-001','P1-FD-006','P1-FD-011','P1-FD-016','P1-FD-021','P1-FD-026','P1-FD-027','P1-FD-030','P1-FD-031'],
  PackD: ['P1-FD-033','P1-FD-034','P1-FD-043','P1-FD-049','P1-FD-054','P1-FD-059','P1-FD-064','P1-FD-069','P1-FD-073','P1-FD-074','P1-FD-075']
};

// Check DL-035 items for DL-026 (empty non-CC EW slots)
console.log('=== DL-035 CROSS-REFERENCE: Domain F Items ===');
console.log('');
for (const [packLabel, pack, qids] of [['Pack C', packC, dl035.PackC], ['Pack D', packD, dl035.PackD]]) {
  let dl026Count = 0;
  let cleanCount = 0;
  for (const qid of qids) {
    const q = pack.find(item => item.QuestionID === qid);
    if (!q) { console.log('  NOT FOUND: ' + qid); continue; }
    const cc = q.CorrectChoice;
    const state = q.question_state;
    const emptySlots = [];
    for (const letter of ['A','B','C','D']) {
      if (letter !== cc) {
        const ew = q['ExplanationWrong' + letter];
        if (ew === undefined || ew === null || ew === '' || (typeof ew === 'string' && ew.trim() === '')) {
          emptySlots.push(letter);
        }
      }
    }
    if (emptySlots.length > 0) {
      dl026Count++;
    } else {
      cleanCount++;
    }
  }
  console.log(packLabel + ': ' + dl026Count + ' with DL-026, ' + cleanCount + ' clean (of ' + qids.length + ' total)');
}

// Check specific Domain F items for details
console.log('');
console.log('=== DOMAIN F SECTION-WIDE SCAN ===');

function scanDomainF(pack, label) {
  // Find all Section F items using regex match on QID
  const fItems = pack.filter(q => {
    const qid = q.QuestionID || '';
    return qid.includes('FC-') || qid.includes('FD-') || (q.Section === 'F');
  });
  console.log('');
  console.log(label + ' Section F items: ' + fItems.length);
  const cert = fItems.filter(q => q.question_state === 'Certified');
  console.log('  Certified: ' + cert.length);
  
  const dl026Cert = cert.filter(q => {
    const cc = q.CorrectChoice;
    for (const l of ['A','B','C','D']) {
      if (l !== cc) {
        const ew = q['ExplanationWrong' + l];
        if (ew === undefined || ew === null || ew === '' || (typeof ew === 'string' && ew.trim() === '')) return true;
      }
    }
    return false;
  });
  console.log('  Certified with DL-026: ' + dl026Cert.length);
  if (dl026Cert.length > 0) {
    dl026Cert.forEach(q => {
      const cc = q.CorrectChoice;
      const es = []; for (const l of ['A','B','C','D']) { if (l !== cc) { const ew = q['ExplanationWrong' + l]; if (ew === undefined || ew === null || ew === '' || (typeof ew === 'string' && ew.trim() === '')) es.push(l); } }
      console.log('    ' + q.QuestionID + ' CC=' + cc + ' empty=[' + es.join(',') + ']');
    });
  }
}

scanDomainF(packC, 'Pack C');
scanDomainF(packD, 'Pack D');

// Verify the 5 Certified DL-008 items with full field dump
console.log('');
console.log('=== CERTIFIED DL-008 VERIFICATION ===');
const d8Certs = [
  { pack: packB, qid: 'P1B-C-153' },
  { pack: packC, qid: 'P1-CC-015' },
  { pack: packC, qid: 'P1-EC-031' },
  { pack: packD, qid: 'P1-ED-016' },
  { pack: packD, qid: 'P1-ED-051' },
];

for (const { pack, qid } of d8Certs) {
  const q = pack.find(item => item.QuestionID === qid);
  if (!q) { console.log(qid + ': NOT FOUND'); continue; }
  const cc = q.CorrectChoice;
  const ewCC = q['ExplanationWrong' + cc];
  console.log('');
  console.log('--- ' + qid + ' ---');
  console.log('CorrectChoice: ' + cc);
  console.log('question_state: ' + (q.question_state || 'MISSING'));
  console.log('Section: ' + (q.Section || '?'));
  console.log('Topic: ' + (q.Topic || '?'));
  console.log('Stem (first 150): ' + (q.Stem ? q.Stem.substring(0, 150) : 'MISSING'));
  console.log('ExplanationWrong' + cc + ' length: ' + (ewCC ? ewCC.length : 'undefined'));
  console.log('ExplanationWrong' + cc + ': ' + (ewCC ? ewCC.substring(0, 300) : 'undefined'));
  // Check if ExplanationCorrect contains this text too (Bucket 1 pattern)
  if (q.ExplanationCorrect && ewCC) {
    const ec = q.ExplanationCorrect;
    const overlap = ewCC.length > 0 && ec.includes(ewCC.substring(0, Math.min(50, ewCC.length)));
    console.log('ExplanationWrong[CC] is subset of ExplanationCorrect: ' + overlap);
    console.log('ExplanationCorrect length: ' + (ec ? ec.length : 0));
  }
  // Check all EW fields
  for (const l of ['A','B','C','D']) {
    const ew = q['ExplanationWrong' + l];
    const present = ew !== undefined && ew !== null;
    const empty = present && (ew === '' || (typeof ew === 'string' && ew.trim() === ''));
    const len = present ? (typeof ew === 'string' ? ew.length : String(ew).length) : -1;
    const marker = (l === cc ? ' [CC]' : '') + (empty ? ' (empty)' : '') + (!present ? ' (ABSENT)' : '');
    console.log('  EW_' + l + ': present=' + present + ' len=' + len + marker);
  }
}

// DL-008 non-certified summary
console.log('');
console.log('=== DL-008 NON-CERTIFIED SUMMARY ===');
const allPacks = {
  B: packB, C: packC, D: packD,
};
const nonCertD8 = [];
for (const [label, pack] of Object.entries(allPacks)) {
  for (const q of pack) {
    const cc = q.CorrectChoice;
    const state = q.question_state;
    if (state !== 'Certified') {
      const ewCC = q['ExplanationWrong' + cc];
      if (ewCC !== undefined && ewCC !== null && ewCC !== '' && typeof ewCC === 'string' && ewCC.trim() !== '') {
        nonCertD8.push({ qid: q.QuestionID, pack: label, section: q.Section, cc, state, len: ewCC.length });
      }
    }
  }
}
console.log('Count: ' + nonCertD8.length);
nonCertD8.forEach(f => console.log('  ' + f.qid + ' | ' + f.pack + ' | ' + f.section + ' | CC=' + f.cc + ' | state=' + f.state + ' | len=' + f.len));

// Check P1B-C-153 specifically — this should be in a "clean" pack
console.log('');
console.log('=== P1B-C-153 FULL CONTEXT ===');
const b153 = packB.find(q => q.QuestionID === 'P1B-C-153');
if (b153) {
  console.log('All keys: ' + Object.keys(b153).join(', '));
  console.log('CorrectChoice: ' + b153.CorrectChoice);
  console.log('question_state: ' + b153.question_state);
  console.log('Section: ' + b153.Section);
  // Check for dual-block architecture
  const hasChoiceA = 'ChoiceA' in b153;
  const hasChoices = 'Choices' in b153;
  console.log('Has flat ChoiceA-D: ' + hasChoiceA);
  console.log('Has nested Choices.{A-D}: ' + hasChoices);
  if (hasChoices && typeof b153.Choices === 'object') {
    console.log('Choices keys: ' + Object.keys(b153.Choices).join(', '));
  }
}
