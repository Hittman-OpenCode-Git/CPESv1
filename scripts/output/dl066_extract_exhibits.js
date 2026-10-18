const fs = require('fs');

const caseIds = [
  'CBQ-E1','CBQ-E2','CBQ2-F1',
  'CBQ3-A1','CBQ2-B2','CBQ3-B2','CBQ2-C3','CBQ3-C3','CBQ4-E1','CBQ4-F1',
  'CBQ5-A2','CBQ4-B1','CBQ4-B2','CBQ4-D3','CBQ4-E2','CBQ5-E1','CBQ5-E2',
  'CBQ5-E3','CBQ4-F2','CBQ5-F2','CBQ3-A3','CBQ3-C4'
];

const packs = [
  'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\content\\cases\\case_pack_1_corrected.js',
  'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\content\\cases\\case_pack_2_corrected.js',
  'C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\content\\cases\\case_pack_3_corrected.js'
];

const results = {};

for (const packPath of packs) {
  const src = fs.readFileSync(packPath, 'utf8');
  const m = src.match(/=\s*\[/);
  if (!m) continue;
  const start = src.indexOf('[', m.index);
  let depth = 0, inStr = false, esc = false, end = -1;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (esc) { esc = false; }
      else if (ch === '\\') { esc = true; }
      else if (ch === '"') { inStr = false; }
      continue;
    }
    if (ch === '"') { inStr = true; continue; }
    if (ch === '[' || ch === '{') depth++;
    else if (ch === ']' || ch === '}') { depth--; if (depth === 0 && ch === ']') { end = i; break; } }
  }
  const jsonStr = src.substring(start, end + 1).replace(/,\s*([}\]])/g, '$1');
  const cases = JSON.parse(jsonStr);
  for (const c of cases) {
    if (caseIds.includes(c.CaseID)) {
      results[c.CaseID] = { Title: c.Title, Exhibits: c.Exhibits };
    }
  }
}

fs.writeFileSync('C:\\Users\\User\\OneDrive\\Desktop\\CMA_Part_1_2026\\scripts\\output\\dl066_exhibits.json', JSON.stringify(results, null, 2));
console.log('Extracted exhibits for', Object.keys(results).length, 'cases');
for (const id of caseIds) {
  if (!results[id]) console.log('MISSING:', id);
}
