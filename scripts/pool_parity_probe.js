'use strict';
/**
 * pool_parity_probe.js — WS-B delivery/pipeline contract probe (Governance Light Lane)
 *
 * Purpose: assert delivery-pool parity — Tier-1 Certified-only MCQ pools,
 * P2 case strict-tier from casePackP2_* exclusively, blocklist applied,
 * and scanned-vs-raw coverage per validator source (DL-044/049/050 family).
 *
 * HARD PROPERTIES:
 *  - READ-ONLY. Only fs.readFileSync + require() of repo parser modules.
 *    No fs.writeFileSync / unlink / edit of any repo file (except the
 *    caller-named --json-out artifact path, which defaults to none).
 *  - Prints PASS/FAIL per check to stdout; exit 0 iff ALL checks pass,
 *    exit 1 on ANY divergence (incl. missing blocklist source or
 *    missing bank — never silently passes).
 *  - Strict-FAIL policy on coverage gaps: any validator that silently
 *    skips a live bank FAILs loudly here (DL-044/049/050 doctrine).
 *    Pre-existing gaps are versioned in coverage_summary, never skipped.
 *
 * Usage:
 *    node scripts/pool_parity_probe.js [--root C:\path\to\repo] [--json-out <path>]
 *
 * Wired into: AGENTS.md §15 (Workflow Helpers) + `npm run probe:parity`.
 * Version: 1.0.0 (2026-09-21).
 */
const fs = require('fs');
const path = require('path');

function argVal(flag) {
  const i = process.argv.indexOf(flag);
  return (i !== -1 && process.argv[i + 1]) ? process.argv[i + 1] : null;
}
const ROOT = path.resolve(argVal('--root') || process.env.REPO_ROOT || 'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026');
const JSON_OUT = argVal('--json-out'); // optional; never defaults into the repo

const packParser = require(path.join(ROOT, 'scripts', 'lib', 'pack_parser.js'));
const parsePack = packParser.parsePack;

let failures = 0;
const lines = [];
function pass(msg) { lines.push('PASS: ' + msg); }
function fail(msg) { lines.push('FAIL: ' + msg); failures++; }
function info(msg) { lines.push('INFO: ' + msg); }

function readOrFail(rel) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) { fail('file missing: ' + rel); return null; }
  return fs.readFileSync(fp, 'utf8');
}
function rawQidCount(content) { const m = content.match(/"QuestionID"\s*:/g); return m ? m.length : 0; }

