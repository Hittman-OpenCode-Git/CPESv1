// S380 Residual Defect Board — Independent Object-Boundary Scan
// READ-ONLY — no file modifications

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

const packs = {
  A: { file: 'pack_a_corrected.js', var: 'MCQ_BANK_A' },
  B: { file: 'pack_b_corrected.js', var: 'MCQ_BANK_B' },
  C: { file: 'pack_c_corrected.js', var: 'MCQ_BANK_C' },
  D: { file: 'pack_d_corrected.js', var: 'MCQ_BANK_D' },
  E: { file: 'pack_e_corrected.js', var: 'MCQ_BANK_E' },
};

const allFindings = { dl008: [], dl026: [] };

for (const [key, cfg] of Object.entries(packs)) {
  const arr = loadPack(cfg.file, cfg.var);
  const certCount = arr.filter(q => q.question_state === 'Certified').length;
  console.log('Pack ' + key + ': ' + arr.length + ' items, ' + certCount + ' Certified');

  for (const q of arr) {
    const cc = q.CorrectChoice;
    const state = q.question_state;
    const qid = q.QuestionID || 'UNKNOWN';
    const section = q.Section || '?';
    const topic = q.Topic || '?';
    const stem = q.Stem ? q.Stem.substring(0, 80) : '?';

    // DL-008: ExplanationWrong[CorrectChoice] non-empty
    const ewCC = q['ExplanationWrong' + cc];
    if (ewCC !== undefined && ewCC !== null && ewCC !== '' && typeof ewCC === 'string' && ewCC.trim() !== '') {
      allFindings.dl008.push({
        qid, pack: key, section, topic, stem, cc,
        ew_cc_length: ewCC.length,
        ew_cc_preview: ewCC.substring(0, 150),
        certified: state === 'Certified',
        state: state || 'MISSING'
      });
    }

    // DL-026: Empty non-CC ExplanationWrong slots
    const emptySlots = [];
    for (const letter of ['A', 'B', 'C', 'D']) {
      if (letter !== cc) {
        const ew = q['ExplanationWrong' + letter];
        if (ew === undefined || ew === null || ew === '' || (typeof ew === 'string' && ew.trim() === '')) {
          emptySlots.push(letter);
        }
      }
    }
    if (emptySlots.length > 0) {
      allFindings.dl026.push({
        qid, pack: key, section, topic, stem, cc,
        empty_slots: emptySlots,
        empty_count: emptySlots.length,
        certified: state === 'Certified',
        state: state || 'MISSING'
      });
    }
  }
}

console.log('');
console.log('=== SCAN SUMMARY ===');
const d8 = allFindings.dl008;
const d26 = allFindings.dl026;
console.log('DL-008: ' + d8.length + ' total (' + d8.filter(f => f.certified).length + ' Certified, ' + d8.filter(f => !f.certified).length + ' non-Certified)');
console.log('DL-026: ' + d26.length + ' total (' + d26.filter(f => f.certified).length + ' Certified, ' + d26.filter(f => !f.certified).length + ' non-Certified)');

console.log('');
console.log('=== PER-PACK ===');
for (const k of Object.keys(packs)) {
  const d8k = d8.filter(f => f.pack === k);
  const d26k = d26.filter(f => f.pack === k);
  console.log('Pack ' + k + ': DL-008=' + d8k.length + ' (' + d8k.filter(f => f.certified).length + ' cert), DL-026=' + d26k.length + ' (' + d26k.filter(f => f.certified).length + ' cert)');
}

console.log('');
console.log('=== DL-008 CERTIFIED ITEMS ===');
d8.filter(f => f.certified).forEach(f => {
  console.log(f.qid + ' | Pack ' + f.pack + ' | ' + f.section + ' | CC=' + f.cc + ' | len=' + f.ew_cc_length + ' | preview: ' + f.ew_cc_preview);
});

console.log('');
console.log('=== DL-008 NON-CERTIFIED ITEMS ===');
d8.filter(f => !f.certified).forEach(f => {
  console.log(f.qid + ' | Pack ' + f.pack + ' | ' + f.section + ' | CC=' + f.cc + ' | len=' + f.ew_cc_length + ' | state=' + f.state + ' | preview: ' + f.ew_cc_preview);
});

console.log('');
console.log('=== DL-026 CERTIFIED BY SECTION ===');
const d26cert = d26.filter(f => f.certified);
const bySec = {};
d26cert.forEach(f => { const k = f.pack + '-' + f.section; bySec[k] = (bySec[k] || 0) + 1; });
Object.entries(bySec).sort().forEach(([k, v]) => console.log('  ' + k + ': ' + v + ' items'));

console.log('');
console.log('=== DL-026 CERTIFIED ITEMS (first 30) ===');
d26cert.slice(0, 30).forEach(f => {
  console.log(f.qid + ' | Pack ' + f.pack + ' | ' + f.section + ' | CC=' + f.cc + ' | empty=[' + f.empty_slots.join(',') + ']');
});

// Save full results
fs.writeFileSync('scripts/output/S380_FULL_SCAN.json', JSON.stringify(allFindings, null, 2));
console.log('');
console.log('Full scan written to scripts/output/S380_FULL_SCAN.json');
