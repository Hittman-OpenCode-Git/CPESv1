// Session Orchestrator — S851 → S852/S853/S854 Pipeline (v2 — Truth-Verified)
// Consumes: All S851 outputs (candidates, waves, work_queue, remediation_queue,
//           domain_progress, defect_manifest, readiness_scoring)
// PLUS: Direct pack-file verification (not trusting manifest alone — DL-029 prevention)
// Produces: 3 session packages in scripts/output/session_packages/
//           S852 — Defect Manifest Regeneration (stale manifest: 353 false positives)
//           S853 — WAVE_A Domain E+F Certification (77 READY items)
//           S854 — Governance Cross-Verification
//
// Run: node scripts/session_orchestrator.js [--execute] [--verbose]

const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(__dirname, 'output');
const SESSION_PACKAGE_DIR = path.join(OUTPUT_DIR, 'session_packages');
const PACKS = ['pack_a', 'pack_b', 'pack_c', 'pack_d', 'pack_e'];

if (!fs.existsSync(SESSION_PACKAGE_DIR)) {
  fs.mkdirSync(SESSION_PACKAGE_DIR, { recursive: true });
}

const BATCH_CAP = 28;

function loadJson(name) {
  const fp = path.join(OUTPUT_DIR, name);
  if (!fs.existsSync(fp)) return null;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch (e) {
    console.error(`Failed to parse ${name}: ${e.message}`);
    return null;
  }
}

function loadDefectManifest() {
  const fp = path.join(ROOT, 'governance', 'DEFECT_MANIFEST_DL008_DL026.json');
  if (!fs.existsSync(fp)) return null;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch (e) { return null; }
}

