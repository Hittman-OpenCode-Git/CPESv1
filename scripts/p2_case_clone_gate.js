// P2 case clone gate — AGENTS.md §19.4.
// Pairwise across ALL packs on (normalized numeric-literal multiset + Topic).
// Jaccard/similarity alone is insufficient: it misses rotation-clones whose
// prose was traded but whose numbers and topic were preserved.
// Precedent: DL-046-P2 (P2-C-181 shared distractor padding error).
const fs = require('fs');
const path = require('path');

const BASE = path.resolve(__dirname, '..');
const BANKS = [
  { file: 'content/cases/case_pack_1_corrected.js', part: 'P1' },
  { file: 'content/cases/case_pack_2_corrected.js', part: 'P1' },
  { file: 'content/cases/case_pack_3_corrected.js', part: 'P1' },
  { file: 'p2/case_pack_p2_1.js', part: 'P2' },
  { file: 'p2/case_pack_p2_2.js', part: 'P2' },
  { file: 'p2/case_pack_p2_3.js', part: 'P2' },
];

const CaseExtractor = require('./lib/CaseExtractor');

// Known false-positive set — documented, reviewed, not to be re-litigated.
const FP_ALLOW = new Set([
  // same-bank sibling items are distinct by ItemID and are NOT clones
]);

/** Normalize a numeric literal so $1,364,000 === 1364000 === $1364000 */
function normalizeNumbers(s) {
  return (String(s || '').match(/-?\d[\d,]*\.?\d*/g) || [])
    .map(t => t.replace(/,/g, ''))
    .filter(t => t !== '' && t !== '-' && !isNaN(parseFloat(t)))
    .map(t => String(parseFloat(t)))
    .sort();
}
const multisetKey = arr => arr.slice().sort().join('|');
function hashKey(arr) { return multisetKey(arr); }

function itemNumbers(it) {
  const parts = [];
  const push = v => { if (typeof v === 'string') parts.push(v); else if (typeof v === 'number') parts.push(String(v)); };
  push(it.Prompt);
  if (Array.isArray(it.Choices)) it.Choices.forEach(push);
  else if (it.Choices && typeof it.Choices === 'object') Object.values(it.Choices).forEach(push);
  push(it.Correct); push(it.Explanation); push(it.ExplanationCorrect);
  Object.values(it.ExplanationWrongA ? { a: it.ExplanationWrongA, b: it.ExplanationWrongB,
    c: it.ExplanationWrongC, d: it.ExplanationWrongD } : {}).forEach(push);
  const c = it.Correct;
  if (Array.isArray(c)) c.forEach(push);
  return normalizeNumbers(parts.join(' | '));
}

// Case-level fingerprint: canonicalize title + scenario + company + every
// item's prompt/choices/correct/explanation. Rotation-clones preserve numbers
// and Topic but differ in prose; whole-case duplicates are identical here.
const canon = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
function caseFingerprint(c) {
  const crypto = require('crypto');
  const parts = [canon(c.Title), canon(c.ScenarioText), canon(c.CompanyName)];
  const sorted = (c.Items || []).slice()
    .sort((a, b) => String(a.ItemID).localeCompare(String(b.ItemID)));
  for (const it of sorted) {
    parts.push(canon(it.Prompt));
    if (Array.isArray(it.Choices)) it.Choices.forEach(x => parts.push(canon(x)));
    else if (it.Choices && typeof it.Choices === 'object') Object.values(it.Choices).forEach(x => parts.push(canon(x)));
    parts.push(canon(typeof it.Correct === 'string' ? it.Correct : JSON.stringify(it.Correct)));
    parts.push(canon(it.Explanation || it.ExplanationCorrect));
  }
  return crypto.createHash('sha256').update(parts.join('|')).digest('hex');
}

const results = [];
let scanned = 0;
const byKey = new Map();
const caseBuckets = new Map();
const census = { banks: 0, cases: 0, items: 0 };

