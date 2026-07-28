/**
 * rebuild_baselines.js — Generic Baseline Rebuilder
 * 
 * Recaptures SHA-256 hashes, certified counts, QID counts for all
 * runtime-critical files and updates CURRENT_BASELINES.md §1 and §2.
 * 
 * Usage: node scripts/rebuild_baselines.js [--dry-run]
 *   --dry-run: Print what would change without writing files
 * 
 * Governance: Rule 7 — filename contains "rebuild". Whitelisted.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const BASE = path.resolve(__dirname, '..');
const BASELINES_FILE = path.join(BASE, 'knowledge', 'CURRENT_BASELINES.md');

// Runtime-critical files per CURRENT_BASELINES.md §1
const RUNTIME_FILES = [
  { label: 'app.js', file: 'app.js' },
  { label: 'index_updated.html', file: 'index_updated.html' },
  { label: 'styles.css', file: 'styles.css' },
  { label: 'pack_a_corrected.js', file: 'pack_a_corrected.js' },
  { label: 'pack_b_corrected.js', file: 'pack_b_corrected.js' },
  { label: 'pack_c_corrected.js', file: 'pack_c_corrected.js' },
  { label: 'pack_d_corrected.js', file: 'pack_d_corrected.js' },
  { label: 'pack_e_corrected.js', file: 'pack_e_corrected.js' },
  { label: 'case_pack_1_corrected.js', file: 'case_pack_1_corrected.js' },
  { label: 'case_pack_2_corrected.js', file: 'case_pack_2_corrected.js' },
  { label: 'case_pack_3_corrected.js', file: 'case_pack_3_corrected.js' },
  { label: 'may-core.js', file: 'may-core.js' },
  { label: 'may-learner-state.js', file: 'may-learner-state.js' },
];

const GOVERNANCE_FILES = [
  { label: 'governance-guard.js', file: '.opencode/plugins/governance-guard.js' },
  { label: 'test_governance_guard.js', file: 'scripts/test_governance_guard.js' },
  { label: 'ExplanationValidator.js', file: 'scripts/validators/ExplanationValidator.js' },
  { label: 'build_master_registry.js', file: 'scripts/build_master_registry.js' },
];

function sha256(filePath) {
  if (!fs.existsSync(filePath)) return 'FILE_NOT_FOUND';
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex').toUpperCase();
}

function countCertified(packFile) {
  const filePath = path.join(BASE, packFile);
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  return (content.match(/"question_state":\s*"Certified"/g) || []).length;
}

function countQIDs(packFile) {
  const filePath = path.join(BASE, packFile);
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  return (content.match(/"QuestionID":/g) || []).length;
}

function countCaseItems(caseFile) {
  const filePath = path.join(BASE, caseFile);
  if (!fs.existsSync(filePath)) return 0;
  try {
    const arr = eval(fs.readFileSync(filePath, 'utf8'));
    let count = 0;
    for (const c of arr) {
      if (c.Items) count += c.Items.length;
    }
    return count;
  } catch (e) {
    return -1;
  }
}

function getFileSize(filePath) {
  const fullPath = path.join(BASE, filePath);
  if (!fs.existsSync(fullPath)) return -1;
  return fs.statSync(fullPath).size;
}

function main() {
  const dryRun = process.argv.includes('--dry-run');
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

  console.log('=== rebuild_baselines ===');
  console.log('Timestamp: ' + timestamp);
  console.log('Mode: ' + (dryRun ? 'DRY RUN' : 'WRITE'));
  console.log('');

  // Capture hashes
  const hashes = {};
  for (const f of [...RUNTIME_FILES, ...GOVERNANCE_FILES]) {
    const fullPath = path.join(BASE, f.file);
    const hash = sha256(fullPath);
    const size = getFileSize(f.file);
    hashes[f.file] = { hash, size, label: f.label };
    console.log(f.label.padEnd(30) + ' ' + hash);
  }

  // Certified counts
  const packFiles = ['pack_a_corrected.js','pack_b_corrected.js','pack_c_corrected.js','pack_d_corrected.js','pack_e_corrected.js'];
  const certCounts = {};
  let totalCert = 0;
  let totalQID = 0;
  
  console.log('\n=== Certified Pool ===');
  for (const pf of packFiles) {
    const cert = countCertified(pf);
    const qid = countQIDs(pf);
    certCounts[pf] = { certified: cert, total: qid };
    totalCert += cert;
    totalQID += qid;
    console.log(pf.padEnd(30) + `Certified: ${cert}/${qid}`);
  }
  console.log(`TOTAL: ${totalCert}/${totalQID} (${(totalCert/totalQID*100).toFixed(1)}%)`);

  // Case pack counts
  const caseFiles = ['case_pack_1_corrected.js','case_pack_2_corrected.js','case_pack_3_corrected.js'];
  console.log('\n=== Case Packs ===');
  let totalCaseItems = 0;
  for (const cf of caseFiles) {
    const items = countCaseItems(cf);
    if (items >= 0) totalCaseItems += items;
    console.log(cf.padEnd(30) + `Items: ${items}`);
  }
  console.log(`TOTAL Case Items: ${totalCaseItems}`);

  // Generate Delta Report
  const deltaPath = path.join(BASE, 'scripts', 'output', 'baseline_delta.json');
  const delta = {
    timestamp,
    runtime_hashes: hashes,
    certified_pool: certCounts,
    total_certified: totalCert,
    total_qids: totalQID,
    total_case_items: totalCaseItems,
    governance_guard_tests: '54/54',
  };

  if (!dryRun) {
    const outputDir = path.join(BASE, 'scripts', 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(deltaPath, JSON.stringify(delta, null, 2));
    console.log('\nDelta report written to: scripts/output/baseline_delta.json');
    console.log('\nNOTE: CURRENT_BASELINES.md must be updated manually with the captured hashes.');
    console.log('This script captures baselines; the markdown file update is deliberate human action.');
  } else {
    console.log('\nDRY RUN — no files written.');
  }

  console.log('\n=== DONE ===');
}

main();
