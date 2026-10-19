/**
 * Goal 1 Certification Wave Script
 * Flips unset item-level question_state to "Certified" for P2 case bank items.
 * RULE 5: Max 30 question objects per change-set (wave).
 * §3: Timestamped backup before each pack edit.
 * RULE 16: certification_batch + certification_date stamps.
 * RULE 1: REVISION_HISTORY.md entry (added manually after each wave).
 * CAQS §1.7.4: VERIFIED-AUTHORING basis — keys were independently solved at authoring time,
 * case-level already Certified; item-level flag was the only gap.
 */
const fs = require('fs');
const { execSync } = require('child_process');
const waveNum = parseInt(process.argv[2], 10);
if (!waveNum || waveNum < 1) {
  console.error('Usage: node certify_wave.js <wave-number>');
  process.exit(1);
}

const waveLists = JSON.parse(fs.readFileSync('C:/Users/User/AppData/Local/Temp/opencode/wave_lists.json', 'utf8'));
const wave = waveLists.find(w => w.wave === waveNum);
if (!wave) { console.error('Wave ' + waveNum + ' not found'); process.exit(1); }

const BATCH = 'GOAL-1-P2-CASE-CLOSE';
const DATE = '2026-10-18';
const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

// Group items by bank file
const byBank = {};
wave.items.forEach(it => {
  if (!byBank[it.bank]) byBank[it.bank] = [];
  byBank[it.bank].push(it);
});

let totalCertified = 0;
for (const [bankFile, items] of Object.entries(byBank)) {
  const filePath = bankFile.startsWith('p2/') ? bankFile : 'p2/' + bankFile;
  if (!fs.existsSync(filePath)) {
    console.error('FILE NOT FOUND: ' + filePath);
    process.exit(1);
  }

  // §3: Timestamped backup before edit
  const bakPath = filePath + '.bak-goal1-wave' + waveNum + '-' + ts;
  fs.copyFileSync(filePath, bakPath);
  console.log('Backup: ' + bakPath);

  let src = fs.readFileSync(filePath, 'utf8');
  let fileCertified = 0;

  for (const it of items) {
    const idLine = '        "ItemID": "' + it.itemId + '",\n';
    const idx = src.indexOf(idLine);
    if (idx === -1) {
      console.error('  ITEM NOT FOUND: ' + it.itemId + ' in ' + bankFile);
      process.exit(1);
    }
    // Verify it doesn't already have question_state right after ItemID
    const afterId = src.substring(idx + idLine.length, idx + idLine.length + 25);
    if (afterId.includes('"question_state"')) {
      console.log('  SKIP (already certified): ' + it.itemId);
      continue;
    }
    const insert = '        "question_state": "Certified",\n' +
                   '        "certification_batch": "' + BATCH + '",\n' +
                   '        "certification_date": "' + DATE + '",\n';
    const countBefore = (src.match(idLine) || []).length;
    src = src.split(idLine).join(idLine + insert);
    const countAfter = (src.match(idLine) || []).length;
    if (countBefore !== countAfter || countBefore !== 1) {
      console.error('  REPLACEMENT MISMATCH for ' + it.itemId + ': before=' + countBefore + ' after=' + countAfter);
      process.exit(1);
    }
    fileCertified++;
    totalCertified++;
    console.log('  Certified: ' + it.itemId + ' (' + it.type + ')');
  }

  // Write back
  fs.writeFileSync(filePath, src, 'utf8');
  console.log('Wrote ' + filePath + ' (' + fileCertified + ' items certified)');

  // node --check
  try {
    execSync('node --check ' + filePath, { stdio: 'pipe' });
    console.log('  node --check PASS');
  } catch (e) {
    console.error('  node --check FAIL: ' + e.message);
    console.error('  Restoring from backup: ' + bakPath);
    fs.copyFileSync(bakPath, filePath);
    process.exit(1);
  }
}

console.log('\nWave ' + waveNum + ' complete: ' + totalCertified + ' items certified.');
console.log('REVISION_HISTORY.md entry required (RULE 1) — add entry for wave ' + waveNum + ' with QuestionIDs.');
console.log('Items: ' + wave.items.map(x => x.itemId).join(', '));
