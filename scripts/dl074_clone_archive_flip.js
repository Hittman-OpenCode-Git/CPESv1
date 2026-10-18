// DL-074 CLONE-ARCHIVE — P2-C-732 (learner-reachable duplicate of P2-C-710)
// Span-bounded single-object flip: question_state Certified -> Archived + stamps.
// Rule 5: 1 object. Post-asserts: parse, states, unique stems among Certified.
const fs = require('fs');

const path = 'p2/pack_p2_c.js';
const before = fs.readFileSync(path, 'utf8');

const anchor = '"QuestionID": "P2-C-732"';
const aIdx = before.indexOf(anchor);
if (aIdx < 0) throw new Error('anchor not found');
const next = before.indexOf('"Part": 2,', aIdx + 1);
if (next < 0) throw new Error('next-object boundary not found');
const span = before.slice(aIdx, next);

const occ = (span.match(/"question_state": "Certified",/g) || []).length;
if (occ !== 1) throw new Error('expected exactly 1 Certified in span, got ' + occ);

const flipped = '"question_state": "Archived",\n    "archive_batch": "DL-074-CLONE-ARCHIVE",\n    "archive_date": "2026-10-18",';
const after = before.slice(0, aIdx) + span.replace('"question_state": "Certified",', flipped) + before.slice(aIdx + span.length);
fs.writeFileSync(path, after);

// Post-asserts (Section 5 dual verification)
const src = fs.readFileSync(path, 'utf8');
const bank = new Function(src + '; return pack_p2_c_questions;')();
const q732 = bank.find(x => x.QuestionID === 'P2-C-732');
const q710 = bank.find(x => x.QuestionID === 'P2-C-710');
if (!q732 || q732.question_state !== 'Archived') throw new Error('732 not Archived');
if (q732.archive_batch !== 'DL-074-CLONE-ARCHIVE' || q732.archive_date !== '2026-10-18') throw new Error('stamps missing');
if (q710.question_state !== 'Certified') throw new Error('710 disturbed');
const certified = bank.filter(x => x.question_state === 'Certified');
const stems = new Set(certified.map(q => (q.Stem || '').trim()).filter(Boolean));
if (stems.size !== certified.filter(q => q.Stem).length) throw new Error('duplicate stems remain among Certified');
if (certified.length !== bank.length - 1) throw new Error('unexpected certified count ' + certified.length + ' of ' + bank.length);
console.log('FLIP OK:', bank.length, 'raw |', certified.length, 'Certified | 732 Archived | duplicate-stem check clean');
