const fs = require('fs');
const content = fs.readFileSync('content/cases/case_pack_1_corrected.js', 'utf8');
let code = content.replace(/^const CASE_PACK_\d+ = /, '').trim();
if (code.endsWith(';')) code = code.slice(0, -1);
const cases = eval(code);
const c = cases.find(x => x.CaseID === 'CBQ-C2');
const item = c.Items.find(i => i.ItemID === 'CBQ-C2-Q2');
const expl = item.Explanation;

// Test the exact regex from the script
const text = expl.replace(/\\"/g, '"').replace(/\\n/g, ' ').replace(/\\"/g, '"');

const divChain = [...text.matchAll(/(\w+(?:\s+\w+){0,3})\s*=\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*\/\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*=\s*([^.]*?(?:\d+(?:\.\d+)?)[^.]*?)/g)];
console.log('Division chain matches:', divChain.length);
for (const m of divChain) {
  console.log('  Full match:', m[0]);
  console.log('  Groups:', m.slice(1));
  const metric = m[1].trim();
  const num = parseNumber(m[2]);
  const den = parseNumber(m[3]);
  console.log('  Parsed num:', num, 'den:', den);
  if (num !== null && den !== null && den !== 0) {
    const computed = num / den;
    console.log('  Computed:', computed);
  }
}

function parseNumber(val) {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  const isParen = str.startsWith('(') && str.endsWith(')');
  const cleaned = str.replace(/[$,()]/g, '').replace(/,/g, '');
  const num = parseFloat(cleaned);
  return isParen && !isNaN(num) ? -num : num;
}