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
const targets = ['CBQ-C3-Q5','CBQ-E1-Q5','CBQ4-F1-Q1','CBQ4-F1-Q5','CBQ4-D3-Q4','CBQ4-E2-Q4','CBQ4-E3-Q4','CBQ5-F2-Q1'];
const normalize = s => String(s).toLowerCase().trim().replace(/[×−]/g, m => (m === '×' ? 'x' : '-')).replace(/\s+/g, ' ');
for (const c of packs) {
  for (const cs of c) {
    for (const it of (cs.Items || [])) {
      if (targets.includes(it.ItemID) && it.Type === 'match') {
        const s = sol.find(x => x.caseId === cs.CaseID);
        const si = s ? s.items.find(y => y.itemId === it.ItemID) : null;
        const derived = si.derived;
        const derivedStr = typeof derived === 'object' ? Object.entries(derived).map(([l, r]) => l + '->' + r).join(';') : String(derived);
        const hay = normalize(derivedStr);
        console.log('=====', it.ItemID);
        for (const [k, v] of Object.entries(it.Correct)) {
          const needle = normalize(k) + '->' + normalize(v);
          const found = hay.includes(needle);
          if (!found) {
            console.log('  MISSING pair:', JSON.stringify(k).substring(0, 80));
            console.log('    needle:', needle.substring(0, 100));
            const keyIdx = hay.indexOf(normalize(k));
            console.log('    hay at key:', keyIdx >= 0 ? JSON.stringify(hay.substring(keyIdx, keyIdx + 160)) : 'KEY NOT FOUND IN DERIVED');
          }
        }
        console.log();
      }
    }
  }
}
