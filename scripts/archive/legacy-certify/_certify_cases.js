/**
 * Certification script: flips 18 Unprocessed case studies (9 in pack 2, 9 in pack 3)
 * to Certified with P2-078 metadata.
 * Backups verified: case_pack_p2_2.js.bak-20260904152425 and case_pack_p2_3.js.bak-20260904152425
 * Each pack has 9 Unprocessed cases — well under Rule 5's 30-item limit.
 */
const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';

const SESSION = 'P2-078';
const DATE = '2026-09-04';

const files = [
  { file: 'p2/case_pack_p2_2.js', varName: 'casePackP2_2', expected: 9 },
  { file: 'p2/case_pack_p2_3.js', varName: 'casePackP2_3', expected: 9 }
];

for (const { file, varName, expected } of files) {
  const filePath = base + '/' + file;
  let src = fs.readFileSync(filePath, 'utf8');

  // Count Unprocessed occurrences
  const unprocessedCount = (src.match(/"question_state": "Unprocessed"/g) || []).length;
  console.log(file + ': found ' + unprocessedCount + ' Unprocessed cases (expected ' + expected + ')');

  if (unprocessedCount !== expected) {
    console.error('  ERROR: count mismatch! Aborting this file.');
    continue;
  }

  // Replace "question_state": "Unprocessed" with Certified + certification metadata
  // The Unprocessed cases have:  "question_state": "Unprocessed",\n    "Exhibits":
  // We insert certification_session and certification_date between question_state and Exhibits
  const oldStr = '    "question_state": "Unprocessed",' + '\n';
  const newStr = '    "question_state": "Certified",' + '\n' +
    '    "certification_session": "' + SESSION + '",' + '\n' +
    '    "certification_date": "' + DATE + '",' + '\n';

  // Verify the replacement string is correct (should match exact indentation)
  const testMatch = src.indexOf(oldStr);
  if (testMatch === -1) {
    // Try with different line endings (CRLF)
    console.log('  Trying CRLF variant...');
    const oldStrCRLF = '    "question_state": "Unprocessed",\r\n';
    const newStrCRLF = '    "question_state": "Certified",\r\n' +
      '    "certification_session": "' + SESSION + '",\r\n' +
      '    "certification_date": "' + DATE + '",' + '\r\n';
    if (src.indexOf(oldStrCRLF) !== -1) {
      src = src.split(oldStrCRLF).join(newStrCRLF);
    } else {
      console.error('  ERROR: Could not find Unprocessed pattern. Aborting.');
      continue;
    }
  } else {
    src = src.split(oldStr).join(newStr);
  }

  // Verify the replacement count
  const remainingUnprocessed = (src.match(/"question_state": "Unprocessed"/g) || []).length;
  const newCertified = (src.match(/"question_state": "Certified"/g) || []).length;
  console.log('  Remaining Unprocessed: ' + remainingUnprocessed);
  console.log('  Total Certified now: ' + newCertified);

  // Write back
  fs.writeFileSync(filePath, src, 'utf8');
  console.log('  Written successfully.');

  // Verify parsing with Function constructor
  try {
    const arr = new Function(src + '\nreturn ' + varName + ';')();
    const nowCert = arr.filter(c => c.question_state === 'Certified').length;
    const nowUnp = arr.filter(c => c.question_state !== 'Certified').length;
    console.log('  Parse OK: ' + nowCert + ' Certified, ' + nowUnp + ' Unprocessed, ' + arr.length + ' total');
  } catch (e) {
    console.error('  ERROR: Parse failed after write! ' + e.message);
    console.error('  Restoring from backup...');
    fs.copyFileSync(filePath + '.bak-20260904152425', filePath);
    console.log('  Restored from backup.');
  }
}
console.log('\nCertification complete.');
