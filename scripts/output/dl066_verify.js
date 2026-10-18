// Verification only: confirm each output prompt appears verbatim in its raw pack file.
const fs = require('fs');
const out = JSON.parse(fs.readFileSync('scripts/output/dl066_corrected_solutions.json', 'utf8'));
const raw = {};
for (const f of ['case_pack_1_corrected.js', 'case_pack_2_corrected.js', 'case_pack_3_corrected.js']) {
  raw[f] = fs.readFileSync('content/cases/' + f, 'utf8');
}
let bad = 0, checked = 0;
for (const c of out) {
  const file = 'case_pack_' + c.bank + '_corrected.js';
  for (const it of c.items) {
    checked++;
    if (!raw[file].includes(it.prompt)) { console.log('MISSING PROMPT', it.itemId, JSON.stringify(it.prompt.slice(0, 60))); bad++; }
  }
}
console.log('checked', checked, 'missing', bad);
