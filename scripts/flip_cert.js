// flip_cert.js — DL-051 #3c: assert Unprocessed -> set Certified for listed ItemIDs.
// Usage: node flip_cert.js <packfile> <QID> [QID...]
// Fail-safe: for each QID, locates "ItemID": "QID", then the NEXT "question_state"
// must (a) read "Unprocessed" and (b) precede any subsequent "ItemID" (same-object).
// Any deviation aborts the WHOLE batch with no writes. Reports pre/post counts.
'use strict';
const fs = require('fs');
const [,, file, ...qids] = process.argv;
if (!file || qids.length === 0) { console.log('usage: node flip_cert.js <file> <QID...>'); process.exit(2); }
if (qids.length > 30) { console.log('REFUSE: batch exceeds Rule-5 cap (30): ' + qids.length); process.exit(2); }
let t = fs.readFileSync(file, 'utf8');
const edits = [];
for (const qid of qids) {
  const idMark = '"ItemID": "' + qid + '"';
  const idPos = t.indexOf(idMark);
  if (idPos === -1) { console.log('ABORT: ItemID not found: ' + qid); process.exit(1); }
  const qsPos = t.indexOf('"question_state"', idPos);
  if (qsPos === -1) { console.log('ABORT: no question_state after ' + qid); process.exit(1); }
  const nextId = t.indexOf('"ItemID"', idPos + idMark.length);
  if (nextId !== -1 && nextId < qsPos) { console.log('ABORT: question_state belongs to another object for ' + qid); process.exit(1); }
  const seg = t.slice(qsPos, qsPos + 60);
  const m = seg.match(/^"question_state":\s*"([^"]*)"/);
  if (!m) { console.log('ABORT: unparseable question_state for ' + qid + ': ' + seg.slice(0, 60)); process.exit(1); }
  if (m[1] !== 'Unprocessed') { console.log('ABORT: ' + qid + ' state is "' + m[1] + '", expected Unprocessed'); process.exit(1); }
  edits.push({ qid, pos: qsPos, len: m[0].length });
}
// apply back-to-front (positions stable)
edits.sort((a, b) => b.pos - a.pos);
for (const e of edits) {
  t = t.slice(0, e.pos) + '"question_state": "Certified"' + t.slice(e.pos + e.len);
}
fs.writeFileSync(file, t);
// post-verify
const t2 = fs.readFileSync(file, 'utf8');
let ok = 0;
for (const qid of qids) {
  const idPos = t2.indexOf('"ItemID": "' + qid + '"');
  const qsPos = t2.indexOf('"question_state"', idPos);
  const seg = t2.slice(qsPos, qsPos + 40);
  if (/^"question_state":\s*"Certified"/.test(seg)) ok++;
  else { console.log('POST-FAIL: ' + qid); process.exit(1); }
}
console.log('FLIPPED ' + ok + '/' + qids.length + ' in ' + file);
