'use strict';
// build_blocklist.js — canonical regenerator for the three delivery-blocklist
// governance artifacts, from a direct string-aware scan of the five P1 MCQ packs.
//
// Outputs (all made consistent from a single defect census):
//   1. governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json  (blocked = Certified defectives)
//   2. governance/DEFECT_MANIFEST_DL008_DL026.json              (dl008/dl026 record + blocked)
//   3. governance/delivery_blocklist.js                         (legacy synchronous loader)
//
// Defect families detected (operator-visible, deterministic):
//   DL-008  non-empty ExplanationWrong[CorrectChoice]
//   DL-026  present-but-empty non-CorrectChoice ExplanationWrong slot
//   DL-047  ExplanationCorrect semantic recall favours a distractor over CorrectChoice
//
// Only Certified items are blocked (learner-reachable). Non-Certified states are
// hard-excluded by the runtime (app.js assignTier) independently of this list.
//
// Run:  node scripts/build_blocklist.js            (writes, with backups)
//       node scripts/build_blocklist.js --dry-run  (report only)

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PACK_FILES = [
  ['A', 'content/packs/pack_a_corrected.js'],
  ['B', 'content/packs/pack_b_corrected.js'],
  ['C', 'content/packs/pack_c_corrected.js'],
  ['D', 'content/packs/pack_d_corrected.js'],
  ['E', 'content/packs/pack_e_corrected.js'],
];
const OUT_BLOCKLIST = path.join(ROOT, 'governance', 'DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json');
const OUT_MANIFEST = path.join(ROOT, 'governance', 'DEFECT_MANIFEST_DL008_DL026.json');
const OUT_LEGACY = path.join(ROOT, 'governance', 'delivery_blocklist.js');
const DRY_RUN = process.argv.indexOf('--dry-run') !== -1;

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').replace('T', '-').slice(0, 15);
}

function extractObjectsFromText(text) {
  const objects = [];
  let pos = 0;
  while (pos < text.length) {
    const objStart = text.indexOf('{', pos);
    if (objStart === -1) break;
    let depth = 1;
    let i = objStart + 1;
    let inString = false, stringChar = '', escape = false;
    while (depth > 0 && i < text.length) {
      const ch = text[i];
      if (escape) { escape = false; i++; continue; }
      if (inString) {
        if (ch === '\\') { escape = true; }
        else if (ch === stringChar) { inString = false; stringChar = ''; }
        i++; continue;
      }
      if (ch === '"' || ch === "'") { inString = true; stringChar = ch; i++; continue; }
      if (ch === '{') depth++;
      else if (ch === '}') depth--;
      i++;
    }
    if (depth !== 0) break;
    const objText = text.substring(objStart, i);
    let obj = null;
    try { obj = JSON.parse(objText); } catch (e) {
      try { obj = new Function('return (' + objText + ')')(); } catch (e2) {}
    }
    if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj.CorrectChoice) objects.push(obj);
    pos = i;
  }
  return objects;
}

function sectionFromQid(qid) {
  let m;
  if ((m = /^P1-([A-F])-\d{3}$/.exec(qid))) return m[1];
  if ((m = /^P1B-([A-F])-\d{3}$/.exec(qid))) return m[1];
  if ((m = /^P1-([A-F])[CD]-\d{3}$/.exec(qid))) return m[1];
  if ((m = /^P1E-([A-F])-\d{3}$/.exec(qid))) return m[1];
  if (/^P1-E-R\d{2}$/.test(qid)) return 'E';
  return '?';
}

function defectsOf(obj) {
  const out = [];
  const cc = obj.CorrectChoice;
  if (!cc || !/^[A-D]$/.test(cc)) return out;
  const ewVal = obj['ExplanationWrong' + cc];
  if (ewVal && typeof ewVal === 'string' && ewVal.trim().length > 0) out.push('DL-008');
  let emptyNonCC = false;
  for (const L of ['A', 'B', 'C', 'D']) {
    if (L === cc) continue;
    const k = 'ExplanationWrong' + L;
    if (k in obj && typeof obj[k] === 'string' && obj[k].trim() === '') { emptyNonCC = true; break; }
  }
  if (emptyNonCC) out.push('DL-026');
  if (obj.ExplanationCorrect && obj.Choices) {
    const ec = obj.ExplanationCorrect.toLowerCase();
    const ecWords = new Set(ec.match(/[a-z0-9]+/g) || []);
    const ccWords = new Set((obj.Choices[cc] || '').toLowerCase().match(/[a-z0-9]+/g) || []);
    let ccRecall = 0;
    for (const w of ccWords) if (ecWords.has(w)) ccRecall++;
    ccRecall = ccWords.size ? ccRecall / ccWords.size : 0;
    let best = 0, bestLetter = null;
    for (const [l, t] of Object.entries(obj.Choices)) {
      if (l === cc) continue;
      const cw = new Set(t.toLowerCase().match(/[a-z0-9]+/g) || []);
      let r = 0;
      for (const w of cw) if (ecWords.has(w)) r++;
      r = cw.size ? r / cw.size : 0;
      if (r > best) { best = r; bestLetter = l; }
    }
    if (best > ccRecall + 0.15 && best > 0.3) {
      out.push('DL-047');
      obj.__dl047Letter = bestLetter;
    }
  }
  return out;
}