// Baselines (authoritative: knowledge/CURRENT_BASELINES.md §2 + p2/CURRENT_BASELINES_P2.md §1/§1b)
const P1_PACKS = [
  { file: 'content/packs/pack_a_corrected.js', label: 'P1-A', raw: 560, cert: 560 },
  { file: 'content/packs/pack_b_corrected.js', label: 'P1-B', raw: 620, cert: 620 },
  { file: 'content/packs/pack_c_corrected.js', label: 'P1-C', raw: 620, cert: 606 },
  { file: 'content/packs/pack_d_corrected.js', label: 'P1-D', raw: 590, cert: 586 },
  { file: 'content/packs/pack_e_corrected.js', label: 'P1-E', raw: 680, cert: 680 },
];
const P1_TOTAL_CERT = 3052;
const P2_PACKS = [
  { file: 'p2/pack_p2_a.js', label: 'P2-A', raw: 622, cert: 622 },
  { file: 'p2/pack_p2_b.js', label: 'P2-B', raw: 620, cert: 620 },
  { file: 'p2/pack_p2_c.js', label: 'P2-C', raw: 788, cert: 788 },
  { file: 'p2/pack_p2_d.js', label: 'P2-D', raw: 500, cert: 500 },
  { file: 'p2/pack_p2_e.js', label: 'P2-E', raw: 500, cert: 500 },
  { file: 'p2/pack_p2_f.js', label: 'P2-F', raw: 500, cert: 500 },
];
const P2_TOTAL_CERT = 3530; // WSC-CERT-20260922: 80 Easy certified (A+22/B+20/C+38)
const P2_CASE_FILES = [
  { file: 'p2/case_pack_p2_1.js', global: 'casePackP2_1' },
  { file: 'p2/case_pack_p2_2.js', global: 'casePackP2_2' },
  { file: 'p2/case_pack_p2_3.js', global: 'casePackP2_3' },
  { file: 'p2/case_pack_p2_authored.js', global: 'casePackP2Authored' },
  { file: 'p2/case_pack_p2_C4_C8.js', global: 'casePackP2_C4_C8' },
];
// Expected strict-eligible P2 cases (case-level AND every item Certified).
//
// History:
//   110 — "preflight:p2 shows 110/110 Certified" (true pre-2026-09-24)
//    36 — after the unattributed bulk quarantine demoted 105 cases (DL-P2-023)
//    33 — after DL-P2-024 archived 9 whole-case duplicates; 3 of those were
//         Certified learner-reachable copies (CBQ22-F7, CBQ22-C5, CBQ22-A6).
//    38 — 2026-09-30 (Session P2-HAND-SOLVE-WAVE) certified Batch 1: 5 cases /
//         30 items (CBQ21-A1/A3/A4/A6/B1) after DL-P2-026 boilerplate remediation
//         and 30/30 independent hand-solve, 0 mismatches. 33 + 5 = 38.
//    43 — 2026-09-30 (same session) certified Batch 2: 5 cases / 30 items
//         (CBQ21-C1/E1/D1/B2/E2), 30/30 hand-solve, 0 mismatches, 0 defects.
//         38 + 5 = 43.
//    48 — 2026-10-02 (same session) certified Batch 3: 5 cases / 30 items
//         (CBQ21-C3/D2/F2/E3/B4), 21 of them own-state items. Hand-solve found
//         1 genuine key defect (CBQ21-B4-Q1 WACC 7.45% -> 7.48%, re-keyed); the
//         other 29 items were correct on independent derivation. 43 + 5 = 48.
//    53 — 2026-10-02 (same session) certified Batch 4: 5 cases / 30 items
//         (CBQ21-C4/F3/F4/B5/D3), 6 own-state items. 30/30 hand-solve, 0 mismatches,
//         0 defects — no remediation required. 48 + 5 = 53.
//    58 — 2026-10-02 (same session) certified Batch 6: 5 cases / 30 items
//         (CBQ22-C1/E1/B2/C2/D3), 0 own-state items, 10 numeric derivations.
//         30/30 hand-solve, 0 mismatches; 9 FLAG-severity screen hits all
//         adjudicated false positives. 53 + 5 = 58.
//    63 — 2026-10-02 (same session) certified Batch 5: 5 cases / 30 items across two
//         banks (CBQ21-D4/F5, CBQ22-F1/A2/D2). Hand-solve found 1 genuine key defect
//         (CBQ21-F5-Q1 keyed to SOX 806 while its explanation argued SOX 302; re-keyed
//         to A). 6 FLAG-severity hits adjudicated, incl. a new B-num scale-mismatch
//         artifact. 58 + 5 = 63.
//    68 — 2026-10-02 (same session) certified Batch 7: 5 cases / 30 items
//         (CBQ22-A3/F3/B3/D4/B5) with 18 own-state items — the highest own-state
//         density since Batch 3. 30/30 hand-solve, 0 key mismatches; 1 explanation
//         defect fixed (CBQ22-B5-Q3 was a 53-char answer, not an explanation,
//         rewritten to 1,403 chars). 1 FLAG hit adjudicated FP. 63 + 5 = 68.
//    73 — 2026-10-02 (same session) certified Batch 8: 5 cases / 30 items
//         (CBQ22-D5/A4/C3/F4/C8), 0 own-state items, 9 numeric derivations.
//         30/30 hand-solve, 0 mismatches. Closed the short-explanation class P2-wide:
//         CBQ22-A4-Q2 (54 chars) and CBQ22-B5-Q2 (78 chars, was Certified and
//         learner-reachable) rewritten; sweep now 0/660 under 100 chars. 68 + 5 = 73.
//    78 — 2026-10-02 (same session) certified Batch 9: 5 cases / 30 items
//         (CBQ23-C1/E1/C2/F2/A1), 0 own-state items, 12 numeric derivations — the
//         heaviest numeric load so far. 30/30 hand-solve, 0 key mismatches; 5
//         screen-B flags adjudicated FP on long qualified option text. 73 + 5 = 78.
//    83 — 2026-10-02 (same session) certified Batch 10: 5 cases / 30 items
//         (CBQ23-E2/C3/D2/E3/A3), 18 own-state items. 30/30 hand-solve, 0 key
//         mismatches. Corrected 3 option strings in CBQ23-A3 that quoted $34,259
//         where the computing item (Q1) keys $34,260 — choice text only, key
//         untouched. 3 flags adjudicated FP. 78 + 5 = 83.
//    88 — 2026-10-02 (same session) certified Batch 11: 5 cases / 30 items
//         (CBQ23-F4/A4/C5/D3/E4), 0 own-state items, 8 numeric derivations.
//         30/30 hand-solve, 0 key mismatches, 0 first-derivation corrections,
//         0 defects. 3 flags adjudicated FP (screen B recall + screen C on
//         figure-quoting explanations). 83 + 5 = 88.
//    93 — 2026-10-03 (same session) certified Batch 12: 5 cases / 30 items
//         (CBQ23-F5/A5/A6/A7/A8), 24 own-state items — the highest density of the
//         wave. Hand-solve found 2 genuine key defects, both key-contradicts-own-
//         explanation: CBQ23-A7-Q4 keyed DOL "increase" while the exhibit gives
//         4.71 < 5.00, and CBQ23-A8-Q2 keyed CCC 60 against an explanation reading
//         "61.5 = 60". Both re-keyed (A, and 61) with rewritten explanations.
//         3 flags adjudicated FP. 88 + 5 = 93.
//    98 — 2026-10-03 (same session) certified Batch 13: 5 cases / 30 items
//         (CBQ23-B3/B4/B5/B6/C6), 30 own-state items — every item in the batch.
//         Hand-solve found 2 genuine key defects: CBQ23-C6-Q2 keyed 86 against an
//         explanation computing 38.50 (raw scratchwork), CBQ23-B3-Q5 keyed 8.89
//         against an explanation computing 8.66. Both re-keyed with rewritten
//         explanations. 30 own-state flips. 93 + 5 = 98.
//   101 — 2026-10-04 (same session) certified Batch 14: 3 cases / 18 items
//         (CBQ23-C7/C8/C9), all 18 own-state. Hand-solve found 6 defective items —
//         the highest of any batch — 5 with keys contradicting their own
//         explanations and 3 carrying raw authoring scratchwork (DL-P2-029).
//         All 6 remediated across two change-sets. 98 + 3 = 101.
//         WAVE COMPLETE: 101 Certified / 9 Archived / 0 In Audit across 110 P2 cases.
//
// Recaptured 2026-09-30 (Session P2-085) from verified raw-file census.
// This constant must be re-bumped only when the certified pool genuinely
// changes — it is an assertion, not a target to satisfy.
const P2_STRICT_CASES = 101;
const P1_CASE_FILES = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js',
];

