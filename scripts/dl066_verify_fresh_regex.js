const fs = require('fs');
const path = require('path');

// Wrapper that runs the ORIGINAL regex-based verify logic against FRESH files
// to check compatibility

const solutionsPath = path.join(__dirname, 'output', 'dl066_solutions_fresh.json');
const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const solutions = JSON.parse(fs.readFileSync(solutionsPath, 'utf8'));
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

// Original regex-based extractCases (same as dl066_verify.js)
function extractCases(packPath) {
  const content = fs.readFileSync(packPath, 'utf8');
  const cases = [];
  const caseRegex = /"CaseID":\s*"([^"]+)"\s*,\s*"Title"/g;

  let caseMatch;
  const casePositions = [];
  while ((caseMatch = caseRegex.exec(content)) !== null) {
    casePositions.push({ caseId: caseMatch[1], pos: caseMatch.index });
  }

  for (let i = 0; i < casePositions.length; i++) {
    const start = casePositions[i].pos;
    const end = i + 1 < casePositions.length ? casePositions[i + 1].pos : content.length;
    const caseBlock = content.substring(start, end);

    const items = [];
    const itemRegex2 = /"ItemID":\s*"([^"]+)"/g;
    const itemPositions = [];
    let itemMatch;
    while ((itemMatch = itemRegex2.exec(caseBlock)) !== null) {
      itemPositions.push({ itemId: itemMatch[1], pos: itemMatch.index });
    }

    for (let j = 0; j < itemPositions.length; j++) {
      const iStart = itemPositions[j].pos;
      const iEnd = j + 1 < itemPositions.length ? itemPositions[j + 1].pos : caseBlock.length;
      const itemBlock = caseBlock.substring(iStart, iEnd);

      const correctMatch = itemBlock.match(/"Correct":\s*(\[[^\]]*\]|"[^"]*"|'[^']*'|true|false|null|-?\d+\.?\d*)/);
      const typeMatch = itemBlock.match(/"Type":\s*"([^"]+)"/);
      const promptMatch = itemBlock.match(/"Prompt":\s*"([^"]*)"/);
      const choicesMatch = itemBlock.match(/"Choices":\s*\[([^\]]*)\]/);

      let correct = null;
      if (correctMatch) {
        const raw = correctMatch[1];
        try {
          correct = JSON.parse(raw);
        } catch {
          correct = raw.replace(/^["']|["']$/g, '');
        }
      }

      let choices = null;
      if (choicesMatch) {
        try {
          choices = JSON.parse('[' + choicesMatch[1] + ']');
        } catch {
          choices = choicesMatch[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
        }
      }

      const item = {
        itemId: itemPositions[j].itemId,
        type: typeMatch ? typeMatch[1] : 'unknown',
        prompt: promptMatch ? promptMatch[1] : '',
        correct: correct,
        choices: choices
      };
      items.push(item);
    }

    cases.push({ caseId: casePositions[i].caseId, items });
  }
  return cases;
}

// Fix: handle caseId prefix differences
const allCases = [];
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (fs.existsSync(fullPath)) {
    const extracted = extractCases(fullPath);
    allCases.push(...extracted);
  }
}

const caseMap = new Map();
for (const c of allCases) {
  caseMap.set(c.caseId, c);
}

// Build masked case map
const maskedCaseMap = new Map();
for (const mc of masked) {
  maskedCaseMap.set(mc.caseId, mc);
}

let totalItems = 0;
let matches = 0;
let discrepancies = [];
let formatAdjudicate = [];

