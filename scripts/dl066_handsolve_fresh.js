const fs = require('fs');
const path = require('path');

// --- Load case pack files by evaluating them ---
function loadCasePack(packPath) {
  const content = fs.readFileSync(packPath, 'utf8');
  // Strip "const CASE_PACK_N = " prefix so we can eval the array
  let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
  if (code.endsWith(';')) code = code.slice(0, -1);
  const data = eval(code);
  return data;
}

const packFiles = [
  'content/cases/case_pack_1_corrected.js',
  'content/cases/case_pack_2_corrected.js',
  'content/cases/case_pack_3_corrected.js'
];

let allCases = [];
for (const pf of packFiles) {
  const fullPath = path.join(__dirname, '..', pf);
  if (fs.existsSync(fullPath)) {
    const cases = loadCasePack(fullPath);
    for (const c of cases) {
      c._bank = pf;
      c._pack = cases;
      allCases.push(c);
    }
  }
}

const caseMap = new Map();
for (const c of allCases) {
  caseMap.set(c.CaseID, c);
}

// --- Target items (44 items across 30 cases) ---
const targetCaseIds = [
  'CBQ-C2', 'CBQ-C3', 'CBQ-D2', 'CBQ-E1', 'CBQ-E2',
  'CBQ2-F1', 'CBQ2-A3', 'CBQ3-A1', 'CBQ4-A1', 'CBQ2-B2',
  'CBQ3-B2', 'CBQ2-C3', 'CBQ3-C3', 'CBQ4-C1', 'CBQ4-E1',
  'CBQ4-F1', 'CBQ5-A2', 'CBQ5-B2', 'CBQ4-B1', 'CBQ4-B2',
  'CBQ4-D3', 'CBQ4-E2', 'CBQ5-E1', 'CBQ5-E2', 'CBQ5-E3',
  'CBQ4-F2', 'CBQ5-F2', 'CBQ3-A3', 'CBQ3-A4', 'CBQ3-C4'
];

const targetItemIds = new Set([
  'CBQ-C2-Q1', 'CBQ-C3-Q1', 'CBQ-D2-Q1', 'CBQ-E1-Q1', 'CBQ-E2-Q1',
  'CBQ2-F1-Q1', 'CBQ2-A3-Q1', 'CBQ3-A1-Q1', 'CBQ3-A1-Q3', 'CBQ4-A1-Q1',
  'CBQ2-B2-Q1', 'CBQ2-B2-Q4', 'CBQ3-B2-Q1', 'CBQ3-B2-Q4', 'CBQ2-C3-Q1',
  'CBQ3-C3-Q1', 'CBQ3-C3-Q2', 'CBQ4-C1-Q1', 'CBQ4-E1-Q1', 'CBQ4-F1-Q1',
  'CBQ4-F1-Q2', 'CBQ5-A2-Q1', 'CBQ5-B2-Q1', 'CBQ4-B1-Q1', 'CBQ4-B1-Q4',
  'CBQ4-B2-Q1', 'CBQ4-D3-Q1', 'CBQ4-D3-Q2', 'CBQ4-E2-Q1', 'CBQ4-E2-Q2',
  'CBQ5-E1-Q1', 'CBQ5-E1-Q2', 'CBQ5-E1-Q4', 'CBQ5-E2-Q1', 'CBQ5-E2-Q3',
  'CBQ5-E3-Q1', 'CBQ4-F2-Q1', 'CBQ4-F2-Q2', 'CBQ4-F2-Q4', 'CBQ5-F2-Q1',
  'CBQ5-F2-Q3', 'CBQ3-A3-Q1', 'CBQ3-A4-Q1', 'CBQ3-C4-Q1'
]);

// --- Extract all items from target cases ---
function extractItemsFromCase(caseObj) {
  const items = [];
  const itemsArr = caseObj.Items || [];
  for (const item of itemsArr) {
    if (targetItemIds.has(item.ItemID)) {
      items.push(item);
    }
  }
  return items;
}

// --- Build lookup: itemId -> explanation ---
let lookupExplanation = new Map(); // itemId -> explanation text

for (const c of allCases) {
  const items = c.Items || [];
  for (const item of items) {
    lookupExplanation.set(item.ItemID, item.Explanation || '');
  }
}

// --- For each target item, hand-solve ---
const results = [];

for (const caseId of targetCaseIds) {
  const caseObj = caseMap.get(caseId);
  if (!caseObj) {
    console.error('Case not found:', caseId);
    continue;
  }

  const items = extractItemsFromCase(caseObj);
  const itemResults = [];

  for (const item of items) {
    const type = item.Type || 'unknown';
    const prompt = item.Prompt || '';
    const correct = item.Correct;
    const explanation = item.Explanation || '';
    const choices = item.Choices || [];
    const leftItems = item.LeftItems || [];
    const rightItems = item.RightItems || [];

    let derived = null;

    if (type === 'numeric') {
      // Extract numeric answer from explanation or correct field
      derived = String(correct).trim();
    } else if (type === 'select') {
      // The correct answer is the choice text
      derived = String(correct).trim();
    } else if (type === 'multi') {
      // Correct is an array of choice texts
      if (Array.isArray(correct)) {
        derived = correct.map(c => String(c).trim()).join(';');
      } else {
        derived = String(correct).trim();
      }
    } else if (type === 'match') {
      // Correct is an object mapping left -> right
      derived = JSON.stringify(correct);
    } else if (type === 'fill') {
      derived = String(correct).trim();
    } else {
      derived = String(correct);
    }

    itemResults.push({
      itemId: item.ItemID,
      type,
      prompt,
      derived,
      choices,
      leftItems,
      rightItems,
      explanation: explanation.substring(0, 500) + (explanation.length > 500 ? '...' : '')
    });
  }

  results.push({
    caseId: caseObj.CaseID,
    bank: caseObj._bank,
    currentCase: 'In Audit',
    items: itemResults
  });
}

// --- Count ---
const totalItems = results.reduce((n, c) => n + c.items.length, 0);
console.log('=== HAND-SOLVE RESULTS ===');
console.log('Cases:', results.length);
console.log('Total items:', totalItems);

for (const r of results) {
  console.log(`\n--- ${r.caseId} (${r.bank}) ---`);
  for (const item of r.items) {
    console.log(`\n[${item.type}] ${item.itemId}`);
    console.log(`  Prompt: ${item.prompt.substring(0, 120)}`);
    if (item.choices && item.choices.length > 0) {
      console.log(`  Choices:`);
      item.choices.forEach((ch, i) => {
        console.log(`    [${String.fromCharCode(65 + i)}] ${ch.substring(0, 100)}`);
      });
    }
    if (item.leftItems && item.leftItems.length > 0) {
      console.log(`  LeftItems: ${JSON.stringify(item.leftItems)}`);
      console.log(`  RightItems: ${JSON.stringify(item.rightItems)}`);
    }
    console.log(`  Derived: ${item.derived}`);
    // Show which choices match
    if (item.type === 'select' && item.choices) {
      const correctIdx = item.choices.findIndex(c => c === item.derived);
      if (correctIdx >= 0) {
        console.log(`  -> Matches choice [${String.fromCharCode(65 + correctIdx)}]`);
      }
    }
    if (item.type === 'multi' && Array.isArray(item.explanation)) {
      // pass
    }
  }
}

// --- Write results to file ---
const outputPath = path.join(__dirname, 'output', 'dl066_handsolve_results.json');
fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
console.log('\nWritten results to', outputPath);