// Pool-eligible QIDs collected for blocklist cross-check
const poolEligibleQids = new Set();
const poolEligibleCaseIds = new Set();

// ── Check 1: P1 MCQ Tier-1-only ──────────────────────────────────────
function check1() {
  let totPool = 0;
  for (const p of P1_PACKS) {
    const content = readOrFail(p.file);
    if (!content) continue;
    const raw = rawQidCount(content);
    if (raw !== p.raw) fail(p.label + ' raw QID ' + raw + ' != baseline ' + p.raw + ' (' + p.file + ')');
    else pass(p.label + ' raw QID ' + raw + ' == baseline');
    let parsed;
    try { parsed = parsePack(content, { sourceName: p.file }); }
    catch (e) { fail(p.label + ' parsePack threw: ' + e.message); continue; }
    const recs = parsed.records.filter(r => r.object && typeof r.object.QuestionID === 'string');
    if (recs.length !== raw) fail(p.label + ' parsePack records ' + recs.length + ' != raw ' + raw + ' (silent drop)');
    else pass(p.label + ' parsePack records == raw (' + raw + ')');
    const errs = parsed.diagnostics.filter(d => d.severity === 'error');
    if (errs.length) fail(p.label + ' parsePack ERROR diagnostics: ' + errs.length);
    let cert = 0; const bad = {};
    for (const r of recs) {
      const st = (r.object.question_state || '').trim();
      if (st === 'Certified') { cert++; poolEligibleQids.add(r.object.QuestionID); }
      else bad[st || '(missing)'] = (bad[st || '(missing)'] || 0) + 1;
    }
    totPool += cert;
    if (cert !== p.cert) fail(p.label + ' Certified ' + cert + ' != baseline ' + p.cert);
    else pass(p.label + ' Certified ' + cert + ' == baseline');
    // Archived is the designed excluded state (AGENTS.md §7, QUESTION_METADATA_STANDARD §9.2, DL-012):
    // reconcile the count, do not fail. All other non-Certified states are actionable.
    const archN = bad['Archived'] || 0;
    delete bad['Archived'];
    if (archN) {
      if (raw - cert === archN) pass(p.label + ' ' + archN + ' Archived reconciled (raw-cert==archived; excluded from delivery by design)');
      else fail(p.label + ' Archived ' + archN + ' does not reconcile raw-cert=' + (raw - cert));
    }
    const badKeys = Object.keys(bad);
    if (badKeys.length) fail(p.label + ' ACTIONABLE non-Certified states (delivery-adjacent): ' + badKeys.map(k => k + 'x' + bad[k]).join(', '));
    else pass(p.label + ' Tier-1-only: no Unprocessed/In Audit/Editorial/Active/missing states');
  }
  if (totPool !== P1_TOTAL_CERT) fail('P1 Tier-1 pool total ' + totPool + ' != ' + P1_TOTAL_CERT);
  else pass('P1 Tier-1 pool total ' + totPool + ' == baseline ' + P1_TOTAL_CERT);
}

