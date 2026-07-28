// scan_dl008_boundary.js — Object-boundary DL-008 scanner for Packs C and D
// Uses string-aware brace tracking (DL-020 compliant)

const fs = require('fs');

function extractObjects(content) {
  const results = [];
  let depth = 0;
  let inString = false;
  let stringChar = '';
  let escape = false;
  let start = -1;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (inString) {
      if (ch === stringChar) { inString = false; }
      continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; continue; }
    if (ch === '{') {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0 && start >= 0) {
        results.push(content.substring(start, i + 1));
        start = -1;
      }
    }
  }
  return results;
}

const files = ['pack_c_corrected.js', 'pack_d_corrected.js'];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const objects = extractObjects(content);
  let dl008Total = 0;
  let dl008Certified = 0;
  const findings = [];

  for (const obj of objects) {
    // Extract CorrectChoice
    const ccMatch = obj.match(/"CorrectChoice":\s*"([A-D])"/);
    if (!ccMatch) continue;
    const cc = ccMatch[1];

    // Get QuestionID
    const qidMatch = obj.match(/"QuestionID":\s*"([^"]+)"/);
    if (!qidMatch) continue;
    const qid = qidMatch[1];

    // Only interested in Pack C (P1-*C-* or P1-C*-*) and Pack D (P1-*D-* or P1-D*-*) items
    // Check question_state
    const qsMatch = obj.match(/"question_state":\s*"([^"]+)"/);
    const isCertified = qsMatch && qsMatch[1] === 'Certified';

    // Check ExplanationWrong[CC]
    const ewSlot = 'ExplanationWrong' + cc;
    const ewRegex = new RegExp('"' + ewSlot + '":\\s*"([^"]*)"');
    const ewMatch = obj.match(ewRegex);

    if (ewMatch && ewMatch[1] !== '') {
      dl008Total++;
      if (isCertified) dl008Certified++;
      findings.push({
        qid: qid,
        cc: cc,
        ew_content: ewMatch[1].substring(0, 80),
        certified: isCertified
      });
    }
  }

  console.log('=== ' + file + ' ===');
  console.log('DL-008 instances: ' + dl008Total + ' (' + dl008Certified + ' Certified)');
  console.log('');
  for (const f of findings) {
    console.log('  ' + f.qid + ' | CC=' + f.cc + ' | EW_' + f.cc + '="' + f.ew_content + '..."' + (f.certified ? ' [Certified]' : ''));
  }
  console.log('');
}
