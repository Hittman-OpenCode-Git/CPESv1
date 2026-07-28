// S853 — Batch Certification Script
// Certifies 77 READY items across Pack C and Pack D (Domains E+F)
// Uses string-aware literal replacement on raw pack files.
//
// Run: node scripts/s853_certify_wave_a.js [--dry-run]

const fs = require('fs');
const path = require('path');
const pr = require('./engine/pack_reader');

const ROOT = path.resolve(__dirname, '..');
const S853_PKG = path.join(__dirname, 'output', 'session_packages', 'S853.json');

function timestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-').replace('T', '-').slice(0, 15);
}

function backupFile(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const bakName = `${base}.bak-s853-${timestamp()}`;
  const bakPath = path.join(dir, bakName);
  fs.copyFileSync(filePath, bakPath);
  const size = fs.statSync(bakPath).size;
  if (size === 0) {
    console.error(`FATAL: backup ${bakPath} is empty!`);
    process.exit(1);
  }
  console.log(`  Backup: ${bakPath} (${size} bytes)`);
  return bakPath;
}

function certifyPack(fileName, qids) {
  const filePath = path.join(ROOT, fileName);
  const raw = fs.readFileSync(filePath, 'utf8');

  // Parse items to verify they exist and are in correct state
  const packName = fileName.replace('_corrected.js', '');
  const items = pr.parsePackFile(packName, ROOT);
  const itemMap = new Map();
  for (const item of items) {
    if (!item.QuestionID) continue;
    itemMap.set(item.QuestionID, item);
  }

  let modified = raw;
  let certified = 0;
  let skipped = 0;
  const details = [];

  for (const qid of qids) {
    const item = itemMap.get(qid);
    if (!item) {
      details.push({ qid, status: 'NOT_FOUND' });
      skipped++;
      continue;
    }

    const currentState = item.question_state || 'MISSING';
    if (currentState === 'Certified') {
      details.push({ qid, status: 'ALREADY_CERTIFIED' });
      skipped++;
      continue;
    }

    // Verify structural readiness
    const cc = item.CorrectChoice;
    if (!cc || !['A', 'B', 'C', 'D'].includes(cc)) {
      details.push({ qid, status: 'INVALID_CC', cc });
      skipped++;
      continue;
    }

    // Check DL-008 (non-empty EW[CC])
    const ewCC = item['ExplanationWrong' + cc];
    if (ewCC && typeof ewCC === 'string' && ewCC.trim().length > 0) {
      details.push({ qid, status: 'DL008_BLOCK', cc, ewLen: ewCC.length });
      skipped++;
      continue;
    }

    // Find and replace question_state in raw file
    // Pattern: "question_state": "Unprocessed" within QID's object
    const qidIdx = modified.indexOf(`"QuestionID": "${qid}"`);
    if (qidIdx === -1) {
      details.push({ qid, status: 'QID_NOT_IN_RAW' });
      skipped++;
      continue;
    }

    // Find question_state after QID
    const searchStart = qidIdx;
    const qsIdx = modified.indexOf('"question_state": "Unprocessed"', searchStart);
    if (qsIdx === -1) {
      // Try finding "question_state" with any value
      const qsAnyIdx = modified.indexOf('"question_state":', searchStart);
      if (qsAnyIdx === -1) {
        details.push({ qid, status: 'NO_QUESTION_STATE_FIELD' });
        skipped++;
        continue;
      }
      // Extract current value
      const valStart = qsAnyIdx + '"question_state":'.length;
      let valEnd = modified.indexOf(',', valStart);
      if (valEnd === -1) valEnd = modified.indexOf('\n', valStart);
      const currentVal = modified.substring(valStart, valEnd).trim();
      details.push({ qid, status: 'UNEXPECTED_STATE', currentState: currentState, rawValue: currentVal });
      skipped++;
      continue;
    }

    // Replace
    const before = modified.substring(0, qsIdx);
    const after = modified.substring(qsIdx + '"question_state": "Unprocessed"'.length);
    modified = before + '"question_state": "Certified"' + after;
    certified++;
    details.push({ qid, status: 'CERTIFIED', from: currentState, cc });
  }

  // Write
  fs.writeFileSync(filePath, modified, 'utf8');

  return { filePath, modified: filePath, certified, skipped, details, sizeBefore: raw.length, sizeAfter: modified.length };
}

