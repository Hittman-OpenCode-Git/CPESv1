// Insert Tier 3 Wave 12 (30 items, P1B-A-151..180) into pack_b before closing "];".
// Pre-asserts: pack_b QID count 560; all 30 QIDs absent.
// Post-asserts: Function-constructor parse OK; QID count 590; all 30 present.
const fs = require('fs');
const F = 'content/packs/pack_b_corrected.js';
const src = fs.readFileSync(F, 'utf8');
const qidsBefore = (src.match(/"QuestionID"\s*:/g) || []).length;
if (qidsBefore !== 560) throw new Error('PRE-ASSERT FAIL: QID count=' + qidsBefore);
const files = ['tier3_wave12a.js', 'tier3_wave12b.js', 'tier3_wave12b2.js', 'tier3_wave12c.js'];
let items = [];
for (const f of files) {
  const arr = require('./' + f);
  items = items.concat(arr.filter(o => !(o.certification_batch || '').includes('WITHDRAWN')));
}
if (items.length !== 30) throw new Error('PRE-ASSERT FAIL: staged=' + items.length);
for (const o of items) {
  if (src.includes('"QuestionID": "' + o.QuestionID + '"')) throw new Error('PRE-ASSERT FAIL: ' + o.QuestionID + ' already in pack');
  if (!/^P1B-A-1([5-7][0-9]|80)$/.test(o.QuestionID)) throw new Error('PRE-ASSERT FAIL: range ' + o.QuestionID);
}
const blocks = items.map(o => JSON.stringify(o, null, 2).split('\n').map(l => '  ' + l).join('\n'));
const tailIdx = src.lastIndexOf('\n];');
if (tailIdx === -1) throw new Error('PRE-ASSERT FAIL: no closing ];');
const out = src.substring(0, tailIdx) + ',\n' + blocks.join(',\n') + src.substring(tailIdx);
fs.writeFileSync(F, out, 'utf8');
const check = fs.readFileSync(F, 'utf8');
const qidsAfter = (check.match(/"QuestionID"\s*:/g) || []).length;
if (qidsAfter !== 590) throw new Error('POST-ASSERT FAIL: QID count=' + qidsAfter);
const varName = (check.match(/(?:const|var|let)\s+(MCQ_BANK_B\w*)\s*=/) || [])[1];
const len = new Function(check + '\nreturn ' + varName + '.length;')();
if (len !== 590) throw new Error('POST-ASSERT FAIL: parse length=' + len);
for (const o of items) {
  if (!check.includes('"QuestionID": "' + o.QuestionID + '"')) throw new Error('POST-ASSERT FAIL: missing ' + o.QuestionID);
}
console.log('INSERT OK: 560 -> 590 objects, parse OK, all 30 QIDs present');