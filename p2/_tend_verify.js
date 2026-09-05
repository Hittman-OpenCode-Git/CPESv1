/**
 * Tend verification script for case study certification.
 * Checks: parse, counts, certified state, structural integrity.
 */
const fs = require('fs');
const base = 'C:/Users/User/OneDrive/Desktop/CMA_Part_1_2026';
const files = [
  ['p2/case_pack_p2_1.js', 'casePackP2_1'],
  ['p2/case_pack_p2_2.js', 'casePackP2_2'],
  ['p2/case_pack_p2_3.js', 'casePackP2_3']
];

let totalCases = 0;
let totalCertified = 0;
let totalUnprocessed = 0;
let allErrors = [];
let allCaseIds = new Set();

for (const [rel, varName] of files) {
  const filePath = base + '/' + rel;
  const src = fs.readFileSync(filePath, 'utf8');
  const fileName = rel.split('/').pop();

  let arr;
  try {
    arr = new Function(src + '\nreturn ' + varName + ';')();
  } catch (e) {
    allErrors.push(fileName + ': PARSE ERROR - ' + e.message);
    continue;
  }

  const cert = arr.filter(c => c.question_state === 'Certified');
  const unp = arr.filter(c => c.question_state !== 'Certified');
  totalCases += arr.length;
  totalCertified += cert.length;
  totalUnprocessed += unp.length;

  let packErrors = [];
  for (const c of arr) {
    if (allCaseIds.has(c.CaseID)) packErrors.push('Duplicate CaseID: ' + c.CaseID);
    allCaseIds.add(c.CaseID);

    if (c.QuestionCount !== c.Items.length) packErrors.push(c.CaseID + ': QuestionCount mismatch');
    if (c.ExhibitCount !== c.Exhibits.length) packErrors.push(c.CaseID + ': ExhibitCount mismatch');
    if (!c.Part2OnlyFlag) packErrors.push(c.CaseID + ': Part2OnlyFlag missing/false');

    const itemIds = new Set(c.Items.map(i => i.ItemID));
    const exhibitRefs = new Set();
    for (const ex of c.Exhibits) {
      if (!ex.Purpose) packErrors.push(c.CaseID + '/' + ex.ExhibitID + ': missing Purpose');
      if (!ex.ReferencedBy || ex.ReferencedBy.length === 0) packErrors.push(c.CaseID + '/' + ex.ExhibitID + ': not referenced');
      for (const ref of (ex.ReferencedBy || [])) {
        exhibitRefs.add(ref);
        if (!itemIds.has(ref)) packErrors.push(c.CaseID + '/' + ex.ExhibitID + ': unknown item ref ' + ref);
      }
    }
    for (const item of c.Items) {
      if (!exhibitRefs.has(item.ItemID)) packErrors.push(c.CaseID + '/' + item.ItemID + ': not ref by exhibit');
    }

    const bloom = { 'Remember': 1, 'Understand': 2, 'Apply': 3, 'Analyze': 4, 'Evaluate': 5, 'Synthesize': 5 };
    const seq = c.Items.map(i => bloom[i.CognitiveLevel]);
    for (let i = 1; i < seq.length; i++) {
      if (seq[i] < seq[i-1]) packErrors.push(c.CaseID + ': cog regression at item ' + i);
    }

    if (c.question_state === 'Certified') {
      if (!c.certification_session) packErrors.push(c.CaseID + ': Certified missing certification_session');
      if (!c.certification_date) packErrors.push(c.CaseID + ': Certified missing certification_date');
    }

    for (const item of c.Items) {
      if (item.Explanation && item.Explanation.length < 50) packErrors.push(c.CaseID + '/' + item.ItemID + ': Explanation <50 chars');
    }
  }

  allErrors.push(...packErrors.map(e => fileName + ': ' + e));
  console.log(fileName + ': ' + arr.length + ' total, ' + cert.length + ' Certified, ' + unp.length + ' Unprocessed, ' + packErrors.length + ' issues');
  if (packErrors.length) packErrors.forEach(e => console.log('  ' + e));
}

console.log('\n=== TEND VERIFICATION SUMMARY ===');
console.log('Total cases: ' + totalCases);
console.log('Total Certified: ' + totalCertified);
console.log('Total Unprocessed: ' + totalUnprocessed);
console.log('Unique CaseIDs: ' + allCaseIds.size);
console.log('Total structural errors: ' + allErrors.length);

if (allErrors.length === 0 && totalUnprocessed === 0) {
  console.log('\n*** ALL CHECKS PASS ***');
} else {
  console.log('\n*** ISSUES FOUND ***');
  allErrors.forEach(e => console.log('  ' + e));
}