function chunkArray(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// ─── DIRECT PACK VERIFICATION ──────────────────────────────────
// Cross-checks manifest entries against actual pack file state
function verifyManifestAgainstPacks(manifest) {
  const results = {
    byDefect: { 'DL-008': { manifest: 0, verified: 0, falsePositive: 0, certified: 0 },
                'DL-026': { manifest: 0, verified: 0, falsePositive: 0 } },
    items: []
  };

  // Build pack index
  const packIndex = {};
  for (const pn of PACKS) {
    try {
      const items = pr.parsePackFile(pn, ROOT);
      for (const item of items) {
        if (!item.QuestionID) continue;
        packIndex[item.QuestionID] = { pack: pn, item };
      }
    } catch (e) {
      console.error(`  Failed to parse ${pn}: ${e.message}`);
    }
  }

  // Verify DL-008 entries
  if (manifest && manifest.blocked) {
    for (const entry of manifest.blocked) {
      const defect = entry.defect_code || '?';
      if (!results.byDefect[defect]) results.byDefect[defect] = { manifest: 0, verified: 0, falsePositive: 0, certified: 0 };
      results.byDefect[defect].manifest++;

      const pi = packIndex[entry.qid];
      if (!pi) {
        results.items.push({ qid: entry.qid, defect, status: 'NOT_FOUND', manifest: true, real: false });
        continue;
      }

      if (defect === 'DL-008') {
        const cc = pi.item.CorrectChoice;
        if (!cc || !['A', 'B', 'C', 'D'].includes(cc)) {
          results.items.push({ qid: entry.qid, defect, status: 'INVALID_CC', manifest: true, real: false });
          continue;
        }
        const ew = pi.item['ExplanationWrong' + cc];
        const isNonEmpty = ew && typeof ew === 'string' && ew.trim().length > 0;
        const isCert = pi.item.question_state === 'Certified';

        if (isNonEmpty) {
          results.byDefect[defect].verified++;
          if (isCert) results.byDefect[defect].certified++;
          results.items.push({ qid: entry.qid, defect, status: 'VERIFIED_REAL', manifest: true, real: true, certified: isCert, cc, ewLen: ew.length });
        } else {
          results.byDefect[defect].falsePositive++;
          results.items.push({ qid: entry.qid, defect, status: 'FALSE_POSITIVE', manifest: true, real: false });
        }
      } else if (defect === 'DL-026') {
        const cc = pi.item.CorrectChoice;
        let emptyNonCC = 0;
        for (const L of ['A', 'B', 'C', 'D']) {
          if (L === cc) continue;
          const ew = pi.item['ExplanationWrong' + L];
          if (ew === '' || (typeof ew === 'string' && ew.trim() === '')) emptyNonCC++;
        }
        if (emptyNonCC > 0) {
          results.byDefect[defect].verified++;
          results.items.push({ qid: entry.qid, defect, status: 'VERIFIED_REAL', manifest: true, real: true, emptySlots: emptyNonCC });
        } else {
          results.byDefect[defect].falsePositive++;
          results.items.push({ qid: entry.qid, defect, status: 'FALSE_POSITIVE', manifest: true, real: false });
        }
      }
    }
  }

  return results;
}

// Full direct scan across all packs (not trusting manifest)
function fullDirectScan() {
  const results = {
    dl008: { total: 0, certified: 0, items: [] },
    dl026: { total: 0, certified: 0, items: [] },
    questionStates: { Certified: 0, Unprocessed: 0, Archived: 0, 'In Audit': 0, 'Editorial Queue': 0, MISSING: 0 }
  };

  for (const pn of PACKS) {
    try {
      const items = pr.parsePackFile(pn, ROOT);
      for (const item of items) {
        if (!item.QuestionID) continue;
        const qid = item.QuestionID;
        const cc = item.CorrectChoice;
        const state = item.question_state || 'MISSING';
        results.questionStates[state] = (results.questionStates[state] || 0) + 1;

        if (!cc || !['A', 'B', 'C', 'D'].includes(cc)) continue;

        // DL-008: non-empty EW[CC]
        const ewCC = item['ExplanationWrong' + cc];
        if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) {
          results.dl008.total++;
          if (state === 'Certified') results.dl008.certified++;
          results.dl008.items.push({ qid, pack: pn, cc, ewLen: ewCC.length, state });
        }

        // DL-026: empty non-CC EW slots
        let emptyNonCC = 0;
        for (const L of ['A', 'B', 'C', 'D']) {
          if (L === cc) continue;
          const ew = item['ExplanationWrong' + L];
          if (ew === '' || (typeof ew === 'string' && ew.trim() === '')) emptyNonCC++;
        }
        if (emptyNonCC > 0) {
          results.dl026.total++;
          if (state === 'Certified') results.dl026.certified++;
          results.dl026.items.push({ qid, pack: pn, emptySlots: emptyNonCC, state });
        }
      }
    } catch (e) {
      console.error(`  Scan failed for ${pn}: ${e.message}`);
    }
  }
  return results;
}

// ─── SESSION 852 — Defect Manifest Regeneration ────────────────
function buildS852(manifest, verification, directScan) {
  const staleEntries = verification.items.filter(i => i.status === 'FALSE_POSITIVE').length;
  const realEntries = verification.items.filter(i => i.status === 'VERIFIED_REAL').length;

  const batches = [{
    batchId: 'S852-B1',
    operation: 'REGENERATE_MANIFEST',
    itemCount: directScan.dl008.items.length + directScan.dl026.items.length,
    instructions: [
      '1. Run full direct pack-file scan for DL-008 and DL-026 (object-aware, string-safe)',
      '2. Regenerate governance/DEFECT_MANIFEST_DL008_DL026.json from scan results',
      '3. Only include items confirmed by direct pack-file inspection (not regex forward-scan)',
      '4. Mark all entries with verif_method: "direct-object-parse" and verif_timestamp',
      '5. Update stats with verified counts'
    ].join('\n'),
    stages: [
      { stage: 'SCAN', description: 'Full direct pack scan (DL-008 + DL-026)', engine: 'direct object parse' },
      { stage: 'BUILD', description: 'Build manifest from scan results only', engine: 'manifest builder' },
      { stage: 'VERIFY', description: 'Cross-check manifest counts vs direct scan', engine: 'reconciliation' }
    ]
  }];

  return {
    sessionId: 'S852',
    title: 'Defect Manifest Regeneration — Stale Manifest Cleanup',
    type: 'GOVERNANCE',
    priority: 'CRITICAL',
    generatedFrom: 'S851 — Session Orchestrator (Truth-Verified)',
    timestamp: new Date().toISOString(),
    summary: {
      manifestState: `${staleEntries} false positives out of ${staleEntries + realEntries} total entries`,
      dl008Direct: `${directScan.dl008.total} total (${directScan.dl008.certified} certified)`,
      dl026Direct: `${directScan.dl026.total} total (${directScan.dl026.certified} certified)`,
      totalBatches: 1,
      successCriteria: 'Manifest entries match direct pack-file scan with 0 false positives',
      note: 'The current manifest was built with a DL-029-vulnerable regex forward-scanner. All 353 DL-008 entries are false positives — the scanner picked up the next item\'s CorrectChoice due to CC-before-QID object layout.'
    },
    batches
  };
}

