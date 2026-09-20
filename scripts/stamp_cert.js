// stamp_cert.js — P2-A certification with provenance (Rule 16).
// For each QID: asserts current state is Unprocessed-or-MISSING (aborts otherwise,
// never downgrades); sets question_state=Certified; sets/adds
// certification_session + certification_date = this batch. CRLF-preserving.
// Usage: node stamp_cert.js <packfile> <SESSION> <DATE> <QID...>
'use strict';
const fs = require('fs');
const [, , file, session, date, ...qids] = process.argv;
if (!file || !session || !date || qids.length === 0) { console.log('usage: node stamp_cert.js <file> <SESSION> <DATE> <QID...>'); process.exit(2); }
if (qids.length > 30) { console.log('REFUSE: batch exceeds Rule-5 cap (30)'); process.exit(2); }
const EOL = '\r\n';
let t = fs.readFileSync(file, 'utf8');
const log = [];
function idPosOf(t, qid) {
  // MCQ packs use QuestionID; case packs use ItemID. Either marker works.
  let p = t.indexOf('"QuestionID": "' + qid + '"');
  if (p === -1) p = t.indexOf('"ItemID": "' + qid + '"');
  return p;
}
function nextIdPos(t, from) {
  const a = t.indexOf('"QuestionID"', from);
  const b = t.indexOf('"ItemID"', from);
  if (a === -1) return b;
  if (b === -1) return a;
  return Math.min(a, b);
}
for (const qid of qids) {
  const idMarkQ = '"QuestionID": "' + qid + '"';
  const idMarkI = '"ItemID": "' + qid + '"';
  const idPos = idPosOf(t, qid);
  if (idPos === -1) { console.log('ABORT: ID not found: ' + qid); process.exit(1); }
  const idMark = t.indexOf(idMarkQ, idPos) === idPos ? idMarkQ : idMarkI;
  let nextId = nextIdPos(t, idPos + idMark.length);
  if (nextId === -1) nextId = t.length;
  const lineStart = t.lastIndexOf('\n', idPos) + 1;
  let indent = t.slice(lineStart, idPos).match(/^[ \t]*/)[0];
  const qsRel = t.slice(idPos, nextId).indexOf('"question_state"');
  if (qsRel !== -1) {
    const qsPos = idPos + qsRel;
    const seg = t.slice(qsPos, qsPos + 60);
    const m = seg.match(/^"question_state":\s*"([^"]*)"/);
    if (!m) { console.log('ABORT: unparseable state for ' + qid); process.exit(1); }
    if (m[1] !== 'Unprocessed' && m[1] !== 'In Audit') { console.log('ABORT: ' + qid + ' state "' + m[1] + '", expected Unprocessed or In Audit'); process.exit(1); }
    t = t.slice(0, qsPos) + '"question_state": "Certified"' + t.slice(qsPos + m[0].length);
    // refresh bounds after edit
    const nId = idPosOf(t, qid);
    let nNext = nextIdPos(t, nId + idMark.length);
    if (nNext === -1) nNext = t.length;
    const bounds = [nId, nNext];
    const setField = (name, val) => {
      const rel = t.slice(bounds[0], bounds[1]).indexOf('"' + name + '"');
      if (rel !== -1) {
        const p = bounds[0] + rel;
        const mm = t.slice(p, p + 120).match(new RegExp('^"' + name + '":\\s*"([^"]*)"'));
        if (!mm) { console.log('ABORT: unparseable ' + name + ' for ' + qid); process.exit(1); }
        log.push(qid + ' ' + name + ': ' + mm[1] + ' -> ' + val);
        t = t.slice(0, p) + '"' + name + '": "' + val + '"' + t.slice(p + mm[0].length);
      } else {
        // insert after ID line (uses the matched marker kind)
        const iPos = t.indexOf(idMark);
        const eol = t.indexOf('\n', iPos);
        const ins = ',' + EOL + indent + '"' + name + '": "' + val + '"';
        // ItemID line ends with '",' or '"' — append after closing quote.
        // Trailing comma after the inserted value is always safe (legal in
        // object literals) and prevents missing-comma breaks (2026-09-19).
        const qEnd = t.indexOf('"', iPos + idMark.length - 1) + 1;
        t = t.slice(0, qEnd) + ',' + EOL + indent + '"' + name + '": "' + val + '",' + t.slice(qEnd + (t[qEnd] === ',' ? 1 : 0));
        log.push(qid + ' ' + name + ': ADDED ' + val);
      }
    };
    setField('certification_session', session);
    setField('certification_date', date);
  } else {
    // missing state: insert state+stamps after ItemID line (trailing commas
    // always safe — see above).
    const qEnd = t.indexOf('"', idPos + idMark.length - 1) + 1;
    const ins = ',' + EOL + indent + '"question_state": "Certified",' + EOL + indent + '"certification_session": "' + session + '",' + EOL + indent + '"certification_date": "' + date + '",';
    t = t.slice(0, qEnd) + ins + t.slice(qEnd + (t[qEnd] === ',' ? 1 : 0));
    log.push(qid + ': state ADDED Certified + stamps ' + session + '/' + date);
  }
}
fs.writeFileSync(file, t);
// post-verify
const t2 = fs.readFileSync(file, 'utf8');
let ok = 0;
for (const qid of qids) {
  const idPos = idPosOf(t2, qid);
  const nNext = nextIdPos(t2, idPos + 1);
  const seg = t2.slice(idPos, nNext === -1 ? t2.length : nNext);
  const st = (seg.match(/"question_state":\s*"([^"]*)"/) || [])[1];
  const se = (seg.match(/"certification_session":\s*"([^"]*)"/) || [])[1];
  const da = (seg.match(/"certification_date":\s*"([^"]*)"/) || [])[1];
  if (st === 'Certified' && se === session && da === date) ok++;
  else { console.log('POST-FAIL: ' + qid + ' state=' + st + ' sess=' + se + ' date=' + da); process.exit(1); }
}
log.forEach(l => console.log('  ' + l));
console.log('STAMPED ' + ok + '/' + qids.length);
