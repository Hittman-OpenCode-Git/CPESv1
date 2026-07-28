// S852 — Defect Manifest Regeneration
// Rebuilds governance/DEFECT_MANIFEST_DL008_DL026.json from direct pack-file scan.
// Replaces the DL-029-vulnerable manifest (351 false positives).
//
// Run: node scripts/s852_regenerate_manifest.js

const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'governance', 'DEFECT_MANIFEST_DL008_DL026.json');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').replace('T', '-').slice(0, 15);
}

function qidToPack(qid) {
  if (/^P1-[A-F]-\d{3}$/.test(qid)) return 'A';
  if (/^P1B-[A-F]-\d{3}$/.test(qid)) return 'B';
  if (/^P1-[A-F]C-\d{3}$/.test(qid)) return 'C';
  if (/^P1-[A-F]D-\d{3}$/.test(qid)) return 'D';
  if (/^(P1E-[A-F]-\d{3}|P1-E-R\d{2})$/.test(qid)) return 'E';
  return '?';
}

function qidToSection(qid) {
  if (/^P1-([A-F])-\d{3}$/.test(qid)) return RegExp.$1;
  if (/^P1B-([A-F])-\d{3}$/.test(qid)) return RegExp.$1;
  if (/^P1-([A-F])C-\d{3}$/.test(qid)) return RegExp.$1;
  if (/^P1-([A-F])D-\d{3}$/.test(qid)) return RegExp.$1;
  if (/^P1E-([A-F])-\d{3}$/.test(qid)) return RegExp.$1;
  if (/^P1-E-R\d{2}$/.test(qid)) return 'E';
  return '?';
}

function fullScan() {
  const dl008 = [];
  const dl026 = [];
  let totalItems = 0;

  for (const pn of PACKS) {
    const items = pr.parsePackFile(pn, ROOT);
    for (const item of items) {
      if (!item.QuestionID) continue;
      totalItems++;
      const qid = item.QuestionID;
      const cc = item.CorrectChoice;
      const state = item.question_state || 'MISSING';
      const section = qidToSection(qid);

      if (!cc || !['A', 'B', 'C', 'D'].includes(cc)) continue;

      // DL-008: non-empty EW[CC]
      const ewCC = item['ExplanationWrong' + cc];
      if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) {
        dl008.push({
          qid,
          section,
          cc,
          state,
          ewLen: ewCC.length
        });
      }

      // DL-026: empty non-CC EW slots
      let emptyNonCC = 0;
      const emptySlots = [];
      for (const L of ['A', 'B', 'C', 'D']) {
        if (L === cc) continue;
        const ew = item['ExplanationWrong' + L];
        if (ew === '' || (typeof ew === 'string' && ew.trim() === '')) {
          emptyNonCC++;
          emptySlots.push(L);
        }
      }
      if (emptyNonCC > 0) {
        dl026.push({
          qid,
          section,
          cc,
          state,
          emptySlots: emptyNonCC,
          whichSlots: emptySlots.join(',')
        });
      }
    }
  }

  return { totalItems, dl008, dl026 };
}

function buildBlockedEntryDL008(item) {
  const pack = qidToPack(item.qid);
  return {
    qid: item.qid,
    pack,
    section: item.section,
    defect_code: 'DL-008',
    state: item.state,
    block_from_delivery: true,
    block_from_recommendation: true,
    cc: item.cc,
    ewLen: item.ewLen,
    notes: `S852-direct-scan: EW[${item.cc}] ${item.ewLen} chars`
  };
}

function buildBlockedEntryDL026(item) {
  const pack = qidToPack(item.qid);
  return {
    qid: item.qid,
    pack,
    section: item.section,
    defect_code: 'DL-026',
    state: item.state,
    block_from_delivery: true,
    block_from_recommendation: true,
    correctChoice: item.cc,
    notes: `S852-direct-scan: empty non-CC EW slots (${item.whichSlots})`
  };
}

