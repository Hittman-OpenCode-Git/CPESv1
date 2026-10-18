const fs = require('fs');
const path = require('path');

// --- Load case pack files by evaluating them ---
function loadCasePack(packPath) {
  const content = fs.readFileSync(packPath, 'utf8');
  let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
  if (code.endsWith(';')) code = code.slice(0, -1);
  return eval(code);
}

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

// Build prompt -> item lookup with full data
const promptLookup = new Map();
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) {
    for (const item of (c.Items || [])) {
      const promptKey = (item.Prompt || '').substring(0, 100);
      promptLookup.set(item.Prompt || '', item);
    }
  }
}

// --- Load fresh solutions and masked files ---
const solutionsPath = path.join(__dirname, 'output', 'dl066_solutions_fresh.json');
const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

// Build masked case lookup
const maskedMap = new Map();
for (const mc of masked) {
  maskedMap.set(mc.caseId, mc);
}

let totalItems = 0;
let matches = 0;
let discrepancies = [];
let formatAdjudicate = [];

function normalizeChoice(s) {
  return String(s).toLowerCase().trim().replace(/[×−]/g, m => m === '×' ? 'x' : '-').replace(/\s+/g, ' ');
}

for (const sol of solutions) {
  const maskedCase = maskedMap.get(sol.caseId);
  if (!maskedCase) {
    discrepancies.push({ caseId: sol.caseId, issue: 'Masked case not found' });
    continue;
  }

  for (let si = 0; si < sol.items.length; si++) {
    totalItems++;
    const solItem = sol.items[si];
    const maskedItem = maskedCase.items[si];

    if (!maskedItem) {
      discrepancies.push({ caseId: sol.caseId, itemId: solItem.itemId, issue: 'No masked item at this index' });
      continue;
    }

    const cpItem = promptLookup.get(maskedItem.Prompt || '');

    if (!cpItem) {
      discrepancies.push({
        caseId: sol.caseId,
        itemId: solItem.itemId,
        issue: `No case pack item with matching prompt: "${(maskedItem.Prompt || '').substring(0, 80)}..."`
      });
      continue;
    }

    const derived = solItem.derived;
    const stored = cpItem.Correct;
    const type = cpItem.Type;

    if (type === 'numeric' || type === 'fill') {
      const derivedNum = parseFloat(String(derived).replace(/[$,€]/g, '').replace(/\s+/g, ' '));
      const storedNum = parseFloat(String(stored).replace(/[$,€]/g, '').replace(/\s+/g, ' '));
      if (isNaN(derivedNum) && isNaN(storedNum)) {
        // Both non-numeric, try string match
        if (normalizeChoice(derived) === normalizeChoice(stored) ||
            normalizeChoice(derived).includes(normalizeChoice(stored)) ||
            normalizeChoice(stored).includes(normalizeChoice(derived))) {
          matches++;
        } else {
          discrepancies.push({
            caseId: sol.caseId, itemId: solItem.itemId, type,
            derived: derived, stored: stored,
            prompt: (maskedItem.Prompt || '').substring(0, 80),
            issue: `Fill mismatch: derived="${derived}", stored="${stored}"`
          });
        }
      } else if (Math.abs(derivedNum - storedNum) < 0.01) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId, itemId: solItem.itemId, type: 'numeric',
          derived: derived, stored: stored,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Numeric mismatch: derived=${derived}, stored=${stored}`
        });
      }
    } else if (type === 'select') {
      const derivedNorm = normalizeChoice(derived);
      const storedNorm = normalizeChoice(stored);
      if (derivedNorm === storedNorm ||
          derivedNorm.includes(storedNorm) ||
          storedNorm.includes(derivedNorm)) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId, itemId: solItem.itemId, type: 'select',
          derived: derived, stored: stored,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Select mismatch: derived="${derived}", stored="${stored}"`
        });
      }
    } else if (type === 'multi') {
      // stored is an array of choice texts
      const storedArr = Array.isArray(stored) ? stored.map(s => normalizeChoice(s)) : [normalizeChoice(stored)];

      // Check if derived is indices (1,2,4) or texts
      const derivedStr = String(derived).trim();
      let derivedTexts = [];

      if (derivedStr.match(/^\d+(,\d+)*$/)) {
        // Indices
        const choices = cpItem.Choices || [];
        derivedTexts = derivedStr.split(',').map(n => {
          const idx = parseInt(n.trim()) - 1;
          return choices[idx] ? normalizeChoice(choices[idx]) : '';
        }).filter(t => t);
      } else {
        // Texts (may be semicolon or comma separated)
        derivedTexts = derivedStr.split(/[,;]/).map(s => s.trim()).filter(t => t).map(t => normalizeChoice(t));
      }

      const derivedSet = new Set(derivedTexts);
      const storedSet = new Set(storedArr);
      const intersection = [...derivedSet].filter(x => storedSet.has(x));

      if (intersection.length === derivedSet.size && intersection.length === storedSet.size && derivedSet.size > 0) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId, itemId: solItem.itemId, type: 'multi',
          derived: derived, stored: JSON.stringify(stored),
          derivedTexts: derivedTexts,
          storedTexts: storedArr,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Multi mismatch: derived=[${derivedTexts.join(', ')}], stored=[${storedArr.join(', ')}]`
        });
      }
    } else if (type === 'match') {
      // Match items: verify pairing
      const derivedObj = {};
      if (typeof derived === 'string' && derived.includes('->')) {
        const pairs = derived.split(';');
        for (const pair of pairs) {
          const arrowIdx = pair.indexOf('->');
          if (arrowIdx >= 0) {
            const left = pair.substring(0, arrowIdx).trim();
            const right = pair.substring(arrowIdx + 2).trim();
            derivedObj[left] = right;
          }
        }
      }

      const storedObj = stored || {};
      let matchCount = 0;
      let totalCount = 0;

      for (const [left, right] of Object.entries(storedObj)) {
        totalCount++;
        const derivedRight = derivedObj[left];
        if (derivedRight && normalizeChoice(derivedRight) === normalizeChoice(right)) {
          matchCount++;
        }
      }

      if (matchCount === totalCount && totalCount > 0) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId, itemId: solItem.itemId, type: 'match',
          derived: derived,
          stored: JSON.stringify(stored),
          issue: `Match mismatch: ${matchCount}/${totalCount} pairs correct`,
          prompt: (maskedItem.Prompt || '').substring(0, 80)
        });
      }
    } else {
      matches++;
    }
  }
}

console.log('=== DL-066 FRESH Verification Results ===');
console.log(`Total items: ${totalItems}`);
console.log(`Matches: ${matches}`);
console.log(`Discrepancies: ${discrepancies.length}`);
console.log(`Match items (self-verified): ${formatAdjudicate.length}`);
console.log('');

if (discrepancies.length > 0) {
  console.log('=== DISCREPANCIES ===');
  for (const d of discrepancies) {
    console.log(`  ${d.caseId} / ${d.itemId} (${d.type}): ${d.issue}`);
    if (d.derived) console.log(`    Derived: ${d.derived}`);
    if (d.stored) console.log(`    Stored:  ${d.stored}`);
    if (d.derivedTexts) console.log(`    Derived texts: ${d.derivedTexts.join(', ')}`);
    if (d.storedTexts) console.log(`    Stored texts:  ${d.storedTexts.join(', ')}`);
    if (d.prompt) console.log(`    Prompt: ${d.prompt}`);
  }
  console.log('');
}

console.log('=== SUMMARY ===');
console.log(`Certify-ready: ${matches} items across ${solutions.filter(s => s.verdict === 'certify').length} cases`);
console.log(`Quarantine: ${solutions.filter(s => s.verdict === 'quarantine').length} cases`);
console.log(`DL-047-suspect: ${solutions.filter(s => s.verdict === 'dl047-suspect').length} cases`);
console.log(`Discrepancies requiring adjudication: ${discrepancies.length}`);

// Exit code
process.exit(discrepancies.length > 0 ? 1 : 0);
