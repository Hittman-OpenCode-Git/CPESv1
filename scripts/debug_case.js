const fs = require('fs');
const content = fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8');
let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
if (code.endsWith(';')) code = code.slice(0, -1);
const cases = eval(code);
const c = cases.find(x => x.CaseID === 'CBQ-C2');
console.log('CBQ-C2 Title:', c.Title);
console.log('Items:');
for (const item of c.Items) {
  console.log(`  ${item.ItemID}: ${item.Prompt.substring(0, 60)}`);
}