for (const b of BANKS) {
  const abs = path.join(BASE, b.file);
  if (!fs.existsSync(abs)) { console.error('FAIL: missing bank ' + b.file); process.exit(1); }
  let cases;
  try { cases = CaseExtractor.extractFromContent(fs.readFileSync(abs, 'utf8')); }
  catch (e) { console.error('FAIL: extract threw for ' + b.file + ': ' + e.message); process.exit(1); }
  // CaseExtractor swallows parse errors and returns null. Treating that as a
  // skip would make the gate blind to an entire bank — and CaseExtractor
  // returning 33 for a 34-case file is exactly the silent-drop failure class
  // Rule 20 exists to prevent. Fail closed instead.
  if (!cases || !cases.length) {
    console.error('FAIL: CaseExtractor returned no cases for ' + b.file +
                  ' (silent-drop risk — refusing to certify on a partial view)');
    process.exit(1);
  }
  // Cross-check extractor output against a raw array-literal parse.
  const raw = fs.readFileSync(abs, 'utf8').replace(/^\uFEFF/, '');
  try {
    const rawArr = new Function('return ' + raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1))();
    if (Array.isArray(rawArr) && rawArr.length !== cases.length) {
      console.error('FAIL: ' + b.file + ' extractor=' + cases.length +
                    ' raw=' + rawArr.length + ' — extraction dropped cases (Rule 20 class)');
      process.exit(1);
    }
  } catch (e) { /* raw cross-check unavailable; extractor result stands */ }

  census.banks++;
  for (const c of cases) {
    census.cases++; census.items += (c.Items || []).length;
    const caseState = String(c.question_state || '').trim();
    // DL-P2-024: an Archived copy is resolved, not a live duplicate. Only
    // cases that can reach a learner (Certified) or are pending adjudication
    // (In Audit) are compared; Archived is terminal.
    census.archived = (census.archived || 0) + (caseState === 'Archived' ? 1 : 0);
    if (caseState === 'Archived') continue;
    const fp = caseFingerprint(c);
    if (!caseBuckets.has(fp)) caseBuckets.set(fp, []);
    caseBuckets.get(fp).push({ caseId: c.CaseID, bank: b.file, part: b.part,
      state: caseState, items: (c.Items || []).length });
    for (const it of (c.Items || [])) {
      scanned++;
      const nums = itemNumbers(it);
      if (!nums.length) continue;                 // no numbers -> not comparable
      const topic = String(it.Topic || '').trim().toLowerCase();
      if (!topic) continue;                       // Topic required per §19.4
      const key = hashKey(nums) + '::' + topic;
      if (!byKey.has(key)) byKey.set(key, []);
      byKey.get(key).push({ bank: b.file, part: b.part, caseId: c.CaseID, itemId: it.ItemID,
                            topic: it.Topic, nums: nums.length });
    }
  }
}

// Emit suspected clones: same (numeric multiset + Topic), different ItemID.
const groups = [];
for (const [key, members] of byKey) {
  if (members.length < 2) continue;
  const ids = new Set(members.map(m => m.itemId));
  if (ids.size < 2) continue;                     // same item indexed twice
  groups.push({ key, members });
}

// Duplicates already filed and tracked in the defect library. These are KNOWN
// and are hard-blocked from certification by case_cert_batch_gate.js, so they
// must not fail the pipeline — but any clone NOT listed here fails immediately.
// Keyed on the whole-case fingerprint so a *different* duplicate still trips.
// ACKNOWLEDGED keys are canonicalised on insert: sorted + joined with '||'.
// Sorting is lexicographic, so CBQ22-C10 precedes CBQ22-C5 — writing the
// entries in semantic order would silently fail to match.
function ackKey(ids) { return ids.slice().sort().join('||'); }
const ACKNOWLEDGED = new Set([
  // DL-P2-024 — five whole-case duplicates across P2 banks (CBQ22-F7/F8 is the
  // only learner-reachable pair). Filed 2026-09-30, adjudication pending.
  ackKey(['CBQ22-F7', 'CBQ22-F8']), ackKey(['CBQ22-C7', 'CBQ22-C12']),
  ackKey(['CBQ22-A5', 'CBQ22-A8']), ackKey(['CBQ22-F5', 'CBQ22-F9']),
  ackKey(['CBQ22-F6', 'CBQ22-F10']),
  // DL-P2-024 — whole-case duplicates whose items surface as Class B groups.
  ackKey(['CBQ22-C4', 'CBQ22-C9']), ackKey(['CBQ22-C5', 'CBQ22-C10']),
  ackKey(['CBQ22-C6', 'CBQ22-C11']), ackKey(['CBQ22-A6', 'CBQ22-A7']),
  // CBQ21-F3 / CBQ22-F1 share one Topic + number pair but are distinct cases
  // (different scenario, different company). Documented FP.
  ackKey(['CBQ21-F3', 'CBQ22-F1']),
]);

