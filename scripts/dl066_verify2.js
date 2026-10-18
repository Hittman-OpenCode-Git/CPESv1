const fs = require('fs');
const path = require('path');

// Load solutions (latest byte-range file)
const solutionsPath = path.join(__dirname, 'output', 'dl066_byte_range_solutions.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));

// String-aware bracket scanner: extract array from "VAR = [" to matching "]"
function extractArray(raw) {
  const m = raw.match(/=\s*\[/);
  if (!m) throw new Error('No array found');
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

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

const caseMap = new Map();
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = extractArray(fs.readFileSync(fullPath, 'utf8'));
  for (const c of cases) caseMap.set(c.CaseID, { bank: pf, case: c });
}

const normalize = s => String(s).toLowerCase().trim().replace(/[×−]/g, m => (m === '×' ? 'x' : '-')).replace(/\s+/g, ' ');

let totalItems = 0, matches = 0;
const discrepancies = [];
const matchList = [];

for (const sol of solutions) {
  const entry = caseMap.get(sol.caseId);
  if (!entry) { discrepancies.push({ caseId: sol.caseId, itemId: 'CASE', issue: 'Case not found in packs' }); continue; }
  const itemMap = new Map(entry.case.Items.map(it => [it.ItemID, it]));

  for (const solItem of sol.items) {
    if (solItem.derived === null || solItem.derived === 'NO_MATCH_IN_CASE_PACK') continue;
    totalItems++;
    const packItem = itemMap.get(solItem.itemId);
    if (!packItem) {
      discrepancies.push({ caseId: sol.caseId, itemId: solItem.itemId, issue: 'ItemID not found in pack' });
      continue;
    }
    const derived = solItem.derived;
    const stored = packItem.Correct;
    let ok = false;

    if (packItem.Type === 'numeric') {
      const d = parseFloat(String(derived).replace(/[$,%\s]/g, ''));
      const s = parseFloat(String(stored).replace(/[$,%\s]/g, ''));
      ok = Number.isFinite(d) && Number.isFinite(s) && Math.abs(d - s) < 0.01;
    } else if (packItem.Type === 'select') {
      ok = normalize(derived) === normalize(stored);
    } else if (packItem.Type === 'multi') {
      const storedArr = (Array.isArray(stored) ? stored : [stored]).map(normalize);
      let derivedTexts;
      if (/^\d+(,\d+)*$/.test(String(derived).trim()) && packItem.Choices) {
        derivedTexts = String(derived).split(',').map(n => {
          const idx = parseInt(n.trim(), 10) - 1;
          return packItem.Choices[idx] ? normalize(packItem.Choices[idx]) : '';
        }).filter(Boolean);
      } else if (Array.isArray(derived)) {
        derivedTexts = derived.map(normalize);
      } else {
        derivedTexts = String(derived).split(';').map(normalize).filter(Boolean);
      }
      const ds = new Set(derivedTexts), ss = new Set(storedArr);
      ok = ds.size === ss.size && [...ds].every(x => ss.has(x));
    } else if (packItem.Type === 'fill') {
      const d = normalize(derived), s = normalize(stored);
      ok = d === s || d.includes(s) || s.includes(d);
    } else if (packItem.Type === 'match') {
      const storedPairs = typeof stored === 'object' && stored !== null ? stored : {};
      const derivedStr = typeof derived === 'object' && derived !== null
        ? Object.entries(derived).map(([l, r]) => l + '->' + r).join(';')
        : String(derived);
      // Key-anchored: for each stored key->value, require "key->value" (normalized) inside derived
      const storedKeys = Object.keys(storedPairs);
      let found = 0;
      for (const k of storedKeys) {
        const needle = normalize(k) + '->' + normalize(storedPairs[k]);
        const hay = normalize(derivedStr);
        if (hay.includes(needle)) found++;
      }
      ok = found === storedKeys.length;
    } else {
      ok = normalize(derived) === normalize(stored);
    }

    if (ok) { matches++; matchList.push(sol.caseId + '/' + solItem.itemId); }
    else discrepancies.push({ caseId: sol.caseId, itemId: solItem.itemId, type: packItem.Type, derived: JSON.stringify(derived).substring(0, 100), stored: JSON.stringify(stored).substring(0, 100) });
  }
}

console.log('=== DL-066 Verification v2 (ItemID-based, proper parsing) ===');
console.log('Total items:', totalItems);
console.log('Matches:', matches);
console.log('Discrepancies:', discrepancies.length);
if (discrepancies.length) {
  console.log('\n=== DISCREPANCIES ===');
  discrepancies.forEach(d => console.log('  ' + d.caseId + '/' + d.itemId + ' (' + (d.type || '?') + '): derived=' + d.derived + ' stored=' + d.stored));
}
fs.writeFileSync(path.join(__dirname, 'output', 'dl066_verify2_results.json'), JSON.stringify({ totalItems, matches, discrepancies, matchList }, null, 2));
console.log('\nResults written to dl066_verify2_results.json');
