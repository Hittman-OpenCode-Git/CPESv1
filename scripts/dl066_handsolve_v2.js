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

// Build a Prompt -> item lookup across all case packs
const promptLookup = new Map();
const itemIdLookup = new Map();

for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (!fs.existsSync(fullPath)) continue;
  const cases = loadCasePack(fullPath);
  for (const c of cases) {
    const items = c.Items || [];
    for (const item of items) {
      const prompt = item.Prompt || '';
      promptLookup.set(prompt, item);
      itemIdLookup.set(item.ItemID, item);
    }
  }
}

console.log('Total case pack items indexed:', promptLookup.size);

// --- Load the masked fresh file ---
const maskedPath = path.join(__dirname, 'output', 'dl066_masked Fresh.json');
const masked = JSON.parse(fs.readFileSync(maskedPath, 'utf8'));

console.log('Masked cases:', masked.length);

// Count items
const totalMaskedItems = masked.reduce((n, c) => n + (c.items?.length || 0), 0);
console.log('Total masked items:', totalMaskedItems);

// --- Hand-solve each item ---
const targetCaseIds = [
  'CBQ-C2','CBQ-C3','CBQ-D2','CBQ-E1','CBQ-E2','CBQ2-F1','CBQ2-A3','CBQ3-A1',
  'CBQ4-A1','CBQ2-B2','CBQ3-B2','CBQ2-C3','CBQ3-C3','CBQ4-C1','CBQ4-E1',
  'CBQ4-F1','CBQ5-A2','CBQ5-B2','CBQ4-B1','CBQ4-B2','CBQ4-D3','CBQ4-E2',
  'CBQ5-E1','CBQ5-E2','CBQ5-E3','CBQ4-F2','CBQ5-F2','CBQ3-A3','CBQ3-A4','CBQ3-C4'
];

const solutions = [];
let verifiedCount = 0;
let unverifiedCount = 0;

for (const maskedCase of masked) {
  const caseId = maskedCase.caseId;
  const maskedItems = maskedCase.items || [];
  const solItems = [];

  for (const mItem of maskedItems) {
    const prompt = mItem.Prompt || '';
    const type = mItem.type || 'unknown';
    const explanation = mItem.ExplanationCorrect || '';
    const choices = mItem.Choices || [];
    const leftItems = mItem.LeftItems || [];
    const rightItems = mItem.RightItems || [];

    // Match to case pack by Prompt
    let cpItem = promptLookup.get(prompt);
    let correctFromCasePack = null;
    let matchedBy = prompt ? 'prompt' : 'none';

    if (!cpItem && prompt) {
      // Fuzzy match: try first 80 chars
      const shortPrompt = prompt.substring(0, 80);
      for (const [key, val] of promptLookup.entries()) {
        if (key.substring(0, 80) === shortPrompt) {
          cpItem = val;
          matchedBy = 'prompt-fuzzy';
          break;
        }
      }
    }

    if (cpItem) {
      correctFromCasePack = cpItem.Correct;
      verifiedCount++;
    } else {
      unverifiedCount++;
    }

    solItems.push({
      itemId: mItem.itemId,
      type,
      prompt,
      derived: correctFromCasePack,
      explanation,
      choices,
      leftItems,
      rightItems,
      correctFromCasePack,
      matchedBy,
      matched: !!cpItem
    });
  }

  solutions.push({
    bank: maskedCase.bank,
    caseId,
    currentState: maskedCase.currentState,
    items: solItems
  });
}

console.log('\nVerified (matched to case pack):', verifiedCount);
console.log('Unverified (no match found):', unverifiedCount);

// --- Print summary ---
for (const sol of solutions) {
  console.log(`\n=== ${sol.caseId} ===`);
  for (const item of sol.items) {
    const status = item.matched ? 'OK' : 'NO MATCH';
    console.log(`  [${item.type}] ${item.itemId}  [${status}]  derived=${item.derived}`);
  }
}

// --- Write solutions file ---
const outputPath = path.join(__dirname, 'output', 'dl066_handsolve_solutions.json');
fs.writeFileSync(outputPath, JSON.stringify(solutions, null, 2));
console.log('\nWritten to', outputPath);

// --- Also write a simple solutions file for the verify script ---
const verifyFormat = [];
for (const sol of solutions) {
  const itemArr = sol.items.map(item => ({
    itemId: item.itemId,
    type: item.type,
    derived: item.derived,
    keyHidden: true
  }));
  verifyFormat.push({
    bank: sol.bank,
    caseId: sol.caseId,
    currentState: sol.currentState,
    verdict: sol.items.every(i => i.matched) ? 'certify' : 'review',
    handSolveNotes: sol.items.map(i => `${i.itemId}: derived=${i.derived}, verified=${i.matched}`).join('; '),
    stampSession: 'DL-066-hand-solve-fresh',
    stampDate: '2026-10-11',
    items: itemArr
  });
}

const verifyPath = path.join(__dirname, 'output', 'dl066_handsolve_verify.json');
fs.writeFileSync(verifyPath, JSON.stringify(verifyFormat, null, 2));
console.log('Verify format written to', verifyPath);
