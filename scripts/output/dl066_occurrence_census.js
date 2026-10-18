const fs = require('fs');
function extractArray(raw) {
  const m = raw.match(/=\s*\[/);
  const arrStart = raw.indexOf('[', m.index);
  let depth = 0, pos = arrStart, inString = false, stringChar = '', escape = false;
  do {
    const ch = raw[pos];
    if (escape) { escape = false; pos++; continue; }
    if (inString) {
      if (ch === '\\') { escape = true; pos++; continue; }
      if (ch === stringChar) { inString = false; }
      pos++; continue;
    }
    if (ch === '"' || ch === "'") { inString = true; stringChar = ch; pos++; continue; }
    if (ch === '[') depth++;
    if (ch === ']') depth--;
    pos++;
  } while (depth > 0 && pos < raw.length);
  return JSON.parse(raw.slice(arrStart, pos));
}

const targets = new Set(['CBQ-C2','CBQ-C3','CBQ-D2','CBQ-E1','CBQ-E2','CBQ2-F1','CBQ2-A3','CBQ3-A1','CBQ4-A1','CBQ2-B2','CBQ3-B2','CBQ2-C3','CBQ3-C3','CBQ4-C1','CBQ4-E1','CBQ4-F1','CBQ5-A2','CBQ5-B2','CBQ4-B1','CBQ4-B2','CBQ4-D3','CBQ4-E2','CBQ4-E3','CBQ5-E1','CBQ5-E2','CBQ5-E3','CBQ4-F2','CBQ5-F2','CBQ3-A3','CBQ3-A4','CBQ3-C4']);

let grandTotal = 0;
let grandCaseLevel = 0;
let grandItemLevel = 0;
for (const n of ['1', '2', '3']) {
  const p = 'content/cases/case_pack_' + n + '_corrected.js';
  const raw = fs.readFileSync(p, 'utf8');
  const cases = extractArray(raw);
  let caseLevel = 0, itemLevel = 0, nonTarget = [];
  for (const c of cases) {
    const isTarget = targets.has(c.CaseID);
    if (c.question_state === 'In Audit') {
      if (isTarget) caseLevel++; else nonTarget.push(c.CaseID + '(case)');
    } else if (isTarget) {
      nonTarget.push(c.CaseID + '(case-state=' + c.question_state + ')');
    }
    for (const it of (c.Items || [])) {
      if (it.question_state === 'In Audit') {
        if (isTarget) itemLevel++; else nonTarget.push(it.ItemID + '(item)');
      }
    }
  }
  // raw count cross-check
  const rawCount = (raw.match(/"question_state"\s*:\s*"In Audit"/g) || []).length;
  console.log(p, '| case-level InAudit:', caseLevel, '| item-level InAudit:', itemLevel, '| raw occurrences:', rawCount, '| expected:', caseLevel + itemLevel);
  if (rawCount !== caseLevel + itemLevel) console.log('  *** RAW COUNT MISMATCH — investigate ***');
  if (nonTarget.length) console.log('  *** NON-TARGET In Audit:', nonTarget.join(', '));
  grandTotal += caseLevel + itemLevel;
  grandCaseLevel += caseLevel;
  grandItemLevel += itemLevel;
}
console.log('\nGRAND TOTAL In Audit occurrences:', grandTotal, '(case-level:', grandCaseLevel, ', item-level:', grandItemLevel, ')');
console.log('194 expected (31 cases + 163 items)');
