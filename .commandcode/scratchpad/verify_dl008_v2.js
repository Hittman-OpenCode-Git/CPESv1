// Systematic DL-008 verification: find CC, find EW[CC], verify manually
const fs = require('fs');
const path = require('path');

const claims = [
  { qid: 'P1-FC-001', file: 'pack_c_corrected.js' },
  { qid: 'P1-FD-043', file: 'pack_d_corrected.js' },
  { qid: 'P1-FD-049', file: 'pack_d_corrected.js' },
  { qid: 'P1-FD-054', file: 'pack_d_corrected.js' },
  { qid: 'P1-FD-059', file: 'pack_d_corrected.js' },
  { qid: 'P1-FD-064', file: 'pack_d_corrected.js' },
  { qid: 'P1-FD-069', file: 'pack_d_corrected.js' },
  { qid: 'P1-FD-073', file: 'pack_d_corrected.js' },
];

for (const claim of claims) {
  const filePath = path.resolve(__dirname, '..', '..', claim.file);
  const raw = fs.readFileSync(filePath, 'utf8');
  
  // Find QID position
  const qidIdx = raw.indexOf(`"QuestionID": "${claim.qid}"`);
  if (qidIdx === -1) { console.log(`${claim.qid}: NOT FOUND`); continue; }
  
  // In Pack D/B format, CorrectChoice comes BEFORE QuestionID
  // In Pack C format, CorrectChoice comes BEFORE QuestionID
  // So look backwards from QID for CorrectChoice
  const before = raw.substring(Math.max(0, qidIdx - 3000), qidIdx);
  const after = raw.substring(qidIdx, Math.min(raw.length, qidIdx + 600));
  
  // Find the LAST CorrectChoice before QID
  const ccMatches = [...before.matchAll(/"CorrectChoice":\s*"([A-D])"/g)];
  const cc = ccMatches.length > 0 ? ccMatches[ccMatches.length - 1][1] : null;
  
  if (!cc) {
    console.log(`${claim.qid}: CC NOT FOUND`);
    continue;
  }
  
  // Find EW[CC] in the after portion (it comes AFTER QID in pack_d format)
  const ewPat = new RegExp(`"ExplanationWrong${cc}":\\s*"(.*?)"`, 's');
  const ewMatch = after.match(ewPat);
  const ewContent = ewMatch ? ewMatch[1] : '(absent)';
  const isDL008 = ewContent && ewContent.trim().length > 0;
  
  // Find state in before portion
  const stateMatch = before.match(/"question_state":\s*"([^"]+)"/);
  const state = stateMatch ? stateMatch[stateMatch.length - 1][1] : '?';
  
  console.log(`${isDL008 ? 'DL-008' : 'CLEAN'}: ${claim.qid} | CC=${cc} | EW[${cc}]=${ewContent.length} chars | State=${state}`);
  console.log(`  EW[${cc}]: ${ewContent.substring(0, 120)}`);
}