// ── Check 2: P2 MCQ Tier-1-only (+ Part2OnlyFlag + part eligibility) ──
function check2() {
  let totPool = 0;
  for (const p of P2_PACKS) {
    const content = readOrFail(p.file);
    if (!content) continue;
    const raw = rawQidCount(content);
    if (raw !== p.raw) fail(p.label + ' raw QID ' + raw + ' != baseline ' + p.raw);
    else pass(p.label + ' raw QID ' + raw + ' == baseline');
    let parsed;
    try { parsed = parsePack(content, { sourceName: p.file }); }
    catch (e) { fail(p.label + ' parsePack threw: ' + e.message); continue; }
    const recs = parsed.records.filter(r => r.object && typeof r.object.QuestionID === 'string');
    if (recs.length !== raw) fail(p.label + ' parsePack records ' + recs.length + ' != raw ' + raw);
    else pass(p.label + ' parsePack records == raw');
    let cert = 0, flagBad = 0, partBad = []; const bad = {};
    for (const r of recs) {
      const st = (r.object.question_state || '').trim();
      if (st === 'Certified') { cert++; poolEligibleQids.add(r.object.QuestionID); }
      else bad[st || '(missing)'] = (bad[st || '(missing)'] || 0) + 1;
      if (r.object.Part2OnlyFlag !== true) flagBad++;
      const qid = r.object.QuestionID || '';
      if (qid.indexOf('P1-') === 0) partBad.push(qid);
      if (qid.indexOf('P2-') !== 0) fail(p.label + ' cross-part QID in P2 pack: ' + qid);
    }
    totPool += cert;
    if (cert !== p.cert) fail(p.label + ' Certified ' + cert + ' != baseline ' + p.cert);
    else pass(p.label + ' Certified ' + cert + ' == baseline');
    if (flagBad) fail(p.label + ' Part2OnlyFlag!==true on ' + flagBad + ' items');
    else pass(p.label + ' Part2OnlyFlag true on all ' + recs.length);
    if (partBad.length) fail(p.label + ' P1- QIDs in P2 pack (Rule 14): ' + partBad.slice(0, 5).join(', '));
    else pass(p.label + ' Rule-14 part eligibility clean');
    if (Object.keys(bad).length) fail(p.label + ' non-Certified states: ' + JSON.stringify(bad));
    else pass(p.label + ' Tier-1-only clean');
  }
  if (totPool !== P2_TOTAL_CERT) fail('P2 Tier-1 pool total ' + totPool + ' != ' + P2_TOTAL_CERT);
  else pass('P2 Tier-1 pool total ' + totPool + ' == baseline ' + P2_TOTAL_CERT);
}

