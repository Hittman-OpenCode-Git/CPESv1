// flip_back.js — RECOVERY R1: assert Certified -> set Unprocessed (containment).
// Same fail-safe discipline as flip_cert.js. Usage: node flip_back.js <file> <QID...>
'use strict';
const fs = require('fs');
const [,, file, ...qids] = process.argv;
if (!file || qids.length === 0) { console.log('usage: node flip_back.js <file> <QID...>'); process.exit(2); }
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
  if (!m) { console.log('ABORT: unparseable question_state for ' + qid); process.exit(1); }
  if (m[1] !== 'Certified') { console.log('ABORT: ' + qid + ' state is "' + m[1] + '", expected Certified'); process.exit(1); }
  edits.push({ qid, pos: qsPos, len: m[0].length });
}
edits.sort((a, b) => b.pos - a.pos);
for (const e of edits) {
  t = t.slice(0, e.pos) + '"question_state": "Unprocessed"' + t.slice(e.pos + e.len);
}
fs.writeFileSync(file, t);
const t2 = fs.readFileSync(file, 'utf8');
let ok = 0;
for (const qid of qids) {
  const idPos = t2.indexOf('"ItemID": "' + qid + '"');
  const qsPos = t2.indexOf('"question_state"', idPos);
  if (/^"question_state":\s*"Unprocessed"/.test(t2.slice(qsPos, qsPos + 40))) ok++;
  else { console.log('POST-FAIL: ' + qid); process.exit(1); }
}
console.log('CONTAINED ' + ok + '/' + qids.length + ' in ' + file);