function reasonFor(code, obj) {
  switch (code) {
    case 'DL-008': return 'QUALITY_DEFECT: Non-empty ExplanationWrong[CorrectChoice] — DL-008';
    case 'DL-026': return 'QUALITY_DEFECT: Empty non-CorrectChoice ExplanationWrong slot — DL-026';
    case 'DL-047': return 'QUALITY_DEFECT: ExplanationCorrect semantically matches distractor ' + (obj.__dl047Letter || '?') + ' over CorrectChoice ' + obj.CorrectChoice + ' — DL-047';
    default: return 'QUALITY_DEFECT: ' + code;
  }
}

function backup(fp) {
  if (!fs.existsSync(fp)) return null;
  const bak = fp + '.bak-' + timestamp();
  fs.copyFileSync(fp, bak);
  const sz = fs.statSync(bak).size;
  if (sz === 0) { throw new Error('backup empty: ' + bak); }
  return { bak, sz };
}

function main() {
  console.log('=== build_blocklist.js — delivery blocklist regeneration ===');
  console.log(DRY_RUN ? 'MODE: dry-run (no writes)\n' : 'MODE: WRITE (backups first)\n');

  const scanned = [];
  for (const [pack, rel] of PACK_FILES) {
    const content = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    for (const obj of extractObjectsFromText(content)) {
      if (!obj.QuestionID) continue;
      scanned.push({ pack, obj });
    }
  }
  console.log('Scanned MCQ objects:', scanned.length);

  const byCode = { 'DL-008': 0, 'DL-026': 0, 'DL-047': 0 };
  const byCodeState = {};
  const blocked = [];
  const dl008Rec = [];
  const dl026Rec = [];

  for (const { pack, obj } of scanned) {
    const state = (obj.question_state || '').trim();
    const codes = defectsOf(obj);
    for (const c of codes) {
      byCode[c] = (byCode[c] || 0) + 1;
      byCodeState[c] = byCodeState[c] || {};
      byCodeState[c][state] = (byCodeState[c][state] || 0) + 1;
    }
    const qid = obj.QuestionID;
    const section = sectionFromQid(qid);
    if (codes.indexOf('DL-008') !== -1) {
      dl008Rec.push({ qid, section, cc: obj.CorrectChoice, state, ewLen: String(obj['ExplanationWrong' + obj.CorrectChoice]).length });
    }
    if (codes.indexOf('DL-026') !== -1) {
      const empties = ['A', 'B', 'C', 'D'].filter(L => L !== obj.CorrectChoice && 'ExplanationWrong' + L in obj && String(obj['ExplanationWrong' + L]).trim() === '');
      dl026Rec.push({ qid, section, cc: obj.CorrectChoice, state, emptySlots: empties.length, whichSlots: empties.join(',') });
    }
    if (state === 'Certified' && codes.length > 0) {
      for (const c of codes) {
        blocked.push({
          qid, pack, section, defect_code: c, state,
          block_from_delivery: true, block_from_recommendation: true,
          reason: reasonFor(c, obj),
        });
      }
    }
  }

  const blockedQids = [...new Set(blocked.map(b => b.qid))];
  console.log('Defect census (all states):', JSON.stringify(byCode));
  console.log('Defect census by state:', JSON.stringify(byCodeState));
  console.log('Certified blocked entries:', blocked.length, 'over', blockedQids.length, 'distinct QIDs');

  // ---- 1. DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json ----
  const existing = fs.existsSync(OUT_BLOCKLIST) ? JSON.parse(fs.readFileSync(OUT_BLOCKLIST, 'utf8')) : {};
  const sectionMap = {};
  (existing.blocked || []).forEach(e => { if (e && e.qid) sectionMap[e.qid] = e.section; });
  for (const b of blocked) if (!b.section && sectionMap[b.qid]) b.section = sectionMap[b.qid];

  const blocklistOut = {
    description: existing.description || 'Session 88 — Delivery blocklist and similarity-family manifest. Loaded by app.js at session assembly and by may-core.js for recommendation gating.',
    generated: new Date().toISOString(),
    session: 'S216-regeneration',
    blocked,
  };

  // ---- 2. DEFECT_MANIFEST_DL008_DL026.json ----
  const now = new Date().toISOString();
  const manifestOut = {
    _metadata: {
      session: 216,
      date: now.slice(0, 10),
      source: 'S216 — build_blocklist.js direct object-parse scan (DL-029-safe)',
      scope: 'Full 5-pack scan of ' + scanned.length + ' items',
      packs_scanned: PACK_FILES.map(p => p[0]),
      methodology: 'String-aware within-object CorrectChoice extraction (Function constructor). No forward-scan or regex-window. DL-029 immune.',
      schema_version: '3.0',
      regenerated_at: now,
      regenerated_by: 'S216 — build_blocklist.js',
      counts_by_code: { 'DL-008': byCode['DL-008'], 'DL-026': byCode['DL-026'], 'DL-047': byCode['DL-047'] },
      counts_by_state: byCodeState,
      total_blocked: blocked.length,
      validation_notes: 'Regenerated from direct pack scan. Certified ' + blockedQids.length + ' distinct QIDs blocked. DL-008/DL-026 record arrays reflect all-state census.'
    },
    dl008: dl008Rec,
    dl026: dl026Rec,
    stats: {
      dl008_total: dl008Rec.length,
      dl008_certified: dl008Rec.filter(r => r.state === 'Certified').length,
      dl026_total: dl026Rec.length,
      dl026_certified: dl026Rec.filter(r => r.state === 'Certified').length,
      dl047_total: byCode['DL-047'],
      grand_total_blocked: blocked.length,
    },
    blocked,
  };

  // ---- 3. delivery_blocklist.js (legacy synchronous loader) ----
  const legacyLines = [];
  legacyLines.push('// Session 88 — Delivery Blocklist Loader (derived from build_blocklist.js census)');
  legacyLines.push('// Sources: governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json + governance/DEFECT_MANIFEST_DL008_DL026.json');
  legacyLines.push('// Regenerate with: node scripts/build_blocklist.js');
  legacyLines.push('window._cmaDeliveryBlocklist = (function () {');
  legacyLines.push('    var entries = [');
  for (let i = 0; i < blockedQids.length; i += 6) {
    const chunk = blockedQids.slice(i, i + 6).map(q => '{qid:"' + q + '"}').join(',');
    legacyLines.push('        ' + chunk + (i + 6 < blockedQids.length ? ',' : ''));
  }
  legacyLines.push('    ];');
  legacyLines.push('    var set = {};');
  legacyLines.push('    entries.forEach(function (e) { set[e.qid] = true; });');
  legacyLines.push('    return { blocked: set, count: entries.length };');
  legacyLines.push('})();');
  legacyLines.push('');
  const legacyOut = legacyLines.join('\n');

  console.log('\nPlanned outputs:');
  console.log('  blocklist JSON  :', blocked.length, 'entries');
  console.log('  defect manifest :', manifestOut.stats.grand_total_blocked, 'blocked; dl008=' + dl008Rec.length + ' dl026=' + dl026Rec.length);
  console.log('  legacy loader   :', blockedQids.length, 'qids');

  if (DRY_RUN) { console.log('\nDry-run complete. No writes.'); return; }

  const b1 = backup(OUT_BLOCKLIST);
  const b2 = backup(OUT_MANIFEST);
  const b3 = backup(OUT_LEGACY);
  if (b1) console.log('Backup:', path.basename(b1.bak), '(' + b1.sz + ' bytes)');
  if (b2) console.log('Backup:', path.basename(b2.bak), '(' + b2.sz + ' bytes)');
  if (b3) console.log('Backup:', path.basename(b3.bak), '(' + b3.sz + ' bytes)');

  fs.writeFileSync(OUT_BLOCKLIST, JSON.stringify(blocklistOut, null, 2) + '\n', 'utf8');
  fs.writeFileSync(OUT_MANIFEST, JSON.stringify(manifestOut, null, 2) + '\n', 'utf8');
  fs.writeFileSync(OUT_LEGACY, legacyOut, 'utf8');

  // read-back verification
  const rbBl = JSON.parse(fs.readFileSync(OUT_BLOCKLIST, 'utf8')).blocked.length;
  const rbDm = JSON.parse(fs.readFileSync(OUT_MANIFEST, 'utf8')).blocked.length;
  const rbLegacy = [...fs.readFileSync(OUT_LEGACY, 'utf8').matchAll(/qid:"([^"]+)"/g)].map(m => m[1]);
  const rbUnion = new Set([...JSON.parse(fs.readFileSync(OUT_BLOCKLIST, 'utf8')).blocked.map(e => e.qid), ...rbLegacy]);
  console.log('\nRead-back: blocklist=' + rbBl + ' manifest=' + rbDm + ' legacy=' + rbLegacy.length + ' union=' + rbUnion.size);
  const ok = rbBl === blocked.length && rbDm === blocked.length && rbLegacy.length === blockedQids.length && rbUnion.size === blockedQids.length;
  console.log('Integrity:', ok ? 'PASS' : 'FAIL');
  if (!ok) process.exit(1);
}

main();
