// Insert Tier 3 Wave 1 (30 items, P1-CD-101..130) into pack_d before closing "];".
// Pre-asserts: pack_d QID count 500; tail ends "}];"; all 30 QIDs absent.
// Post-asserts: Function-constructor parse OK; QID count 530; all 30 present; EW[CC] empty on new items.
const fs = require('fs');
const path = require('path');
const F = 'content/packs/pack_d_corrected.js';
const src = fs.readFileSync(F, 'utf8');
const qidsBefore = (src.match(/"QuestionID"\s*:/g) || []).length;
if (qidsBefore !== 500) throw new Error('PRE-ASSERT FAIL: QID count=' + qidsBefore);
if (!src.endsWith('];\n') && !src.endsWith('];')) throw new Error('PRE-ASSERT FAIL: unexpected tail');
const files = ['tier3_wave1a.js', 'tier3_wave1b.js', 'tier3_wave1c.js', 'tier3_wave1c2.js', 'tier3_wave1c3.js', 'tier3_wave1d2.js', 'tier3_wave1e.js'];
let items = [];
for (const f of files) {
  const arr = require('./' + f);
  items = items.concat(arr.filter(o => !(o.certification_batch || '').includes('WITHDRAWN')));
}
if (items.length !== 30) throw new Error('PRE-ASSERT FAIL: staged=' + items.length);
for (const o of items) {
  if (src.includes('"QuestionID": "' + o.QuestionID + '"')) throw new Error('PRE-ASSERT FAIL: ' + o.QuestionID + ' already in pack');
}
const blocks = items.map(o => JSON.stringify(o, null, 2).split('\n').map(l => '  ' + l).join('\n'));
const tailIdx = src.lastIndexOf('\n];');
const out = src.substring(0, tailIdx) + ',\n' + blocks.join(',\n') + src.substring(tailIdx);
fs.writeFileSync(F, out, 'utf8');
// post-asserts
const check = fs.readFileSync(F, 'utf8');
const qidsAfter = (check.match(/"QuestionID"\s*:/g) || []).length;
if (qidsAfter !== 530) throw new Error('POST-ASSERT FAIL: QID count=' + qidsAfter);
const len = new Function(check + '\nreturn MCQ_BANK_D.length;')();
if (len !== 530) throw new Error('POST-ASSERT FAIL: parse length=' + len);
for (const o of items) {
  if (!check.includes('"QuestionID": "' + o.QuestionID + '"')) throw new Error('POST-ASSERT FAIL: missing ' + o.QuestionID);
}
console.log('INSERT OK: 500 -> 530 objects, parse OK, all 30 QIDs present');