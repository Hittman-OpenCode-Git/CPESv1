// Verify S361 DL-008 claims against raw file evidence
const fs = require('fs');
const path = require('path');

// The 8 claimed DL-008 QIDs from S361 Readiness Board
const claims = [
  { qid: 'P1-FC-001', pack: 'pack_c_corrected.js' },
  { qid: 'P1-FD-043', pack: 'pack_d_corrected.js' },
  { qid: 'P1-FD-049', pack: 'pack_d_corrected.js' },
  { qid: 'P1-FD-054', pack: 'pack_d_corrected.js' },
  { qid: 'P1-FD-059', pack: 'pack_d_corrected.js' },
  { qid: 'P1-FD-064', pack: 'pack_d_corrected.js' },
  { qid: 'P1-FD-069', pack: 'pack_d_corrected.js' },
  { qid: 'P1-FD-073', pack: 'pack_d_corrected.js' },
];

const results = [];

for (const claim of claims) {
  const filePath = path.resolve(__dirname, '..', '..', claim.pack);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Find the QID
  const qidPattern = new RegExp(`"QuestionID":\\s*"${claim.qid}"`);
  const qidMatch = raw.match(qidPattern);
  if (!qidMatch) {
    results.push({ qid: claim.qid, error: 'QID not found in file' });
    continue;
  }
  
  // Extract 2000 chars after QID (item fields tend to be before QID in these packs)
  const start = Math.max(0, qidMatch.index - 2000);
  const end = Math.min(raw.length, qidMatch.index + 500);
  const context = raw.substring(start, end);
  
  // Find CorrectChoice
  const ccMatch = context.match(/"CorrectChoice":\s*"([A-D])"/);
  if (!ccMatch) {
    results.push({ qid: claim.qid, error: 'CorrectChoice not found in context' });
    continue;
  }
  const cc = ccMatch[1];
  
  // Find ExplanationWrong[CC]
  const ewRegex = new RegExp(`"ExplanationWrong${cc}":\\s*"(.*?)"`, 's');
  const ewMatch = context.match(ewRegex);
  
  const ewContent = ewMatch ? ewMatch[1] : '(field not found)';
  const isDL008 = ewContent && ewContent.trim().length > 0;
  
  // Find state
  const stateMatch = context.match(/"question_state":\s*"([^"]+)"/);
  const state = stateMatch ? stateMatch[1] : '?';
  
  // Find section
  const sectionMatch = context.match(/"Section":\s*"([^"]+)"/);
  const section = sectionMatch ? sectionMatch[1] : '?';
  
  results.push({
    qid: claim.qid,
    pack: claim.pack,
    section,
    state,
    cc,
    ewCC_length: ewContent ? ewContent.length : 0,
    ewCC_preview: ewContent ? ewContent.substring(0, 100) : '(empty)',
    isDL008,
    lineNum: raw.substring(0, qidMatch.index).split('\n').length
  });
}

// Output
console.log('=== S361 DL-008 CLAIM VERIFICATION ===');
console.log('');
let trueCount = 0;
let falseCount = 0;

for (const r of results) {
  const verdict = r.isDL008 ? 'DL-008 CONFIRMED' : 'NOT DL-008 (clean)';
  if (r.isDL008) trueCount++; else falseCount++;
  console.log(`${verdict}: ${r.qid} | ${r.pack} Sec ${r.section} | CC=${r.cc} | EW[${r.cc}]=${r.ewCC_length} chars | State=${r.state}`);
  console.log(`  EW[${r.cc}] preview: ${r.ewCC_preview}`);
  console.log('');
}

console.log(`=== SUMMARY: ${trueCount} confirmed DL-008, ${falseCount} false claims ===`);

fs.writeFileSync(path.join(__dirname, 'dl008_verification.json'), JSON.stringify(results, null, 2));