// ─── SESSION 853 — WAVE_A Domain E+F Certification ─────────────
function buildS853(candidates, waves, domainProgress) {
  const readyItems = (candidates && candidates.candidates)
    ? candidates.candidates.filter(c => c.state === 'READY')
    : [];

  if (readyItems.length === 0) {
    return {
      sessionId: 'S853',
      title: 'WAVE_A Domain E+F Certification',
      type: 'CERTIFICATION',
      priority: 'HIGH',
      generatedFrom: 'S851 — Session Orchestrator',
      timestamp: new Date().toISOString(),
      summary: { totalReadyItems: 0, totalBatches: 0, note: 'No READY items in candidates.' },
      batches: []
    };
  }

  const byDomain = {};
  for (const item of readyItems) {
    const domain = item.domain || item.section || '?';
    if (!byDomain[domain]) byDomain[domain] = [];
    byDomain[domain].push(item);
  }

  const batches = [];
  for (const [domain, qids] of Object.entries(byDomain)) {
    const chunks = chunkArray(qids, BATCH_CAP);
    for (let i = 0; i < chunks.length; i++) {
      batches.push({
        batchId: `S853-B${batches.length + 1}`,
        domain,
        itemCount: chunks[i].length,
        qids: chunks[i].map(e => e.qid),
        pack: chunks[i][0].pack,
        currentState: chunks[i][0].currentQuestionState || 'Unprocessed',
        operation: 'CAQS_VERIFY_AND_CERTIFY',
        instructions: 'For each QID: perform CAQS §1.6 six-dimension verification at HIGH confidence. Set question_state to "Certified" only after all 6 dimensions pass. Document distractor tier map (A/B/C/D). Verify CorrectChoice unchanged. Write Explanations if needed.'
      });
    }
  }

  const currentCert = domainProgress && domainProgress.overall ? domainProgress.overall.certified : 2221;

  return {
    sessionId: 'S853',
    title: 'WAVE_A Domain E+F Certification — 77 READY Items',
    type: 'CERTIFICATION',
    priority: 'HIGH',
    generatedFrom: 'S851 — Session Orchestrator (Truth-Verified)',
    timestamp: new Date().toISOString(),
    summary: {
      totalReadyItems: readyItems.length,
      totalBatches: batches.length,
      batchCap: BATCH_CAP,
      domainsInvolved: Object.keys(byDomain),
      expectedOutcome: `Certified count: ${currentCert} → ${currentCert + readyItems.length}`,
      successCriteria: 'All 6 CAQS §1.6 dimensions at HIGH confidence. question_state: "Certified".',
      preFlightChecks: [
        'Backup created for all modified pack files (BACKUP_PROTOCOL.md)',
        'Identity validator passes for all target items',
        'DL-008 scan clean (0 non-empty EW[CC])',
        'CorrectChoice independently verified'
      ],
      postFlightChecks: [
        'Certified count increased by expected amount',
        'Governance guard 27/27 PASS',
        'Zero new DL-008 violations',
        'REVISION_HISTORY.md entry written'
      ]
    },
    batches
  };
}

