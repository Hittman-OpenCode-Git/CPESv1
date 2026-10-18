// ============================================================================
// REFUSED BY DEFAULT — ARCHAEOLOGY ONLY (DL-P2-023, 2026-09-30)
//
// This script executed on 2026-09-24 and demoted 106 cases / 215 items from
// Certified to In Audit with NO provenance stamps, NO manifest, and NO
// REVISION_HISTORY entry. It also dropped the `certifiedItems === 0`
// case-level guard present in its sanctioned siblings
// (quarantine_case_inversions.js:183, _v2.js:178), sweeping every Certified
// item in a listed case rather than only individually implicated ones.
//
// It is retained solely as evidence for DL-P2-023. Re-running it would repeat
// the same unattributed bulk state change.
//
// To inspect historical behavior without executing:
//   node scripts/quarantine_all_case_inversions.js --dry-run
// ============================================================================
if (!process.argv.includes('--archaeology') && !process.argv.includes('--dry-run')) {
  console.error(
    'REFUSED: quarantine_all_case_inversions.js is deprecated (DL-P2-023).\n' +
    'It performed an unattributed bulk quarantine of 106 cases / 215 items on\n' +
    '2026-09-24 with no provenance stamps, no manifest, and no revision-history\n' +
    'entry. It is retained for archaeology only.\n\n' +
    '  --dry-run      show what it would do, change nothing\n' +
    '  --archaeology  execute (requires explicit per-run authorization)\n\n' +
    'For legitimate quarantine work use:\n' +
    '  scripts/quarantine_case_inversions.js   (per-item, guarded, stamps)\n' +
    '  scripts/quarantine_case_inversions_v2.js'
  );
  process.exit(2);
}
if (process.argv.includes('--dry-run')) {
  console.log('[DRY RUN] No files will be modified. Proceeding to report-only mode.');
}

const fs = require('fs');
const path = require('path');

// Case files to process with their variable names
const caseFiles = [
  { path: 'content/cases/case_pack_1_corrected.js', varName: 'CASE_PACK_1' },
  { path: 'content/cases/case_pack_2_corrected.js', varName: 'CASE_PACK_2' },
  { path: 'content/cases/case_pack_3_corrected.js', varName: 'CASE_PACK_3' },
  { path: 'p2/case_pack_p2_1.js', varName: 'casePackP2_1' },
  { path: 'p2/case_pack_p2_2.js', varName: 'casePackP2_2' },
  { path: 'p2/case_pack_p2_3.js', varName: 'casePackP2_3' },
  { path: 'p2/case_pack_p2_authored.js', varName: 'casePackP2Authored' },
  { path: 'p2/case_pack_p2_C4_C8.js', varName: 'casePackP2_C4_C8' }
];

