// Insert Tier 3 Wave 15 (30 items, P1B-C-211..240) into pack_b before closing "];".
// Pre-asserts: pack_b QID count 590; all 30 QIDs absent.
// Post-asserts: Function-constructor parse OK; QID count 620; all 30 present.
const fs = require('fs');
const F = 'content/packs/pack_b_corrected.js';
const src = fs.readFileSync(F, 'utf8');
const qidsBefore = (src.match(/"QuestionID"\s*:/g) || []).length;
if (qidsBefore !== 590) throw new Error('PRE-ASSERT FAIL: QID count=' + qidsBefore);
const files = ['tier3_wave15a.js', 'tier3_wave15b.js', 'tier3_wave15c.js'];
let items = [];
for (const f of files) {
  items = items.concat(require('./' + f));
}
if (items.length !== 30) throw new Error('PRE-ASSERT FAIL: staged=' + items.length);
for (const o of items) {
  if (src.includes('"QuestionID": "' + o.QuestionID + '"')) throw new Error('PRE-ASSERT FAIL: ' + o.QuestionID + ' already in pack');
  if (!/^P1B-C-2([1-3][0-9]|40)$/.test(o.QuestionID)) throw new Error('PRE-ASSERT FAIL: range ' + o.QuestionID);
}
const blocks = items.map(o => JSON.stringify(o, null, 2).split('\n').map(l => '  ' + l).join('\n'));
const tailIdx = src.lastIndexOf('\n];');
if (tailIdx === -1) throw new Error('PRE-ASSERT FAIL: no closing ];');
const out = src.substring(0, tailIdx) + ',\n' + blocks.join(',\n') + src.substring(tailIdx);
fs.writeFileSync(F, out, 'utf8');
const check = fs.readFileSync(F, 'utf8');
const qidsAfter = (check.match(/"QuestionID"\s*:/g) || []).length;
if (qidsAfter !== 620) throw new Error('POST-ASSERT FAIL: QID count=' + qidsAfter);
const varName = (check.match(/(?:const|var|let)\s+(MCQ_BANK_B\w*)\s*=/) || [])[1];
if (!varName) throw new Error('POST-ASSERT FAIL: bank var not found');
const len = new Function(check + '\nreturn ' + varName + '.length;')();
if (len !== 620) throw new Error('POST-ASSERT FAIL: parse length=' + len);
for (const o of items) {
  if (!check.includes('"QuestionID": "' + o.QuestionID + '"')) throw new Error('POST-ASSERT FAIL: missing ' + o.QuestionID);
}
console.log('INSERT OK: 590 -> 620 objects, parse OK, all 30 QIDs present');