// ── Check 3: P2 case strict-tier from casePackP2_* exclusively ───────
function evalCaseGlobal(content, g) {
  try {
    const arr = new Function(content + '\nreturn (' + g + ');')();
    return Array.isArray(arr) ? arr : null;
  } catch (e) { return null; }
}
function check3() {
  let strictCases = 0, strictItems = 0, totalCases = 0;
  let legacyHit = false;
  for (const c of P2_CASE_FILES) {
    const content = readOrFail(c.file);
    if (!content) continue;
    if (/ENHANCED_CASE_BASE|SCORED_CASES/.test(content)) { legacyHit = true; fail(c.file + ' declares legacy ENHANCED_CASE_BASE/SCORED_CASES global'); }
    const arr = evalCaseGlobal(content, c.global);
    if (!arr) { fail(c.file + ' global ' + c.global + ' unevaluable/empty (loader would see zero)'); continue; }
    pass(c.file + ' global ' + c.global + ' evaluates (' + arr.length + ' cases)');
    totalCases += arr.length;
    for (const k of arr) {
      const st = ((k.question_state || '').trim());
      const items = k.Items || [];
      const itemsOk = items.length > 0 && items.every(it => ((it.question_state || st || '').trim() === 'Certified'));
      if (st === 'Certified' && itemsOk) {
        strictCases++;
        strictItems += items.length;
        if (k.CaseID) poolEligibleCaseIds.add(k.CaseID);
        for (const it of items) { const iid = it.ItemID || it.QuestionID; if (iid) poolEligibleQids.add(iid); }
      } else if (st === 'Certified' && !itemsOk) {
        fail('non-strict Certified case leaks toward pool: ' + (k.CaseID || '?') + ' (case Certified but items not all effectively Certified)');
      }
    }
  }
  if (!legacyHit) pass('no legacy scored_cases/ENHANCED_CASE_BASE globals contribute to P2 strict pool');
  if (strictCases !== P2_STRICT_CASES) fail('P2 strict-eligible cases ' + strictCases + ' != preflight ' + P2_STRICT_CASES + ' (total parsed ' + totalCases + ')');
  else pass('P2 strict-eligible ' + strictCases + ' cases / ' + strictItems + ' items == preflight');
  // P1 live banks sanity (read-only census, not delivery-gating here)
  let p1c = 0, p1i = 0;
  for (const f of P1_CASE_FILES) {
    const content = readOrFail(f);
    if (!content) continue;
    const m = content.match(/(?:const|var)\s+(CASE_PACK_\d+)\s*=\s*\[/);
    if (!m) { fail(f + ' CASE_PACK global not found'); continue; }
    const arr = evalCaseGlobal(content, m[1]);
    if (!arr) { fail(f + ' ' + m[1] + ' unevaluable'); continue; }
    p1c += arr.length;
    for (const k of arr) p1i += (k.Items || []).length;
  }
  info('P1 live banks census: ' + p1c + ' cases / ' + p1i + ' items (expect 80/425 all Certified)');
  if (p1c !== 80) fail('P1 live case count ' + p1c + ' != 80');
  else pass('P1 live case count 80 == baseline');
}

// ── Check 4: blocklist enforcement chain ─────────────────────────────
// Delivery contract (app/app.js assignTier + _DefectManifest): the served
// pool is Certified MINUS delivery-blocked IDs (tier -1). Stale manifests
// therefore over-block (availability nit, learner-safe direction), while a
// missing/unparseable manifest or a live-quarantined ID still showing
// Certified would under-block (safety defect). This check FAILs on the
// safety direction only; staleness is reported as INFO with a refresh
// follow-up (never silently passed).
const LEGACY_CASE_FILES = [
  'content/cases/legacy/scored_cases.js',
  'content/cases/legacy/scored_cases2.js',
  'content/cases/legacy/scored_cases3.js',
  'content/cases/legacy/scored_cases4.js',
  'content/cases/legacy/scored_cases5.js',
];
function loadBlocklist() {
  // Returns { live: [{id, source}], quarantineActive: [ids], perSource: {rel: n} }
  const cands = [
    'governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json',
    'governance/DEFECT_MANIFEST_DL008_DL026.json',
    'scripts/output/semantic_quarantine.json',
  ];
  const live = []; const quarantineActive = []; const perSource = {};
  for (const rel of cands) {
    const fp = path.join(ROOT, rel);
    if (!fs.existsSync(fp)) { info('blocklist candidate absent: ' + rel); perSource[rel] = 0; continue; }
    let j;
    try { j = JSON.parse(fs.readFileSync(fp, 'utf8')); }
    catch (e) { fail('blocklist unparseable: ' + rel + ' — ' + e.message); perSource[rel] = -1; continue; }
    const arr = j.blocked || j.active || j.blockedQids || [];
    let n = 0;
    for (const e of arr) {
      const id = typeof e === 'string' ? e : (e.qid || e.QID || e.QuestionID || e.CaseID);
      if (!id) continue;
      n++;
      if (rel.indexOf('semantic_quarantine') !== -1) quarantineActive.push(id);
      else if (e && typeof e === 'object' && e.block_from_delivery === false) { /* explicitly unblocked */ }
      else live.push({ id, source: rel });
    }
    perSource[rel] = n;
  }
  return { live, quarantineActive, perSource };
}
function buildIdUniverse() {
  // Every QuestionID/CaseID/ItemID string across live + legacy banks (existence only).
  const u = new Set();
  const files = P1_PACKS.concat(P2_PACKS).map(p => p.file)
    .concat(P1_CASE_FILES, P2_CASE_FILES.map(c => c.file), LEGACY_CASE_FILES);
  for (const f of files) {
    const content = readOrFail(f);
    if (!content) continue;
    for (const m of content.matchAll(/"(?:QuestionID|CaseID|ItemID)"\s*:\s*"([^"]+)"/g)) u.add(m[1]);
  }
  return u;
}
function check4() {
  const { live, quarantineActive, perSource } = loadBlocklist();
  info('blocklist manifests: ' + Object.keys(perSource).map(k => k + '=' + perSource[k]).join('; '));
  if (live.length === 0 && quarantineActive.length === 0) {
    fail('blocklist enforcement has no data — manifests missing/empty (runtime would serve unfiltered; refusing to pass silently)');
    return;
  }
  pass('blocklist enforcement data present (' + live.length + ' blocked entries + ' + quarantineActive.length + ' live-quarantine)');
  // 4a. Live quarantine: every active ID must NOT be Certified in the packs
  // (DL-047 flow quarantines Certified→In Audit). An active ID still Certified = live leak.
  if (quarantineActive.length === 0) {
    pass('live quarantine empty (semantic_quarantine active 0/26 resolved) — no quarantined ID can leak');
  } else {
    const uni = buildIdUniverse();
    const stateOf = {};
    for (const p of P1_PACKS.concat(P2_PACKS)) {
      const content = readOrFail(p.file);
      if (!content) continue;
      let parsed;
      try { parsed = parsePack(content, { sourceName: p.file }); } catch (e) { continue; }
      for (const r of parsed.records) {
        if (r.object && typeof r.object.QuestionID === 'string') stateOf[r.object.QuestionID] = (r.object.question_state || '').trim();
      }
    }
    void uni;
    const leaks = quarantineActive.filter(id => stateOf[id] === 'Certified');
    if (leaks.length) fail('LIVE-QUARANTINE LEAK — still Certified in packs: ' + leaks.join(', '));
    else pass('live quarantine ' + quarantineActive.length + ' IDs all non-Certified (quarantine holds)');
  }
  // 4b. Dangling entries: every blocked ID must resolve to a real bank ID (manifest/pack drift).
  {
    const uni = buildIdUniverse();
    const dangling = live.map(e => e.id).filter(id => !uni.has(id));
    if (dangling.length) fail('dangling blocklist entries (no bank ID match — manifest/pack drift): ' + dangling.slice(0, 20).join(', '));
    else pass('all ' + live.length + ' blocked entries resolve to real bank IDs (no manifest drift)');
  }
  // 4c. Served-pool accounting: served = Certified − blocked∩Certified (assignTier tier -1).
  {
    const blockedSet = new Set(live.map(e => e.id));
    let served = 0;
    for (const qid of poolEligibleQids) if (!blockedSet.has(qid)) served++;
    info('served-pool accounting: ' + poolEligibleQids.size + ' Certified pooled-eligible, ' + served + ' served after blocklist exclusion');
  }
  // 4d. Staleness note (INFO, not FAIL): Session-88 delivery blocklist (2026-07-24)
  // predates the remediation waves; entries claiming DL-008 on currently-clean
  // Certified items (e.g. P1-B-001/P1-B-025, DL-025 closeout) over-block in the
  // learner-safe direction. Manifest refresh filed as follow-up; enforcement
  // errs toward exclusion, never toward serving a live-blocked ID.
  info('staleness note: Session-88 delivery blocklist predates remediation waves (over-blocking, learner-safe); refresh follow-up filed, not a probe FAIL');
}

// ── Check 5: scanned-vs-raw coverage per validator source ────────────
function check5() {
  // 5a. Psychometric extractor (extractor.js loadAllQuestions): 5 P1 + 6 P2
  try {
    const ex = require(path.join(ROOT, 'scripts', 'validators', 'psychometric', 'extractor.js'));
    const all = ex.loadAllQuestions();
    const expect = P1_PACKS.reduce((a, p) => a + p.raw, 0) + P2_PACKS.reduce((a, p) => a + p.raw, 0);
    if (all.length !== expect) fail('extractor loadAllQuestions ' + all.length + ' != raw total ' + expect);
    else pass('extractor loadAllQuestions scanned ' + all.length + ' == raw total ' + expect + ' (5 P1 + 6 P2)');
  } catch (e) { fail('extractor loadAllQuestions threw (coverage FAIL): ' + e.message); }
  // 5b. CaseExtractor live-bank behavior: 3 P1 CASE_PACK + 5 P2 (incl. Authored + C4_C8)
  try {
    const CE = require(path.join(ROOT, 'scripts', 'lib', 'CaseExtractor.js'));
    const liveBanks = P1_CASE_FILES.concat(P2_CASE_FILES.map(c => c.file));
    for (const f of liveBanks) {
      const content = readOrFail(f);
      if (!content) continue;
      const cases = CE.extractFromContent(content);
      const rawC = (content.match(/"CaseID"\s*:/g) || []).length;
      if (!cases) fail('CaseExtractor null on LIVE bank ' + f + ' (silent-skip shape; raw CaseIDs ' + rawC + ')');
      else if (cases.length === 0 && rawC > 0) fail('CaseExtractor 0 cases on ' + f + ' with raw ' + rawC);
      else pass('CaseExtractor ' + f + ': ' + cases.length + ' cases (raw CaseIDs ' + rawC + ')');
    }
  } catch (e) { fail('CaseExtractor coverage threw: ' + e.message); }
  // 5c. CaseIdentityValidator live-file behavior: every live bank must yield cases carrying CaseIDs.
  // Tests the ACTUAL validator method on live bytes (DL-045: positive evidence, not a copied pattern).
  try {
    const CIV = require(path.join(ROOT, 'scripts', 'validators', 'CaseIdentityValidator.js'));
    const v = new CIV();
    const liveBanks = P1_CASE_FILES.concat(P2_CASE_FILES.map(c => c.file));
    for (const f of liveBanks) {
      const content = readOrFail(f);
      if (!content) continue;
      let cases = null;
      try { cases = v.extractCases(content); }
      catch (e) { fail('CaseIdentityValidator extractCases threw on ' + f + ': ' + e.message); continue; }
      if (!cases || cases.length === 0) fail('CaseIdentityValidator 0/NULL cases on LIVE bank ' + f + ' (bank silently uncovered)');
      else {
        const withId = cases.filter(c => c && c.CaseID).length;
        if (withId !== cases.length || withId === 0) fail('CaseIdentityValidator ' + f + ': ' + withId + '/' + cases.length + ' extracted entries carry CaseID (fallback mis-extraction shape)');
        else pass('CaseIdentityValidator ' + f + ': ' + withId + ' cases with CaseID');
      }
    }
  } catch (e) { fail('CaseIdentityValidator probe threw: ' + e.message); }
  // 5d. semantic_key_verifier pack lists: 5 P1 + 6 P2 (source-read)
  {
    const src = readOrFail('scripts/semantic_key_verifier.js');
    if (src) {
      const p1 = (src.match(/content\/packs\/pack_[a-e]_corrected\.js/g) || []).length;
      const p2 = (src.match(/p2\/pack_p2_[a-f]\.js/g) || []).length;
      if (p1 < 5 || p2 < 6) fail('semantic_key_verifier lists P1=' + p1 + '/5 P2=' + p2 + '/6 banks');
      else pass('semantic_key_verifier lists 5 P1 + 6 P2 banks (P1=' + p1 + ' P2=' + p2 + ' refs)');
    }
  }
  // 5e. case_semantic_screens BANKS: expects 8 live (3 P1 + 5 P2)
  {
    const src = readOrFail('scripts/case_semantic_screens.js');
    if (src) {
      const hasAuthored = src.includes('case_pack_p2_authored');
      const hasC4C8 = src.includes('case_pack_p2_C4_C8');
      if (!hasAuthored || !hasC4C8) fail('case_semantic_screens BANKS missing ' + (!hasAuthored ? 'case_pack_p2_authored ' : '') + (!hasC4C8 ? 'case_pack_p2_C4_C8' : '') + '(listed vs 8 live — unscanned banks = FAIL)');
      else pass('case_semantic_screens covers all 8 live case banks');
    }
  }
  // 5f. s121 dashboard P2_PACKS: expects 6
  {
    const src = readOrFail('scripts/s121_portfolio_dashboard.js');
    if (src) {
      const refs = (src.match(/p2\/pack_p2_[a-f]\.js/g) || []).length;
      if (refs < 6) fail('s121 dashboard P2 refs ' + refs + ' < 6');
      else pass('s121 dashboard covers 6 P2 packs (+5 P1)');
    }
  }
  // 5g. ExplanationValidator gaps (P1-only MCQ; legacy-only cases) — must FAIL until wired
  {
    const src = readOrFail('scripts/validators/ExplanationValidator.js');
    if (src) {
      const gaps = [];
      if (src.includes('config.questionPacks') && !src.includes('part2QuestionPacks')) gaps.push('MCQ: P1-only (0/6 P2 packs scanned)');
      if (src.includes('config.caseBanks') && !src.includes('casePackBanks')) gaps.push('cases: legacy-only (0/8 live banks scanned)');
      if (gaps.length) fail('ExplanationValidator coverage gaps: ' + gaps.join('; '));
      else pass('ExplanationValidator covers P1+P2 MCQ and live case banks');
    }
  }
  // 5h. Part2BlueprintValidator: case files via config
  {
    const src = readOrFail('scripts/validators/Part2BlueprintValidator.js');
    if (src) {
      if (src.includes('config.part2CasePacks')) pass('Part2BlueprintValidator case files via config.part2CasePacks (5 files)');
      else fail('Part2BlueprintValidator not wired to config.part2CasePacks');
    }
  }
}

check1(); check2(); check3(); check4(); check5();
console.log('=== POOL PARITY PROBE v1.0.0 — ' + new Date().toISOString() + ' — ROOT=' + ROOT + ' ===');
console.log(lines.join('\n'));
console.log(failures === 0 ? '*** PROBE PASS — 0 divergences ***' : '*** PROBE FAIL — ' + failures + ' divergence(s) ***');
if (JSON_OUT) {
  const artifact = {
    version: '1.0.0', generated: new Date().toISOString(), root: ROOT,
    result: failures === 0 ? 'PASS' : 'FAIL', failures,
    baselines: { p1: { perPack: P1_PACKS, totalCertified: P1_TOTAL_CERT }, p2: { perPack: P2_PACKS, totalCertified: P2_TOTAL_CERT }, p2cases: { files: P2_CASE_FILES.map(c => c.file), strictEligible: P2_STRICT_CASES } },
    log: lines,
  };
  fs.writeFileSync(JSON_OUT, JSON.stringify(artifact, null, 2) + '\n');
  console.log('artifact -> ' + JSON_OUT);
}
process.exit(failures === 0 ? 0 : 1);
