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
const packs = [
  extractArray(fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8')),
  extractArray(fs.readFileSync('content/cases/case_pack_2_corrected.js', 'utf8')),
  extractArray(fs.readFileSync('content/cases/case_pack_3_corrected.js', 'utf8'))
];
const sol = JSON.parse(fs.readFileSync('scripts/output/dl066_byte_range_solutions.json', 'utf8'));
const targets = ['CBQ-C3-Q5','CBQ-E1-Q5','CBQ4-F1-Q1','CBQ4-F1-Q3','CBQ4-F1-Q5','CBQ4-D3-Q3','CBQ4-D3-Q4','CBQ4-E2-Q4','CBQ4-E3-Q4','CBQ5-F2-Q1'];
for (const c of packs) {
  for (const cs of c) {
    for (const it of (cs.Items || [])) {
      if (targets.includes(it.ItemID)) {
        const s = sol.find(x => x.caseId === cs.CaseID);
        const si = s ? s.items.find(y => y.itemId === it.ItemID) : null;
        console.log('=====', it.ItemID, '(' + it.Type + ')');
        console.log('DERIVED:', si ? JSON.stringify(si.derived).substring(0, 700) : 'none');
        console.log('STORED :', JSON.stringify(it.Correct).substring(0, 700));
        if (it.Choices) console.log('CHOICES:', JSON.stringify(it.Choices).substring(0, 700));
        console.log();
      }
    }
  }
}
