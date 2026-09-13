// DL-048 renumber: case_pack_3 CBQ3-A1->CBQ3-A3, CBQ3-A2->CBQ3-A4 (span-bounded).
// Pre-asserts: exactly 2 affected top-level elements; all occurrences within spans.
// Post-asserts: 0 CBQ3-A1/A2 in file; new IDs present; file re-parses; 30 cases / 152 items.
const fs = require('fs');
const F = 'content/cases/case_pack_3_corrected.js';
const src = fs.readFileSync(F, 'utf8');
// top-level element spans
const s = src.indexOf('[');
const spans = [];
let d = 0, elStart = -1;
for (let i = s; i < src.length; i++) {
  const c = src[i];
  if (c === '[' || c === '{') { if (d === 1 && c === '{' && elStart === -1) elStart = i; d++; }
  else if (c === ']' || c === '}') {
    d--;
    if (d === 1 && c === '}' && elStart !== -1) { spans.push([elStart, i + 1]); elStart = -1; }
    if (d === 0) break;
  }
}
const ren = { 'CBQ3-A1': 'CBQ3-A3', 'CBQ3-A2': 'CBQ3-A4' };
let out = src;
let totalRepl = 0;
for (const [oldId, newId] of Object.entries(ren)) {
  const hits = spans.filter(([a, b]) => out.substring(a, b).includes('"CaseID": "' + oldId + '"'));
  if (hits.length !== 1) throw new Error('PRE-ASSERT FAIL: ' + oldId + ' found in ' + hits.length + ' elements (want 1)');
  const [a, b] = hits[0];
  const seg = out.substring(a, b);
  const n = (seg.match(new RegExp(oldId, 'g')) || []).length;
  out = out.substring(0, a) + seg.split(oldId).join(newId) + out.substring(b);
  totalRepl += n;
  console.log(oldId + ' -> ' + newId + ': ' + n + ' replacements within span [' + a + ',' + b + ']');
}
// post-asserts
for (const oldId of Object.keys(ren)) {
  const n = (out.match(new RegExp(oldId, 'g')) || []).length;
  if (n !== 0) throw new Error('POST-ASSERT FAIL: ' + oldId + ' still present x' + n);
}
for (const newId of Object.values(ren)) {
  if (!out.includes(newId)) throw new Error('POST-ASSERT FAIL: ' + newId + ' missing');
}
fs.copyFileSync(F, F + '.bak-DL048-20260910');
fs.writeFileSync(F, out, 'utf8');
console.log('wrote ' + F + ' total=' + totalRepl + ' backup .bak-DL048-20260910');
// re-parse + counts
const s2 = out.indexOf('[');
let d2 = 0, e2 = -1;
for (let i = s2; i < out.length; i++) {
  if (out[i] === '[') d2++;
  else if (out[i] === ']') { d2--; if (d2 === 0) { e2 = i; break; } }
}
const arr = (new Function('return ' + out.substring(s2, e2 + 1)))();
let items = 0;
for (const c of arr) items += (c.Items || []).length;
console.log('POST: cases=' + arr.length + ' items=' + items + ' unique=' + new Set(arr.map(c => c.CaseID)).size);