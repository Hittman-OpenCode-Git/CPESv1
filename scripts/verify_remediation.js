// verify_remediation.js — asserts a DL entry's PER-ITEM claims against the banks.
//
// Why this exists: on 2026-10-04 a remediation summary reported "CBQ2-D3-Q1 rewritten" when
// that item was never touched (Q2 and Q4 were). The repo's DL entry was correct; the chat
// summary drifted, and nobody re-read the banks. A summary that drifts from the files becomes
// the only source of truth for a change nobody made.
//
// This reads the banks back and checks every claim a DL entry makes. READ-ONLY.
//
//   node scripts/verify_remediation.js <DL-ID>            verify one entry
//   node scripts/verify_remediation.js --all              verify every entry with claims
const fs = require('fs');
const path = require('path');
const BASE = path.resolve(__dirname, '..');
const CaseExtractor = require('./lib/CaseExtractor');

const BANKS = [
  'content/cases/case_pack_1_corrected.js', 'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js', 'p2/case_pack_p2_1.js', 'p2/case_pack_p2_2.js',
  'p2/case_pack_p2_3.js', 'p2/case_pack_p2_authored.js', 'p2/case_pack_p2_C4_C8.js',
];

// Index every item once: ItemID -> { bank, case, item, key, keyType, explLen, expl, state }
const INDEX = new Map();
let extractionFailures = 0;
for (const rel of BANKS) {
  const full = path.join(BASE, rel);
  if (!fs.existsSync(full)) continue;
  let detail;
  try { detail = CaseExtractor.extractFromContentDetailed(fs.readFileSync(full, 'utf8')); }
  catch (e) { console.error('EXTRACTION THROW ' + rel + ': ' + e.message); extractionFailures++; continue; }
  if (!detail.ok) { console.error('EXTRACTION FAILURE ' + rel + ': ' + detail.error); extractionFailures++; continue; }
  for (const c of detail.cases) {
    for (const it of (c.Items || [])) {
      const k = it.Correct !== undefined ? it.Correct : it.CorrectChoice;
      const expl = String(it.ExplanationCorrect != null ? it.ExplanationCorrect : it.Explanation || '');
      INDEX.set(it.ItemID, {
        bank: rel, caseId: c.CaseID, caseState: c.question_state,
        state: it.question_state !== undefined ? it.question_state : c.question_state,
        key: k === undefined ? null : k,
        keyType: k === null ? 'null' : Array.isArray(k) ? 'array' : typeof k === 'object' ? 'object' : typeof k === 'number' ? 'number' : 'string',
        explLen: expl.length, expl,
      });
    }
  }
}