for (const sol of solutions) {
  const bankCase = caseMap.get(sol.caseId);
  const maskedCase = maskedCaseMap.get(sol.caseId);

  if (!bankCase || !maskedCase) {
    discrepancies.push({ caseId: sol.caseId, issue: 'Case not found' });
    continue;
  }

  for (let si = 0; si < sol.items.length; si++) {
    totalItems++;
    const solItem = sol.items[si];
    const maskedItem = maskedCase.items[si];

    const packItem = bankCase.items.find(pi => pi.prompt === maskedItem.Prompt);

    if (!packItem) {
      discrepancies.push({
        caseId: sol.caseId,
        itemId: solItem.itemId,
        type: solItem.type,
        derived: solItem.derived,
        issue: `No pack item with matching prompt: "${(maskedItem.Prompt || '').substring(0, 80)}..."`,
      });
      continue;
    }

    const derived = solItem.derived;
    const stored = packItem.correct;

    if (packItem.type === 'numeric') {
      const derivedNum = parseFloat(String(derived).replace(/[$,]/g, ''));
      const storedNum = parseFloat(String(stored).replace(/[$,]/g, ''));
      if (Math.abs(derivedNum - storedNum) < 0.01) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId,
          itemId: packItem.itemId,
          type: 'numeric',
          derived: derived,
          stored: stored,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Numeric mismatch: derived=${derived}, stored=${stored}`
        });
      }
    } else if (packItem.type === 'select') {
      const normalize = s => String(s).toLowerCase().trim().replace(/[×−]/g, m => m === '×' ? 'x' : '-').replace(/\s+/g, ' ');
      const derivedStr = normalize(derived);
      const storedStr = normalize(stored);
      if (derivedStr.includes(storedStr) || storedStr.includes(derivedStr)) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId,
          itemId: packItem.itemId,
          type: 'select',
          derived: derived,
          stored: stored,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Select mismatch: derived="${derived}", stored="${stored}"`
        });
      }
    } else if (packItem.type === 'multi') {
      const derivedStr = String(derived).trim();
      const derivedNums = derivedStr.match(/^\d+(,\d+)*$/);
      let derivedTexts = [];
      if (derivedNums && packItem.choices) {
        derivedTexts = derivedStr.split(',').map(n => {
          const idx = parseInt(n.trim()) - 1;
          return packItem.choices[idx] ? packItem.choices[idx].toLowerCase().trim() : '';
        }).filter(t => t);
      } else {
        derivedTexts = derivedStr.split(',').map(s => s.trim().toLowerCase()).filter(t => t);
      }
      const storedArr = Array.isArray(stored) ? stored.map(s => String(s).toLowerCase().trim()) : [String(stored).toLowerCase().trim()];
      const derivedSet = new Set(derivedTexts);
      const storedSet = new Set(storedArr);
      const intersection = [...derivedSet].filter(x => storedSet.has(x));
      if (intersection.length === derivedSet.size && intersection.length === storedSet.size && derivedSet.size > 0) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId,
          itemId: packItem.itemId,
          type: 'multi',
          derived: derived,
          stored: stored,
          derivedTexts: derivedTexts,
          storedTexts: storedArr,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Multi mismatch: derived=[${derivedTexts.join(' | ')}], stored=[${storedArr.join(' | ')}]`
        });
      }
    } else if (packItem.type === 'match') {
      formatAdjudicate.push({
        caseId: sol.caseId,
        itemId: packItem.itemId,
        type: 'match',
        derived: derived,
        stored: stored,
        prompt: (maskedItem.Prompt || '').substring(0, 80),
        note: 'Match item — format adjudicate'
      });
      matches++;
    } else if (packItem.type === 'fill') {
      const derivedStr = String(derived).toLowerCase().trim();
      const storedStr = String(stored).toLowerCase().trim();
      if (derivedStr === storedStr || derivedStr.includes(storedStr) || storedStr.includes(derivedStr)) {
        matches++;
      } else {
        discrepancies.push({
          caseId: sol.caseId,
          itemId: packItem.itemId,
          type: 'fill',
          derived: derived,
          stored: stored,
          prompt: (maskedItem.Prompt || '').substring(0, 80),
          issue: `Fill mismatch: derived="${derived}", stored="${stored}"`
        });
      }
    } else {
      matches++;
    }
  }
}

console.log('=== DL-066 FRESH (Original regex-based logic) ===');
console.log(`Total items: ${totalItems}`);
console.log(`Matches: ${matches}`);
console.log(`Discrepancies: ${discrepancies.length}`);
console.log(`Format-adjudicate (match): ${formatAdjudicate.length}`);
console.log('');

if (discrepancies.length > 0) {
  console.log('=== DISCREPANCIES ===');
  for (const d of discrepancies) {
    console.log(`  ${d.caseId} / ${d.itemId} (${d.type}): ${d.issue}`);
    if (d.derived) console.log(`    Derived: ${String(d.derived).substring(0, 100)}`);
    if (d.stored) console.log(`    Stored:  ${String(d.stored).substring(0, 100)}`);
    if (d.derivedTexts) console.log(`    Derived: [${d.derivedTexts.join(' | ')}]`);
    if (d.storedTexts) console.log(`    Stored:  [${d.storedTexts.join(' | ')}]`);
    if (d.prompt) console.log(`    Prompt: ${d.prompt}`);
  }
  console.log('');
}

console.log('=== SUMMARY ===');
console.log(`Certify-ready: ${matches - formatAdjudicate.length} items across ${solutions.filter(s => s.verdict === 'certify').length} cases`);
console.log(`Quarantine: ${solutions.filter(s => s.verdict === 'quarantine').length} cases`);
console.log(`DL-047-suspect: ${solutions.filter(s => s.verdict === 'dl047-suspect').length} cases`);
console.log(`Discrepancies requiring adjudication: ${discrepancies.length}`);
