const fs = require('fs');
const masked = JSON.parse(fs.readFileSync('scripts/output/dl066_masked Fresh.json', 'utf8'));

const content = fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8');
let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
if (code.endsWith(';')) code = code.slice(0, -1);
const cases = eval(code);

const maskedCase = masked.find(x => x.caseId === 'CBQ-C2');
console.log('Masked items:', maskedCase.items.map(i => ({ itemId: i.itemId, prompt: i.Prompt.substring(0, 50) })));

const casePack = cases.find(x => x.CaseID === 'CBQ-C2');
console.log('\nCase pack items:', casePack.Items.map(i => ({ ItemID: i.ItemID, prompt: i.Prompt.substring(0, 50) })));

for (const mItem of maskedCase.items) {
  const packItem = casePack.Items.find(i => i.Prompt === mItem.Prompt || i.ItemID === mItem.itemId);
  console.log(`\nMatching ${mItem.itemId}:`, packItem ? `FOUND (${packItem.ItemID})` : 'NOT FOUND');
  if (packItem) {
    console.log('  packItem keys:', Object.keys(packItem).slice(0, 10));
    console.log('  Has Explanation:', !!packItem.Explanation);
    console.log('  Has ExplanationCorrect:', !!packItem.ExplanationCorrect);
  }
}