function isAcknowledged(members) {
  // Class A members carry caseId; Class B members carry caseId AND itemId.
  // Key both on the owning case so an item-level group inherits its case
  // pair's disposition.
  const caseIds = members.map(x => x.caseId).filter(Boolean);
  if (!caseIds.length) return false;
  return ACKNOWLEDGED.has(ackKey(caseIds));
}

// ── Class 2: whole-case duplicates (identical fingerprint across banks) ──
const dupeGroups = [...caseBuckets.entries()].filter(([, m]) => m.length > 1);
const allCertifiedDupes = dupeGroups.filter(([, m]) => m.every(x => x.state === 'Certified'));

const unackedDupeGroups = dupeGroups.filter(([, m]) => !isAcknowledged(m));
const unackedCloneGroups = groups.filter(g => !isAcknowledged(g.members));

console.log('=== P2 CASE CLONE GATE ===');
console.log('banks scanned: ' + BANKS.length + '   cases: ' + census.cases + '   items: ' + census.items);
console.log('unique case fingerprints: ' + caseBuckets.size +
            '   duplicate groups: ' + dupeGroups.length);
console.log('');
console.log('CLASS A — whole-case duplicates: ' + dupeGroups.length +
            ' (' + unackedDupeGroups.length + ' unacknowledged)');
for (const [, m] of dupeGroups) {
  const ack = isAcknowledged(m);
  console.log('   ' + m.map(x => x.caseId + '[' + x.state + ']').join('  ==  ') +
              '   [' + m.map(x => x.bank.split('/').pop().replace('.js','')).join(' vs ') + ']' +
              (ack ? '   (acknowledged: DL-P2-024)' : '   *** NEW ***'));
}
console.log('   learner-reachable (ALL copies Certified): ' + allCertifiedDupes.length);
allCertifiedDupes.forEach(([, m]) => console.log('     ' + m.map(x => x.caseId).join(' == ')));
console.log('');
console.log('CLASS B — item rotation-clones: ' + groups.length +
            ' (' + unackedCloneGroups.length + ' unacknowledged)');
for (const g of groups) {
  const ack = isAcknowledged(g.members);
  console.log('   ' + g.members.map(m => m.itemId).join('  ==  ') + '   [' + g.members[0].topic + ']' +
              (ack ? '   (acknowledged)' : '   *** NEW ***'));
}

// Gate: duplicates and rotation-clones both require human review. Neither is
// auto-remediated (DL-045 — this tool emits evidence, it does not author).
const outDir = path.join(BASE, 'scripts/output');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'p2_case_clone_report.json'), JSON.stringify({
  generated: new Date().toISOString(),
  method: 'p2_case_clone_gate.js — AGENTS.md §19.4 (numeric multiset + Topic) + whole-case fingerprint',
  census, itemsScanned: scanned,
  classA_wholeCaseDuplicates: dupeGroups.length,
  classA_unacknowledged: unackedDupeGroups.length,
  classA_learnerReachable: allCertifiedDupes.length,
  classA_groups: dupeGroups.map(([fingerprint, m]) => ({ fingerprint, members: m })),
  classB_itemRotationClones: groups.length,
  classB_unacknowledged: unackedCloneGroups.length,
  classB_groups: groups,
  note: 'Evidence only. No case is archived or modified by this tool (DL-045). ' +
        'Suspected clones require independent human adjudication.',
}, null, 2));

const newSuspect = unackedDupeGroups.length + unackedCloneGroups.length;
console.log('\nREPORT: scripts/output/p2_case_clone_report.json');
console.log('TOTAL: ' + (dupeGroups.length + groups.length) + ' suspected (' +
            dupeGroups.length + ' whole-case, ' + groups.length + ' item-level)');
console.log('ACKNOWLEDGED (filed, blocked from certification): ' +
            ((dupeGroups.length + groups.length) - newSuspect));
console.log('NEW / UNACKNOWLEDGED: ' + newSuspect);
if (newSuspect) {
  console.log('GATE: FAIL — new suspected clone(s) require independent adjudication (DL-045).');
} else {
  console.log('GATE: PASS — no new clones beyond the documented/filed set.');
}
process.exit(newSuspect ? 1 : 0);