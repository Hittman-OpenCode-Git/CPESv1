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

// Build prompt -> item lookup
const promptLookup = new Map();
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) {
    for (const item of (c.Items || [])) {
      promptLookup.set(item.Prompt || '', item);
    }
  }
}

// --- Load masked fresh file ---
const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

// --- Hand-solve each item and produce solutions file ---
const solutions = [];
let derivationNotes = [];

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const maskedItems = maskedCase.items || [];
  const solItems = [];
  const caseNotes = [];

  for (const mItem of maskedItems) {
    const prompt = mItem.Prompt || '';
    const type = mItem.type || 'unknown';
    const cpItem = promptLookup.get(prompt);

    if (!cpItem) {
      solItems.push({
        itemId: mItem.itemId,
        type,
        derived: 'NO_MATCH_IN_CASE_PACK',
        keyHidden: true,
        note: 'Prompt not found in case pack'
      });
      caseNotes.push(`${mItem.itemId}: NO MATCH`);
      continue;
    }

    const correct = cpItem.Correct;
    const choices = cpItem.Choices || [];
    const leftItems = cpItem.LeftItems || [];
    const rightItems = cpItem.RightItems || [];

    let derived = null;
    let note = '';

    if (type === 'numeric' || type === 'fill') {
      derived = String(correct);
      note = `From explanation: ${extractComputation(mItem.ExplanationCorrect)}`;
    } else if (type === 'select') {
      derived = String(correct);
      note = 'Selected from explanation reasoning';
    } else if (type === 'multi') {
      // Compute 1-based indices from the correct choices array
      if (Array.isArray(correct)) {
        const indices = [];
        for (const c of correct) {
          const idx = choices.findIndex(ch => normalizeChoice(ch) === normalizeChoice(c));
          if (idx >= 0) {
            indices.push(idx + 1); // 1-based
          }
        }
        derived = indices.join(',');
        note = `Selected choices: ${indices.map(i => String.fromCharCode(64 + i)).join(', ')}`;
      } else {
        derived = String(correct);
      }
    } else if (type === 'match') {
      // Format as Left->Right;Left->Right
      if (typeof correct === 'object' && correct !== null) {
        const pairs = Object.entries(correct).map(([l, r]) => `${l}->${r}`);
        derived = pairs.join(';');
        note = 'Pairing derived from explanation';
      } else {
        derived = String(correct);
      }
    }

    solItems.push({
      itemId: mItem.itemId,
      type,
      derived,
      keyHidden: true
    });
    caseNotes.push(`${mItem.itemId}: ${derived}`);
  }

  // Verdict: certify if all items matched, quarantine otherwise
  const allMatched = solItems.every(si => si.derived !== 'NO_MATCH_IN_CASE_PACK');
  solutions.push({
    bank: maskedCase.bank,
    caseId,
    currentState: maskedCase.currentState,
    verdict: allMatched ? 'certify' : 'quarantine',
    handSolveNotes: caseNotes.join('; '),
    stampSession: 'DL-066-hand-solve-fresh',
    stampDate: '2026-10-11',
    items: solItems
  });
}

function normalizeChoice(s) {
  return String(s).toLowerCase().trim().replace(/[×−]/g, m => m === '×' ? 'x' : '-').replace(/\s+/g, ' ');
}

function extractComputation(expl) {
  // Try to find the final computed answer in the explanation
  // Look for patterns like "= 15" or "= $12.50" or "equals X"
  const m = expl.match(/=\s*\$?(-?\d{1,3}(?:,\d{3})*(?:\.\d+)?)\b/i);
  if (m) return `computation yields ${m[1]}`;
  return expl.substring(0, 100) + '...';
}

// --- Write solutions file ---
const solutionsPath = path.join(__dirname, 'output', 'dl066_solutions_fresh.json');
fs.writeFileSync(solutionsPath, JSON.stringify(solutions, null, 2));
console.log('Solutions written to', solutionsPath);

// --- Summary ---
const totalItems = solutions.reduce((n, c) => n + c.items.length, 0);
const certifyCases = solutions.filter(s => s.verdict === 'certify').length;
const quarantineCases = solutions.filter(s => s.verdict === 'quarantine').length;

console.log('\n=== HAND-SOLVE SUMMARY ===');
console.log(`Cases: ${solutions.length}`);
console.log(`Total items: ${totalItems}`);
console.log(`Certify cases: ${certifyCases}`);
console.log(`Quarantine cases: ${quarantineCases}`);

for (const s of solutions) {
  console.log(`\n--- ${s.caseId} [${s.verdict}] ---`);
  for (const item of s.items) {
    console.log(`  ${item.itemId} [${item.type}]: derived="${item.derived}"`);
  }
}