// ALL case IDs that have INVERSION flags - quarantine ALL items in these cases
const inversionCaseIds = [
  'CBQ-C2', 'CBQ-C3', 'CBQ-D2', 'CBQ-E1', 'CBQ-E2',
  'CBQ2-F1', 'CBQ2-A3', 'CBQ3-A1', 'CBQ4-A1', 'CBQ2-B2',
  'CBQ3-B2', 'CBQ2-C3', 'CBQ3-C3', 'CBQ4-C1', 'CBQ4-E1',
  'CBQ4-F1', 'CBQ5-A2', 'CBQ5-B2', 'CBQ4-B1', 'CBQ4-B2',
  'CBQ4-D3', 'CBQ4-E2', 'CBQ4-E3', 'CBQ5-E1', 'CBQ5-E2',
  'CBQ5-E3', 'CBQ4-F2', 'CBQ5-F2', 'CBQ3-A3', 'CBQ3-A4',
  'CBQ3-C4', 'CBQ21-B1', 'CBQ21-C1', 'CBQ21-E1', 'CBQ21-A1',
  'CBQ21-D1', 'CBQ21-B2', 'CBQ21-E2', 'CBQ21-A3', 'CBQ21-C3',
  'CBQ21-D2', 'CBQ21-F2', 'CBQ21-E3', 'CBQ21-A4', 'CBQ21-B4',
  'CBQ21-C4', 'CBQ21-F3', 'CBQ21-A6', 'CBQ21-F4', 'CBQ21-B5',
  'CBQ21-D3', 'CBQ21-D4', 'CBQ21-F5', 'CBQ22-F1', 'CBQ22-A2',
  'CBQ22-D2', 'CBQ22-C1', 'CBQ22-E1', 'CBQ22-B2', 'CBQ22-C2',
  'CBQ22-D3', 'CBQ22-A3', 'CBQ22-F3', 'CBQ22-B3', 'CBQ22-D4',
  'CBQ22-B5', 'CBQ22-D5', 'CBQ22-A4', 'CBQ22-C3', 'CBQ22-F4',
  'CBQ22-C4', 'CBQ22-C6', 'CBQ22-C7', 'CBQ22-C8', 'CBQ22-A5',
  'CBQ22-F5', 'CBQ22-F6', 'CBQ23-C1', 'CBQ23-E1', 'CBQ23-C2',
  'CBQ23-F2', 'CBQ23-A1', 'CBQ23-E2', 'CBQ23-C3', 'CBQ23-D2',
  'CBQ23-E3', 'CBQ23-A3', 'CBQ23-F4', 'CBQ23-A4', 'CBQ23-C5',
  'CBQ23-D3', 'CBQ23-E4', 'CBQ23-F5', 'CBQ23-A6', 'CBQ23-A7',
  'CBQ23-B3', 'CBQ23-B4', 'CBQ23-B5', 'CBQ23-B6', 'CBQ23-C6',
  'CBQ23-C9', 'CBQ22-A8', 'CBQ22-F9', 'CBQ22-F10', 'CBQ22-C9',
  'CBQ22-C10', 'CBQ22-C11', 'CBQ22-C12', 'CBQ23-A5', 'CBQ23-A8',
  'CBQ23-B6', 'CBQ23-C7', 'CBQ23-C8', 'CBQ23-F9', 'CBQ23-F10',
  'CBQ23-F11', 'CBQ23-F12', 'CBQ23-F13', 'CBQ23-F14', 'CBQ23-F15',
  'CBQ23-F16', 'CBQ23-F17', 'CBQ23-F18'
];

const inversionCaseSet = new Set(inversionCaseIds);

let totalQuarantined = 0;

for (const fileInfo of caseFiles) {
  const filePath = fileInfo.path;
  const varName = fileInfo.varName;
  
  if (!fs.existsSync(filePath)) {
    console.log('File not found:', filePath);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const backupPath = filePath + '.bak-quarantine-all-inversions-' + Date.now();
  fs.writeFileSync(backupPath, content);
  console.log('Backup created:', backupPath);
  console.log('Processing', filePath, 'with variable', varName);
  
  let cases;
  try {
    cases = new Function(content + '\nreturn ' + varName + ';')();
  } catch (e) {
    console.log('Failed to parse', filePath, ':', e.message);
    continue;
  }
  
  let fileQuarantined = 0;
  
  for (const c of cases) {
    const caseId = c.CaseID;
    if (inversionCaseSet.has(caseId)) {
      // Quarantine ALL items in this case
      for (const item of c.Items) {
        if ((item.question_state || '').trim() === 'Certified') {
          item.question_state = 'In Audit';
          fileQuarantined++;
          totalQuarantined++;
          console.log('  Quarantined ' + caseId + ' ' + (item.ItemID || item.QuestionID) + ' -> In Audit');
        }
      }
      // Also downgrade case-level state
      if ((c.question_state || '').trim() === 'Certified') {
        c.question_state = 'In Audit';
      }
    }
  }
  
  if (fileQuarantined > 0) {
    const newContent = 'const ' + varName + ' = ' + JSON.stringify(cases, null, 2) + ';\n';
    fs.writeFileSync(filePath, newContent);
    console.log('Quarantined', fileQuarantined, 'items in', filePath);
  } else {
    console.log('No items quarantined in', filePath);
  }
}

console.log('\nTotal items quarantined:', totalQuarantined);