// ─── SESSION 854 — Governance Cross-Verification ────────────────
function buildS854(scans) {
  const checks = [
    { checkId: 'GOV-01', name: 'Certified Count Stability', command: 'Select-String pack_*_corrected.js -Pattern \'"question_state": "Certified"\' | Measure-Object', expected: 'stable_across_2_scans' },
    { checkId: 'GOV-02', name: 'Identity Validator', command: 'node scripts/identity_validator.js', expected: '>=99.9% pass' },
    { checkId: 'GOV-03', name: 'Governance Guard Suite', command: 'node scripts/test_governance_guard.js', expected: '27/27 PASS' },
    { checkId: 'GOV-04', name: 'Delta Ledger Zero Drift', command: 'node scripts/delta_ledger_builder.js', expected: 'NO_CHANGE only' },
    { checkId: 'GOV-05', name: 'DL-008 Direct Scan', command: 'direct object-parse scan', expected: '0 Certified items', current: `${scans.dl008.certified} certified` },
    { checkId: 'GOV-06', name: 'DL-026 Direct Scan', command: 'direct object-parse scan', expected: '0 Certified items', current: `${scans.dl026.certified} certified` },
    { checkId: 'GOV-07', name: 'Question Count Integrity', command: 'Select-String pack_*_corrected.js -Pattern \'"QuestionID"\' | Measure-Object', expected: 2540 },
    { checkId: 'GOV-08', name: 'Manifest Freshness', command: 'Compare manifest generation timestamp to pack file modification times', expected: 'manifest <= 5 min older than packs' },
    { checkId: 'GOV-09', name: 'Work Queue Rebuild', command: 'node scripts/work_queue_manager.js', expected: 'lanes populated, 0 BLOCKED Certified' },
    { checkId: 'GOV-10', name: 'Recommendation Router Run', command: 'node scripts/recommendation_auto_router.js', expected: 'routes assigned, 0 orphaned recs' }
  ];

  return {
    sessionId: 'S854',
    title: 'Governance Cross-Verification — Post-S852/S853 Integrity Sweep',
    type: 'GOVERNANCE',
    priority: 'HIGH',
    generatedFrom: 'S851 → S852/S853 — Session Orchestrator (Truth-Verified)',
    timestamp: new Date().toISOString(),
    summary: {
      totalChecks: checks.length,
      predecessorSessions: ['S852', 'S853'],
      successCriteria: 'All 10 governance checks PASS. Zero drift. Manifest reconciled. Work queue regenerated.',
      preFlightChecks: ['S852 complete (manifest regenerated)', 'S853 complete (77 items certified)', 'All backups confirmed']
    },
    checks
  };
}

