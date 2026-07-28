const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');

const packs = {
  'pack_b_corrected.js': { var: 'MCQ_BANK_B', qids: ['P1B-E-102', 'P1B-E-107', 'P1B-F-116'] },
  'pack_c_corrected.js': { var: 'MCQ_BANK_C', qids: ['P1-DC-061','P1-DC-062','P1-DC-063','P1-DC-064','P1-DC-065','P1-FC-001','P1-FC-002','P1-FC-003','P1-FC-004'] },
  'pack_d_corrected.js': { var: 'MCQ_BANK_D', qids: ['P1-FD-061','P1-FD-062','P1-FD-063','P1-FD-064','P1-FD-065'] },
};

let ok = 0, fail = 0;
for (const [pf, cfg] of Object.entries(packs)) {
  const content = fs.readFileSync(path.join(BASE, pf), 'utf8');
  const fn = new Function(content + '; return ' + cfg.var + ';');
  const items = fn();
  for (const qid of cfg.qids) {
    const item = items.find(i => i.QuestionID === qid);
    if (!item) { console.log(qid + ': NOT FOUND'); fail++; continue; }
    const pass = item.Difficulty === 'Easy' && item.DifficultyScore === 1;
    console.log(qid.padEnd(16) + ' | ' + (item.Difficulty+'').padEnd(14) + ' | Score=' + item.DifficultyScore + ' | ' + (pass ? 'OK' : 'FAIL'));
    if (pass) ok++; else fail++;
  }
}
console.log('\n' + ok + ' OK, ' + fail + ' FAIL');