function main() {
  console.log('=== S852 — Defect Manifest Regeneration ===\n');

  // 1. Backup existing manifest
  if (fs.existsSync(MANIFEST_PATH)) {
    const bakPath = MANIFEST_PATH.replace('.json', `.json.bak-${timestamp()}`);
    fs.copyFileSync(MANIFEST_PATH, bakPath);
    console.log(`Backup: ${bakPath}`);
    const bakSize = fs.statSync(bakPath).size;
    console.log(`  Size: ${bakSize} bytes — ${bakSize > 0 ? 'CONFIRMED' : 'EMPTY — ABORT, DO NOT PROCEED'}`);
    if (bakSize === 0) { console.error('FATAL: backup is empty'); process.exit(1); }
  }

  // 2. Direct pack scan
  console.log('\n--- Direct Pack Scan ---');
  const scan = fullScan();
  console.log(`  Total items scanned: ${scan.totalItems}`);
  console.log(`  DL-008 (non-empty EW[CC]): ${scan.dl008.length}`);
  console.log(`  DL-026 (empty non-CC EW): ${scan.dl026.length}`);

  // DL-008 breakdown
  const dl008ByState = {};
  for (const item of scan.dl008) {
    dl008ByState[item.state] = (dl008ByState[item.state] || 0) + 1;
  }
  console.log(`  DL-008 by state: ${JSON.stringify(dl008ByState)}`);

  // DL-026 breakdown
  const dl026ByState = {};
  for (const item of scan.dl026) {
    dl026ByState[item.state] = (dl026ByState[item.state] || 0) + 1;
  }
  console.log(`  DL-026 by state: ${JSON.stringify(dl026ByState)}`);

  // By pack
  const dl008ByPack = {};
  for (const item of scan.dl008) {
    const p = qidToPack(item.qid);
    dl008ByPack[p] = (dl008ByPack[p] || 0) + 1;
  }
  const dl026ByPack = {};
  for (const item of scan.dl026) {
    const p = qidToPack(item.qid);
    dl026ByPack[p] = (dl026ByPack[p] || 0) + 1;
  }
  console.log(`  DL-008 by pack: ${JSON.stringify(dl008ByPack)}`);
  console.log(`  DL-026 by pack: ${JSON.stringify(dl026ByPack)}`);

  // 3. Build blocked entries
  const blockedDL008 = scan.dl008.map(buildBlockedEntryDL008);
  const blockedDL026 = scan.dl026.map(buildBlockedEntryDL026);
  const allBlocked = [...blockedDL008, ...blockedDL026];

  // 4. Build manifest
  const now = new Date().toISOString();
  const stats = {
    total_dl008: scan.dl008.length,
    dl008_certified: scan.dl008.filter(i => i.state === 'Certified').length,
    dl008_archived: scan.dl008.filter(i => i.state === 'Archived').length,
    dl008_by_pack: dl008ByPack,
    dl026_total: scan.dl026.length,
    dl026_certified: scan.dl026.filter(i => i.state === 'Certified').length,
    dl026_archived: scan.dl026.filter(i => i.state === 'Archived').length,
    dl026_by_pack: dl026ByPack,
    grand_total_blocked: allBlocked.length
  };

  const manifest = {
    _metadata: {
      session: 852,
      date: now.slice(0, 10),
      source: 'S852 — Direct object-parse scan (DL-029-safe)',
      scope: `Full 5-pack scan of ${scan.totalItems} items`,
      packs_scanned: PACKS.map(p => p.replace('pack_', '').toUpperCase()),
      methodology: 'pack_reader.parsePackFile() via Function constructor. Within-object CorrectChoice extraction. String-aware, no forward-scan or regex-window. DL-029 immune.',
      schema_version: '2.0',
      regenerated_at: now,
      regenerated_by: 'S852 — Session Orchestrator',
      previous_manifest_false_positives: 351,
      previous_manifest_root_cause: 'DL-029 regex block-scan bug: CorrectChoice-before-QuestionID object layout caused scanner to read next QID\'s CC (75% false positive rate)',
      counts_by_code: {
        'DL-008': scan.dl008.length,
        'DL-026': scan.dl026.length
      },
      counts_by_pack: {
        'DL-008_A': dl008ByPack.A || 0,
        'DL-008_B': dl008ByPack.B || 0,
        'DL-008_C': dl008ByPack.C || 0,
        'DL-008_D': dl008ByPack.D || 0,
        'DL-008_E': dl008ByPack.E || 0,
        'DL-026_A': dl026ByPack.A || 0,
        'DL-026_B': dl026ByPack.B || 0,
        'DL-026_C': dl026ByPack.C || 0,
        'DL-026_D': dl026ByPack.D || 0,
        'DL-026_E': dl026ByPack.E || 0
      },
      total_blocked: allBlocked.length,
      validation_notes: `Regenerated from direct pack scan. Previous manifest had 351 false positives. Current state: ${scan.dl008.filter(i => i.state === 'Certified').length} Certified DL-008, ${scan.dl026.filter(i => i.state === 'Certified').length} Certified DL-026.`
    },
    dl008: scan.dl008,
    dl026: scan.dl026,
    stats,
    blocked: allBlocked
  };

  // 5. Write
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  const newSize = fs.statSync(MANIFEST_PATH).size;

  console.log(`\n--- Results ---`);
  console.log(`  Manifest written: ${MANIFEST_PATH}`);
  // Skip old size comparison (backup path resolution not needed)
  // console.log(`  Size: ${newSize} bytes vs previous ${oldSize}`)
  console.log(`  Previous: 351 blocked (all false positives)`);
  console.log(`  Current: ${allBlocked.length} blocked (all direct-scan-verified)`);
  console.log(`  DL-008: ${scan.dl008.length} (${scan.dl008.filter(i => i.state === 'Certified').length} Certified)`);
  console.log(`  DL-026: ${scan.dl026.length} (${scan.dl026.filter(i => i.state === 'Certified').length} Certified)`);

  // 6. Cross-check
  const readBack = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const rbBlocked = readBack.blocked.length;
  const rbDl008 = readBack.dl008.length;
  const rbDl026 = readBack.dl026.length;

  console.log(`\n--- Cross-Check ---`);
  console.log(`  Read-back blocked: ${rbBlocked} (expected: ${allBlocked.length})`);
  console.log(`  Read-back dl008: ${rbDl008} (expected: ${scan.dl008.length})`);
  console.log(`  Read-back dl026: ${rbDl026} (expected: ${scan.dl026.length})`);
  console.log(`  Integrity: ${(rbBlocked === allBlocked.length && rbDl008 === scan.dl008.length && rbDl026 === scan.dl026.length) ? 'PASS' : 'FAIL'}`);

  console.log('\nS852 manifest regeneration complete.');
}

main();