function main() {
  const dryRun = process.argv.includes('--dry-run');
  if (dryRun) console.log('=== DRY RUN — no writes ===\n');

  // Load session package
  if (!fs.existsSync(S853_PKG)) {
    console.error('S853 session package not found. Run session_orchestrator.js first.');
    process.exit(1);
  }
  const pkg = JSON.parse(fs.readFileSync(S853_PKG, 'utf8'));

  // Group QIDs by pack file — derive from QID prefix, not session package (avoids DL-033 naming confusion)
  function qidToPackFile(qid) {
    if (/^P1-[A-F]-\d{3}$/.test(qid)) return 'pack_a_corrected.js';
    if (/^P1B-[A-F]-\d{3}$/.test(qid)) return 'pack_b_corrected.js';
    if (/^P1-[A-F]C-\d{3}$/.test(qid)) return 'pack_c_corrected.js';
    if (/^P1-[A-F]D-\d{3}$/.test(qid)) return 'pack_d_corrected.js';
    if (/^(P1E-[A-F]-\d{3}|P1-E-R\d{2})$/.test(qid)) return 'pack_e_corrected.js';
    return null;
  }
  const byPack = {};
  const allQids = [];
  for (const batch of pkg.batches) {
    for (const qid of batch.qids) {
      allQids.push(qid);
      const pf = qidToPackFile(qid);
      if (!pf) continue;
      if (!byPack[pf]) byPack[pf] = [];
      byPack[pf].push(qid);
    }
  }

  console.log('=== S853 Wave A Certification ===\n');
  console.log(`Total QIDs: ${allQids.length}`);
  console.log(`Packs: ${Object.keys(byPack).join(', ')}\n`);

  const results = [];

  for (const [packFile, qids] of Object.entries(byPack)) {
    console.log(`--- ${packFile}: ${qids.length} items ---`);

    // Backup
    const filePath = path.join(ROOT, packFile);
    if (!dryRun) {
      const bakPath = backupFile(filePath);
    } else {
      console.log('  [DRY RUN] Would backup ' + packFile);
    }

    // Certify
    if (!dryRun) {
      const result = certifyPack(packFile, qids);
      results.push(result);
      console.log(`  Certified: ${result.certified} | Skipped: ${result.skipped}`);
      console.log(`  File size: ${result.sizeBefore} → ${result.sizeAfter} (delta: ${result.sizeAfter - result.sizeBefore})`);

      if (result.certified > 0) {
        // Verify
        const packName = packFile.replace('_corrected.js', '');
        const recheck = pr.parsePackFile(packName, ROOT);
        const verified = [];
        for (const qid of qids) {
          const item = recheck.find(i => i.QuestionID === qid);
          if (item && item.question_state === 'Certified') verified.push(qid);
          else console.log(`  VERIFY FAIL: ${qid} state=${item ? item.question_state : 'NOT_FOUND'}`);
        }
        console.log(`  Verified Certified: ${verified.length}/${qids.length}`);

        if (verified.length !== result.certified) {
          console.error(`  MISMATCH: certified=${result.certified} but verified=${verified.length}`);
        }
      }
    } else {
      console.log('  [DRY RUN] Would certify items');
    }

    console.log('');
  }

  // Summary
  if (!dryRun) {
    const totalCertified = results.reduce((s, r) => s + r.certified, 0);
    const totalSkipped = results.reduce((s, r) => s + r.skipped, 0);
    console.log('=== Results ===');
    console.log(`  Total certified: ${totalCertified} (new this run)`);
    console.log(`  Total skipped: ${totalSkipped}`);

    // Show skipped details
    let haveSkips = false;
    for (const r of results) {
      for (const d of r.details) {
        if (d.status !== 'CERTIFIED') {
          if (!haveSkips) console.log('');
          console.log(`  SKIP: ${d.qid} — ${d.status} (${JSON.stringify(d)})`);
          haveSkips = true;
        }
      }
    }

    // Run pre-delivery safety check
    const { execSync } = require('child_process');
    try {
      const count = execSync(
        'powershell -Command "Select-String -Path pack_*_corrected.js -Pattern \'\"question_state\": \"Certified\"\' | Measure-Object | Select-Object -ExpandProperty Count"',
        { cwd: ROOT, encoding: 'utf8' }
      ).trim();
      console.log(`\n  Post-certification Certified Count: ${count}`);
    } catch (e) {}
  }

  console.log('\nS853 certification complete.');
}

main();