function loadEntries() {
  const files = ['p2/DEFECT_LIBRARY_P2.md', 'knowledge/DEFECT_LIBRARY.md'];
  const out = [];
  for (const f of files) {
    const full = path.join(BASE, f);
    if (!fs.existsSync(full)) continue;
    const t = fs.readFileSync(full, 'utf8');
    const parts = t.split(/\r?\n(?=## )/);
    for (const p of parts) {
      const m = /^##\s+(DL-[A-Z0-9-]+)/.exec(p);
      if (m) out.push({ file: f, id: m[1], body: p, heading: p.split('\n')[0] });
    }
  }
  return out;
}

// ── claim extraction ────────────────────────────────────────────────────────
const strip = s => String(s).replace(/[`*]/g, '').trim();
const norm = s => String(s).replace(/[,$%\s]/g, '');
const isNumish = s => /^-?\$?[\d][\d,]*(?:\.\d+)?%?$/.test(s);

// Pull claims of each shape out of an entry body.
function extractClaims(body) {
  const claims = { items: new Set(), rekeyed: [], keyValues: new Map(), states: new Map() };

  // Every ItemID mentioned anywhere in the entry.
  for (const m of body.matchAll(/\b(CBQ\d+-[A-Z0-9]+-Q\d+)\b/g)) claims.items.add(m[1]);

  const strip2 = s => String(s).replace(/[`*]/g, '').trim();

  for (const line of body.split(/\r?\n/)) {
    if (!/^\s*\|/.test(line)) continue;
    const cells = line.split('|').map(strip2).filter(c => c !== '');
    const idm = cells.find(c => /^CBQ\d+-[A-Z0-9]+-Q\d+$/.test(c));
    if (!idm) continue;
    const id = idm;

    // Case state: only from the cell IMMEDIATELY after the id. A state word appearing
    // elsewhere in the row (prose, a cross-reference table) is not a state claim.
    const pos = cells.indexOf(idm);
    const after = cells[pos + 1] || '';
    if (/^(Certified|In Audit|Archived)$/.test(after)) claims.states.set(id, after);

    // Arrow form: "`old` -> `new`" anywhere on the line.
    const arrow = /(-?[\d][\d,]*(?:\.\d+)?|`-?[^`]*`)\s*->\s*`?(-?[\d][\d,]*(?:\.\d+)?)`?/.exec(line);
    if (arrow) { claims.rekeyed.push({ id, from: strip2(arrow[1]), to: strip2(arrow[2]) }); continue; }

    // Column form requires an explicit VERDICT marker on the row. Without one the row is
    // some other table (a ratio/diagnostic table, an index) and asserts nothing about keys.
    const verdict = cells.find(c => /\b(correct|wrong|preserved|re-keyed|unchanged|explanation only)\b/i.test(c));
    if (!verdict) continue;
    const nums = cells.filter(isNumish);
    if (nums.length >= 2) claims.rekeyed.push({ id, from: nums[1], to: nums[0] });
    else if (nums.length === 1) claims.keyValues.set(id, nums[0]);
  }
  return claims;
}

function verifyEntry(entry) {
  const claims = extractClaims(entry.body);
  const results = { id: entry.id, heading: entry.heading, file: entry.file, checks: [], unknownItems: [] };

  for (const id of [...claims.items].sort()) {
    const rec = INDEX.get(id);
    if (!rec) { results.unknownItems.push(id); continue; }
    // 1. the item exists
    results.checks.push({ id, claim: 'item exists in a bank', ok: true, actual: rec.bank });
    // 2. any stated case state matches reality
    if (claims.states.has(id)) {
      const want = claims.states.get(id);
      const got = rec.state;
      results.checks.push({ id, claim: 'case state = ' + want, ok: want === got, actual: got });
    }
  }

  // 3. every re-key claim resolves to a real item, and the current key equals the claimed new value
  for (const rk of claims.rekeyed) {
    if (!rk.id) continue;
    const rec = INDEX.get(rk.id);
    if (!rec) { results.unknownItems.push(rk.id); continue; }
    const cur = rec.key === null ? '' : norm(rec.key);
    results.checks.push({
      id: rk.id, claim: 'key now ' + rk.to + ' (was ' + rk.from + ')',
      ok: cur === norm(rk.to), actual: cur,
    });
  }

  // 4. every "key unchanged / correct" claim: assert the live key equals the stated value
  for (const [id, want] of claims.keyValues) {
    const rec = INDEX.get(id);
    if (!rec) { results.unknownItems.push(id); continue; }
    const cur = rec.key === null ? '' : norm(rec.key);
    results.checks.push({
      id, claim: 'key is ' + want + ' (unchanged)',
      ok: cur === norm(want), actual: cur,
    });
  }

  results.assertionCount = results.checks.length;
  return results;
}

function main() {
  const argv = process.argv.slice(2);
  console.log('indexed ' + INDEX.size + ' items from ' + BANKS.length + ' banks' +
    (extractionFailures ? '  (' + extractionFailures + ' extraction FAILURES — coverage is incomplete)' : ''));
  if (extractionFailures) { console.error('ABORT: cannot verify against an incomplete index'); process.exit(1); }

  const entries = loadEntries();
  const want = argv.filter(a => !a.startsWith('--'));
  const targets = want.length
    ? entries.filter(e => want.some(w => e.id === w || e.id.endsWith(w)))
    : entries.filter(e => /^##\s+DL-[A-Z0-9-]+\s+—\s+REMEDIATION/.test(e.heading));

  if (!targets.length) {
    console.log('no matching entries. Known remediation entries:');
    for (const e of entries.filter(x => /REMEDIATION/.test(x.heading))) console.log('  ' + e.id + '  ' + e.heading);
    process.exit(0);
  }

  let totalChecks = 0, totalFail = 0;
  for (const e of targets) {
    const r = verifyEntry(e);
    const fails = r.checks.filter(c => !c.ok);
    totalChecks += r.checks.length; totalFail += fails.length;
    console.log('\n=== ' + r.id + '  (' + r.file + ')');
    console.log('    ' + r.heading.trim());
    for (const c of r.checks) {
      console.log('    ' + (c.ok ? 'PASS  ' : 'FAIL  ') + c.id.padEnd(14) + c.claim + (c.ok ? '' : '  | actual: ' + c.actual));
    }
    if (r.unknownItems.length) console.log('    NOT FOUND in banks: ' + r.unknownItems.join(', '));
    console.log('    ' + (fails.length === 0 ? 'ALL CLAIMS VERIFIED' : fails.length + ' CLAIM(S) FAILED') +
      '  (' + r.checks.length + ' assertions)');
  }
  console.log('\n' + (totalChecks - totalFail) + '/' + totalChecks + ' assertions passed across ' + targets.length + ' entr' +
    (targets.length === 1 ? 'y' : 'ies'));
  process.exit(totalFail === 0 ? 0 : 1);
}
main();