// ─── MAIN ──────────────────────────────────────────────────────
function main() {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose');

  console.log('=== S851 → Session Orchestrator v2 (Truth-Verified) ===\n');

  // Load inputs
  const candidates = loadJson('certification_candidates.json');
  const waves = loadJson('certification_waves.json');
  const domainProgress = loadJson('domain_progress.json');
  const manifest = loadDefectManifest();

  console.log('Input Status:');
  console.log(`  certification_candidates.json: ${candidates ? 'LOADED' : 'MISSING'}`);
  console.log(`  certification_waves.json: ${waves ? 'LOADED' : 'MISSING'}`);
  console.log(`  domain_progress.json: ${domainProgress ? 'LOADED' : 'MISSING'}`);
  console.log(`  DEFECT_MANIFEST_DL008_DL026.json: ${manifest ? 'LOADED' : 'MISSING'}`);

  // Direct pack scan (truth source — not manifest)
  console.log('\n--- Direct Pack Scan (Truth Source) ---');
  const directScan = fullDirectScan();
  console.log(`  DL-008: ${directScan.dl008.total} total (${directScan.dl008.certified} certified)`);
  console.log(`  DL-026: ${directScan.dl026.total} total (${directScan.dl026.certified} certified)`);
  console.log(`  States: ${JSON.stringify(directScan.questionStates)}`);

  // Manifest verification
  console.log('\n--- Manifest vs. Reality ---');
  const verification = verifyManifestAgainstPacks(manifest);
  const stale = verification.items.filter(i => i.status === 'FALSE_POSITIVE').length;
  const real = verification.items.filter(i => i.status === 'VERIFIED_REAL').length;
  console.log(`  Manifest entries verified: ${real} real, ${stale} false positives`);
  for (const [defect, counts] of Object.entries(verification.byDefect)) {
    console.log(`  ${defect}: manifest=${counts.manifest}, verified=${counts.verified}, fp=${counts.falsePositive}, certified=${counts.certified}`);
  }

  // Candidate readiness
  const readyCount = (candidates && candidates.candidates)
    ? candidates.candidates.filter(c => c.state === 'READY').length : 0;
  console.log(`\n  Certification Candidates READY: ${readyCount}`);

  // Build sessions
  console.log('\nBuilding session packages...\n');

  const s852 = buildS852(manifest, verification, directScan);
  const s853 = buildS853(candidates, waves, domainProgress);
  const s854 = buildS854(directScan);

  // Write packages
  const packages = { s852, s853, s854 };
  for (const [key, pkg] of Object.entries(packages)) {
    const outPath = path.join(SESSION_PACKAGE_DIR, `${key.toUpperCase()}.json`);
    fs.writeFileSync(outPath, JSON.stringify(pkg, null, 2), 'utf8');
    console.log(`  ${outPath} — ${pkg.summary.totalBatches || pkg.summary.totalChecks || '?'} units`);
  }

  // Orchestrator manifest
  const orchManifest = {
    specId: 'SESSION851_ORCHESTRATOR_MANIFEST',
    timestamp: new Date().toISOString(),
    sourceSession: 'S851',
    generatedSessions: ['S852', 'S853', 'S854'],
    truthCheck: {
      method: 'direct-object-parse',
      dl008Real: directScan.dl008.total,
      dl008Certified: directScan.dl008.certified,
      dl026Real: directScan.dl026.total,
      dl026Certified: directScan.dl026.certified,
      manifestFalsePositives: stale,
      manifestStale: stale > 0
    },
    dashboard: {
      S852: { type: 'GOVERNANCE', priority: 'CRITICAL', description: `Regenerate stale defect manifest (${stale} false positives)` },
      S853: { type: 'CERTIFICATION', priority: 'HIGH', description: `Certify ${readyCount} READY items (Domains E+F)` },
      S854: { type: 'GOVERNANCE', priority: 'HIGH', description: `Post-change integrity sweep — ${s854.summary.totalChecks} checks` }
    },
    executionOrder: ['S852'],
    parallel: ['S853'],
    postExecution: ['S854'],
    note: 'S852 regenerates the manifest first (DL-029 artifact cleanup). S853 can run in parallel. S854 runs after both complete.'
  };

  const mp = path.join(SESSION_PACKAGE_DIR, 'SESSION851_ORCHESTRATOR_MANIFEST.json');
  fs.writeFileSync(mp, JSON.stringify(orchManifest, null, 2), 'utf8');

  console.log(`\n=== Orchestrator Summary ===`);
  console.log(`  S852 (Manifest Regeneration): ${stale} false positives to purge, ${real} real entries`);
  console.log(`  S853 (Certification): ${readyCount} READY items, ${s853.summary.totalBatches} batches`);
  console.log(`  S854 (Governance): ${s854.summary.totalChecks} checks`);
  console.log(`  Execution: S852 → S853 (parallel) → S854`);
  console.log(`  Packages: ${SESSION_PACKAGE_DIR}/`);

  if (verbose) {
    console.log('\n--- DL-008 Real Items ---');
    for (const item of directScan.dl008.items) {
      console.log(`  ${item.qid} (${item.pack}) CC=${item.cc} state=${item.state}`);
    }
    console.log('\n--- DL-026 Real Items ---');
    for (const item of directScan.dl026.items.slice(0, 20)) {
      console.log(`  ${item.qid} (${item.pack}) emptySlots=${item.emptySlots} state=${item.state}`);
    }
    if (directScan.dl026.items.length > 20) console.log(`  ... and ${directScan.dl026.items.length - 20} more`);
    if (s853.batches) {
      console.log('\n--- S853 Batch Plan ---');
      for (const b of s853.batches) {
        console.log(`  ${b.batchId}: ${b.pack} Domain ${b.domain} — ${b.itemCount} items`);
      }
    }
  }

  console.log('\nDone. Session packages ready.');
}

main();
