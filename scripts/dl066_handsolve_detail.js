const fs = require('fs');
const path = require('path');

// --- Load case pack files ---
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

// --- Target item order from masked file ---
const targetOrder = [];
for (const mc of masked) {
  for (const mi of (mc.items || [])) {
    // Match to case pack for full data
    const prompt = mi.Prompt || '';
    const cpItem = promptLookup.get(prompt);
    targetOrder.push({
      itemId: mi.itemId,
      type: mi.type,
      prompt,
      maskedExplanation: mi.ExplanationCorrect || '',
      maskedChoices: mi.Choices || [],
      leftItems: mi.LeftItems || (cpItem ? (cpItem.LeftItems || []) : []),
      rightItems: mi.RightItems || (cpItem ? (cpItem.RightItems || []) : []),
      cpItem: cpItem,
      cpCorrect: cpItem ? cpItem.Correct : null,
      cpChoices: cpItem ? (cpItem.Choices || []) : [],
      cpExplanation: cpItem ? (cpItem.Explanation || '') : 'N/A',
    });
  }
}

// --- Print full detail for manual hand-solve ---
let idx = 0;
for (const item of targetOrder) {
  idx++;
  console.log(`\n${'='.repeat(80)}`);
  console.log(`ITEM ${idx}/${targetOrder.length}: ${item.itemId}  [${item.type}]`);
  console.log(`Prompt: ${item.prompt}`);
  console.log('='.repeat(80));

  // Show full choices (from case pack if masked ones are garbled)
  const choices = item.cpChoices.length > 0 ? item.cpChoices : item.maskedChoices;
  if (choices.length > 0) {
    console.log('\nChoices:');
    choices.forEach((c, i) => {
      const letter = String.fromCharCode(65 + i);
      console.log(`  ${letter}: ${c}`);
    });
  }

  if (item.leftItems.length > 0) {
    console.log('\nLeftItems:');
    item.leftItems.forEach((li, i) => console.log(`  L${i}: ${li}`));
    console.log('\nRightItems:');
    item.rightItems.forEach((ri, i) => console.log(`  R${i}: ${ri}`));
  }

  console.log('\nExplanationCorrect (from masked file):');
  // Print full explanation without truncation
  console.log(item.maskedExplanation);

  if (item.cpItem) {
    console.log('\n--- Case Pack Data (for verification only, NOT to be used as key) ---');
    console.log('Type:', item.cpItem.Type);
    console.log('Correct:', item.cpCorrect);
    // Check if case pack explanation differs from masked
    if (item.cpExplanation !== item.maskedExplanation) {
      console.log('\nCase Pack Explanation (DIFFERENT from masked):');
      console.log(item.cpExplanation);
    }
  }

  console.log('\n');
}
